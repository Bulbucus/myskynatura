const {client} = require('../../sql/connect');

const getProdutos = async (req, res) => {
  const produtos = await client.query("SELECT id_produto,nome, price, link FROM produtos ORDER BY id_produto;")
  const opcoes = await client.query("SELECT perguntas.pergunta, array_agg(opcoes.id_opcao) as id ,array_agg(opcoes.opcao_texto) as respostas, array_agg(opcoes.tag) as tags FROM perguntas,opcoes where perguntas.id_pergunta=opcoes.id_pergunta group by perguntas.id_pergunta;")
  res.render('admin/produtos/index', {produtos: produtos.rows, opcoes: opcoes.rows});
}

const makeProduto = async (req, res) => {
  const {body} = req;

  const addProduto = await client.query(
    "INSERT INTO produtos (nome, descricao, price, link, image_link) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
    [body.nome, body.descricao, body.price, body.link, body.image_link]
  );

  for(let i = 0; i < body.opcoes.length; i += 1){
    const addProdOp = await client.query(
      "INSERT INTO prod_op (id_produto, id_opcao) VALUES ($1, $2) RETURNING *;",
      [addProduto.rows[0].id_produto, body.opcoes[i]]
    )
  }

  res.redirect('./produtos')
}

const getProduto = async (req, res) => {

  const getProduto = await client.query(
    "SELECT produtos.*,array_agg(prod_op.id_prod_op) as id_prod_op ,array_agg(prod_op.id_opcao) as id_opcao FROM produtos, prod_op WHERE produtos.id_produto=$1 AND prod_op.id_produto=produtos.id_produto GROUP BY produtos.id_produto;",
    [req.params.id]
  )

  const getOpcoes = await client.query(
    "SELECT perguntas.pergunta, array_agg(opcoes.id_opcao) as id ,array_agg(opcoes.opcao_texto) as respostas, array_agg(opcoes.tag) as tags FROM perguntas,opcoes where perguntas.id_pergunta=opcoes.id_pergunta group by perguntas.id_pergunta"
  )

  res.render('admin/produtos/edit', {produto: getProduto.rows[0], opcoes:getOpcoes.rows})
}

const editProduto = async (req,res) => {
  const {params, body} = req
  console.log(body)

  // falta acabar!!
  const editProduto = await client.query(
    "UPDATE produtos SET nome=$1, descricao=$2, price=$3, link=$4, image_link=$5 where produtos.id_produto=$6",
    [body.nome, body.descricao, body.price, body.link, body.image_link, params.id]
  )

  // para evitar errors verifica-se se é array ou nao primeiro,
  // pois se o update for so um ele vem como string e nao como array
  if(Array.isArray(body.opcao)){
    for(let i = 0; i < body.opcao.length; i += 1){
      const editOpcoes =  await client.query(
        "UPDATE prod_op SET id_opcao=$1 where id_prod_op=$2 and id_produto=$3",
        [body.opcao[i], body.id_prod_op[i], params.id]
      )
    }
  } else {
    const editOpcoes =  await client.query(
      "UPDATE prod_op SET id_opcao=$1 where id_prod_op=$2 and id_produto=$3",
      [body.opcao, body.id_prod_op, params.id]
    )
  }

  // para adicionar novas respostas a pergunta
  if(body.new){
    if(Array.isArray(body.new.opcao)){
      for(let i = 0; i < body.new.opcao.length; i += 1){
        const addOpcoes =  await client.query(
          "INSERT INTO prod_op (id_produto, id_opcao) VALUES ($1,$2) RETURNING *",
          [params.id, body.new.opcao[i]]
        )
      }
    } else {
      const addOpcoes =  await client.query(
        "INSERT INTO prod_op (id_produto, id_opcao) VALUES ($1,$2) RETURNING *",
          [params.id, body.new.opcao]
      )
    }
  }

  res.redirect(`./${params.id}`)
}

const deleteProduto = async (req, res) => {
  const {query} = req

  const deleteProduto = await client.query(
    "DELETE FROM produtos where id_produto=$1 RETURNING *",
     [query.id]
  )
  
  res.redirect('./produtos')
}


const deleteResposta = async (req, res) => {
  const {body, params} = req;

  const deleteOpcao =  await client.query(
    `DELETE FROM prod_op where id_prod_op=$1 RETURNING *`,
    [body.id]
  )

  res.redirect(`./${params.id}`)
}

module.exports = {getProdutos, makeProduto, getProduto, editProduto, deleteProduto, deleteResposta}