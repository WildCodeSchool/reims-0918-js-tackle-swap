require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Bienvenue le Marketplace incontournable des pêcheurs");
});

app.get("/items", (req, res) => {
  const limit = req.query.limit ? req.query.limit : 20;
  const offset = req.query.offset ? req.query.offset : 0;
  res.send(
    `Affichage des produits par ${limit} à partir du produit numéro: ${offset}`
  );
});

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
