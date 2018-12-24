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
const bcrypt = require("bcrypt");

const generateInitialSchema = async () => {
  // Create a table
  await knex.schema
    .createTable("users", function(table) {
      table.increments("id");
      table.string("user_name");
      table.string("first_name");
      table.string("last_name");
      table.string("email");
      table.string("twitter_url");
      table.string("facebook_url");
      table.string("linkedin_url");
      table.string("instagram_url");
      table.string("youtube_url");
      table.string("password");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("deleted_at");
      table.timestamp("last_login");
    })

    // Then set email to unique
    .then(() => {
      return knex.schema.alterTable("users", t => {
        t.unique("email");
        t.unique("user_name");
      });
    })

    // Then query the table...
    .then(() => {
      const hash = bcrypt.hashSync("macCMS", 10);
      return knex("users")
        .returning("id")
        .insert({
          user_name: "admin",
          first_name: "Delete",
          last_name: "Me!",
          email: "nouser@example.com",
          password: hash
        });
    })

    // Then select user
    .then(function() {
      return knex("users").select("*");
    })

    // map over results
    .map(function(row) {
      return console.log(row);
    })

    .catch(function(e) {
      console.error(e);
      process.exit(1);
    });

  console.log("User Table and Admin Generated Successfully");
  return process.exit();
};

generateInitialSchema();
