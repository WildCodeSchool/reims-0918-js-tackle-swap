const express = require("express");
const router = express.Router();

const passport = require("passport");

router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(`authorized for user ${req.user.nickname} with id ${req.user.id}`);
  }
);

module.exports = router;
