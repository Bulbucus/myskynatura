const { Pool } = require("pg");
const { validationResult, cookie } = require("express-validator");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const sqlQuery = require("../model/user");

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
    console.log(req.body)
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
  client.query(sqlQuery.signUpUserQuery(req.body, palavrapasse), (err) => {
    if (err) {
      // unica coisa que tem de ser unica é o email
      // por isso o unico erro que pode dar se todos os dados
      // forem inseridos, é de email duplicado
      return res.json({
        status: 422,
        message: "Este e-mail já esta registado",
      });
    } else {
      return res.json({ status: 200 });
    }
  });
};

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
      sqlQuery.verifyEmail(req.body.email)
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
    const verifyPassword = await client.query(sqlQuery.verifyPassword(req.body.email));

    if (!verifyPassword) {
      return res.json({
        status: 501,
        message: "Erro interno, por favor tentar mais tarde",
      });
    } else {
      const compareHash = await bcrypt.compare(req.body.palavrapasse,verifyPassword.rows[0].palavrapasse);
      if (compareHash) {
        autenticacao = {
          id: verifyPassword.rows[0].id_utilizador,
          email: req.body.email,
        };
      } else {
        return res.json({
          status: 500,
          message: "Palavrapasse invalida",
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
        {autenticacao},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
      );
    if (token) {
        res.cookie('token', token, {maxAge: 9000000,  httpOnly: true, secure: false});
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

exports.singUpUser = singUpUser;
exports.loginUser = loginUser;
