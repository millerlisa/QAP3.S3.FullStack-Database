const express = require("express");
const router = express.Router();
const itemsDal = require("../services/pg.items.dal");

// http://localhost:3000/items
router.get("/", async (req, res) => {
  try {
    let theItems = await itemsDal.getItems();
    if (DEBUG) console.log(theItems);
    res.render("items", { theItems });
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Cannot Get Items", status: 503 });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const anItem = await itemsDal.getItemByItemId(req.params.id);
    if (DEBUG) console.log(`items.router.get/:id ${anItem}`);
    if (anItem) {
      res.json({ anItem });
    } else {
      res.status(404).json({ message: "No Item found", status: 404 });
    }
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Cannot Get Item", status: 503 });
  }
});

router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("items.Replace: " + req.params.id);
  res.render("itemPUT.ejs", {
    name: req.query.name,
    description: req.query.description,
    price: req.query.price,
    id: req.params.id,
  });
});

// http://localhost:3000/items/888/edit
router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("item.Edit: " + req.params.id);
  res.render("itemPatch.ejs", {
    name: req.query.name,
    description: req.query.description,
    price: req.query.price,
    id: req.params.id,
  });
});

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("items.Delete: " + req.params.id);
  res.render("itemDelete.ejs", {
    name: req.query.name,
    description: req.query.description,
    price: req.query.price,
    id: req.params.id,
  });
});

router.post("/", async (req, res) => {
  if (DEBUG) console.log("items.POST");
  try {
    await itemsDal.createItem(
      req.body.name,
      req.body.description,
      req.body.price
    );
    res.redirect("/items/");
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Cannot Create Item", status: 503 });
  }
});

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("items.PUT " + req.params.id);
  try {
    await itemsDal.putItem(
      req.params.id,
      req.body.name,
      req.body.description,
      req.body.price
    );
    res.redirect("/items/");
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Item Not Updated", status: 503 });
  }
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("items.PATCH " + req.params.id);
  try {
    await itemsDal.patchItem(
      req.params.id,
      req.body.name,
      req.body.description,
      req.body.price
    );
    res.redirect("/items/");
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Item Not Updated", status: 503 });
  }
});

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("items.DELETE " + req.params.id);
  try {
    await itemsDal.deleteItem(req.params.id);
    res.redirect("/items/");
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Item Not Deleted", status: 503 });
  }
});

module.exports = router;
