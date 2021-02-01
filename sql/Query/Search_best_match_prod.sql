select count(distinct respostas.id_opcao) as match, prod_op.id_produto, produtos.nome, produtos.descricao, produtos.price
from prod_op, respostas
inner join produtos
  on id_produto = produtos.id_produto
where respostas.id_opcao=prod_op.id_opcao and produtos.id_produto = prod_op.id_produto and respostas.id_user='61db3a0b-4b18-4a95-996e-3206539829b7' /* <= colocar id_user variavel */
group by prod_op.id_produto, produtos.nome, produtos.id_produto
order by count(distinct respostas.id_opcao) desc;