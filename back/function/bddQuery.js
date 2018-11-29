const connection = require("../conf");
const bddQuery = (requestSql, params = []) => {
  return new Promise(resolve => {
    connection.query(requestSql, (err, results) => {
      resolve({ err, results });
    });
  });
};

module.exports = bddQuery;
