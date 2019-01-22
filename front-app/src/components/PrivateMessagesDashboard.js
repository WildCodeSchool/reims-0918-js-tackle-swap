import React, { Component } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import axios from "axios";
import ls from "local-storage";
import { withRouter } from "react-router-dom";

export class PrivateMessagesDashboard extends Component {
  constructor() {
    super();
    this.state = {
      listRooms: []
    };
  }
  showAllConversationsPrivates = () => {
    axios
      .get(`${process.env.REACT_APP_URL_API}/all-conversations-privates`, {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
        }
      })
      .then(results => this.setState({ listRooms: results.data.response }));
  };
  goToChat(room) {
    this.props.history.push(`/conversation-${room}`);
  }
  componentDidMount() {
    this.showAllConversationsPrivates();
  }

  render() {
    const classes = {
      main_private_messages: {}
    };
    return (
      <Grid container>
        <Grid item xs={12}>
          <div style={classes.main_private_messages}>
            <h2
              style={{
                textAlign: "center",
                color: "rgb(0, 150, 130)",
                fontSize: "1.5em",
                paddingTop: "15px",
                margin: "0px",
                padding: "10px"
              }}
            >
              Mes conversations
            </h2>
            {this.state.listRooms.length > 0 ? (
              this.state.listRooms.map((room, index) => (
                <div key={index} style={{ marginBottom: 10, padding: 5 }}>
                  <Grid
                    container
                    style={{
                      padding: "10px",
                      backgroundColor: "rgba(230, 247, 255, 0.8)",
                      borderRadius: "4px",
                      border: "1px solid #009682"
                    }}
                  >
                    <Grid item xs={4}>
                      <img
                        src={`${process.env.REACT_APP_URL_API}${
                          room.url_picture
                        }`}
                        alt={`${process.env.REACT_APP_URL_API}${
                          room.url_picture
                        }`}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <p
                        style={{
                          paddingLeft: "25px",
                          color: "rgb(0, 150, 130)",
                          fontSize: "1.1em"
                        }}
                      >
                        Article : {room.name}
                        <br />
                        Propriétaire : {room.nickname}
                        <br />
                        Interlocuteur : {room.nickname_interlocutor}
                      </p>
                      <Button
                        style={{
                          backgroundColor: "#009682",
                          color: "#e6f7ff",
                          border: "0.5px solid #009682",
                          width: "75%",
                          marginLeft: "30px"
                        }}
                        onClick={() => this.goToChat(room.room)}
                      >
                        Aller à la conversation
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              ))
            ) : (
              <h3
                style={{
                  textAlign: "center",
                  color: "rgba(0, 0, 0, 0.54)",
                  fontSize: "1.2em",
                  paddingTop: "2px"
                }}
              >
                Pas de conversation
              </h3>
            )}
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(PrivateMessagesDashboard);
