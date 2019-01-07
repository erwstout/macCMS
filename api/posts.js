// @flow
const db = require("../util/db");
const pickBy = require("lodash/pickBy");
const identity = require("lodash/identity");

/**
 * Get ALL Posts, except deleted {@private}
 */
exports.getAllPosts = async (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  const posts = await db
    .knex("posts")
    .whereNull("deleted_at")
    .select("*");
  return res.status(200).json(posts);
};

/**
 * Create a post {@private}
 */
exports.createPost = async (req, res) => {
  await db.knex("posts").insert(req.body);
  return res.sendStatus(201);
};

/**
 * Delete a post {@private}
 */
exports.deletePost = async (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  await db
    .knex("posts")
    .where("id", "=", req.params.id)
    .update({ deleted_at: db.knex.fn.now() })
    .catch(err => {
      console.error("Error deleting post", err);
      return res.sendStatus(500);
    });
  return res.sendStatus(200);
};
