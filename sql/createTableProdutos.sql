CREATE TABLE produtos (
  id_produto SERIAL NOT NULL,
  nome VARCHAR(50) NOT NULL,
  descricao VARCHAR(200) NOT NULL,
  price DECIMAL NOT NULL,
  tags VARCHAR(50)[] NOT NULL
);

insert into produtos (id_produto, nome, descricao, price, tags) values (1, 'Lapalapa', 'benchmark real-time synergies', 100, '{"muitasBorbulhas",peleVermelha","peleSeca","comRugas"}');
insert into produtos (id_produto, nome, descricao, price, tags) values (2, 'Siskiyou Monardella', 'synergize e-business solutions', 79, '{"algumasBorbulhas","peleVermelha","peleSeca","semRugas"}');
insert into produtos (id_produto, nome, descricao, price, tags) values (3, 'Pan Dropseed', 'harness distributed solutions', 55, '{"semBorbulhas","peleVermelha","peleSeca","semRugas"}');
insert into produtos (id_produto, nome, descricao, price, tags) values (4, 'Blackberry', 'seize frictionless infomediaries', 76, '{"muitasBorbulhas","peleVermelha","peleSeca","semRugas"}');
insert into produtos (id_produto, nome, descricao, price, tags) values (5, 'New Zealand Geranium', 'harness interactive e-services', 39, '{"semBorbulhas","peleSeca","comRugas"}');
insert into produtos (id_produto, nome, descricao, price, tags) values (6, 'Tenlobe False Foxglove', 'optimize distributed metrics', 95, '{"muitasBorbulhas","peleVermelha","peleSeca","comRugas"}');
insert into produtos (id_produto, nome, descricao, price, tags) values (7, 'Hungarian Vetch', 'evolve sticky applications', 35, '{"semBorbulhas","peleVermelha","semRugas"}');
insert into produtos (id_produto, nome, descricao, price, tags) values (8, 'Snow Lichen', 'target cross-media eyeballs', 46, '{"algumasBorbulhas","peleVermelha","semRugas"}');
insert into produtos (id_produto, nome, descricao, price, tags) values (9, 'Yampah', 'extend next-generation convergence', 86, '{"algumasBorbulhas","peleSeca","comRugas"}');
insert into produtos (id_produto, nome, descricao, price, tags) values (10, 'Pulasan', 'streamline scalable models', 46, '{"semBorbulhas","peleVermelha","peleSeca","semRugas"}');

