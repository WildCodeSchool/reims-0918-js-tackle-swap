require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./conf");
const port = 3000;
const bodyParser = require("body-parser");

const defineLimit = require("./function/defineLimit");
const bddQuery = require("./function/bddQuery");
const addLog = require("./function/addLog");
const sendResponse = require("./function/sendResponse");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.post("/users", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO users SET ?", formData, (err, results) => {
    if (err) {
      console.log(err);
      res
        .status(409)
        .send("La requête ne peut pas être traitée à l'état actuel");
    } else {
      res.sendStatus(200);
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
    `SELECT id, name, picture from articles LIMIT ${limit}`
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

  const responseApi = {
    articles: rawResponseApi.results,
    pagination: {
      activePage: pageCalled,
      numberArticlesPerPage: numberArticlesPerPage,
      totalArticles
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

  const responseApi = rawArticleDetails.results;

  sendResponse(res, 200, "success", responseApi);
});

// Received and insert Article on BDD
app.post("/article", (req, res) => {
  console.log(req.body);
});

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
