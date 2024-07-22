const dal = require("./marthasgoodeats_db");

var getUsers = function () {
  if (DEBUG) console.log("users.pg.dal.getUsers()");
  return new Promise((resolve, reject) => {
    const sql = `SELECT user_id, firstName, lastName, email, username FROM public."Users" ORDER BY id ASC LIMIT 10`;
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

var getUserById = function (id) {
  if (DEBUG) console.log("users.pg.dal.getUserById()");
  return new Promise((resolve, reject) => {
    const sql = `SELECT user_id, firstName, lastName, email, username FROM public."Users" WHERE id = $1`;
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

var createUser = function (firstName, lastName, email, username) {
  if (DEBUG) console.log("users.pg.dal.createUser()");
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO public."Users" (firstName, lastName, email, username) VALUES ($1, $2, $3, $4)`;
    dal.query(sql, [firstName, lastName, email, username], (err, result) => {
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

var patchUser = function (id, firstName, lastName, email, username) {
  if (DEBUG) console.log("users.pg.dal.patchUser()");
  return new Promise((resolve, reject) => {
    const sql = `UPDATE public."Users" SET firstName = $2, lastName = $3, email = $4, username = $5 WHERE id = $1`;
    dal.query(
      sql,
      [firstName, lastName, email, username, id],
      (err, result) => {
        if (err) {
          // log this error to error log
          if (DEBUG) console.log(err);
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

var deleteUser = function (id) {
  if (DEBUG) console.log("users.pg.dal.deleteUser()");
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM public."Users" WHERE id = $1`;
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
  getUsers,
  getUserById,
  createUser,
  patchUser,
  deleteUser,
};
