require("dotenv").config();
const express = require("express");
const http = require("http");

const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const connection = require("./conf");
const port = 5050;
const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("./routes/auth");
const passport = require("passport");
const fileUpload = require("express-fileupload");

const defineLimit = require("./function/defineLimit");
const bddQuery = require("./function/bddQuery");
const addLog = require("./function/addLog");
const sendResponse = require("./function/sendResponse");

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 1000000
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true
  })
);
app.use("/data", express.static(__dirname + "/data"));
require("./passport-strategy");

app.use(cors());
app.use(express.static("public"));
app.use("/auth", auth);

const socketIo = require("./socket-io");
socketIo(io, app);

app.get(
  "/personnal-informations",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    return sendResponse(res, 200, "success", req.user);
  }
);

app.post("/user", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO users SET ?", formData, (err, results) => {
    if (err) {
      console.log(err);
      res
        .status(409)
        .send("La requête ne peut pas être traitée à l'état actuel");
    } else {
      res.status(200).json({
        flashMessage: {
          message: "Vous êtes maintenant inscrit sur le site.",
          type: "success"
        }
      });
    }
  });
});

app.put("/users/:id", (req, res) => {
  const idUser = req.params.id;
  const formData = req.body;
  connection.query(
    "UPDATE users SET ? WHERE id = ?",
    [formData, idUser],
    err => {
      if (err) {
        console.log(err);
        res
          .status(409)
          .send("La requête ne peut pas être traitée à l'état actuel");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// Return List Articles, with pagination
app.get("/articles", async (req, res) => {
  const numberArticlesPerPage = 20;

  const search = req.query.s;
  const rawMaxPages = await bddQuery(
    `SELECT COUNT(*) AS count FROM articles WHERE online = true ${
      search
        ? `AND (name LIKE '%${search}%' OR description LIKE '%${search}%')`
        : ""
    }`
  );

  if (rawMaxPages.err) {
    addLog(rawMaxPages.err, "error-bdd");
    sendResponse(
      res,
      409,
      "error",
      "Erreur avec la base de donnée, veuillez contacter un administrateur"
    );
  }

  const totalArticles = rawMaxPages.results[0].count;
  const maxPages = Math.ceil(totalArticles / numberArticlesPerPage);
  const requestPage = parseInt(req.query.page);
  const pageCalled =
    requestPage && requestPage >= 1
      ? requestPage <= maxPages
        ? requestPage
        : maxPages
      : 1;
  const limit = defineLimit(pageCalled, numberArticlesPerPage);
  const rawResponseApi = await bddQuery(
    `SELECT id, name FROM articles WHERE online = true ${
      search
        ? `AND (name LIKE '%${search}%' OR description LIKE '%${search}%')`
        : ""
    }ORDER BY id LIMIT ${limit}`
  );

  if (rawMaxPages.err) {
    addLog(rawMaxPages.err, "error-bdd");
    sendResponse(
      res,
      409,
      "error",
      "Erreur avec la base de donnée, veuillez contacter un administrateur"
    );
  }
  const articles = rawResponseApi.results;
  if (articles.length === 0) {
    return sendResponse(res, 200, "success", { articles: [] });
  }
  const rawArticlesPictures = await bddQuery(
    `SELECT article_id, url_picture, main_picture FROM pictures_articles WHERE article_id BETWEEN ${
      articles[0].id
    } AND ${articles[articles.length - 1].id}`
  );

  // create object with ID for keys to group picture by id
  const groupPicturesById = rawArticlesPictures.results.reduce((acc, obj) => {
    const cle = obj["article_id"];
    if (!acc[cle]) {
      acc[cle] = [{ mainIsDefine: false }];
    }
    acc[cle] = [
      ...acc[cle],
      { url_picture: obj.url_picture, main_picture: obj.main_picture }
    ];
    if (obj.main_picture) {
      acc[cle][0].mainIsDefine = true;
    }
    return acc;
  }, {});

  const keyPictures = Object.keys(groupPicturesById);

  // create object array with object array for pictures
  const articlesResult = articles.reduce((acc, obj) => {
    const currentId = obj.id;

    if (keyPictures.includes(currentId.toString())) {
      const mainIsDefine = groupPicturesById[currentId][0].mainIsDefine;
      groupPicturesById[currentId].shift();
      if (!mainIsDefine) {
        groupPicturesById[currentId][0].main_picture = 1;
      }
      obj.pictures = groupPicturesById[currentId];
    } else {
      obj.pictures = [
        {
          url_picture: "/data/pictures_articles/logo_poisson.svg",
          main_picture: 1
        }
      ];
    }
    acc = [...acc, obj];
    return acc;
  }, []);

  const nextPage =
    pageCalled * numberArticlesPerPage < totalArticles ? true : false;
  const responseApi = {
    articles: articlesResult,
    pagination: {
      activePage: pageCalled,
      numberArticlesPerPage: numberArticlesPerPage,
      totalArticles,
      nextPage
    }
  };
  sendResponse(res, 200, "success", responseApi);
});

// Return Article Details, selected with his id
app.get("/article/:id/", async (req, res) => {
  const idArticle = [req.params.id];

  const rawIsExist = await bddQuery(
    `SELECT COUNT(*) AS count FROM articles WHERE id = ${idArticle} AND online = true`
  );

  if (rawIsExist.err) {
    addLog(rawIsExist.err, "error-bdd");
    return sendResponse(res, 200, "error", {
      flashMessage: {
        message: "Une erreur est survenu avec la base de donnée.",
        type: "error"
      }
    });
  }
  const isExist = rawIsExist.results[0].count;
  if (!isExist) {
    return sendResponse(res, 200, "error", {
      flashMessage: {
        message: "L'article demandé n'existe pas",
        type: "error"
      }
    });
  }

  const rawArticleDetails = await bddQuery(
    `SELECT a.*, u.email, u.nickname FROM articles AS a JOIN users AS u ON a.owner_id = u.id WHERE a.id = ${idArticle}`
  );

  if (rawArticleDetails.err) {
    addLog(rawArticleDetails.err, "error-bdd");
    return sendResponse(
      res,
      409,
      "error",
      "Erreur avec la base de donnée, veuillez contacter un administrateur"
    );
  }

  const rawArticlePictures = await bddQuery(
    `SELECT article_id, url_picture, main_picture FROM pictures_articles WHERE article_id = ${idArticle}`
  );

  const pictures = rawArticlePictures.results.reduce((acc, obj) => {
    return [
      ...acc,
      { url_picture: obj.url_picture, main_picture: obj.main_picture }
    ];
  }, []);

  let responseApi = rawArticleDetails.results;
  responseApi[0].pictures =
    pictures.length > 0
      ? pictures
      : [
          {
            url_picture: "/data/pictures_articles/logo_poisson.svg",
            main_picture: 1
          }
        ];

  return sendResponse(res, 200, "success", responseApi);
});

// Return Article Details, selected with his id Preview
app.get("/preview/:id/", async (req, res) => {
  const idArticle = [req.params.id];

  const rawIsExist = await bddQuery(
    `SELECT COUNT(*) AS count FROM articles WHERE id = ${idArticle}`
  );

  if (rawIsExist.err) {
    addLog(rawIsExist.err, "error-bdd");
    return sendResponse(res, 200, "error", {
      flashMessage: {
        message: "Une erreur est survenu avec la base de donnée.",
        type: "error"
      }
    });
  }
  const isExist = rawIsExist.results[0].count;
  if (!isExist) {
    return sendResponse(res, 200, "error", {
      flashMessage: {
        message: "L'article demandé n'existe pas",
        type: "error"
      }
    });
  }

  const rawArticleDetails = await bddQuery(
    `SELECT a.*, u.email, u.nickname FROM articles AS a JOIN users AS u ON a.owner_id = u.id WHERE a.id = ${idArticle}`
  );

  if (rawArticleDetails.err) {
    addLog(rawArticleDetails.err, "error-bdd");
    return sendResponse(
      res,
      409,
      "error",
      "Erreur avec la base de donnée, veuillez contacter un administrateur"
    );
  }

  const rawArticlePictures = await bddQuery(
    `SELECT article_id, url_picture, main_picture FROM pictures_articles WHERE article_id = ${idArticle}`
  );

  const pictures = rawArticlePictures.results.reduce((acc, obj) => {
    return [
      ...acc,
      { url_picture: obj.url_picture, main_picture: obj.main_picture }
    ];
  }, []);

  let responseApi = rawArticleDetails.results;
  responseApi[0].pictures =
    pictures.length > 0
      ? pictures
      : [
          {
            url_picture: "/data/pictures_articles/logo_poisson.svg",
            main_picture: 1
          }
        ];

  return sendResponse(res, 200, "success", responseApi);
});

// Received and insert Article on BDD
app.post(
  "/article",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    req.body = Object.assign({ owner_id: req.user.id }, req.body);
    const insertArticle = await bddQuery(
      "INSERT INTO articles SET ?",
      req.body
    );
    const responseApi = { insertId: insertArticle.results.insertId };
    sendResponse(res, 200, "success", responseApi);
  }
);

app.post(
  "/picture/article/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const idArticle = req.params.id;
    if (!req.files) {
      return sendResponse(res, 500, "error", {
        flashMessage: {
          message: "Merci de remplir le champ photo.",
          type: "error"
        }
      });
    }
    const currentUpload = req.files.picture;
    if (!currentUpload.mimetype.includes("image/")) {
      return sendResponse(res, 500, "error", {
        flashMessage: {
          message: "Merci d'envoyer uniquement des images / photos.",
          type: "error"
        }
      });
    }

    currentUpload.mv(
      `${__dirname}/data/pictures_articles/${idArticle}/${currentUpload.name}`,
      async err => {
        if (err) {
          console.log(err);
          return sendResponse(res, 500, "error", {
            flashMessage: {
              message: "Un problème est survenu durant l'upload de l'image.",
              type: "error"
            }
          });
        }
        const picture = `/data/pictures_articles/${idArticle}/${
          currentUpload.name
        }`;

        const insertArticle = await bddQuery(
          `INSERT INTO pictures_articles (url_picture, article_id) VALUES ('${picture}', ${idArticle} )`
        );
        if (insertArticle.err) {
          return sendResponse(res, 409, "error", {
            flashMessage: {
              message: insertArticle.err,
              type: "error"
            }
          });
        }
        sendResponse(res, 200, "success", {
          picture,
          idPicture: insertArticle.results.insertId,
          mainPicture: 0
        });
      }
    );
  }
);

app.put("/main", async (req, res) => {
  const { idPicture, idArticle } = req.query;
  const updateMainPicture = await bddQuery(
    `UPDATE pictures_articles sicles SET main_picture = (CASE WHEN id = ${idPicture} THEN TRUE ELSE FALSE END) WHERE article_id = ${idArticle}`
  );
  if (updateMainPicture.err) {
    return sendResponse(res, 500, "error", {
      flashMessage: {
        message:
          "Un problème est survenu durant la mise à jour de l'image principale.",
        type: "error"
      }
    });
  }

  sendResponse(res, 200, "success", {
    idPicture,
    idArticle
  });
});

app.delete("/picture/:id", async (req, res) => {
  const idPicture = req.params.id;
  const deletePicture = await bddQuery(
    `DELETE FROM pictures_articles WHERE id = ${idPicture}`
  );
  if (deletePicture.err) {
    return sendResponse(res, 500, "error", {
      flashMessage: {
        message: "Un problème est survenu durant la suppression de l'image.",
        type: "error"
      }
    });
  }
  sendResponse(res, 200, "success", {
    idPicture
  });
});

app.put("/article_:idArticle/online_:online", async (req, res) => {
  const { idArticle } = req.params;
  const online = JSON.parse(req.params.online);
  const onlineArticle = await bddQuery(
    `UPDATE articles SET online = ${online} WHERE id = ${idArticle}`
  );
  console.log(idArticle);
  console.log(online);
  if (onlineArticle.err) {
    return sendResponse(res, 200, "error", {
      flashMessage: {
        message:
          "Un problème est survenu durant la mise à jour de l'état de l'article.",
        type: "error"
      }
    });
  }
  const flashMessage = online
    ? { type: "success", message: "Votre article est bien mis en ligne." }
    : { type: "warning", message: "Votre article n'est plus en ligne." };

  sendResponse(res, 200, "success", { flashMessage });
});

app.get(
  "/user_articles",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const idUser = req.user.id;
    const rawMyArticles = await bddQuery(
      `SELECT a.name, a.id, a.online FROM articles AS a WHERE a.owner_id=${idUser} AND a.swap = 0`
    );

    const articles = rawMyArticles.results;
    const articles_id = articles.map(article => article.id);

    const rawArticlesPictures = await bddQuery(
      `SELECT article_id, url_picture, main_picture FROM pictures_articles WHERE article_id IN (${articles_id}) `
    );

    const groupPicturesById = rawArticlesPictures.results.reduce((acc, obj) => {
      const cle = obj["article_id"];
      if (!acc[cle]) {
        acc[cle] = [{ mainIsDefine: false }];
      }
      acc[cle] = [
        ...acc[cle],
        { url_picture: obj.url_picture, main_picture: obj.main_picture }
      ];
      if (obj.main_picture) {
        acc[cle][0].mainIsDefine = true;
      }
      return acc;
    }, {});

    const keyPictures = Object.keys(groupPicturesById);

    // create object array with object array for pictures
    const articlesResult = articles.reduce((acc, obj) => {
      const currentId = obj.id;

      if (keyPictures.includes(currentId.toString())) {
        const mainIsDefine = groupPicturesById[currentId][0].mainIsDefine;
        groupPicturesById[currentId].shift();
        if (!mainIsDefine) {
          groupPicturesById[currentId][0].main_picture = 1;
        }
        obj.pictures = groupPicturesById[currentId];
      } else {
        obj.pictures = [
          {
            url_picture: "/data/pictures_articles/logo_poisson.svg",
            main_picture: 1
          }
        ];
      }
      acc = [...acc, obj];
      return acc;
    }, []);

    sendResponse(res, 200, "success", articlesResult);
  }
);

app.get(
  "/exchanges-proposed",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const idUser = req.user.id;

    // if (swapsId.err) {
    //   return sendResponse(res, 200, "error", {
    //     flashMessage: {
    //       message:
    //         "Un erreur s'est produite durant la vérification dans la base de donnée.",
    //       type: "error"
    //     }
    //   });
    // }
    // const swapsIdArray = swapsId.results.map(ids => {
    //   return ids.id;
    // });

    // const articlesId = await bddQuery(
    //   `SELECT s.id AS id_swap, s.id_article_annonce FROM swaps as s WHERE s.id IN (${swapsIdArray})`
    // );

    // const swapsIdArticle = articlesId.results.map(articleId => {
    //   return articleId.id_article_annonce;
    // });

    // const rawArticlesPictures = await bddQuery(
    //   `SELECT article_id, url_picture, main_picture FROM pictures_articles WHERE article_id IN (${swapsIdArticle}) `
    // );
    // const rawArticles = await bddQuery(
    //   `SELECT a.name, a.id FROM articles AS a WHERE id IN (${swapsIdArticle})`
    // );

    const swapsId = await bddQuery(
      `SELECT s.id FROM swaps as s JOIN articles as a ON a.id = s.id_article_offer WHERE a.owner_id = ${idUser}`
    );

    const swaps_id = swapsId.results.map(swap => swap.id);
    const rawMyArticles = await bddQuery(
      `SELECT s.id AS id_swap, a.name, a.id FROM articles AS a JOIN swaps AS s ON a.id = s.id_article_annonce WHERE s.id IN (${swaps_id}) AND a.swap = 0 AND s.refused = false AND s.accepted = false`
    );

    const articles = rawMyArticles.results;
    if (articles.length === 0) {
      return sendResponse(res, 200, "error", "no-data");
    }
    const articles_id = articles.map(article => article.id);

    const rawArticlesPictures = await bddQuery(
      `SELECT article_id, url_picture, main_picture FROM pictures_articles WHERE article_id IN (${articles_id}) `
    );

    const groupPicturesById = rawArticlesPictures.results.reduce((acc, obj) => {
      const cle = obj["article_id"];
      if (!acc[cle]) {
        acc[cle] = [{ mainIsDefine: false }];
      }
      acc[cle] = [
        ...acc[cle],
        { url_picture: obj.url_picture, main_picture: obj.main_picture }
      ];
      if (obj.main_picture) {
        acc[cle][0].mainIsDefine = true;
      }
      return acc;
    }, {});

    const keyPictures = Object.keys(groupPicturesById);

    // create object array with object array for pictures
    const articlesResult = articles.reduce((acc, obj) => {
      const currentId = obj.id;

      if (keyPictures.includes(currentId.toString())) {
        const mainIsDefine = groupPicturesById[currentId][0].mainIsDefine;
        groupPicturesById[currentId].shift();
        if (!mainIsDefine) {
          groupPicturesById[currentId][0].main_picture = 1;
        }
        obj.pictures = groupPicturesById[currentId];
      } else {
        obj.pictures = [
          {
            url_picture: "/data/pictures_articles/logo_poisson.svg",
            main_picture: 1
          }
        ];
      }
      acc = [...acc, obj];
      return acc;
    }, []);

    sendResponse(res, 200, "success", articlesResult);
  }
);

app.get(
  "/exchanges-received",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const idUser = req.user.id;
    const rawMyArticles = await bddQuery(
      `SELECT s.id AS id_swap, a.name, a.id FROM articles AS a JOIN swaps AS s ON a.id = s.id_article_annonce WHERE a.owner_id=${idUser} AND a.swap = 0 AND s.refused = false AND s.accepted = false`
    );

    const articles = rawMyArticles.results;
    if (articles.length === 0) {
      return sendResponse(res, 200, "error", "no-data");
    }
    const articles_id = articles.map(article => article.id);

    const rawArticlesPictures = await bddQuery(
      `SELECT article_id, url_picture, main_picture FROM pictures_articles WHERE article_id IN (${articles_id}) `
    );

    const groupPicturesById = rawArticlesPictures.results.reduce((acc, obj) => {
      const cle = obj["article_id"];
      if (!acc[cle]) {
        acc[cle] = [{ mainIsDefine: false }];
      }
      acc[cle] = [
        ...acc[cle],
        { url_picture: obj.url_picture, main_picture: obj.main_picture }
      ];
      if (obj.main_picture) {
        acc[cle][0].mainIsDefine = true;
      }
      return acc;
    }, {});

    const keyPictures = Object.keys(groupPicturesById);

    // create object array with object array for pictures
    const articlesResult = articles.reduce((acc, obj) => {
      const currentId = obj.id;

      if (keyPictures.includes(currentId.toString())) {
        const mainIsDefine = groupPicturesById[currentId][0].mainIsDefine;
        groupPicturesById[currentId].shift();
        if (!mainIsDefine) {
          groupPicturesById[currentId][0].main_picture = 1;
        }
        obj.pictures = groupPicturesById[currentId];
      } else {
        obj.pictures = [
          {
            url_picture: "/data/pictures_articles/logo_poisson.svg",
            main_picture: 1
          }
        ];
      }
      acc = [...acc, obj];
      return acc;
    }, []);

    sendResponse(res, 200, "success", articlesResult);
  }
);

app.get(
  "/exchanges-finished",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const idUser = req.user.id;
    const rawMyArticles = await bddQuery(
      `SELECT s.id as swap_id,s.refused as refused,s.accepted as accepted, offer.name as offer_name, offer.id as offer_id,offer.owner_id as offer_owner_id, annonce.name as annonce_name, annonce.id as annonce_id, annonce.owner_id as annonce_owner_id
      FROM swaps as s 
      JOIN articles as annonce 
      ON annonce.id = s.id_article_annonce 
      JOIN articles as offer 
      ON offer.id = s.id_article_offer 
      WHERE (s.refused = true OR s.accepted = true) AND (offer.owner_id = ${idUser} OR annonce.owner_id=${idUser})`
    );
    const swaps = rawMyArticles.results;
    if (swaps.length === 0) {
      return sendResponse(res, 200, "error", "no-data");
    }
    const annonces_id = swaps.map(swap => swap.annonce_id);
    const offers_id = swaps.map(swap => swap.offer_id);

    const mainPicture = await bddQuery(
      `SELECT url_picture, article_id FROM pictures_articles WHERE main_picture = 1 AND article_id IN (${annonces_id}) OR article_id IN (${offers_id})`
    );

    const groupPicturesById = mainPicture.results.reduce((acc, obj) => {
      const cle = obj["article_id"];
      if (!acc[cle]) {
        acc[cle] = [];
      }
      acc[cle] = [...acc[cle], { url_picture: obj.url_picture }];

      return acc;
    }, {});

    const keyPictures = Object.keys(groupPicturesById);

    // create object array with object array for pictures
    const swapsResult = swaps.reduce((acc, obj) => {
      if (keyPictures.includes(obj.offer_id.toString())) {
        obj.offer_picture = groupPicturesById[obj.offer_id][0].url_picture;
      } else {
        obj.offer_picture = "/data/pictures_articles/logo_poisson.svg";
      }
      if (keyPictures.includes(obj.annonce_id.toString())) {
        obj.annonce_picture = groupPicturesById[obj.annonce_id][0].url_picture;
      } else {
        obj.annonce_picture = "/data/pictures_articles/logo_poisson.svg";
      }
      acc = [...acc, obj];
      return acc;
    }, []);

    sendResponse(res, 200, "success", {
      swapsResult
    });
  }
);

app.post(
  "/send_proposition/:id_article",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id_article = parseInt(req.params.id_article);
    const id_offer = req.body.id_offer;
    const isArticle = await bddQuery(
      `SELECT count(*) AS count FROM articles WHERE id = ${id_article}`
    );
    const numberArticle = isArticle.results[0].count;
    if (numberArticle !== 1) {
      return sendResponse(res, 200, "error", {
        flashMessage: {
          type: "error",
          message:
            "L'article pour lequel vous désirez proposer un échange n'éxiste pas."
        }
      });
    }

    const rawCreateSwap = await bddQuery(
      `INSERT INTO swaps (id_article_annonce, id_article_offer) VALUES (${id_article}, ${id_offer})`
    );

    if (rawCreateSwap.err) {
      return sendResponse(res, 200, "error", {
        flashMessage: {
          message:
            "Un problème est survenu durant l'insertion de l'échange dans la base de donnée.",
          type: "error"
        }
      });
    }

    return sendResponse(res, 200, "success", {
      flashMessage: {
        message:
          "Votre demande d'échange a été transmise au propriétaire de l'objet.",
        type: "success"
      }
    });
  }
);

app.get(
  "/swap_in_progress/:id_article",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id_article = parseInt(req.params.id_article);
    const id_user = req.user.id;
    const swapInProgress = await bddQuery(
      `SELECT count(*) AS count FROM swaps AS s
      JOIN articles AS a ON a.id = s.id_article_offer
      WHERE s.id_article_annonce = ${id_article} AND a.owner_id = ${id_user}`
    );
    if (swapInProgress.err) {
      return sendResponse(res, 200, "error", {
        flashMessage: {
          message:
            "Un problème est survenu durant la connection à la base de donnée.",
          type: "error"
        }
      });
    }

    return sendResponse(res, 200, "success", {
      numberSwapInProgress: swapInProgress.results[0].count
    });
  }
);

app.get(
  "/details-swap-:id_swap",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const idSwap = req.params.id_swap;
    const swapDetails = await bddQuery(
      `SELECT a1.id AS id_annonce,a1.name AS name_annonce, a1.owner_id as annonce_owner, a2.id as id_offer, a2.name as name_offer, a2.owner_id as offer_owner
      FROM swaps as s 
      JOIN articles as a1 ON a1.id = s.id_article_annonce 
      JOIN articles as a2 ON a2.id = s.id_article_offer 
      WHERE s.id = ${idSwap}`
    );
    if (swapDetails.err) {
      return sendResponse(res, 200, "error", {
        flashMessage: {
          message:
            "Un problème est survenu durant la connection à la base de donnée.",
          type: "error"
        }
      });
    }

    const picturesArticles = await bddQuery(
      `SELECT pa1.url_picture as annonce_picture, pa2.url_picture as offer_picture FROM pictures_articles as pa1 LEFT JOIN pictures_articles as pa2 ON pa2.article_id=${
        swapDetails.results[0].id_offer
      } WHERE pa1.article_id = ${swapDetails.results[0].id_annonce}`
    );

    return sendResponse(res, 200, "success", {
      offer: {
        id: swapDetails.results[0].id_offer,
        name: swapDetails.results[0].name_offer,
        picture: picturesArticles.results[0].offer_picture,
        owner: swapDetails.results[0].offer_owner
      },
      annonce: {
        id: swapDetails.results[0].id_annonce,
        name: swapDetails.results[0].name_annonce,
        picture: picturesArticles.results[0].annonce_picture,
        owner: swapDetails.results[0].annonce_owner
      }
    });
  }
);

app.put(
  "/confirmation-swap/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const idAnnonce = parseInt(req.body.idAnnonce);
    const idOffer = parseInt(req.body.idOffer);
    const confirmationExchange = await bddQuery(
      `UPDATE articles SET swap = 1 WHERE id = ${idAnnonce} OR id = ${idOffer}`
    );
    console.log(typeof parseInt(req.body.idAnnonce));
    console.log(typeof req.body.idOffer);
    if (confirmationExchange.err) {
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

server.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
