/* perguntas */
insert 
into perguntas (type_pergunta, pergunta) 
values 
('checkbox','Como sentes a tua pele?');

insert 
into perguntas (type_pergunta, pergunta) 
values 
('checkbox','Sentes secura em alguma zona do rosto?');

insert 
into perguntas (type_pergunta, pergunta) 
values
( 'radio','Como se comporta a maquilhagem no teu rosto?');

/* opcoes */
INSERT into opcoes (id_pergunta, tag, opcao_texto, ordem) 
VALUES 
  (1,'brilho_rosto','Com brilho em todo o rosto', NULL),
  (1,'brilho_zona_t','Com brilho na zona T', NULL),
  (1,'pontos_negros','Com pontos negros', NULL),
  (1,'borbulhas','Com borbulhas', NULL),
  (1,'poros_dilatados','Com poros dilatados', NULL),
  (1,'pele_nenhum','Nenhuma das anteriores',1);

INSERT into opcoes (id_pergunta, tag, opcao_texto, ordem) 
VALUES 
  (2, 'secura_todo_rosto', 'Em todo o rosto', NULL),
  (2, 'secura_macas', 'Só nas maças do rostos', NULL),
  (2, 'secura_poros_pouco_visiveis', 'Poros pouco visíveis', NULL),
  (2, 'secura_zonas_sensiveis', 'Tem zonas vermelhas no rosto/zonas sensíveis', NULL),
  (2, 'secura_nenhum', 'Não sinto secura',1);

INSERT into opcoes (id_pergunta, tag, opcao_texto, ordem) 
VALUES 
  (3, 'maquilhagem_todo_dia', 'Dura todo o dia', NULL),
  (3, 'maquilhagem_algum_tempo', 'Desaparece completamente passado de algum tempo', NULL),
  (3, 'maquilhagem_zonas_sem_algum_tempo', 'Desaparece em algumas zonas do rosto passado algum tempo', NULL),
  (3, 'maquilhagem_irregular', 'Fica irregular, com zonas a descamar', NULL),
  (3, 'maquilhagem_brilho', 'Fico com muito brilho no rosto', NULL),
  (3, 'maquilhagem_nenhum', 'Não uso maquilhagem', 1);

/* PRODUTOS */

insert into produtos (nome, descricao, price, link, image_link) 
values ('Lapalapa', 'benchmark real-time synergies', 100, 'https://www.perfumesecompanhia.pt/pt/catalogo/cosmetica/rosto/mascaras/prime-renewing-pack-valmont/', 'https://www.perfumesecompanhia.pt/fotos/produtos/7612017058290_1.jpg');

INSERT INTO prod_op (id_produto, id_opcao) VALUES 
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17);