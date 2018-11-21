const express = require("express");
const app = express();
const port = 3000;
const connection = require("./conf");

app.get("/", (req, res) => {
  response.send("Bienvenue le Marketplace incontournable des pêcheurs");
});
