CREATE TABLE users (
    id_users BIGSERIAL NOT NULL PRIMARY KEY,
    primeiro_nome VARCHAR(30) NOT NULL,
    ultimo_nome VARCHAR(30) NOT NULL,
    idade DATE NOT NULL,
    genero VARCHAR(1) NOT NULL,
    email VARCHAR(100) NOT NULL,
    palavrapasse VARCHAR(100) NOT NULL,
    hash_palavrapasse VARCHAR(10) NOT NULL,
    UNIQUE(email)
);