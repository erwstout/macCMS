const DB =
  process.env.DATABASE_URL ||
  "postgres://lecmwkvvigimya:68ab7997e91d6bfe136b26664d17f80bfc81e3320330728f65b64104c8a36e29@ec2-54-235-247-209.compute-1.amazonaws.com:5432/dafi32r5igglia";

/**
 * Setup our database connection
 */
const pg = require("pg");

pg.defaults.ssl = true;
const knex = require("knex")({
	client: "pg",
	connection: DB,
	debug: process.env.NODE_ENV === "development"
});

module.exports = {
	knex
};
