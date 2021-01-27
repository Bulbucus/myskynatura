const { Pool } = require("pg");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

const bcrypt = require("bcrypt");

const userQuery = require("../model/user");
const emailSender = require('../util/emailSender');
const questionarioController = require('./questionario-controllers');

// connect postgres database
const client = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
client.connect();

// registar o utilizador
const singUpUser = (req, res) => {
  // Se houver erros na validaçao dos dados:
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    return res.json({
      status: 500,
      message: "Por favor coloque os dados corretamente",
      error: errors,
    });
  }
  
  // encriptar palavrapasse
  const palavrapasse = bcrypt.hashSync(req.body.palavrapasse, 15);
  // Inserir os dados na base de dados
  client.query(userQuery.signUpUserQuery(req.body, palavrapasse), (err,respond) => {
    if (err) {
      // unica coisa que tem de ser unica é o email
      // por isso o unico erro que pode dar se todos os dados
      // forem inseridos, é de email duplicado
      return res.json({
        status: 422,
        message: "Este e-mail já esta registado",
      });
    } else {

      const token = jwt.sign(
        {
          id: respond.rows[0].id_utilizador,
          email:req.body.email,
        },
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
      );

      // enviar email para verificaçao
      //emailSender(req.body.email, req.body.primeiro_nome, token)

      // guarda as respostas do questionario numa base de dados
      questionarioController.addQuestionario(respond.rows[0].id_utilizador, req.body.questionario)
    
      return res.json({ status: 200 });
    }
  });
};

// login o utilizador
const loginUser = async (req, res) => {
  // Se houver erros na validaçao dos dados:
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    return res.json({
      status: 500,
      message: "Por favor coloque os dados corretamente",
      error: errors,
    });
  }

  // verifica primeiro se o email ja esta registado
  try {
    const verifyEmail = await client.query(
      userQuery.verifyEmail(req.body.email)
    );
    if (verifyEmail.rows.length < 1) {
      return res.json({
        status: 500,
        message: "Este email ainda não esta registado",
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: "Erro interno, por favor tentar mais tarde",
    });
  }

  let autenticacao;

  // verificar se a password esta correta
  try {
    const verifyPassword = await client.query(userQuery.verifyPassword(req.body.email));

    if (!verifyPassword) {
      return res.json({
        status: 500,
        message: "Erro interno, por favor tentar mais tarde",
      });
    } else {
      const compareHash = await bcrypt.compare(req.body.palavrapasse,verifyPassword.rows[0].palavrapasse);
  
      if (compareHash) {
        // envia este erro se o email nao tiver verificado
        if(!verifyPassword.rows[0].email_confirmed){
          return res.json({
            status:500,
            message: "Por favor verifique o seu email"
          })
        }

        autenticacao = {
          id: verifyPassword.rows[0].id_utilizador,
          email: req.body.email,
        };

      } else {
        return res.json({
          status: 500,
          message: "Password invalida",
        });
      }
    }
  } catch (error) {
    return res.json({
        status: 500,
        message: "Erro interno, por favor tentar mais tarde",
      });
  }

  // criaçao do token e enviar a autentiaçao para front end
  try {
    const token = jwt.sign(
        {id: autenticacao.id},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
      );
    if (token) {
        autenticacao.token = token;
        return res.json(autenticacao);
    } else {
        return res.json({
            status: 500,
            message: "Erro interno, por favor tentar mais tarde",
          });
    }
  } catch (error) {
    return res.json({
        status: 500,
        message: "Erro interno, por favor tentar mais tarde",
      });
  }
};

// info do utilizador
const getUserInfo = async (req, res) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    return res.json({
      status: 500,
      message: "Credenciais erradas",
      error: errors,
    });
  }

  try {
    jwt.verify(req.body.token, process.env.JWT_SECRET)
  } catch(err){
    return res.json({
      status: 500,
      message: "Erro interno, por favor tentar mais tarde",
    });
  }

  try{
    const userInfo = await client.query(userQuery.getUserInfoQuery(req.body.id));
    if (!userInfo) {
      return res.json({
        status: 500,
        message: "Este utilizador nao existe",
      });
    } else {

      return res.json({
        ...userInfo.rows[0],
        idade: `${userInfo.rows[0].idade.toISOString().slice(0,10)}`
      })
    }
  } catch(err) {
    return res.json({
      status: 500,
      message: "Erro interno, por favor tentar mais tarde",
    });
  }

};

const updateUser = async (req,res) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    return res.json({
      status: 500,
      message: "Por favor coloque os dados corretos",
      error: errors,
    });
  }
  try{
    const updateUser = await client.query(userQuery.updateUserQuery(req.body))

    if(!updateUser) {
      return res.json({
        status: 500,
        message: "Erro interno, por favor tentar mais tarde",
      });
    }
    else {
      return res.json({
        status:200,
      })
    }
  }catch(err) {
      return res.json({
        status: 500,
        message: "Erro interno, por favor tentar mais tarde",
      });
  }
}

const confirmUser = async (req,res) => {
  try{
    jwt.verify(req.query.token, process.env.JWT_SECRET)
    } catch(err){
      //Agarra id e email de usuario
      const {id,email} = jwt.decode(req.query.token)
      
      // faz nova token se a antiga expirar
      const token = jwt.sign(
        {id: id},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
      );
      
      // envia novo email se o token expirar
      emailSender(email, "Again", token)

      return res.redirect(process.env.HOST + '?emailConfirmed=false');
    }
    try{

      const {id} = jwt.decode(req.query.token)
      const confirmUser = await client.query(userQuery.confirmUser(id))
  
      if (confirmUser) {
        return res.redirect(process.env.HOST + '?emailConfirmed=true')
      }
    } catch(err) {
      return res.redirect(process.env.HOST)
    }



} 

exports.singUpUser = singUpUser;
exports.loginUser = loginUser;
exports.getUserInfo = getUserInfo;
exports.updateUser= updateUser;
exports.confirmUser = confirmUser;