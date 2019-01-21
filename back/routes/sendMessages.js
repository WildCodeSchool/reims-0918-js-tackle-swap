const express = require("express");
const router = express.Router();
const bddQuery = require("../function/bddQuery");
const sendResponse = require("../function/sendResponse");
const passport = require("passport");

router.post(
  "/propositionExchange/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id_article = req.body.id_article;
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
    const roomMessage = `${id_article}-${infoOwnerArticle.owner_id}-${user.id}`;
    const columnRequest =
      "message,room,sender,recipient,id_article,information";
    const requestSendMessageOffer = [
      `Votre demande d'échange a bien été trasmise à ${
        infoOwnerArticle.nickname
      }, propriétaire de l'article.`,
      roomMessage,
      infoOwnerArticle.owner_id,
      user.id,
      id_article,
      1
    ];
    const requestSendMessageAnnonce = [
      `Vous avez reçu une demande d'échange pour l'article ${
        infoOwnerArticle.name
      } de la part de ${user.nickname}.`,
      roomMessage,
      user.id,
      infoOwnerArticle.owner_id,
      id_article,
      1
    ];
    const sendMessageRaw = await bddQuery(
      `INSERT INTO private_messages (${columnRequest}) VALUES (?),(?)`,
      [requestSendMessageAnnonce, requestSendMessageOffer]
    );
    if (sendMessageRaw.err) {
      return sendResponse(res, 200, "error", {
        type: "error",
        message:
          "Une erreur est survenu, si cela persiste merci de contacter l'administrateur."
      });
    }

    return sendResponse(res, 200, "success", {
      room: roomMessage
    });
  }
);

router.post(
  "/accept_exchange/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id_article_annonce = req.body.id_article_annonce;
    const id_owner_offer = req.body.id_owner_offer;
    const ownerArticleRaw = await bddQuery(
      `SELECT a.owner_id, u.nickname, a.name FROM articles AS a JOIN users AS u ON u.id = a.owner_id WHERE a.id = ?`,
      [id_article_annonce]
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
          "L'article pour lequel vous souhaitez valider un échange n'existe pas."
      });
    }
    const infoOwnerArticle = ownerArticleRaw.results[0];
    const roomMessage = `${id_article_annonce}-${
      infoOwnerArticle.owner_id
    }-${id_owner_offer}`;

    const columnRequest =
      "message,room,sender,recipient,id_article,information";

    const requestSendMessageOffer = [
      `Votre demande d'échange a été acceptée. \n\nVous pouvez désormais finaliser l'échange.`,
      roomMessage,
      infoOwnerArticle.owner_id,
      id_owner_offer,
      id_article_annonce,
      1
    ];
    const requestSendMessageAnnonce = [
      `Vous avez accepté l'échange pour l'article ${
        infoOwnerArticle.name
      }. \n\nVous pouvez désormais finaliser l'échange.`,
      roomMessage,
      id_owner_offer,
      infoOwnerArticle.owner_id,
      id_article_annonce,
      1
    ];
    const sendMessageRaw = await bddQuery(
      `INSERT INTO private_messages (${columnRequest}) VALUES (?),(?)`,
      [requestSendMessageAnnonce, requestSendMessageOffer]
    );
    if (sendMessageRaw.err) {
      return sendResponse(res, 200, "error", {
        type: "error",
        message:
          "Une erreur est survenu, si cela persiste merci de contacter l'administrateur."
      });
    }

    return sendResponse(res, 200, "success", {
      room: roomMessage
    });
  }
);

router.post(
  "/refuse_exchange/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id_article_annonce = req.body.id_article_annonce;
    const id_owner_offer = req.body.id_owner_offer;
    const ownerArticleRaw = await bddQuery(
      `SELECT a.owner_id, u.nickname, a.name FROM articles AS a JOIN users AS u ON u.id = a.owner_id WHERE a.id = ?`,
      [id_article_annonce]
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
          "L'article pour lequel vous souhaitez valider un échange n'existe pas."
      });
    }
    const infoOwnerArticle = ownerArticleRaw.results[0];
    const roomMessage = `${id_article_annonce}-${
      infoOwnerArticle.owner_id
    }-${id_owner_offer}`;

    const columnRequest =
      "message,room,sender,recipient,id_article,information";

    const requestSendMessageOffer = [
      `Votre demande d'échange a été refusée.`,
      roomMessage,
      infoOwnerArticle.owner_id,
      id_owner_offer,
      id_article_annonce,
      1
    ];
    const requestSendMessageAnnonce = [
      `Vous avez refusé l'échange pour l'article ${infoOwnerArticle.name}.`,
      roomMessage,
      id_owner_offer,
      infoOwnerArticle.owner_id,
      id_article_annonce,
      1
    ];
    const sendMessageRaw = await bddQuery(
      `INSERT INTO private_messages (${columnRequest}) VALUES (?),(?)`,
      [requestSendMessageAnnonce, requestSendMessageOffer]
    );
    if (sendMessageRaw.err) {
      return sendResponse(res, 200, "error", {
        type: "error",
        message:
          "Une erreur est survenu, si cela persiste merci de contacter l'administrateur."
      });
    }

    return sendResponse(res, 200, "success", {
      room: roomMessage
    });
  }
);

module.exports = router;
