const { param } = require('../../router/user');
const {client} = require('../../sql/connect');

const getPerguntas = async (req, res) => {
  const perguntas = await client.query("SELECT * FROM perguntas;")
  
  res.render('admin/perguntas/index', {perguntas: perguntas.rows})
}

const makePerguntas = async (req, res) => {
  const {body} = req;

  const addPergunta = await client.query(
    "INSERT INTO perguntas (type_pergunta, pergunta) VALUES ($1,$2) RETURNING *",
     [body.type_pergunta, body.pergunta]
  )

  for(let i = 0; i < body.new.opcao_texto.length; i += 1){
    // isto serve para colocar o "_nenhum" (nenhum das anterios) sempre em ultimo
    // existe uma columa "ordem" em que todos tem null menos o _nenhum opcao, e ao ter valor em modo desc
    // coloca-o em sempre em ultimo
 
    if(body.new.tag[i].includes('_nenhum')){
      await client.query(
        "INSERT INTO opcoes (id_pergunta, tag, opcao_texto, ordem) VALUES ($1,$2,$3,1) RETURNING *",
        [addPergunta.rows[0].id_pergunta, body.new.tag[i], body.new.opcao_texto[i]]
      )
    } else {
      await client.query(
        "INSERT INTO opcoes (id_pergunta, tag, opcao_texto) VALUES ($1,$2,$3) RETURNING *",
        [addPergunta.rows[0].id_pergunta, body.new.tag[i], body.new.opcao_texto[i]]
      )
    }
  }
  
  res.redirect('./perguntas')
}

const deletePerguntas = async (req,res) => {
  const {query} = req

  const deletePergunta = await client.query(
    "DELETE FROM perguntas where id_pergunta=$1 RETURNING *",
     [query.id]
  )

  res.redirect('./perguntas')
}

const getPergunta = async (req, res) => {

  const getPergunta = await client.query(
    "SELECT perguntas.*,array_agg(opcoes.id_opcao ORDER BY opcoes.ordem DESC) as id ,array_agg(opcoes.opcao_texto ORDER BY opcoes.ordem DESC) as respostas, array_agg(opcoes.tag ORDER BY opcoes.ordem DESC) as tags FROM perguntas,opcoes WHERE perguntas.id_pergunta=opcoes.id_pergunta AND perguntas.id_pergunta=$1 GROUP BY perguntas.id_pergunta;",
     [req.params.id]
  )

  res.render('admin/perguntas/edit', {pergunta: getPergunta.rows[0]})
}

const editPergunta = async (req, res) => {
  const {body, params} = req;

  // para as mudanças feitas na pergunta e nas respostas ja criadas:
  const addPergunta = await client.query(
    "UPDATE perguntas SET type_pergunta=$1, pergunta=$2 where id_pergunta=$3",
     [body.type_pergunta, body.pergunta, params.id]
  )

  for(let i = 0; i < body.opcao_texto.length; i += 1){
    const addOpcoes =  await client.query(
      "UPDATE opcoes SET opcao_texto=$1, tag=$2 where id_pergunta=$3 and id_opcao=$4",
      [body.opcao_texto[i], body.tag[i], params.id, body.id[i]]
    )
  }

  // para adicionar novas respostas a pergunta
  if(body.new){
    if(Array.isArray(body.new.opcao_texto)){
      for(let i = 0; i < body.new.opcao_texto.length; i += 1){
        const addOpcoes =  await client.query(
          "INSERT INTO opcoes (id_pergunta, tag, opcao_texto) VALUES ($1,$2,$3) RETURNING *",
          [params.id, body.new.tag[i], body.new.opcao_texto[i]]
        )
      }
    } else {
      const addOpcoes =  await client.query(
        "INSERT INTO opcoes (id_pergunta, tag, opcao_texto) VALUES ($1,$2,$3) RETURNING *",
        [params.id, body.new.tag, body.new.opcao_texto]
      )
    }
  }
  
  res.redirect(`./${params.id}`)
}

const deleteResposta = async (req, res) => {
  const {body, params} = req;

  const deleteOpcao =  await client.query(
    `DELETE FROM opcoes where id_opcao=$1 RETURNING *`,
    [body.id]
  )

  res.redirect(`./${params.id}`)
}

module.exports = {getPerguntas, makePerguntas, deletePerguntas, getPergunta, editPergunta, deleteResposta};