import React, { Component } from "react";
import SocketContext from "./SocketContext";

import io from "socket.io-client";

export class SocketProvider extends Component {
  render() {
    return (
      <SocketContext.Provider
        value={{
          socket: io.connect(`${process.env.REACT_APP_URL_API}/kawacke`)
        }}
      >
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export default SocketProvider;
