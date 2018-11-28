require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./conf");
const port = 3000;
const bodyParser = require("body-parser");
const defineLimit = require("./function/defineLimit");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

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

// Retour de la liste des articles présents dans la base de donnée
app.get("/articles", async (req, res) => {
  const numberArticlesPerPage = 20;
  const rows = await connection.query("SELECT COUNT(*) AS count FROM articles");
  const maxPages = Math.ceil(rows[0].count / numberArticlesPerPage);
  const requestPage = parseInt(req.query.page);
  const pageCalled =
    requestPage && requestPage >= 1
      ? requestPage <= maxPages
        ? requestPage
        : maxPages
      : 1;

  const limit = defineLimit(pageCalled, numberArticlesPerPage);
  connection.query(
    `SELECT id, name, picture from articles LIMIT ${limit}`,
    (err, results) => {
      if (err) {
        const responseApi = {
          response: "error",
          message: err
        };
        res.status(409).json(responseApi);
      } else {
        const responseApi = {
          response: "success",
          articles: results,
          pagination: {
            previousPage: false,
            nextPage: false,
            currentPage: 1,
            totalPages: 1
          }
        };
        res.status(200).json(responseApi);
      }
    }
  );
});

app.get("/article/:id", (req, res) => {
  const isExist = req.params.id === "1";
  const idUser = req.params.id;
  isExist
    ? connection.query(
        "SELECT * from articles WHERE id = ?",
        idUser,
        (err, results) => {
          if (err) {
            res.status(409).send("Erreur lors de la récupération des articles");
          } else {
            const data = results[0];
            res.status(200).json(data);
          }
        }
      )
    : res.status(404).send("L'article demandé n'existe pas");
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
