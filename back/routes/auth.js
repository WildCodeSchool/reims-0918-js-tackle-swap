const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post("/login", function(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).send({
        message: "Something is not right",
        user: user
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, "your_jwt_secret");
      return res.json({
        user,
        token,
        flashMessage: { message: "Vous êtes bien connecté", type: "success" }
      });
    });
  })(req, res);
});

module.exports = router;
