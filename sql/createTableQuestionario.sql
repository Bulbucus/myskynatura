CREATE TABLE questionario (
  id_questionario NOT NULL DEFAULT uuid_generate_v4(),
  id_utilizador REFERENCES users(id_utilizador),
  questao_1 NOT NULL VARCHAR(50),
  questao_2 NOT NULL VARCHAR(50),
  questao_3 NOT NULL VARCHAR(50),
)