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
          <Paper>
            <div style={classes.main_private_messages}>
              <h2>PrivateMessagesDashboard</h2>
              {this.state.listRooms.length > 0 ? (
                this.state.listRooms.map((room, index) => (
                  <p key={index}>
                    {room.participant}{" "}
                    <Button onClick={() => this.goToChat(room.room)}>
                      Aller à la conversation
                    </Button>
                  </p>
                ))
              ) : (
                <h3>Pas de conversation</h3>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(PrivateMessagesDashboard);
