// @flow
const db = require("../util/db");
const pickBy = require("lodash/pickBy");
const identity = require("lodash/identity");

const defaultColumns = [
  "id",
  "username",
  "first_name",
  "last_name",
  "email",
  "twitter_url",
  "instagram_url",
  "linkedin_url",
  "facebook_url",
  "youtube_url",
  "created_at",
  "deleted_at",
  "last_login",
  "profile_img"
];

// gets all active users
exports.getAllUsers = async (req, res) => {
  const users = await db
    .knex("users")
    .columns(defaultColumns)
    .whereNull("deleted_at")
    .select();
  return res.json(users);
};

// delete a user
exports.deleteUser = async (req, res) => {
  await db
    .knex("users")
    .where("id", "=", req.params.id)
    .update({ deleted_at: db.knex.fn.now() })
    .catch(err => {
      console.error("Error deleting user", err);
      return res.send("Error deleting user");
    });
  return res.sendStatus(200);
};

// create a user
exports.createUser = async (req, res) => {
  const user = pickBy(req.body, identity);
  await db.knex("users").insert(user);
  return res.sendStatus(201);
};
