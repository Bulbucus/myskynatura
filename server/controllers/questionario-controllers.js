const { Pool } = require("pg");

const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

const questionarioQuery = require('../model/questionario');

const client = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
client.connect();

const addQuestionario = async (id_utilizador, questionario) => {

  // colocar todas as respostas numa so array
  // exemplo: ['muitasBorbulhas',[ 'peleVermelha', 'peleSeca' ],'semRugas']
  // resultado final: ["peleVermelha", "peleSeca", "muitasBorbulhas", "semRugas"]

  const arrayQuestionario = []
  await questionario.map(async (pergunta) => {
    await pergunta instanceof Array ? arrayQuestionario.push(...pergunta) : arrayQuestionario.push(pergunta);
  })

  client.query(questionarioQuery.addQuestionarioQuery(id_utilizador,arrayQuestionario))
}

const resultQuestionario = async (req, res) => {

  const { errors } = validationResult(req);
  if (errors.length > 0) {
    return res.json({
      status: 500,
      message: "Por favor coloque os dados corretamente",
      error: errors,
    });
  }

  try{
    // ira buscar o questionario do utilizador
    const infoQuestionarioQuery = await client.query(questionarioQuery.infoQuestionarioQuery(req.body.id))

    // ira receber os produtos apropriados as respostas do utilizador
    const getResultfromQuestionario = await client.query(questionarioQuery.compareQuestionarioResult(infoQuestionarioQuery.rows[0].respostas))

    if ( getResultfromQuestionario.rowCount === 0){
      let getSimiliarResultfromQuestionario = await client.query(questionarioQuery.similiarQuestionarioResult(infoQuestionarioQuery.rows[0].respostas, "@>"));
    
      return res.json({
        status:200,
        resultado: getSimiliarResultfromQuestionario.rows
      })
    }

    return res.json({
      status:200,
      resultado: getResultfromQuestionario.rows
    })

  }catch(err){
    console.log(err)
  }
}

exports.addQuestionario = addQuestionario;
exports.resultQuestionario = resultQuestionario;