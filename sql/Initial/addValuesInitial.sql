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
  (1,'pele_nenhum','Nenhuma das anteriores',6);

INSERT into opcoes (id_pergunta, tag, opcao_texto, ordem) 
VALUES 
  (2, 'secura_todo_rosto', 'Em todo o rosto', NULL),
  (2, 'secura_macas', 'Só nas maças do rostos', NULL),
  (2, 'secura_poros_pouco_visiveis', 'Poros pouco visíveis', NULL),
  (2, 'secura_zonas_sensiveis', 'Tem zonas vermelhas no rosto/zonas sensíveis', NULL),
  (2, 'secura_nenhum', 'Não sinto secura',5);

INSERT into opcoes (id_pergunta, tag, opcao_texto, ordem) 
VALUES 
  (3, 'maquilhagem_todo_dia', 'Dura todo o dia', NULL),
  (3, 'maquilhagem_algum_tempo', 'Desaparece completamente passado de algum tempo', NULL),
  (3, 'maquilhagem_zonas_sem_algum_tempo', 'Desaparece em algumas zonas do rosto passado algum tempo', NULL),
  (3, 'maquilhagem_irregular', 'Fica irregular, com zonas a descamar', NULL),
  (3, 'maquilhagem_brilho', 'Fico com muito brilho no rosto', NULL),
  (3, 'maquilhagem_nenhum', 'Não uso maquilhagem', 6);

/* PRODUTOS */
insert into produtos (nome, descricao, price) values ( 'Lapalapa', 'benchmark real-time synergies', 100);
insert into produtos (nome, descricao, price) values ( 'Siskiyou Monardella', 'synergize e-business solutions', 79);
insert into produtos (nome, descricao, price) values ( 'Pan Dropseed', 'harness distributed solutions', 55);
insert into produtos (nome, descricao, price) values ( 'Blackberry', 'seize frictionless infomediaries', 76);
insert into produtos (nome, descricao, price) values ( 'New Zealand Geranium', 'harness interactive e-services', 39);
insert into produtos (nome, descricao, price) values ( 'Tenlobe False Foxglove', 'optimize distributed metrics', 95);
insert into produtos (nome, descricao, price) values ( 'Hungarian Vetch', 'evolve sticky applications', 35);
insert into produtos (nome, descricao, price) values ( 'Snow Lichen', 'target cross-media eyeballs', 46);
insert into produtos (nome, descricao, price) values ( 'Yampah', 'extend next-generation convergence', 86);
insert into produtos (nome, descricao, price) values ( 'Pulasan', 'streamline scalable models', 46);

INSERT INTO prod_op (id_produto, id_opcao) VALUES 
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(2, 11),
(2, 12),
(2, 13),
(2, 14),
(2, 15),
(2, 16),
(2, 17);