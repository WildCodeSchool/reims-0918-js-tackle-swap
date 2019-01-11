require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const connection = require("./conf");
const port = 5000;
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
  const rawMaxPages = await bddQuery(
    "SELECT COUNT(*) AS count FROM articles WHERE online = true"
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
    `SELECT id, name FROM articles WHERE online = true ORDER BY id LIMIT ${limit}`
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
            url_picture: "/data/pictures_articles/default.png",
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

app.get("/user_articles/:iduser", (req, res) => {
  const limit =
    req.query.limit && req.query.limit >= 20
      ? req.query.limit <= 100
        ? req.query.limit
        : 100
      : 20;
  const totalBDD = 150;
  const offset = req.query.offset
    ? req.query.offset > totalBDD
      ? totalBDD - limit
      : req.query.offset
    : 0;
  const isExist = req.params.iduser === "35";

  isExist
    ? res
        .send(
          `Affichage des produits de l'utilisateur ${
            req.params.iduser
          } par tranche(s) de ${limit} à partir de ${offset}`
        )
        .status(202)
    : res.status(404).send("La vitrine recherchée n'existe pas");
});

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
server.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});

app.get(
  "/my-articles",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const idUser = req.user.id;
    const myArticles = await bddQuery(
      `SELECT * FROM articles WHERE owner_id=${idUser}`
    );
    sendResponse(res, 200, "success", myArticles);
  }
);
