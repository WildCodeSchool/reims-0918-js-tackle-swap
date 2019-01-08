import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

import io from "socket.io-client";
import axios from "axios";
import ls from "local-storage";

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

  componentDidMount() {
    console.log(this.props);
    axios
      .get(`${process.env.REACT_APP_URL_API}/personnal-informations`, {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
        }
      })
      .then(results => {
        const login = {
          room: [
            this.props.participant,
            results.data.response.nickname,
            this.props.id_article
          ]
            .sort()
            .join("_"),
          sender: results.data.response.id,
          recipient: parseInt(this.props.id_participant)
        };
        console.log("login", login);
        this.setState({ login }, () => {
          // this.connectedToChat(this.state.login);
        });
      });
  }

  connectedToChat(login) {
    this.setState({ socket: io(`${process.env.REACT_APP_URL_API}`) }, () => {
      this.state.socket.emit("room", login);

      this.state.socket.emit("login", login);
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

export default PrivateMessagesRoom;
