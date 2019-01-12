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
 * Get Published Posts {@public}
 */
exports.getPublishedPosts = async (req, res) => {
  const posts = await db
    .knex("posts")
    .where({ status: "published", deleted_at: null });
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

/**
 * Permanently Delete a Post from the DB
 */
exports.removePost = async (req, res) => {
  await db
    .knex("posts")
    .where("id", "=", req.params.id)
    .del()
    .catch(err => {
      console.error("Error permanently deleting post", err);
      return res.status(500).send("Error permanently deleting post");
    });
  return res.sendStatus(200);
};

/**
 * Restore A Post
 */
exports.restorePost = async (req, res) => {
  await db
    .knex("posts")
    .where("id", "=", req.params.id)
    .update({ deleted_at: null })
    .catch(err => {
      console.error("Error restoring post", err);
      return res.status(500).send("Error restoring post");
    });
  return res.sendStatus(200);
};

/**
 * Get Deleted Posts
 */
exports.deletedPosts = async (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  const posts = await db
    .knex("posts")
    .whereNotNull("deleted_at")
    .select("*");
  return res.status(200).json(posts);
};
