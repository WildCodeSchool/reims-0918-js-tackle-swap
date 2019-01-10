require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
const api = require("./api");
const cors = require("cors");

const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer(app);
const io = socketIO(server);

const socketIo = require("./socket-io");
socketIo(io, server);

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.use("/api", api);

server.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened ...");
  }
  console.log(`Server listened on ${port}`);
});
