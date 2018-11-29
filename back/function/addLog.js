const formatLog = require("./formatLog");
const fs = require("fs");

const addLog = (error, type) => {
  const responseErrorLog = formatLog(error, type);
  fs.appendFile(`log/${type}.log`, responseErrorLog, "utf8", err => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = addLog;
