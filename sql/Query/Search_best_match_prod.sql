select count(distinct respostas.id_opcao) as match, (select count(respostas.id_resposta) from respostas where respostas.id_user='29a9777c-0e18-444f-8ecc-a9aff49c5e28') as length_respostas ,produtos.nome, produtos.descricao, produtos.price
from prod_op, respostas
inner join produtos
  on id_produto = produtos.id_produto
where respostas.id_opcao=prod_op.id_opcao and produtos.id_produto = prod_op.id_produto and respostas.id_user='29a9777c-0e18-444f-8ecc-a9aff49c5e28' /* <= colocar id_user variavel */
group by prod_op.id_produto, produtos.nome, produtos.id_produto
order by count(distinct respostas.id_opcao) desc;