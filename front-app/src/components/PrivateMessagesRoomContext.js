import React from "react";
import PrivateMessagesRoom from "./PrivateMessagesRoom";
import SocketContext from "../context/SocketContext";

const PrivateMessagesRoomContext = props => {
  return (
    <SocketContext.Consumer>
      {socket => <PrivateMessagesRoom {...props} socket={socket.socket} />}
    </SocketContext.Consumer>
  );
};

export default PrivateMessagesRoomContext;
