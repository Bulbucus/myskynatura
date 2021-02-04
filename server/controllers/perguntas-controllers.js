const { Pool } = require("pg");

// connect postgres database
const client = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
client.connect();

const getPerguntas = async (req, res) => {
  try {
    const perguntas = await client.query("SELECT perguntas.*, array_agg(opcoes.opcao_texto) as respostas, array_agg(opcoes.id_opcao) as tags FROM perguntas,opcoes where perguntas.id_pergunta=opcoes.id_pergunta group by perguntas.id_pergunta;")

    return res.json({
      status:200,
      perguntas: perguntas.rows
    })
    
  }catch(error){
    return res.json({
      status:500
    })
  }
  
}

exports.getPerguntas = getPerguntas;