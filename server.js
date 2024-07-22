const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const { Pool } = require("pg");
const itemRoutes = require("./routes/items");

const app = express();

// Load environment variables
// require("dotenv").config();

// Connect to the database
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "MarthasGoodEats",
  password: "Keyin2021",
  port: 5432,
});
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// });

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.json());
// app.post("/items", async (req, res) => {
//   const { name, description, price } = req.body;
//   if (!name || !description || !price) {
//     return res
//       .status(400)
//       .send("Name, description, and price fields are required.");
//   }
//   try {
//     const newItem = await insertItemIntoDatabase(name, description, price);
//     res.send(`New item created: ${newItem.name}`); // Or redirect, etc.
//   } catch (error) {
//     res.status(500).send("Server error creating item");
//   }
// });

// Routes
app.use("/items", itemRoutes(pool));

app.get("/", (req, res) => {
  res.redirect("/items");
});

app.get("/about", (req, res) => {
  res.redirect("/about");
});

// const PORT = process.env.PORT || 3000;
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
