const sendResponse = (res, number, type, response) => {
  return res.status(number).json({
    type,
    response
  });
};

module.exports = sendResponse;
