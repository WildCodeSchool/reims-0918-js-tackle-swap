const bddQuery = require("./function/bddQuery");
const sendResponse = require("./function/sendResponse");
const passport = require("passport");

const socketIo = (io, app) => {
  app.get(
    "/all-conversations-privates",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const id_user = req.user.id;

      const rawAllRooms = await bddQuery(
        `SELECT pm.room, a.id AS article_id, a.name, u.nickname, pa.url_picture
        FROM private_messages AS pm
        JOIN articles AS a ON pm.id_article = a.id
        JOIN users AS u ON a.owner_id = u.id
        LEFT JOIN pictures_articles AS pa ON pa.article_id = a.id AND pa.main_picture = true
        WHERE pm.room LIKE '%-${id_user}%'
        GROUP BY pm.room, a.id, a.name, u.nickname, pa.url_picture`
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
      if (rawAllRooms.results.length === 0) {
        return sendResponse(res, 200, "success", "");
      }
      const response = rawAllRooms.results.map(room =>
        room.url_picture === null
          ? {
              ...room,
              url_picture: "/data/pictures_articles/default.png"
            }
          : { ...room }
      );
      const addIdInterlocutor = response.map(room => {
        let id_interlocutor;
        const newRoom = {
          ...room,
          room: room.room
            .split("-")
            .map((id, index) => {
              if (index !== 0 && parseInt(id) !== id_user) {
                id_interlocutor = parseInt(id);
              }
              return id;
            })
            .join("-"),
          id_interlocutor
        };
        return newRoom;
      });
      const id_interlocutors = addIdInterlocutor.map(room =>
        parseInt(room.id_interlocutor)
      );
      const rawNickname_interlocutors = await bddQuery(
        `SELECT id, nickname FROM users WHERE id IN (${id_interlocutors})`
      );

      const interlocutorsById = rawNickname_interlocutors.results.reduce(
        (acc, obj) => {
          const cle = obj["id"];
          if (!acc[cle]) {
            acc[cle] = "";
          }
          acc[cle] = { nickname: obj.nickname };

          return acc;
        },
        {}
      );
      const responseFinal = addIdInterlocutor.map(room => ({
        ...room,
        nickname_interlocutor: interlocutorsById[room.id_interlocutor].nickname
      }));
      return sendResponse(res, 200, "success", responseFinal);
    }
  );

  io.on("connection", socket => {
    console.log("New user connected");

    // Defined room to send and received message
    let currentRoom = {};
    socket.on("room", async connectedToRoom => {
      console.log("room", connectedToRoom);
      roomName = `${connectedToRoom.id_article}-${connectedToRoom.id_owner}-${
        connectedToRoom.id_user
      }`;
      const rawNicknameParticipant = await bddQuery(
        `SELECT id, nickname FROM users WHERE id = ${
          connectedToRoom.id_owner
        } OR id = ${connectedToRoom.id_user}`
      );
      const users = rawNicknameParticipant.results.reduce((acc, obj) => {
        const cle = obj.id;
        if (!acc[cle]) {
          acc[cle] = obj.nickname;
        }
        return acc;
      }, {});
      currentRoom = {
        users,
        roomName,
        id_article: parseInt(connectedToRoom.id_article)
      };
      socket.join(roomName);
      socket.emit("roomConnected", currentRoom);
    });
    socket.on("haveMessage", socket => io.emit("messageNotRead", true));
    socket.on("sendPrivateMessage", async message => {
      const insertMessage = await bddQuery(
        "INSERT INTO private_messages SET ?",
        [message]
      );
      response = {
        type: "success",
        response: [
          {
            ...message,
            id_sender: message.sender,
            sender: currentRoom.users[message.sender],
            recipient: currentRoom.users[message.recipient],
            id_message: insertMessage.results.insertId
          }
        ]
      };
      io.in(currentRoom.roomName)
        .to(socket.id)
        .emit("receivedPrivateMessage", response);
      io.emit("messageNotRead", true);
    });
    socket.on("login", async () => {
      const rawAllPrivateMessages = await bddQuery(
        `SELECT * FROM private_messages WHERE room = '${currentRoom.roomName}'`
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
          response: rawAllPrivateMessages.results.map(message => ({
            ...message,
            id_sender: message.sender,
            sender: currentRoom.users[message.sender],
            recipient: currentRoom.users[message.recipient]
          }))
        };
      }
      io.to(socket.id).emit("receivedPrivateMessage", responseSocket);
      io.emit("messageNotRead", true);
    });
    socket.on("disconnect", () => {
      socket.disconnect();
      console.log("user disconnected");
    });
  });
};
module.exports = socketIo;
