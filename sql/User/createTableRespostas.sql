CREATE TABLE respostas (
  id_resposta SERIAL PRIMARY KEY,
  id_user UUID REFERENCES users(id_user) ON DELETE CASCADE,
  id_opcao TEXT REFERENCES opcoes(id_opcao) ON DELETE CASCADE
);

