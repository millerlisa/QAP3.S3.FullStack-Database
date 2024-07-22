const express = require("express");
const router = express.Router();
const { getItems, addItem, updateItem, deleteItem } = require("../dal/dal");

// Mock data for testing
const mockItems = [
  { id: 1, name: "Pizza", description: "Cheese and pepperoni", price: 10.99 },
  { id: 2, name: "Burger", description: "Beef patty with cheese", price: 8.99 },
  { id: 3, name: "Salad", description: "Garden salad with ranch", price: 5.99 },
];

// Modified routes to use the mock data
// GET all items
router.get("/items", (req, res) => {
  res.json(mockItems);
});

// RESTful API routes
// GET all items
router.get("/items", async (req, res) => {
  const items = await getItems();
  res.json(items);
});

// POST new item
router.post("/items", async (req, res) => {
  const newItem = req.body;
  await addItem(newItem.name, newItem.description, newItem.price);
  res.status(201).json({ "Item added successfully": newItem });
});

// PUT update item
router.put("/items/:id", async (req, res) => {
  const id = req.params.id;
  const updatedItem = req.body;
  await updateItem(
    id,
    updateItem.name,
    updateItem.description,
    updateItem.price
  );
  res.json({ message: "Item updated successfully" });
});

// PATCH partial update item
router.patch("/items/:id", async (req, res) => {
  const id = req.params.id;
  const patchItem = req.body;
  patchItem(id, patchItem.name, patchItem.description, patchItem.price);
  res.json({ message: "Item patched successfully" });
});

// DELETE item
router.delete("/items/:id", async (req, res) => {
  const id = req.params.id;
  await deleteItem(id);
  res.json({ message: "Item deleted successfully" });
});

module.exports = router;
