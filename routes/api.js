const express = require("express");
const router = express.Router();

// Mock data
let items = [
  {
    id: 1,
    name: "Item 1",
    description: "Description 1",
    price: 9.99,
    created_at: new Date(),
  },
  {
    id: 2,
    name: "Item 2",
    description: "Description 2",
    price: 19.99,
    created_at: new Date(),
  },
  {
    id: 3,
    name: "Item 3",
    description: "Description 3",
    price: 29.99,
    created_at: new Date(),
  },
];

// Routes
router.get("/items", (req, res) => {
  res.json(items);
});

// Other routes here

module.exports = router;
