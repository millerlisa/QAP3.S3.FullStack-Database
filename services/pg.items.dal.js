const dal = require("./marthasgoodeats_db");

// get all items
var getItems = function () {
  if (DEBUG) console.log("items.pg.dal.getItems()");
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT item_id AS _id, name, description, price FROM items ORDER BY item_id ASC LIMIT 10";
    dal.query(sql, [], (err, result) => {
      if (err) {
        // log this error to error log
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// get item by item_id
var getItemByItemId = function (id) {
  if (DEBUG) console.log("items.pg.dal.getItemByItemId()");
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT item_id AS _id, name, description, price FROM items WHERE item_id = $1";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        // log this error to error log
        reject(err);
      } else {
        resolve(result.rows[0]);
      }
    });
  });
};

// create item
var createItem = function (name, description, price) {
  if (DEBUG) console.log("items.pg.dal.createItem()");
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO public.items (name, description, price) VALUES ($1, $2, $3)";
    dal.query(sql, [name, description, price], (err, result) => {
      if (err) {
        // log this error to error log
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

var putItem = function (id, name, description, price) {
  if (DEBUG) console.log("items.pg.dal.putItem()");
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE public.items SET name = $2, description = $3, price = $4 WHERE item_id = $1";
    dal.query(sql, [name, description, price, id], (err, result) => {
      if (err) {
        // log this error to error log
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

var patchItem = function (id, name, description, price) {
  if (DEBUG) console.log("items.pg.dal.patchItem()");
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE public.items SET name = $2, description = $3, price = $4 WHERE item_id = $1";
    dal.query(sql, [name, description, price, id], (err, result) => {
      if (err) {
        // log this error to error log
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

var deleteItem = function (id) {
  if (DEBUG) console.log("items.pg.dal.deleteItem()");
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM public.items WHERE item_id = $1";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        // log this error to error log
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  getItems,
  getItemByItemId,
  createItem,
  putItem,
  patchItem,
  deleteItem,
};
