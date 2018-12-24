// @flow
if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

const DB = process.env.DATABASE_URL;

var pg = require("pg");
pg.defaults.ssl = true;
const knex = require("knex")({
  client: "pg",
  connection: DB
});

async function getUser() {
  const user = await knex("users")
    .where({
      user_name: "admin",
      password: "mac"
    })
    .select("*");
  console.log(user[0].password);
}

getUser();
