const express = require("express");
const methodOverride = require("method-override");
const app = express();
const port = 3000;

global.DEBUG = true;

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/index"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  res.render("items", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

const itemsRouter = require("./routes/items");
app.use("/items", itemsRouter);

const loginsRouter = require("./routes/logins");
app.use("/logins", loginsRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
