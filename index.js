const DB =
  process.env.DATABASE_URL ||
  "postgres://lecmwkvvigimya:68ab7997e91d6bfe136b26664d17f80bfc81e3320330728f65b64104c8a36e29@ec2-54-235-247-209.compute-1.amazonaws.com:5432/dafi32r5igglia";
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Bundler = require("parcel-bundler");
const express = require("express");
const app = express();

const port = process.env.PORT || 3005;

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

/**
 * Parcel Bundler
 */
const adminFile = "./admin/index.js";
const adminOptions = {
  outDir: "./public",
  outFile: "admin.js"
};
const adminBundler = new Bundler(adminFile, adminOptions);

/**
 * Express Configs
 */
app.use(adminBundler.middleware());
app.use(express.static("public"));

app.set("view engine", "pug");
app.use(session({ secret: "macCMS" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

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
 * Admin Route
 */
app.get("/mac-cms", (req, res) => {
  // if no user kick them to login screen
  if (!req.user) {
    return res.redirect("/mac-cms/login");
  }
  return res.render("admin", { title: "MacCMS Admin", user: req.user[0] });
});

/**
 * Logout Route Handler
 */
app.get("/mac-cms/logout", function(req, res) {
  req.logout();
  res.redirect("/mac-cms/login");
});

/**
 * All other Admin Routes handled by React
 */
app.get("/mac-cms/*", (req, res) =>
  res.render("admin", { title: "MacCMS Admin" })
);

/**
 * Express Listener
 */
app.listen(port, () => console.log(`Mac is listening on port ${port}...`));
