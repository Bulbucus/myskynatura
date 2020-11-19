const { Client } = require("pg");
const {validationResult} = require('express-validator');

const bcrypt = require('bcrypt');

const sqlQuery = require("../model/user");

// connect postgres database
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
client.connect();

const singUpUser = (req, res) => {

    // Se houver erros na validaçao dos dados:
    const {errors} = validationResult(req);
    if(errors.length > 0) {
        return res.json({
            status:500, 
            message:'Por favor coloque os dados corretamente',
            error:errors
        })
    }
    // encriptar palavrapasse
    const palavrapasse = bcrypt.hashSync(req.body.palavrapasse, 15)
    // Inserir os dados na base de dados
    client.query(sqlQuery.signUpUserQuery(req.body, palavrapasse), 
        (err) => {
            if (err) {
                // unica coisa que tem de ser unica é o email
                // por isso o unico erro que pode dar se todos os dados
                // forem inseridos, é de email duplicado
                return res.json({
                    status:422,
                    message:'Esta e-mail já esta registado'
                });
            } else {
              return res.json({ status: 200 });
            }
        }
    );
};

const loginUser = (req, res) => {
    const {errors} = validationResult(req);
    if(errors.length > 0) {
        return res.json({
            status:500, 
            message:'Por favor coloque os dados corretamente',
            error:errors
        })
    }

    client.query(sqlQuery.verifyEmail(req.body.email), 
        (err) => {
            if(err) {
                return res.json({
                    status:500,
                    message:'Este e-mail ainda não esta registado'
                })
            }
        }
    )
    
    client.query(sqlQuery.verifyPassword(req.body.email),
        async (err, resp) => {
            if(err) {
                return res.json({
                    status:500,
                    message:'Tente de novo, erro desconhecido'
                })
            } else {
                const compareHash = await bcrypt.compare(req.body.palavrapasse, resp.rows[0].palavrapasse);
                console.log(compareHash)
                if (compareHash){
                    return res.json({
                        id: resp.rows[0].id_users,
                        email: req.body.email,
                    })
                } else {
                    return res.json({
                        status:500,
                        message:'Palavrapasse invalida'
                    })
                }
            }
        }
    )
    
    
}

exports.singUpUser = singUpUser;
exports.loginUser = loginUser;