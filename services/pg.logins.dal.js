const dal = require("./marthasgoodeats_db");

// Get all logins
var getLogins = function () {
  if (DEBUG) console.log("pg.dal.getLogins()");
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM public."logins" ORDER BY id ASC LIMIT 10`;
    dal.query(sql, [], (err, result) => {
      if (err) {
        // log this error to error log
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        if (DEBUG) console.table(`Row count: ${result.rowCount}`);
        resolve(result.rows);
      }
    });
  });
};

// Get login by id
var getLoginById = function (id) {
  if (DEBUG) console.log("pg.dal.getLoginById()");
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM public."logins" WHERE id = $1`;
    dal.query(sql, [id], (err, result) => {
      if (err) {
        // log this error to error log
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows[0]);
      }
    });
  });
};

// Create login
var createLogin = function (username, password) {
  if (DEBUG) console.log("pg.dal.createLogin()");
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO public."logins" (email, password) VALUES ($1, $2)`;
    dal.query(sql, [email, password], (err, result) => {
      if (err) {
        // log this error to error log
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Update login
var patchLogin = function (id, username, password) {
  if (DEBUG) console.log("logins.pg.dal.patchLogin()");
  return new Promise((resolve, reject) => {
    const sql = `UPDATE public."logins" SET username = $2, password = $3 WHERE id = $1`;
    dal.query(sql, [username, password, id], (err, result) => {
      if (err) {
        // log this error to error log
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Delete login
var deleteLogin = function (id) {
  if (DEBUG) console.log("pg.dal.deleteLogin()");
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM public."logins" WHERE id = $1`;
    dal.query(sql, [id], (err, result) => {
      if (err) {
        // log this error to error log
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  getLogins,
  getLoginById,
  createLogin,
  patchLogin,
  deleteLogin,
};
