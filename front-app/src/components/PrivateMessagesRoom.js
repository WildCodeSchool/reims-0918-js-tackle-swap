import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";

import io from "socket.io-client";
import axios from "axios";
import ls from "local-storage";

import isConnected from "../functions/isConnected";
import isArticle from "../functions/isArticle";

export class PrivateMessagesRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      room: [],
      socket: null,
      roomConnected: {}
    };
  }

  submitMessage = e => {
    e.preventDefault();

    if (this.state.message.length <= 0) {
      // bloque l'envoi si le message est vide
      return;
    }
    const recipient =
      parseInt(this.state.roomConnected.roomName.split("-")[1]) ===
      this.props.user.id
        ? parseInt(this.state.roomConnected.roomName.split("-")[2])
        : parseInt(this.state.roomConnected.roomName.split("-")[1]);

    this.state.socket.emit("sendPrivateMessage", {
      sender: this.props.user.id,
      recipient: recipient,
      message: this.state.message,
      room: this.state.roomConnected.roomName,
      article_id: this.state.roomConnected.article_id
    });
    this.setState({ message: "" });
  };

  handleChangeMessage = e => {
    this.setState({ message: e.target.value });
  };
  addToRoom = message => {
    this.setState({ room: [...this.state.room, ...message] });
  };
  componentDidUpdate() {
    const chatScroll = document.getElementById("chatBox");
    chatScroll.scrollTop = chatScroll.scrollHeight;
  }

  async componentDidMount() {
    if (!this.state.socket) {
      if (!(await isArticle(parseInt(this.props.match.params.article_id)))) {
        this.props.setFlashMessage({
          type: "error",
          message:
            "L'article pour lequel vous souhaitez démarrer une conversation n'existe pas."
        });
        return this.props.history.push("/");
      }

      if (isConnected() && !this.props.user.id) {
        axios
          .get(`${process.env.REACT_APP_URL_API}/personnal-informations`, {
            headers: {
              Accept: "application/json",
              authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
            }
          })
          .then(results => {
            this.props.setUserInformation(results.data.response);
            this.connectedToChat();
          });
      } else if (!isConnected()) {
        this.props.setFlashMessage({
          type: "error",
          message: "Vous devez être connecté pour contacter un vendeur."
        });
        return this.props.history.push("/se-connecter");
      } else {
        this.connectedToChat();
      }
    }
  }

  connectedToChat() {
    const connectedToRoom = { ...this.props.match.params };
    this.setState({ socket: io(`${process.env.REACT_APP_URL_API}`) }, () => {
      console.log("socket");
      this.state.socket.emit("room", connectedToRoom);
      this.state.socket.on("roomConnected", roomConnected => {
        console.log("room", roomConnected);
        this.setState({ roomConnected });
      });
      this.state.socket.emit("login");
      this.state.socket.on("receivedPrivateMessage", messageReceived => {
        console.log("received");
        if (messageReceived.type === "error") {
          console.log("STOP ERROR", messageReceived.message);
        } else {
          this.addToRoom(messageReceived.response);
        }
      });
    });
  }

  render() {
    const classes = {
      main_private_messages: {}
    };
    return (
      <Grid container>
        <Grid item xs={12}>
          <Link to="/messagerie">Retour à la messagerie</Link>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <div style={classes.main_private_messages}>
              <h2>PrivateMessagesRoom</h2>
              <div
                style={{ overflow: "scroll", height: "calc(100vh - 200px)" }}
                id="chatBox"
              >
                {this.state.room.map((message, index) => (
                  <p key={index}>
                    {message.sender} : {message.message}
                  </p>
                ))}
              </div>
              <div style={{ bottom: 0 }}>
                <form>
                  <input
                    type="text"
                    name="message"
                    onChange={e => this.handleChangeMessage(e)}
                    value={this.state.message}
                  />
                  <button
                    type="submit"
                    onClick={e => this.submitMessage(e)}
                    disabled={!this.state.message.length}
                  >
                    Envoyer le message
                  </button>
                </form>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(PrivateMessagesRoom);
