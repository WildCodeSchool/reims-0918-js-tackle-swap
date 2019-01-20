const express = require("express");
const router = express.Router();
const bddQuery = require("../function/bddQuery");
const sendResponse = require("../function/sendResponse");
const passport = require("passport");

router.post(
  "/propositionExchange/:id_article",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id_article = req.params.id_article;
    const user = req.user;
    const ownerArticleRaw = await bddQuery(
      `SELECT a.owner_id, u.nickname, a.name FROM articles AS a JOIN users AS u ON u.id = a.owner_id WHERE a.id = ?`,
      [id_article]
    );
    if (ownerArticleRaw.err) {
      return sendResponse(res, 200, "error", {
        type: "error",
        message:
          "Une erreur est survenu, si cela persiste merci de contacter l'administrateur."
      });
    }
    if (ownerArticleRaw.results.length === 0) {
      return sendResponse(res, 200, "error", {
        type: "warning",
        message:
          "L'article pour lequel vous souhaitez faire un échange n'existe pas."
      });
    }
    const infoOwnerArticle = ownerArticleRaw.results[0];
    const columnRequest =
      "message,room,sender,recipient,id_article,information";
    const requestSendMessageOffer = [
      `Votre demande d'échange a bien été trasmise à [BOLD]${
        infoOwnerArticle.nickname
      }[/BOLD], propriétaire de l'article. \n Voir le détail de l'échange : DETAIL`,
      `${id_article}-${infoOwnerArticle.owner_id}-${user.id}`,
      infoOwnerArticle.owner_id,
      user.id,
      id_article,
      1
    ];
    const requestSendMessageAnnonce = [
      `Vous avez reçu une demande d'échange pour l'article [BOLD]${
        infoOwnerArticle.name
      }[/BOLD] de la part de [BOLD]${
        user.nickname
      }[/BOLD]. \n Voir le détail de l'échange : DETAIL`,
      `${id_article}-${infoOwnerArticle.owner_id}-${user.id}`,
      user.id,
      infoOwnerArticle.owner_id,
      id_article,
      1
    ];
    const sendMessageRaw = await bddQuery(
      `INSERT INTO private_messages (${columnRequest}) VALUES (?),(?)`,
      [requestSendMessageAnnonce, requestSendMessageOffer]
    );
    res.json({
      messge: "ok send",
      sendMessageRaw,
      ownerArticleRaw,
      requestSendMessageOffer,
      requestSendMessageAnnonce
    });
  }
);

module.exports = router;
