require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./conf");
const port = 3000;

app.get("/", (req, res) => {
  res.send("Bienvenue le Marketplace incontournable des pêcheurs");
});

app.get("/articles", (req, res) => {
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
  connection.query("SELECT * from articles", (err, results) => {
    if (err) {
      res.status(409).send("Erreur lors de la récupération des articles");
    } else {
      const data = results[0];
      res
        .status(200)
        .send(
          `Article: ${data.name} - identifiant: ${data.id} - description: ${
            data.description
          } - <a href="/article/${data.id}">Afficher la fiche de l'article</a>`
        );
    }
  });
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
