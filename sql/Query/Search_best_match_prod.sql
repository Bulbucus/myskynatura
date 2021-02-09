select count(distinct respostas.id_opcao) as match, (select count(respostas.id_resposta) from respostas where respostas.id_user='67e2961b-6f27-4434-9106-d1443bc3a273') as length_respostas ,produtos.nome, produtos.descricao, produtos.price
from prod_op, respostas
inner join produtos
  on id_produto = produtos.id_produto
where respostas.id_opcao=prod_op.id_opcao and produtos.id_produto = prod_op.id_produto and respostas.id_user='67e2961b-6f27-4434-9106-d1443bc3a273' /* <= colocar id_user variavel */
group by prod_op.id_produto, produtos.nome, produtos.id_produto
order by count(distinct respostas.id_opcao) desc;