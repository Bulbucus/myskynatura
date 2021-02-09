CREATE TABLE prod_op (
  id_prod_op SERIAL PRIMARY KEY,
  id_produto SERIAL REFERENCES produtos(id_produto) ON DELETE CASCADE,
  id_opcao TEXT REFERENCES opcoes(id_opcao) ON DELETE CASCADE
);

INSERT INTO prod_op (id_produto, id_opcao) VALUES 
(1, 'brilho_rosto'),
(1, 'borbulhas'),
(1, 'secura_todo_rosto'),
(1, 'secura_poros_pouco_visiveis');

INSERT INTO prod_op (id_produto, id_opcao) VALUES 
(3, 'brilho_zona_t'),
(3, 'pontos_negros'),
(3, 'secura_macas'),
(3, 'maquilhagem_todo_dia'),
(3, 'brilho_rosto');

INSERT INTO prod_op (id_produto, id_opcao) VALUES
(7, 'maquilhagem_todo_dia'),
(7, 'secura_poros_pouco_visiveis'),
(7, 'maquilhagem_irregular'),
(7, 'pele_nenhum');

INSERT INTO prod_op (id_produto, id_opcao) VALUES 
(2, 'brilho_rosto'),
(2, 'brilho_zona_t'),
(2, 'pontos_negros'),
(2, 'borbulhas'),
(2, 'poros_dilatados'),
(2, 'secura_todo_rosto'),
(2, 'secura_macas'),
(2, 'secura_poros_pouco_visiveis'),
(2, 'secura_zonas_sensiveis'),
(2, 'secura_nenhum'),
(2, 'pele_nenhum'),
(2, 'maquilhagem_todo_dia'),
(2, 'maquilhagem_algum_tempo'),
(2, 'maquilhagem_zonas_sem_algum_tempo'),
(2, 'maquilhagem_irregular'),
(2, 'maquilhagem_brilho'),
(2, 'maquilhagem_nenhum');