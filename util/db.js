const DB = process.env.DATABASE_URL;

/**
 * Setup our database connection
 */
const pg = require("pg");

pg.defaults.ssl = true;
const knex = require("knex")({
  client: "pg",
  connection: DB,
  debug: process.env.NODE_ENV === "development",
});

module.exports = {
  knex,
};
