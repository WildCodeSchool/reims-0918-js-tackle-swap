import React, { Component } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import axios from "axios";
import ls from "local-storage";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
});

class ListMyArticles extends Component {
  state = {
    display: "all",
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  goToPreview(id) {
    this.props.history.push(`/previsualisation/${id}`);
  }
  handleChangeDisplay(display) {
    this.setState({ display });
  }
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_URL_API}/user_articles`, {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
        }
      })
      .then(results => {
        this.props.setUserArticles(results.data.response);
      });
  }
  render() {
    const { classes, theme } = this.props;
    const showResults = this.props.userArticles.filter(article =>
      this.state.display === "all"
        ? true
        : this.state.display === "online"
        ? article.online
        : !article.online
    );
    return (
      <div
        style={{
          padding: "0 5px"
        }}
      >
        <AppBar
          position="static"
          color="default"
          style={{
            borderRadius: "10px 10px 0 0",
            boxShadow: "none",
            backgroundColor: "transparent"
          }}
        >
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "15px"
            }}
          >
            <Tab label="Tous" onClick={() => this.handleChangeDisplay("all")} />

            <Tab
              label="En ligne"
              onClick={() => this.handleChangeDisplay("online")}
            />
            <Tab
              label="Hors ligne"
              onClick={() => this.handleChangeDisplay("offline")}
            />
          </Tabs>
        </AppBar>

        <Grid container>
          {showResults.map((article, index) => (
            <Grid
              item
              xs={12}
              key={index}
              style={{
                margin: "5px 0"
              }}
            >
              <Grid
                container
                style={{
                  padding: "10px",
                  backgroundColor: "rgba(230, 247, 255, 0.8)",
                  borderRadius: "4px",
                  border: "1px solid rgb(0, 150, 130)"
                }}
              >
                <Grid item xs={12}>
                  <p
                    style={{
                      margin: "0",
                      paddingBottom: "10px",
                      color: "#009682",
                      paddingTop: "8px",
                      fontSize: "20px"
                    }}
                  >
                    Status de l'article :{" "}
                    {article.online ? (
                      <span style={{ color: "green" }}>
                        <DoneIcon />
                        {"  "} En ligne
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>
                        <CloseIcon />
                        {"  "} Hors ligne
                      </span>
                    )}
                  </p>
                  <hr
                    style={{
                      border: "0.5px solid #009682"
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_URL_API}${
                      article.pictures[0].url_picture
                    }`}
                    alt={`${process.env.REACT_APP_URL_API}${
                      article.pictures[0].url_picture
                    }`}
                    style={{
                      maxWidth: "95%",
                      maxHeight: "95%"
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Grid container>
                    <Grid item xs={12}>
                      <p
                        style={{
                          paddingLeft: "40px",
                          fontWeight: "bold",
                          color: "#009682",
                          paddingTop: "8px",
                          fontSize: "20px"
                        }}
                      >
                        {article.name}
                      </p>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ textAlign: "center", paddingLeft: "20px" }}
                    >
                      <Button
                        style={{
                          backgroundColor: "#009682",
                          color: "#e6f7ff",
                          border: "0.5px solid #009682"
                        }}
                        onClick={() => this.goToPreview(article.id)}
                      >
                        Modifier mon article
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ListMyArticles);
