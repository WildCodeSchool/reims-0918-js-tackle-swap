import React, { Component } from "react";
import PrivateMessagesRoom from "../components/PrivateMessagesRoom";

class PrivateMessagesRoomContainer extends Component {
  render() {
    return (
      <PrivateMessagesRoom
        participant={this.props.match.params.participant}
        id_participant={this.props.match.params.id}
      />
    );
  }
}

export default PrivateMessagesRoomContainer;
