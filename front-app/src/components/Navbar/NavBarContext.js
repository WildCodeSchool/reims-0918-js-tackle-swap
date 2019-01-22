import React from "react";
import NavBar from "./NavBar";
import SocketContext from "../../context/SocketContext";

const NavBarContext = props => {
  return (
    <SocketContext.Consumer>
      {socket => <NavBar {...props} socket={socket.socket} />}
    </SocketContext.Consumer>
  );
};

export default NavBarContext;
