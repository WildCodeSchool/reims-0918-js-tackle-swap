import React, { Component } from "react";
import SocketContext from "./SocketContext";

import io from "socket.io-client";
//const socket = io();
export class SocketProvider extends Component {
  state = { message: "test Socket" };
  render() {
    return (
      <SocketContext.Provider
        value={{
          state: this.state
          //socket
        }}
      >
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export default SocketProvider;
