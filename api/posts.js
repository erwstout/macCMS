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
  // const post = pickBy(req.body, indentity);
  // const posts = await db
  // .knex('posts')
  console.log(req.body);
};
