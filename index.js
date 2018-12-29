// @flow
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Bundler = require("parcel-bundler");
const bcrypt = require("bcrypt");
const users = require("./api/users");
const db = require("./util/db");
const express = require("express");
const api = require("./api/users");

const app = express();

const port = process.env.PORT || 3005;

/**
 * Parcel Bundler
 */
const adminFile = ["./admin/index.js", "./login/index.js"];
const adminOptions = {
  outDir: "./public"
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
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/**
 * Setup Passport Authentication
 */
passport.use(
  new LocalStrategy(async function(username, password, done) {
    await db
      .knex("users")
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
  const user = await db
    .knex("users")
    .where({ id: id })
    .select("*");
  return done(null, user);
});

/**
 *  login handling
 */
app.post(
  "/mac-cms/login",
  passport.authenticate("local", {
    failureRedirect: "/mac-cms/login",
    failureFlash: "Error logging in!"
  }),
  function(req, res) {
    api.userLogin(req.user);
    return res.redirect("/mac-cms");
  }
);

app.get("/mac-cms/login", (req, res) =>
  res.render("login", { title: "Login | MacCMS Admin" })
);

/**
 * Admin Route
 */
app.get("/mac-cms", (req, res) => {
  // if no user kick them to login screen
  if (!req.user) {
    return res.redirect("/mac-cms/login");
  }
  const reactProps = {
    user: req.user[0]
  };
  return res.render("admin", { title: "MacCMS Admin", props: reactProps });
});

/**
 * Logout Route Handler
 */
app.get("/mac-cms/logout", function(req, res) {
  req.logout();
  res.redirect("/mac-cms/login");
});

/**
 * API Routes
 */
// get users
app.get("/mac-cms/api/users", (req, res) => users.getAllUsers(req, res));

// get deleted users
app.get("/mac-cms/api/users/deleted", (req, res) =>
  users.getDeletedUsers(req, res)
);

// delete user
app.post("/mac-cms/api/users/delete/:id", (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  return users.deleteUser(req, res);
});

// permanently delete (remove) a user from the DB
app.post("/mac-cms/api/users/remove/:id", (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  return users.permanentDeleteUser(req, res);
});

// restore a user from deleted to active
app.post("/mac-cms/api/users/restore/:id", (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  return users.restoreUser(req, res);
});

// add user
app.post("/mac-cms/api/users/add", (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  return users.createUser(req, res);
});

/**
 * All other Admin Routes handled by React
 */

app.get("/mac-cms/*", (req, res) => {
  // if no user kick them to login screen
  if (!req.user) {
    return res.redirect("/mac-cms/login");
  }
  const reactProps = {
    user: req.user[0]
  };
  return res.render("admin", { title: "MacCMS Admin", props: reactProps });
});

/**
 * Express Listener
 */
app.listen(port, () => console.log(`Mac is listening on port ${port}...`));
