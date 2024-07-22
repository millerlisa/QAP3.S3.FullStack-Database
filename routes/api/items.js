var router = require("express").Router();
const itemsDal = require("../services/p.items.dal");

// api/items
router.get("/", async (req, res) => {
  if (DEBUG) console.log("Router: /api/items/ GET " + req.url);
  try {
    let theItems = await itemsDal.getItems();
    res.json(theItems);
  } catch {
    // log this error to error log file
    res.statusCode = 503;
    res.json({ message: "Service Unavailable - Items Not Found", status: 503 });
  }
});

// api/items/:id
router.get("/:id", async (req, res) => {
  if (DEBUG) console.log("Router: /api/items/:id GET " + req.url);
  try {
    let anItem = await itemsDal.getItem(req.params.id);
    if (anItem.length === 0) {
      // log this error to error log file
      res.statusCode = 404;
      res.json({ message: "Not Found", status: 404 });
    }
    res.json(anItem);
  } catch {
    // log this error to error log file
    res.statusCode = 503;
    res.json({ message: "Service Unavailable - Item Not Found", status: 503 });
  }
});

router.post("/", async (req, res) => {
  if (DEBUG) {
    console.log("Route: /api/items/ POST ");
  }
  try {
    await itemsDal.addItem(req.body.name, req.body.description, req.body.price);
    res.statusCode = 201;
    res.json({ message: "Item created", status: 201 });
  } catch {
    // log this error to error log file
    res.statusCode = 503;
    res.json({
      message: "Service Unavailable - Item not created",
      status: 503,
    });
  }
});

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("Route: /api/items/ PUT " + req.params.id);
  try {
    await itemsDal.putItem(
      req.params.id,
      req.body.name,
      req.body.description,
      req.body.price
    );
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    // log this error to error log file
    res.statusCode = 503;
    res.json({
      message: "Service Unavailable - Item Not Updated",
      status: 503,
    });
  }
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("Route: /api/items/ PATCH " + req.params.id);
  try {
    await itemsDal.patchItem(
      req.params.id,
      req.body.name,
      req.body.description,
      req.body.price
    );
    res.statusCode = 200;
    res.json({ message: "Item Patched", status: 200 });
  } catch {
    // log this error to error log file
    res.statusCode = 503;
    res.json({
      message: "Service Unavailable - Item Not Patched",
      status: 503,
    });
  }
});

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("Route: /api/items/ DELETE " + req.params.id);
  try {
    await itemsDal.deleteItem(req.params.id);
    res.statusCode = 200;
    res.json({ message: "Item Deleted", status: 200 });
  } catch {
    // log this error to error log file
    res.statusCode = 503;
    res.json({
      message: "Service Unavailable - Item Not Deleted",
      status: 503,
    });
  }
});

module.exports = router;
