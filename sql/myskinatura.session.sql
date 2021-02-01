select count(distinct respostas.id_opcao) as match, prod_op.id_produto 
from prod_op, respostas 
where respostas.id_opcao=prod_op.id_opcao and respostas.id_user='61db3a0b-4b18-4a95-996e-3206539829b7' 
group by id_produto 
order by count(distinct respostas.id_opcao) desc;

select * from respostas;