CREATE TABLE produtos (
  id_produto SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao VARCHAR(200) NOT NULL,
  price DECIMAL NOT NULL,
  link TEXT NOT NULL,
  image_link TEXT NOT NULL
);



insert into produtos (nome, descricao, price, link, image_link) values ( 'Lapalapa', 'benchmark real-time synergies', 100, 'https://www.perfumesecompanhia.pt/pt/catalogo/cosmetica/rosto/mascaras/prime-renewing-pack-valmont/', 'https://www.perfumesecompanhia.pt/fotos/produtos/7612017058290_1.jpg');