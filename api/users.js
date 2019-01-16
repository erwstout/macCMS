// @flow
const db = require("../util/db");
const pickBy = require("lodash/pickBy");
const identity = require("lodash/identity");
const bcrypt = require("bcrypt");

import type { $Req, $Res } from "flow/types";

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
  "profile_img",
];

// gets all active users
exports.getAllUsers = async (req: $Req, res: $Res) => {
  const users = await db
    .knex("users")
    .columns(defaultColumns)
    .whereNull("deleted_at")
    .select();
  return res.status(200).json(users);
};

// get all deleted users
exports.getDeletedUsers = async (req: $Req, res: $Res) => {
  const users = await db
    .knex("users")
    .columns(defaultColumns)
    .whereNotNull("deleted_at")
    .select();
  return res.status(200).json(users);
};

// delete a user
exports.deleteUser = async (req: $Req, res: $Res) => {
  await db
    .knex("users")
    .where("id", "=", req.params.id)
    .update({ deleted_at: db.knex.fn.now() })
    .catch((err) => {
      /* eslint-disable-next-line */
      console.error("Error deleting user", err);
      return res.status(500).send("Error deleting user"); //TODO: Handle this error better
    });
  return res.sendStatus(200);
};

// permanently delete a user from the database
exports.permanentDeleteUser = async (req: $Req, res: $Res) => {
  await db
    .knex("users")
    .where("id", "=", req.params.id)
    .del()
    .catch((err) => {
      /* eslint-disable-next-line */
      console.error("Error permanently deleting user", err);
      return res.status(500).send("Error permanently deleting user");
    });
  return res.sendStatus(200);
};

// restore a user
exports.restoreUser = async (req: $Req, res: $Res) => {
  await db
    .knex("users")
    .where("id", "=", req.params.id)
    .update({ deleted_at: null })
    .catch((err) => {
      /* eslint-disable-next-line */
      console.error("Error restoring user", err);
      return res.status(500).send("Error restoring user");
    });
  return res.sendStatus(200);
};

// create a user
exports.createUser = async (req: $Req, res: $Res) => {
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
    .then((hash) => (transformedUser.password = hash))
    .then(() =>
      Object.keys(user).map((key) => {
        if (key !== "password") {
          transformedUser[key] = user[key];
        }
      })
    );

  await db.knex("users").insert(transformedUser);
  return res.sendStatus(201);
};

// update user last_login
exports.userLogin = async (user) => {
  return await db
    .knex("users")
    .where("id", "=", user.id)
    .update({ last_login: db.knex.fn.now() });
};

// update a user record
exports.userUpdate = async (req: $Req, res: $Res) => {
  const user = req.body;
  const values = {};

  const transformValues = new Promise((resolve, reject) => {
    if (!user) {
      reject("No user found to update");
    }

    Object.keys(user).map((key) => {
      if (user[key] === "") {
        values[key] = null;
      } else {
        values[key] = user[key];
      }
    });

    resolve(values);
  });

  transformValues
    .then((values) =>
      db
        .knex("users")
        .where({ id: req.body.id })
        .update(values)
        .catch((err) => res.status(500).send(err))
    )
    .then(() => res.sendStatus(202))
    .catch((err) => res.status(500).send(err));
};

// change user password
exports.changePassword = async (req: $Req, res: $Res) => {
  if (!req.body || !req.body.id) {
    /* eslint-disable-next-line */
    console.error(
      "No body data found, or no current user ID to update password"
    );
    return res.sendStatus("500");
  }

  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const currentHash = await db
    .knex("users")
    .where({ id: req.body.id })
    .select("password")
    .catch((err) => {
      /* eslint-disable-next-line */
      console.error("Error getting current password", err);
      return res.status(500).send(err);
    });

  const match = await bcrypt.compare(currentPassword, currentHash[0].password);

  if (match) {
    await bcrypt.hash(newPassword, 10, (err, hash) => {
      if (err) {
        /* eslint-disable-next-line */
        console.error("Error hashing new password", err);
      }
      db.knex("users")
        .where({ id: req.body.id })
        .update({ password: hash })
        .then(() => res.sendStatus(202))
        .catch((err) => {
          /* eslint-disable-next-line */
          console.error("Error saving new password to database", err);
          return res.sendStatus(500);
        });
    });
  } else {
    return res.sendStatus(401);
  }
};
