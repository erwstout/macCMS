const Bundler = require("parcel-bundler");
const express = require("express");
const app = express();

const port = 3005;

/**
 * Parcel Bundler
 */
const adminFile = "./admin/index.js";
const adminOptions = {
  outDir: "./public",
  outFile: "admin.js"
};
const adminBundler = new Bundler(adminFile, adminOptions);

app.use(adminBundler.middleware());
app.use(express.static("public"));

app.set("view engine", "pug");

app.get("/mac-cms", (req, res) =>
  res.render("admin", { title: "MacCMS Admin" })
);

app.get("/mac-cms/*", (req, res) =>
  res.render("admin", { title: "MacCMS Admin" })
);

app.listen(port, () => console.log(`Mac is listening on port ${port}...`));
