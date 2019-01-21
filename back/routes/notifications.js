const express = require("express");
const router = express.Router();
const bddQuery = require("../function/bddQuery");
const sendResponse = require("../function/sendResponse");
const passport = require("passport");

router.get(
  "/messages_not_read/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id_user = req.user.id;
    const countMessageNotReadRaw = await bddQuery(
      "SELECT count(*) AS count FROM private_messages WHERE recipient = ? AND not_read = true",
      [id_user]
    );
    if (countMessageNotReadRaw.err) {
      return sendResponse(res, 200, "error", {
        type: "error",
        message:
          "Une erreur est survenu, si cela persiste merci de contacter l'administrateur."
      });
    }
    const numberNotRead = countMessageNotReadRaw.results[0].count;
    return sendResponse(res, 200, "success", numberNotRead);
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

    if (readMessageRaw.err) {
      return sendResponse(res, 200, "error", {
        type: "error",
        message:
          "Une erreur est survenu, si cela persiste merci de contacter l'administrateur."
      });
    }
    return sendResponse(res, 200, "success", {
      readMessageRaw,
      message: "message lu"
    });
  }
);

module.exports = router;
