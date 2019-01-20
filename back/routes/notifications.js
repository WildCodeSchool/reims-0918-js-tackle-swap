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

router.put(
  "/read_my_message/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id_user_connected = req.user.id;
    const room = req.body.room;

    const readMessageRaw = await bddQuery(
      "UPDATE private_messages SET not_read = 0 WHERE room = ? AND recipient = ?",
      [room, id_user_connected]
    );
    return sendResponse(res, 200, "success", {
      readMessageRaw,
      message: "message lu"
    });
  }
);

module.exports = router;
