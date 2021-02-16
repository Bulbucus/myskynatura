const format = require('pg-format');

const addQuestionarioQuery = (id_user, respostas) => {
  let values = [];

  respostas.forEach((curr) => {
    values.push([id_user, curr])
  })

  const text = format(`INSERT INTO respostas (id_user, id_opcao) VALUES %L RETURNING *`, values);

  return {text: text}
}

const getMatchProduts = (id) => {
  return {
    text: 'select count(distinct respostas.id_opcao) as match, (select count(respostas.id_resposta) from respostas where respostas.id_user=$1) as length_respostas, produtos.nome, produtos.descricao, produtos.price, produtos.link, produtos.image_link from prod_op, respostas inner join produtos on id_produto = produtos.id_produto where respostas.id_opcao=prod_op.id_opcao and produtos.id_produto = prod_op.id_produto and respostas.id_user=$1 group by prod_op.id_produto, produtos.nome, produtos.id_produto order by count(distinct respostas.id_opcao) desc;',
    values: [id]
  }
}


exports.addQuestionarioQuery = addQuestionarioQuery;
exports.getMatchProduts = getMatchProduts;