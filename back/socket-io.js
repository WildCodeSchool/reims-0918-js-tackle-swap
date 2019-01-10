const bddQuery = require("./function/bddQuery");

const socketIo = io => {
  var nsp = io.of("/api");
  nsp.on("connection", socket => {
    console.log("New user connected");

    // Defined room to send and received message
    let currentRoom = {};
    socket.on("room", async connectedToRoom => {
      console.log("room");
      roomName = `${connectedToRoom.article_id}-${connectedToRoom.id_owner}-${
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
        article_id: parseInt(connectedToRoom.article_id)
      };
      socket.join(roomName);
      socket.emit("roomConnected", currentRoom);
    });

    socket.on("sendPrivateMessage", async message => {
      console.log("send");
      const insertMessage = await bddQuery(
        "INSERT INTO private_messages SET ?",
        [message]
      );
      response = {
        type: "success",
        response: [
          {
            ...message,
            sender: currentRoom.users[message.sender],
            recipient: currentRoom.users[message.recipient]
          }
        ]
      };
      nsp.to(socket.id).emit("receivedPrivateMessage", response);
    });

    socket.on("login", async () => {
      console.log("login socket");
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
        console.log("login socket not errer");
        responseSocket = {
          type: "success",
          response: rawAllPrivateMessages.results.map(message => ({
            ...message,
            sender: currentRoom.users[message.sender],
            recipient: currentRoom.users[message.recipient]
          }))
        };
      }

      nsp.to(socket.id).emit("receivedPrivateMessage", responseSocket);
    });

    socket.on("disconnect", () => {
      socket.disconnect();
      console.log("user disconnected");
    });
  });
};
module.exports = socketIo;
