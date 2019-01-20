const express = require("express");
const router = express.Router();
const bddQuery = require("../function/bddQuery");
const sendResponse = require("../function/sendResponse");
const passport = require("passport");

router.get(
  "/messages_not_read/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    return sendResponse(res, 200, "success", { messages_not_read: true });
  }
);

module.exports = router;
