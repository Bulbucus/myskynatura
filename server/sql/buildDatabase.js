const {client} = require('./connect');

const buildDatabase = async () => {
await client.query('create extension if not exists "uuid-ossp";')

await client.query('CREATE TABLE IF NOT EXISTS users ( \
  id_user UUID PRIMARY KEY DEFAULT uuid_generate_v4(), \
  primeiro_nome VARCHAR(30) NOT NULL, \
  ultimo_nome VARCHAR(30) NOT NULL, \
  genero VARCHAR(9) NOT NULL, \
  idade DATE NOT NULL, \
  email VARCHAR(100) NOT NULL, \
  palavrapasse VARCHAR(100) NOT NULL, \
  email_confirmed BOOLEAN NOT NULL DEFAULT true, \
  UNIQUE(email) \
);')

await client.query('CREATE TABLE IF NOT EXISTS perguntas ( \
  id_pergunta SERIAL PRIMARY KEY, \
  type_pergunta VARCHAR(8), \
  pergunta TEXT NOT NULL \
);')

await client.query('CREATE TABLE IF NOT EXISTS opcoes (\
  id_pergunta SERIAL REFERENCES perguntas(id_pergunta) ON DELETE CASCADE,\
  id_opcao SERIAL PRIMARY KEY,\
  tag TEXT UNIQUE,\
  opcao_texto TEXT NOT NULL,\
  ordem INT\
);')

await client.query('CREATE TABLE IF NOT EXISTS produtos (\
  id_produto SERIAL PRIMARY KEY,\
  nome VARCHAR(50) NOT NULL,\
  descricao VARCHAR(200) NOT NULL,\
  price DECIMAL NOT NULL,\
  link TEXT NOT NULL,\
  image_link TEXT NOT NULL\
);')

await client.query('CREATE TABLE IF NOT EXISTS respostas ( \
  id_resposta SERIAL PRIMARY KEY,\
  id_user UUID REFERENCES users(id_user) ON DELETE CASCADE,\
  id_opcao SERIAL REFERENCES opcoes(id_opcao) ON DELETE CASCADE\
);')

await client.query('CREATE TABLE IF NOT EXISTS prod_op (\
  id_prod_op SERIAL PRIMARY KEY,\
  id_produto SERIAL REFERENCES produtos(id_produto) ON DELETE CASCADE,\
  id_opcao SERIAL REFERENCES opcoes(id_opcao) ON DELETE CASCADE\
);')
}

module.exports = buildDatabase;