// @flow
const DB = process.env.DATABASE_URL;
const pg = require("pg");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");

/**
 * Setup our DB connection
 */
pg.defaults.ssl = true;
const knex = require("knex")({
  client: "pg",
  connection: DB
});

/**
 * Check ENV and load .env if not on production
 */
if (process.env.NODE_ENV !== "production") {
  /* eslint-disable */
  require("dotenv").load();
  /* eslint-enable */
}

const app = express();
const port = 3005;

app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((username, password, cb) => {
    console.log(username);
    console.log(password);
    const user = knex("users")
      .where({
        user_name: username,
        password: password
      })
      .select("*")
      .catch(err => {
        console.error(err);
        return cb(err);
      });

    if (user) {
      bcrypt.compare(password, user[0].password, function(err, res) {
        if (res) {
          cb(null, user[0]);
        } else {
          cb(null, false);
        }
      });
    } else {
      cb(null, false);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, cb) => {
  const user = knex("users")
    .where({
      id: id
    })
    .select("*")
    .catch(err => {
      console.error(err);
      return cb(err);
    });

  cb(null, user[0]);
});

function loginHandler(req, res) {
  res.render("admin", { title: "Hey", message: "Hello there, admin!" });
}

app.post("/mac-cms/login", passport.authenticate("local"), (req, res) =>
  res.json(req.user)
);
app.get("/mac-cms/login", (req, res) => loginHandler(req, res));

app.get("/users", function(req, res) {
  res.json({ currentUser: req.user });
});

app.get("/", (req, res) =>
  res.render("admin", { title: "Hey", message: "Hello there!" })
);

app.listen(port, () => console.log(`MacCMS is running on port ${port}`));
