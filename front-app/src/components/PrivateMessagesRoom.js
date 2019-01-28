import React, { Component } from "react";
import {
  Grid,
  Paper,
  createStyles,
  withStyles,
  InputBase,
  InputAdornment,
  Button
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { withRouter } from "react-router-dom";

import axios from "axios";
import ls from "local-storage";

import isConnected from "../functions/isConnected";
import isArticle from "../functions/isArticle";
import parseMessage from "../functions/parseMessage";
import "./hyphens.css";
import ThumbnailMyExchange from "./Exchanges/ThumbnailMyExchange";
import ThumbnailMyExchangeMessage from "./Exchanges/ThumbnailMyExchangeMessage";

export class PrivateMessagesRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      room: [],
      roomConnected: {},
      exchange: {},
      swap_in_progress: []
    };
  }
  socket = this.props.socket;
  _isMounted = false;
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
        id_article: this.state.roomConnected.id_article
      });
      this.setState({ message: "" });
    }
  };

  handleChangeMessage = e => {
    this.setState({ message: e.target.value });
  };
  addToRoom = message => {
    this.setState({ room: [...this.state.room, ...message] });
    axios.put(
      `${process.env.REACT_APP_URL_API}/notifications/read_my_message`,
      { room: this.state.roomConnected.roomName },
      {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
        }
      }
    );
  };
  componentDidUpdate() {
    const chatScroll = document.getElementById("chatBox");
    chatScroll.scrollTop = chatScroll.scrollHeight;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  async componentDidMount() {
    this._isMounted = true;
    if (!(await isArticle(parseInt(this.props.match.params.id_article)))) {
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
    axios
      .get(
        `${process.env.REACT_APP_URL_API}/article/${
          this.props.match.params.id_article
        }`
      )
      .then(results => this.setState({ exchange: results.data.response[0] }));

    axios
      .get(
        `${process.env.REACT_APP_URL_API}/swap/in_progress_message/${
          this.props.match.params.id_article
        }/${this.props.match.params.id_user}`,
        {
          headers: {
            Accept: "application/json",
            authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
          }
        }
      )
      .then(results =>
        this.setState({ swap_in_progress: results.data.response })
      );
  }

  connectedToChat() {
    const connectedToRoom = { ...this.props.match.params };
    console.log(connectedToRoom);
    this.socket.emit("room", connectedToRoom);
    this.socket.on("roomConnected", roomConnected => {
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

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const { classes } = this.props;

    if (this.state.exchange.pictures) {
      const mainPicture = this.state.exchange.pictures.filter(
        picture => picture.main_picture
      )[0].url_picture;
      const picture = mainPicture[0].url_picture;
    }
    return (
      <Grid container>
        <Grid item xs={12}>
          <Button
            style={{
              backgroundColor: "#009682",
              border: "1px solid #009682",
              display: "block",
              color: "white",
              marginTop: "10px",
              marginLeft: "10px"
            }}
            onClick={() => this.goBack()}
          >
            Retour
          </Button>
        </Grid>
        <Grid item xs={12}>
          {this.state.exchange.pictures &&
            this.state.swap_in_progress.length < 1 && (
              <ThumbnailMyExchange
                id={this.props.match.params.id_article}
                name={this.state.exchange.name}
                picture={
                  this.state.exchange.pictures.filter(
                    picture => picture.main_picture
                  )[0].url_picture
                }
              />
            )}
          {this.state.exchange.pictures &&
            this.state.swap_in_progress.length > 0 && (
              <ThumbnailMyExchangeMessage
                id={this.props.match.params.id_article}
                name={this.state.exchange.name}
                picture={
                  this.state.exchange.pictures.filter(
                    picture => picture.main_picture
                  )[0].url_picture
                }
                swap_in_progress={this.state.swap_in_progress}
              />
            )}
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <div style={classes.main_private_messages}>
              <div
                style={{ overflow: "scroll", height: "calc(100vh - 330px)" }}
                id="chatBox"
                className={classes.chatBox}
              >
                {this.state.room.map((message, index, array) =>
                  message.information ? (
                    message.id_sender !== this.props.user.id ? (
                      <div key={index} className={classes.containerInformation}>
                        <p className={`${classes.information} hyphens`}>
                          {parseMessage(message.message)}
                        </p>
                      </div>
                    ) : (
                      ""
                    )
                  ) : message.id_sender === this.props.user.id ? (
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
                        (array[index - 1].id_sender !== message.id_sender ||
                          array[index - 1].information === 1) && (
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
                  <Grid
                    item
                    xs={12}
                    className={classes.containerInputSendMessage}
                  >
                    <form onSubmit={e => this.submitMessage(e)}>
                      <InputBase
                        margin="dense"
                        autoFocus={true}
                        placeholder="Votre message ..."
                        className={classes.inputSendMessage}
                        onChange={e => this.handleChangeMessage(e)}
                        value={this.state.message}
                        endAdornment={
                          <InputAdornment position="end">
                            <SendIcon
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
  containerInformation: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
  information: {
    borderRadius: "20px",
    backgroundColor: "#00cccc",
    textAlign: "center",
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
    width: "100%",
    borderRadius: "30px",
    backgroundColor: "#e6f7ff",
    margin: 5
  },
  inputSendMessage: {
    width: "90%",
    color: "#009682",
    margin: "5px 15px"
  }
});
export default withRouter(withStyles(styles)(PrivateMessagesRoom));
