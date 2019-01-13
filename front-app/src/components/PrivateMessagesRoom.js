import React, { Component } from "react";
import {
  Grid,
  Paper,
  createStyles,
  withStyles,
  InputBase,
  InputAdornment
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Link, withRouter } from "react-router-dom";

import io from "socket.io-client";
import axios from "axios";
import ls from "local-storage";

import isConnected from "../functions/isConnected";
import isArticle from "../functions/isArticle";
import "./hyphens.css";

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
    const { classes } = this.props;
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
                style={{ overflow: "scroll", height: "calc(100vh - 220px)" }}
                id="chatBox"
                className={classes.chatBox}
              >
                {this.state.room.map((message, index, array) =>
                  message.id_sender === this.props.user.id ? (
                    <div key={index} className={classes.containerMessage}>
                      <p className={`${classes.myMessage} hyphens`}>
                        {message.message}
                      </p>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className={classes.containerMessageReceived}
                    >
                      {index > 0 ? (
                        array[index - 1].id_sender !== message.id_sender && (
                          <p className={classes.nicknameMessageReceived}>
                            {message.sender} :
                          </p>
                        )
                      ) : (
                        <p className={classes.nicknameMessageReceived}>
                          {message.sender} :
                        </p>
                      )}

                      <p className={`${classes.messageReceived} hyphens`}>
                        {message.message}
                      </p>
                    </div>
                  )
                )}
              </div>
              <div
                style={{
                  bottom: 0
                }}
              >
                <Grid container justify="center">
                  <Grid item className={classes.containerInputSendMessage}>
                    <form onSubmit={e => this.submitMessage(e)}>
                      <InputBase
                        multiline
                        rowsMax="4"
                        margin="dense"
                        autoFocus={true}
                        placeholder="Votre message ..."
                        className={classes.inputSendMessage}
                        onChange={e => this.handleChangeMessage(e)}
                        value={this.state.message}
                        endAdornment={
                          <InputAdornment position="end">
                            <SearchIcon
                              onClick={e => this.submitMessage(e)}
                              style={{
                                color: !this.state.message.length
                                  ? "#e0e0e0"
                                  : "#009682",
                                cursor: "pointer"
                              }}
                            />
                          </InputAdornment>
                        }
                      />
                    </form>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const styles = createStyles({
  containerMessage: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "5px 10px"
  },
  containerMessageReceived: {
    display: "flex",
    flexDirection: "column",
    margin: "5px 10px"
  },
  myMessage: {
    color: "#e6f7ff",
    borderRadius: "20px 20px 0 20px",
    backgroundColor: "#009682",
    maxWidth: "45%",
    padding: 10,
    margin: 0
  },
  nicknameMessageReceived: {
    margin: 0,
    fontWeight: "bold",
    color: "#009682"
  },
  messageReceived: {
    color: "#009682",
    borderRadius: "20px 20px 20px 0",
    backgroundColor: "#e6f7ff",
    maxWidth: "45%",
    padding: 10,
    margin: 0
  },
  containerInputSendMessage: {
    borderRadius: "30px",
    backgroundColor: "#e6f7ff"
  },
  inputSendMessage: {
    color: "#009682",
    margin: "5px 15px"
  }
});

export default withRouter(withStyles(styles)(PrivateMessagesRoom));
