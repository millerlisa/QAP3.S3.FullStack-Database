const dal = require("./marthasgoodeats_db");

var getFullText = function (text) {
  if (DEBUG) console.log("pg.dal.getFullText()");
  return new Promise((resolve, reject) => {
    const sql = `SELECT name, price FROM items WHERE description iLike '%'||$1||'%' OR name iLike '%'||$1||'%'`;
    dal.query(sql, [text], (err, result) => {
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

module.exports = { getFullText };
