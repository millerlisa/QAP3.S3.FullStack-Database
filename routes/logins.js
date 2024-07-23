const express = require("express");
const router = require("express").Router();
const loginsDal = require("../services/pg.logins.dal");

router.get("/", async (req, res) => {
  try {
    let theLogins = await loginsDal.getLogins();
    if (DEBUG) console.table(theLogins);
    res.render("logins", { theLogins });
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Cannot Get Logins", status: 503 });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const aLogin = await loginsDal.getLoginByLoginId(req.params.id);
    if (aLogin.length === 0) {
      res.status(404).json({ message: "No Login record found", status: 404 });
    } else {
      res.render("login", { aLogin });
    }
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Cannot Get Login", status: 503 });
  }
});

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("logins.Delete: " + req.params.id);
  res.render("loginPatch.ejs", {
    username: req.query.username,
    password: req.query.password,
    id: req.params.id,
  });
});

router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("logins.Edit: " + req.params.id);
  res.render("loginPatch.ejs", {
    username: req.query.username,
    password: req.query.password,
    id: req.params.id,
  });
});

router.post("/", async (req, res) => {
  if (DEBUG) {
    console.log("logins.POST ");
  }
  try {
    await loginsDal.createLogin(req.body.username, req.body.password);
    res.redirect("/logins/");
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Cannot Create Login", status: 503 });
  }
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("logins.PATCH " + req.params.id);
  try {
    await loginsDal.patchLogin(
      req.params.id,
      req.body.username,
      req.body.password
    );
    res.redirect("/logins/");
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Cannot Update Login", status: 503 });
  }
});

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("logins.DELETE " + req.params.id);
  try {
    await loginsDal.deleteLogin(req.params.id);
    res.redirect("/logins/");
  } catch {
    // log this error to error log
    res.statusCode = 503;
    res.json({ message: "Server Error - Cannot Delete Login", status: 503 });
  }
});

module.exports = router;
