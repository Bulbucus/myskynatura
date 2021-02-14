const {client} = require('../sql/connect');

const getPerguntas = async (req, res) => {
  try {
    const perguntas = await client.query("SELECT perguntas.*, array_agg(opcoes.id_opcao ORDER BY opcoes.ordem DESC) as id ,array_agg(opcoes.opcao_texto ORDER BY opcoes.ordem DESC) as respostas, array_agg(opcoes.tag ORDER BY opcoes.ordem DESC) as tags FROM perguntas,opcoes where perguntas.id_pergunta=opcoes.id_pergunta group by perguntas.id_pergunta;")

    return res.json({
      status:200,
      perguntas: perguntas.rows
    })
    
  }catch(error){
    return res.json({
      status:500,
      error: error
    })
  }
  
}

exports.getPerguntas = getPerguntas;