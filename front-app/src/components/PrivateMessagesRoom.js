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
      user: {},
      login: {}
    };
  }

  submitMessage = e => {
    e.preventDefault();

    this.state.socket.emit("sendPrivateMessage", {
      sender: this.state.login.sender,
      recipient: this.state.login.recipient,
      message: this.state.message,
      room: this.state.login.room
    });
  };

  handleChangeMessage = e => {
    this.setState({ message: e.target.value });
  };
  addToRoom = message => {
    this.setState({ room: [...this.state.room, ...message] });
  };

  async componentDidMount() {
    if (!(await isArticle(parseInt(this.props.match.params.id_article)))) {
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

  connectedToChat() {
    const isArticle = id_article => {
      axios
        .get(`http://localhost:5000/article/${id_article}`)
        .then(results => console.log(results));
    };
    isArticle(parseInt(this.props.match.params.id_article));
    console.log(this.props.user);
    const connectedToRoom = {
      id_article: parseInt(this.props.match.params.id_article),
      id_user: this.props.user.id
    };
    console.log("room", connectedToRoom);
    this.setState({ socket: io(`${process.env.REACT_APP_URL_API}`) }, () => {
      this.state.socket.emit("room", connectedToRoom);

      // this.state.socket.emit("login", login);
      this.state.socket.on("receivedPrivateMessage", messageReceived => {
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
              <div>
                {this.state.room.map((message, index) => (
                  <p key={index}>
                    {message.sender === 1
                      ? "Kawacke"
                      : message.sender === 2
                      ? "KoKo"
                      : "Personne"}
                    : {message.message}
                  </p>
                ))}
              </div>
              <form>
                <input
                  type="text"
                  name="message"
                  onChange={e => this.handleChangeMessage(e)}
                />
                <button type="submit" onClick={e => this.submitMessage(e)}>
                  Envoyer le message
                </button>
              </form>
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(PrivateMessagesRoom);
