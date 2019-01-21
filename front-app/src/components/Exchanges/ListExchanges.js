import React, { Component } from "react";
import ThumbnailExchange from "./ThumbnailExchange";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import ls from "local-storage";
import axios from "axios";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
});

class ListExchanges extends Component {
  state = {
    value: 0,
    value2: 0,
    value3: 0,
    exchangesProposed: [],
    exchangesReceived: [],
    exchangesFinished: []
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  handleChange2 = (event, value2) => {
    this.setState({ value2 });
  };

  handleChangeIndex2 = index2 => {
    this.setState({ value: index2 });
  };

  handleChange3 = (event, value3) => {
    this.setState({ value3 });
  };

  handleChangeIndex3 = index3 => {
    this.setState({ value: index3 });
  };

  getExchangesProposed() {
    axios
      .get(`${process.env.REACT_APP_URL_API}/exchanges-proposed`, {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
        }
      })
      .then(results => {
        if (results.data.response !== "no-data") {
          this.setState({ exchangesProposed: results.data.response });
        }
      });
  }

  getExchangesReceived() {
    axios
      .get(`${process.env.REACT_APP_URL_API}/exchanges-received`, {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
        }
      })
      .then(results => {
        if (results.data.response !== "no-data") {
          this.setState({ exchangesReceived: results.data.response });
        }
      });
  }

  getExchangesFinished() {
    axios
      .get(`${process.env.REACT_APP_URL_API}/exchanges-finished`, {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
        }
      })
      .then(results => {
        if (results.data.response !== "no-data") {
          this.setState({
            exchangesFinished: results.data.response
          });
        }
      });
  }

  componentDidMount() {
    this.getExchangesReceived();
    this.getExchangesProposed();
    this.getExchangesFinished();
  }

  render() {
    const { classes, theme } = this.props;
    const exchangesAccepted = this.state.exchangesFinished.filter(
      exchange => exchange.accepted
    );
    const exchangesRefused = this.state.exchangesFinished.filter(
      exchange => exchange.refused
    );
    return (
      <div
        className={classes.root}
        style={{
          width: "97%",
          margin: "0 5px",
          borderRadius: "10px",
          backgroundColor: "transparent"
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
            <Tab label="Echanges en cours" />
            <Tab label="Echanges terminés" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <div>
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
                value={this.state.value2}
                onChange={this.handleChange2}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginBottom: "15px"
                }}
              >
                <Tab label="Proposés" />
                <Tab label="Reçus" />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={this.state.value2}
              onChangeIndex={this.handleChangeIndex2}
            >
              <Grid container alignItems="center" direction="column">
                {this.state.exchangesProposed.length > 0 ? (
                  this.state.exchangesProposed.map(
                    (exchangeProposed, index) => (
                      <Grid
                        item
                        xs={12}
                        style={{
                          width: "100%",
                          backgroundColor: "rgba(255, 255, 255, 0.4)",
                          borderRadius: "10px",
                          border: "1px solid #009682",
                          marginBottom: "5px"
                        }}
                        key={index}
                      >
                        <ThumbnailExchange {...exchangeProposed} />
                      </Grid>
                    )
                  )
                ) : (
                  <p>Vous n'avez proposé aucun échange</p>
                )}
              </Grid>

              <Grid container alignItems="center" direction="column">
                {this.state.exchangesReceived.length > 0 ? (
                  this.state.exchangesReceived.map(
                    (exchangeReceived, index) => (
                      <Grid
                        item
                        xs={12}
                        style={{
                          width: "100%",
                          backgroundColor: "rgba(255, 255, 255, 0.4)",
                          borderRadius: "10px",
                          border: "1px solid #009682",
                          marginBottom: "5px"
                        }}
                        key={index}
                      >
                        <ThumbnailExchange {...exchangeReceived} />{" "}
                      </Grid>
                    )
                  )
                ) : (
                  <p>Vous n'avez reçu aucun échange</p>
                )}
              </Grid>
            </SwipeableViews>
          </div>
          <div>
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
                value={this.state.value3}
                onChange={this.handleChange3}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginBottom: "15px"
                }}
              >
                <Tab label="Acceptés" />
                <Tab label="Refusés" />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={this.state.value3}
              onChangeIndex={this.handleChangeIndex3}
            >
              {/* Mettre en place l'affichage des echanges terminés */}

              <Grid container alignItems="center" direction="column">
                {exchangesAccepted.length > 0 ? (
                  exchangesAccepted.map((exchange, index) => (
                    <Grid
                      item
                      xs={12}
                      style={{
                        width: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        borderRadius: "10px",
                        border: "1px solid #009682",
                        marginBottom: "5px"
                      }}
                      key={index}
                    >
                      <ThumbnailExchange
                        exchanged="accepted"
                        name={exchange.annonce_name}
                        id_swap={exchange.swap_id}
                        pictures={[
                          {
                            main_picture: 1,
                            url_picture: exchange.annonce_picture
                          }
                        ]}
                      />
                    </Grid>
                  ))
                ) : (
                  <p>Pas d'échanges acceptés</p>
                )}
              </Grid>
              <Grid container alignItems="center" direction="column">
                {exchangesRefused.length > 0 ? (
                  exchangesRefused.map((exchange, index) => (
                    <Grid
                      item
                      xs={12}
                      style={{
                        width: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        borderRadius: "10px",
                        border: "1px solid #009682",
                        marginBottom: "5px"
                      }}
                      key={index}
                    >
                      <ThumbnailExchange
                        exchanged="refused"
                        name={exchange.annonce_name}
                        id_swap={exchange.swap_id}
                        pictures={[
                          {
                            main_picture: 1,
                            url_picture: exchange.annonce_picture
                          }
                        ]}
                      />
                    </Grid>
                  ))
                ) : (
                  <p>Pas d'échanges refusés</p>
                )}
              </Grid>
            </SwipeableViews>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

ListExchanges.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ListExchanges);
