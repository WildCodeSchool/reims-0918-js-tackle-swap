const formatLog = require("./formatLog");
const fs = require("fs");

const addLog = (error, type, res) => {
  const responseErrorLog = formatLog(error, type);
  fs.appendFile("log/error-bdd.log", responseErrorLog, "utf8", err => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = addLog;
