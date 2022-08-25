/*
 * Explicação sobre extensões
 * https://www.postgresql.org/docs/current/sql-createextension.html
 */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- https://www.postgresql.org/docs/current/uuid-ossp.html
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- https://www.postgresql.org/docs/current/pgcrypto.html

CREATE TABLE IF NOT EXISTS users(
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
);

INSERT INTO users (username, password) VALUES ('joao', crypt('joao', 'meu_segredo'));
