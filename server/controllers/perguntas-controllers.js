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
    const perguntas = await client.query('SELECT * FROM perguntas')
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