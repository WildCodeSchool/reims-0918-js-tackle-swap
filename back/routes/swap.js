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

router.get(
  "/in_progress_message/:id_article/:id_offer",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id_article = parseInt(req.params.id_article);
    const id_offer = parseInt(req.params.id_offer);

    const swapInProgressRaw = await bddQuery(
      "SELECT s.id AS id_swap, s.*, a.* FROM swaps AS s JOIN articles AS a ON s.id_article_offer = a.id WHERE s.id_article_annonce = ? AND a.owner_id = ?",
      [id_article, id_offer]
    );

    if (swapInProgressRaw.err) {
      return sendResponse(res, 200, "error", {
        flashMessage: {
          message:
            "Un problème est survenu durant la connection à la base de donnée.",
          type: "error"
        }
      });
    }

    return sendResponse(res, 200, "success", swapInProgressRaw.results);
  }
);

module.exports = router;
