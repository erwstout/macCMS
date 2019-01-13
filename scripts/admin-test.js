if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

const DB = process.env.DATABASE_URL;

var pg = require("pg");
pg.defaults.ssl = true;
const knex = require("knex")({
  client: "pg",
  connection: DB,
});

async function getUser() {
  return await knex("users")
    .where({
      user_name: "admin",
      id: 1,
    })
    .select("*");
  /* eslint-disable-next-line */
  console.warn("Default Admin user still exists! Delete user immediately!");
}

getUser();
