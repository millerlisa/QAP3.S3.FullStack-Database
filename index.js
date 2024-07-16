const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const apiRoutes = require("./routes/api");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
