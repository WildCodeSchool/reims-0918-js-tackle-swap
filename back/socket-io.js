const bddQuery = require("./function/bddQuery");
const sendResponse = require("./function/sendResponse");
const passport = require("passport");

const socketIo = (io, app) => {
  app.get(
    "/personnal-informations",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      return sendResponse(res, 200, "success", req.user);
    }
  );

  app.get(
    "/all-conversations-privates",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const nickname_user = req.user.nickname;
      const id_user = req.user.id;
      const rawAllRooms = await bddQuery(
        `SELECT pm.room, pm.sender, pm.recipient, users.id FROM private_messages AS pm JOIN users ON (users.id = pm.sender AND pm.sender != ${id_user}) OR (users.id = pm.recipient AND pm.recipient != ${id_user}) WHERE room LIKE '%${nickname_user}%' GROUP BY pm.room, pm.sender, pm.recipient, users.id`
      );
      if (rawAllRooms.err) {
        return sendResponse(res, 200, "error", {
          flashMessage: {
            type: "error",
            message:
              "Un erreur est survenu durant la recherche des conversations."
          }
        });
      }
      // return juste nickname to other participant to PM
      const conversations = rawAllRooms.results
        // get nickname other participant from room's name
        .map(room => ({
          id: room.id,
          room: room.room,
          participant: room.room
            .split("_")
            .filter(nickname => nickname !== nickname_user)
            .join("")
        }))
        // remove duplicate
        .reduce((acc, conversation) => {
          var cle = conversation["id"];
          if (!acc["response"]) {
            acc["response"] = [];
          }
          if (!acc[cle]) {
            acc[cle] = "find";
            acc["response"].push(conversation);
          }

          return acc;
        }, {});

      return sendResponse(res, 200, "success", conversations.response);
    }
  );

  io.on("connection", socket => {
    console.log("New user connected");

    // Defined room to send and received message
    let currentRoom;
    socket.on("room", login => {
      console.log("in room", login.room);
      socket.join(login.room);
      currentRoom = login.room;
    });

    socket.on("sendPrivateMessage", async message => {
      const insertMessage = await bddQuery(
        "INSERT INTO private_messages SET ?",
        [message]
      );
      console.log(message);
      response = {
        type: "success",
        response: [{ ...message }]
      };
      io.sockets.in(currentRoom).emit("receivedPrivateMessage", response);
    });

    socket.on("login", async login => {
      const rawAllPrivateMessages = await bddQuery(
        `SELECT * FROM private_messages WHERE room = '${login.room}'`
      );
      let responseSocket;
      if (rawAllPrivateMessages.err) {
        console.log("error", rawAllPrivateMessages.err);
        responseSocket = {
          type: "error",
          message: "Problème lors de la récupération des messages."
        };
      } else {
        responseSocket = {
          type: "success",
          response: rawAllPrivateMessages.results
        };
      }

      io.to(socket.id).emit("receivedPrivateMessage", responseSocket);
    });

    socket.on("disconnect", () => {
      socket.disconnect();
      console.log("user disconnected");
    });
  });
};
module.exports = socketIo;
