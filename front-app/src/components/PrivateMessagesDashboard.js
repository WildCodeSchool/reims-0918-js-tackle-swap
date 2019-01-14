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
    console.log(this.state.listRooms);
    return (
      <Grid container>
        <Grid item xs={12}>
          <div style={classes.main_private_messages}>
            <h2>Mes conversations</h2>
            {this.state.listRooms.length > 0 ? (
              this.state.listRooms.map((room, index) => (
                <Paper key={index} style={{ marginBottom: 10, padding: 5 }}>
                  <Grid container>
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
                    <Grid item xs={8} style={{ paddingLeft: 5 }}>
                      <p>
                        Article : {room.name}
                        <br />
                        Propriétaire : {room.nickname}
                        <br />
                        Interlocuteur : {room.nickname_interlocutor}
                      </p>
                      <Button onClick={() => this.goToChat(room.room)}>
                        Aller à la conversation
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              ))
            ) : (
              <h3>Pas de conversation</h3>
            )}
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(PrivateMessagesDashboard);
