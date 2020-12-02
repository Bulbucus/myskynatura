CREATE TABLE users (
    id_users UUID NOT NULL DEFAULT uuid_generate_v4(),
    primeiro_nome VARCHAR(30) NOT NULL,
    ultimo_nome VARCHAR(30) NOT NULL,
    idade DATE NOT NULL,
    genero VARCHAR(1) NOT NULL,
    email VARCHAR(100) NOT NULL,
    palavrapasse VARCHAR(100) NOT NULL,
    email_confirmed BOOLEAN NOT NULL DEFAULT false,
    UNIQUE(email)
);