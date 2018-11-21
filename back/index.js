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

  const offset = req.query.offset ? req.query.offset : 0;

  res.send(
    `Affichage des produits par ${limit} à partir du produit numéro: ${offset}`
  );
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

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
