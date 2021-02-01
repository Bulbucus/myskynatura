CREATE TABLE prod_op (
  id_prod_op SERIAL PRIMARY KEY,
  id_produto SERIAL REFERENCES produtos(id_produto),
  id_opcao TEXT REFERENCES opcoes(id_opcao)
);

INSERT INTO prod_op (id_produto, id_opcao) VALUES 
(1, 'brilho_rosto'),
(1, 'borbulhas'),
(1, 'secura_todo_rosto'),
(1, 'secura_poros_pouco_visiveis');

INSERT INTO prod_op (id_produto, id_opcao) VALUES 
(3, 'brilho_zona_t'),
(3, 'pontos_negros'),
(3, 'secura_nenhum'),
(3, 'maquilhagem_todo_dia');

INSERT INTO prod_op (id_produto, id_opcao) VALUES
(7, 'maquilhagem_todo_dia'),
(7, 'secura_poros_pouco_visiveis'),
(7, 'maquilhagem_irregular'),
(7, 'pele_nenhum');

INSERT INTO prod_op (id_produto, id_opcao) VALUES
(3, 'brilho_rosto');