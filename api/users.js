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
  return res.send(200);
};
