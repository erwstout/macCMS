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

const generateInitialSchema = async () => {
  // Create a table
  await knex.schema
    .createTable("posts", function(table) {
      table.increments("id").unique();
      table
        .integer("author")
        .unsigned()
        .notNullable();
      table.string("title");
      table.string("status");
      table.string("content");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at");
      table.timestamp("published_at");

      table
        .foreign("author")
        .references("id")
        .inTable("users");
    })

    // Then query the table...
    .then(() => {
      return knex("posts")
        .returning("id")
        .insert({
          title: "A Demo Post",
          author: 0,
          status: "published",
          content: "Lorem ipsum dolor sit amet!",
        });
    })

    // Then select posts
    .then(function() {
      return knex("posts").select("*");
    })

    // map over results
    .map(function(row) {
      /* eslint-disable-next-line */
      return console.log(row);
    })

    .catch(function(e) {
      /* eslint-disable-next-line */
      console.error(e);
      process.exit(1);
    });
  /* eslint-disable-next-line */
  console.log("Posts table created successfully");
  return process.exit();
};

generateInitialSchema();
