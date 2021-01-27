CREATE TABLE produtos (
  id_produto SERIAL NOT NULL,
  nome VARCHAR(50) NOT NULL,
  descricao VARCHAR(200) NOT NULL,
  price DECIMAL NOT NULL,
  tags TEXT[] NOT NULL
);

insert into produtos (nome, descricao, price, tags) values ( 'Lapalapa', 'benchmark real-time synergies', 100, '{"muitasBorbulhas",peleVermelha","peleSeca","comRugas"}');
insert into produtos (nome, descricao, price, tags) values ( 'Siskiyou Monardella', 'synergize e-business solutions', 79, '{"algumasBorbulhas","peleVermelha","peleSeca","semRugas"}');
insert into produtos (nome, descricao, price, tags) values ( 'Pan Dropseed', 'harness distributed solutions', 55, '{"semBorbulhas","peleVermelha","peleSeca","semRugas"}');
insert into produtos (nome, descricao, price, tags) values ( 'Blackberry', 'seize frictionless infomediaries', 76, '{"muitasBorbulhas","peleVermelha","peleSeca","semRugas"}');
insert into produtos (nome, descricao, price, tags) values ( 'New Zealand Geranium', 'harness interactive e-services', 39, '{"semBorbulhas","peleSeca","comRugas"}');
insert into produtos (nome, descricao, price, tags) values ( 'Tenlobe False Foxglove', 'optimize distributed metrics', 95, '{"muitasBorbulhas","peleVermelha","peleSeca","comRugas"}');
insert into produtos (nome, descricao, price, tags) values ( 'Hungarian Vetch', 'evolve sticky applications', 35, '{"semBorbulhas","peleVermelha","semRugas"}');
insert into produtos (nome, descricao, price, tags) values ( 'Snow Lichen', 'target cross-media eyeballs', 46, '{"algumasBorbulhas","peleVermelha","semRugas"}');
insert into produtos (nome, descricao, price, tags) values ( 'Yampah', 'extend next-generation convergence', 86, '{"algumasBorbulhas","peleSeca","comRugas"}');
insert into produtos (nome, descricao, price, tags) values ( 'Pulasan', 'streamline scalable models', 46, '{"semBorbulhas","peleVermelha","peleSeca","semRugas"}');

