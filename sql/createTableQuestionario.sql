CREATE TABLE questionario (
  id_questionario UUID NOT NULL DEFAULT uuid_generate_v4(),
  id_utilizador UUID REFERENCES users(id_utilizador) ON DELETE CASCADE,
  respostas VARCHAR(100)[] NOT NULL
);