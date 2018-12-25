// @flow
const DB =
  process.env.DATABASE_URL ||
  "postgres://lecmwkvvigimya:68ab7997e91d6bfe136b26664d17f80bfc81e3320330728f65b64104c8a36e29@ec2-54-235-247-209.compute-1.amazonaws.com:5432/dafi32r5igglia";
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const express = require("express");

/**
 * Setup our database connection
 */
var pg = require("pg");
pg.defaults.ssl = true;
const knex = require("knex")({
  client: "pg",
  connection: DB,
  debug: process.env.NODE_ENV === true ? true : false
});
const bcrypt = require("bcrypt");

const app = express();
const port = process.env.PORT || 3005;

app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set("view engine", "pug");

/**
 * Setup Passport Authentication
 */
passport.use(
  new LocalStrategy(async function(username, password, done) {
    await knex("users")
      .where({ username: username })
      .select("*")
      .then(response => {
        bcrypt.compare(password, response[0].password, (err, result) => {
          if (result) {
            return done(null, response[0]);
          } else {
            return done(null, false, { message: "Incorrect Password" });
          }
        });
      })
      .catch(err => done(err));
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  const user = await knex("users")
    .where({ id: id })
    .select("*");
  return done(null, user);
});

/**
 * Render the front end of the site, can be pug, react, whatever.
 */
app.get("/", (req, res) => res.render("index"));

/**
 * Render Login screen (no express render for this, handled by react router?)
 */
// app.get("/mac-cms/login", (req, res) => res.render("login")); // TODO: Add check if user is logged in, if so kick them to admin

/**
 * POST login handling
 */
app.post(
  "/mac-cms/login",
  passport.authenticate("local", {
    failureRedirect: "/mac-cms/login",
    failureFlash: "Error logging in!"
  }),
  function(req, res) {
    return res.redirect("/mac-cms");
  }
);

/**
 * Mac CMS Admin Route
 */
app.get("/mac-cms", (req, res) => {
  // if no user is logged in kick them to the login screen
  if (!req.user) {
    return res.redirect("/mac-cms/login");
  }
  return res.render("admin", {
    user: req.user[0]
  });
});

/**
 * Logout Route Handler
 */
app.get("/mac-cms/logout", function(req, res) {
  req.logout();
  res.redirect("/mac-cms/login");
});

app.listen(port, () => console.log(`MacCMS is running on port ${port}`));
