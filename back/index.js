require('dotenv').config()
const express = require("express");
const app = express();
const port = 3000;
const connection = require("./conf");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.post("/items", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO item SET ?", formData, (err, results) => {
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

app.put("/items/:id", (req, res) => {
  const idUser = req.params.id;
  const formData = req.body;
  connection.query(
    "UPDATE item SET ? WHERE id = ?",
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
    });
});

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
