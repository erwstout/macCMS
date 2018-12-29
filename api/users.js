// @flow
const db = require("../util/db");
const pickBy = require("lodash/pickBy");
const identity = require("lodash/identity");
const bcrypt = require("bcrypt");

const defaultColumns = [
  "id",
  "username",
  "user_type",
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

// get all deleted users
exports.getDeletedUsers = async (req, res) => {
  const users = await db
    .knex("users")
    .columns(defaultColumns)
    .whereNotNull("deleted_at")
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

// permanently delete a user from the database
exports.permanentDeleteUser = async (req, res) => {
  await db
    .knex("users")
    .where("id", "=", req.params.id)
    .del()
    .catch(err => {
      console.error("Error permanently deleting user", err);
      return res.status(500).send("Error permanently deleting user");
    });
  return res.sendStatus(200);
};

// restore a user
exports.restoreUser = async (req, res) => {
  await db
    .knex("users")
    .where("id", "=", req.params.id)
    .update({ deleted_at: null })
    .catch(err => {
      console.error("Error restoring user", err);
      return res.status(500).send("Error restoring user");
    });
  return res.sendStatus(200);
};

// create a user
exports.createUser = async (req, res) => {
  const user = pickBy(req.body, identity);
  const transformedUser = {};
  const generateHash = new Promise((resolve, reject) => {
    return bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });

  await generateHash
    .then(hash => (transformedUser.password = hash))
    .then(() =>
      Object.keys(user).map(key => {
        if (key !== "password") {
          transformedUser[key] = user[key];
        }
      })
    );

  await db.knex("users").insert(transformedUser);
  return res.sendStatus(201);
};

// update user last_login
exports.userLogin = async user => {
  return await db
    .knex("users")
    .where("id", "=", user.id)
    .update({ last_login: db.knex.fn.now() });
};
