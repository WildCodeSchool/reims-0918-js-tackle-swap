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
      roomConnected: {}
    };
  }
  _isMounted = false;
  socket = null;
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

    if (this._isMounted) {
      this.socket.emit("sendPrivateMessage", {
        sender: this.props.user.id,
        recipient: recipient,
        message: this.state.message,
        room: this.state.roomConnected.roomName,
        article_id: this.state.roomConnected.article_id
      });
      this.setState({ message: "" });
    }
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
  componentWillUnmount() {
    this._isMounted = false;
    this.socket = null;
  }
  async componentDidMount() {
    this._isMounted = true;

    if (!this.socket) {
      if (!(await isArticle(parseInt(this.props.match.params.article_id)))) {
        if (this._isMounted) {
          this.props.setFlashMessage({
            type: "error",
            message:
              "L'article pour lequel vous souhaitez démarrer une conversation n'existe pas."
          });
        }
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
            if (this._isMounted) {
              this.props.setUserInformation(results.data.response);
              this.connectedToChat();
            }
          });
      } else if (!isConnected()) {
        this.props.setFlashMessage({
          type: "error",
          message: "Vous devez être connecté pour contacter un vendeur."
        });
        return this.props.history.push("/se-connecter");
      } else {
        if (this._isMounted) {
          this.connectedToChat();
        }
      }
    }
  }

  connectedToChat() {
    const connectedToRoom = { ...this.props.match.params };
    this.socket = io.connect(`${process.env.REACT_APP_URL_API}`);

    this.socket.emit("room", connectedToRoom);
    this.socket.on("roomConnected", roomConnected => {
      console.log(roomConnected);
      this.setState({ roomConnected });
    });
    this.socket.emit("login");
    this.socket.on("receivedPrivateMessage", messageReceived => {
      if (this._isMounted) {
        if (messageReceived.type === "error") {
          console.log("STOP ERROR", messageReceived.message);
        } else {
          this.addToRoom(messageReceived.response);
        }
      }
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
              <h2>Message :</h2>
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
