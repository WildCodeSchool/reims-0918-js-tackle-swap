const util = require("util");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // adresse du serveur
  user: process.env.DB_USER, // le nom d'utilisateur
  password: process.env.DB_PASS, // le mot de passe
  database: process.env.DB_DTABASE // le nom de la base de données
});

connection.query = util.promisify(connection.query);

module.exports = connection;
