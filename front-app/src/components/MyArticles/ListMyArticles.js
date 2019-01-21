import React, { Component } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

import axios from "axios";
import ls from "local-storage";

class ListMyArticles extends Component {
  state = {
    display: "all"
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
        <Grid container>
          <Grid item xs={12}>
            <Button onClick={() => this.handleChangeDisplay("all")}>
              Tous
            </Button>
            <Button onClick={() => this.handleChangeDisplay("online")}>
              En ligne
            </Button>
            <Button onClick={() => this.handleChangeDisplay("offline")}>
              Hors Ligne
            </Button>
          </Grid>
        </Grid>
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
              <Paper>
                <Grid
                  container
                  style={{
                    padding: "0 5px"
                  }}
                >
                  <Grid item xs={12}>
                    <p>
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
                        <p style={{ textAlign: "center", fontWeight: "bold" }}>
                          {article.name}
                        </p>
                      </Grid>
                      <Grid item xs={12} style={{ textAlign: "center" }}>
                        <Button onClick={() => this.goToPreview(article.id)}>
                          Modifier mon article
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default ListMyArticles;
