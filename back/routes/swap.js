const express = require("express");
const router = express.Router();
const bddQuery = require("../function/bddQuery");
const sendResponse = require("../function/sendResponse");
const passport = require("passport");

router.put(
  "/accept_exchange/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const idAnnonce = parseInt(req.body.idAnnonce);
    const idOffer = parseInt(req.body.idOffer);
    const confirmationExchangeInArticles = await bddQuery(
      `UPDATE articles SET swap = 1 WHERE id = ${idAnnonce} OR id = ${idOffer}`
    );

    if (confirmationExchangeInArticles.err) {
      return sendResponse(res, 200, "error", {
        flashMessage: {
          message:
            "Un problème est survenu durant la connection à la base de donnée.",
          type: "error"
        }
      });
    }

    const confirmationExchangeInSwaps = await bddQuery(`
    UPDATE swaps SET accepted = 1
    WHERE id_article_annonce = ${idAnnonce} 
    AND id_article_offer = ${idOffer}`);

    if (confirmationExchangeInSwaps.err) {
      return sendResponse(res, 200, "error", {
        flashMessage: {
          message:
            "Un problème est survenu durant la connection à la base de donnée.",
          type: "error"
        }
      });
    }

    return sendResponse(res, 200, "success", {
      flashMessage: {
        message: "Vous avez accepté la proposition d'échange",
        type: "success"
      }
    });
  }
);

router.put(
  "/refuse_exchange/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const idAnnonce = parseInt(req.body.idAnnonce);
    const idOffer = parseInt(req.body.idOffer);

    const confirmationExchangeInSwaps = await bddQuery(`
    UPDATE swaps SET refused = 1
    WHERE id_article_annonce = ${idAnnonce} 
    AND id_article_offer = ${idOffer}`);

    if (confirmationExchangeInSwaps.err) {
      return sendResponse(res, 200, "error", {
        flashMessage: {
          message:
            "Un problème est survenu durant la connection à la base de donnée.",
          type: "error"
        }
      });
    }

    return sendResponse(res, 200, "success", {
      flashMessage: {
        message: "Vous avez refusé la proposition d'échange",
        type: "success"
      }
    });
  }
);

module.exports = router;
