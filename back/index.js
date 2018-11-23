require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Bienvenue le Marketplace incontournable des pêcheurs");
});

app.get("/items", (req, res) => {
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

  res
    .send(`Affichage des produits par ${limit} à partir de ${offset}`)
    .status(200);
});

app.get("/item/:id", (req, res) => {
  const isExist = req.params.id === "4";

  isExist
    ? res
        .status(200)
        .send(
          `Affichage de la fiche produit d'un article en fonction de son id : ${
            req.params.id
          }`
        )
    : res.status(404).send("L'article demandé n'existe pas");
});

app.get("/user_items/:iduser", (req, res) => {
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
