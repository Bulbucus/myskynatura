const {client} = require('../sql/connect');

const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const questionarioQuery = require('../model/questionario');


const addQuestionario = async (id_user, questionario) => {

  client.query(questionarioQuery.addQuestionarioQuery(id_user,questionario))
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
    const produtsMatch = await client.query(questionarioQuery.getMatchProduts(req.body.id))
    const produtsEnoughMatch = []
    produtsMatch.rows.forEach((element, i) => {
      if(element.match >= (element.length_respostas / 2) ){
        produtsEnoughMatch.push(element)
      }
    })

    return res.json({
      status:200,
      resultado: produtsEnoughMatch
    })

  }catch(err){
    return res.json({
      status:500
    })
  }
}

exports.addQuestionario = addQuestionario;
exports.resultQuestionario = resultQuestionario;