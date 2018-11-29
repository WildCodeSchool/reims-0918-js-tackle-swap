const { DateTime } = require("luxon");
const isError = (err, type) => {
  const date_log = DateTime.local().toFormat("dd-LL-yyyy");

  const response = `[${date_log}] :
  Type : ${type}
  Message : ${err}
  ----------------------------------\n\n`;
  return response;
};

module.exports = isError;
