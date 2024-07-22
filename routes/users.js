const express = require("express");
const router = express.Router();

// /users route
router.get("/", async (req, res) => {
  const theUsers = [
    { user_id: 1, first_name: "John", last_name: "Doe" },
    { user_id: 2, first_name: "Jane", last_name: "Smith" },
    { user_id: 3, first_name: "Bob", last_name: "Brown" },
  ];
  try {
    // let theLogins = await loginsDal.getUsers();
    if (DEBUG) console.table(theUsers);
    res.render("users", { theUsers });
  } catch {
    res.render("503");
  }
});

router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("user.Edit: " + req.params.id);
  res.render("userPatch.ejs", {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
    theId: req.params.id,
  });
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("users.PATCH: " + req.params.id);
  try {
    // await loginsDal.patchLogin(
    // 	req.params.id,
    // 	req.body.first_name,
    // 	req.body.last_name
    // );
    res.redirect("/users/");
  } catch {
    // log error to error log file
    res.render("503");
  }
});

module.exports = router;
