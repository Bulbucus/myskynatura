SELECT produtos.*, array_agg(prod_op.id_opcao) as id_opcao FROM produtos, prod_op WHERE produtos.id_produto=13 AND prod_op.id_produto=produtos.id_produto GROUP BY produtos.id_produto;

SELECT prod_op.id_prod_op, prod_op.id_opcao, opcoes.tag, opcoes.opcao_texto FROM prod_op INNER JOIN opcoes ON prod_op.id_opcao = opcoes.id_opcao WHERE prod_op.id_produto=13 ORDER BY opcoes.ordem desc;