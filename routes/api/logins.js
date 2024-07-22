var router = require("express").Router();
const loginsDal = require("../../services/pg.logins.dal");

// api/logins
router.get("/", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/logins GET " + req.url);
  try {
    let theLogins = await loginsDal.getLogins();
    if (theLogins.length == 0) {
      res.status(404).json({ message: "No Logins found", status: 404 });
    } else {
      res.json(theLogins);
    }
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Cannot Get Logins", status: 503 });
  }
});

// api/logins/:id
router.get("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/logins/:id GET " + req.url);
  try {
    let aLogin = await loginsDal.getLoginByLoginId(req.params.id);
    if (aLogin.length === 0) {
      res.statusCode = 404;
      res.json({ message: "No Login found", status: 404 });
    } else {
      res.json(aLogin);
    }
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Cannot Get Login", status: 503 });
  }
});

router.post("/", async (req, res) => {
  if (DEBUG) {
    console.log("ROUTE: /api/logins POST ");
  }
  try {
    await loginsDal.createLogin(req.bodyusername, req.body.password);
    res.json({ message: "Login created", status: 201 });
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Cannot Create Login", status: 503 });
  }
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/logins PATCH " + req.params.id);
  try {
    await loginsDal.patchLogin(
      req.params.id,
      req.body.username,
      req.body.password
    );
    res.statusCode = 200;
    res.json({ message: "OK. Login updated", status: 201 });
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Login Not Updated", status: 503 });
  }
});

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/logins DELETE " + req.params.id);
  try {
    await loginsDal.deleteLogin(req.params.id);
    res.statusCode = 200;
    res.json({ message: "Login deleted", status: 200 });
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Login Not Deleted", status: 503 });
  }
});

module.exports = router;
