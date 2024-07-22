var router = require("express").Router();
const usersDal = require("../../services/pg.users.dal");

// api/users
router.get("/", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/users GET " + req.url);
  try {
    let theUsers = await usersDal.getUsers();
    if (theUsers.length === 0) {
      res.status(404).json({ message: "No Users found", status: 404 });
    } else {
      res.json(theUsers);
    }
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Cannot Get Users", status: 503 });
  }
});

// api/users/:id
router.get("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/users/:id GET " + req.url);
  try {
    let aUser = await usersDal.getUserByUserId(req.params.id);
    if (aUser.length === 0) {
      res.statusCode = 404;
      res.json({ message: "No User found", status: 404 });
    } else {
      res.json(aUser);
    }
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Cannot Get User", status: 503 });
  }
});

module.exports = router;
