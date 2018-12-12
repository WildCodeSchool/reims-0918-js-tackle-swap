const express = require("express");
const router = express.Router();
const connection = require("../conf");

const passport = require("passport");

router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const idUser = req.user.id;
    connection.query(
      "SELECT firstname, lastname, nickname from users WHERE id = ?",
      [idUser],
      (err, results) => {
        const user = results[0];
        if (err) {
          res
            .status(409)
            .send("La requête ne peut pas être traitée à l'état actuel");
        } else {
          console.log(user.firstname);
          res
            .status(200)
            .send(`Bonjour ${user.firstname}, bienvenue sur TackleSwap`);
        }
      }
    );
    // res.send(`authorized for user ${req.user.nickname} with id ${req.user.id}`);
  }
);

module.exports = router;
