// @flow
const db = require("../util/db");

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
