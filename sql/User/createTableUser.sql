CREATE TABLE users (
    id_user UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    primeiro_nome VARCHAR(30) NOT NULL,
    ultimo_nome VARCHAR(30) NOT NULL,
    genero VARCHAR(9) NOT NULL,
    idade DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    palavrapasse VARCHAR(100) NOT NULL,
    email_confirmed BOOLEAN NOT NULL DEFAULT true,
    UNIQUE(email)
);
