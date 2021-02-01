CREATE TABLE respostas (
  id_resposta SERIAL PRIMARY KEY,
  id_users UUID REFERENCES users(id_users) ON DELETE CASCADE
  id_opcao TEXT REFERENCES opcoes(id_opcao),
);