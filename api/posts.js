// @flow
const db = require("../util/db");
const pickBy = require("lodash/pickBy");
const identity = require("lodash/identity");

/**
 * Get All Published Posts
 */

/**
 * Create a post
 */
exports.createPost = async (req, res) => {
  await db.knex("posts").insert(req.body);
  return res.sendStatus(201);
};
