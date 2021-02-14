const { Pool } = require("pg");

// connect postgres database

const client = new Pool({
  user: process.env.POSTGRES_USER || process.env.PGUSER,
  host: process.env.POSTGRES_HOST || process.env.PGHOST,
  database: process.env.POSTGRES_DB || process.env.PGDATABASE,
  password: process.env.POSTGRES_PASSWORD|| process.env.PGPASSWORD,
  port: 5432,
});
client.connect();

module.exports = {client}