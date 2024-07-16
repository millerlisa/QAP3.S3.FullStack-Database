const { Pool } = require("pg");
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});

// Display all items in the items table in ascending order
const getItems = async () => {
  const res = await pool.query("SELECT * FROM items ORDER BY id ASC");
  return res.rows;
};

// Add a new item to the items table
const addItem = async (name, description, price) => {
  const res = await pool.query(
    "INSERT INTO items (name, description, price) VALUES ($1, $2, $3) RETURNING *",
    [name, description, price]
  );
  return res.rows[0];
};

// Update an item in the items table
const updateItem = async (id, name, description, price) => {
  const res = await pool.query(
    "UPDATE items SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *",
    [name, description, price, id]
  );
  return res.rows[0];
};

// Delete an item from the items table
const deleteItem = async (id) => {
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
};

module.exports = { getItems, addItem, updateItem, deleteItem };
