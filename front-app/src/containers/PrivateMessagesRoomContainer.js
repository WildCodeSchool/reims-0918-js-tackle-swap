import React, { Component } from "react";
import PrivateMessagesRoom from "../components/PrivateMessagesRoom";

class PrivateMessagesRoomContainer extends Component {
  render() {
    return (
      <PrivateMessagesRoom id_article={this.props.match.params.id_article} />
    );
  }
}

export default PrivateMessagesRoomContainer;
