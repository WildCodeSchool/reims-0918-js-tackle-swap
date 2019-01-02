require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./conf");
const port = 5000;
const bodyParser = require("body-parser");
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

app.get("/", (req, res) => {
  res.send("Bienvenue le Marketplace incontournable des pêcheurs");
});

// Return List Articles, with pagination
app.get("/articles", async (req, res) => {
  const numberArticlesPerPage = 20;
  const rawMaxPages = await bddQuery("SELECT COUNT(*) AS count FROM articles");

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
    `SELECT id, name FROM articles ORDER BY id LIMIT ${limit}`
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
  articlesResult = articles.reduce((acc, obj) => {
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
          url_picture: "/data/pictures_articles/default.png",
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
app.get("/article/:id", async (req, res) => {
  const idArticle = [req.params.id];

  const rawIsExist = await bddQuery(
    `SELECT COUNT(*) AS count FROM articles WHERE id = ${idArticle}`
  );

  if (rawIsExist.err) {
    addLog(idExist.err, "error-bdd");
    sendResponse(
      res,
      409,
      "error",
      "Erreur avec la base de donnée, veuillez contacter un administrateur"
    );
  }
  const isExist = rawIsExist.results[0].count;
  if (!isExist) {
    sendResponse(res, 404, "error", "L'article demandé n'existe pas");
  }

  const rawArticleDetails = await bddQuery(
    `SELECT a.*, u.email, u.nickname FROM articles AS a JOIN users AS u ON a.owner_id = u.id WHERE a.id = ${idArticle}`
  );

  if (rawArticleDetails.err) {
    addLog(rawArticleDetails.err, "error-bdd");
    sendResponse(
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
  responseApi[0].pictures = pictures;

  sendResponse(res, 200, "success", responseApi);
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

        sendResponse(res, 200, "success", picture);
      }
    );

    console.log(currentUpload);
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

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
