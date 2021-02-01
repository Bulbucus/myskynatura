CREATE TABLE prod_op (
  id_prod_op SERIAL PRIMARY KEY,
  id_opcao SERIAL REFERENCES opcoes(id_opcao),
  id_produto SERIAL REFERENCES produtos(id_produto)
);