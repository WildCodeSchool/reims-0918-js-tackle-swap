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
    exchangesProposed: [],
    exchangesReceived: []
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  getExchangesProposed() {
    axios
      .get(`${process.env.REACT_APP_URL_API}/exchanges-proposed`, {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
        }
      })
      .then(results =>
        this.setState({ exchangesProposed: results.data.response })
      );
  }

  getExchangesReceived() {
    axios
      .get(`${process.env.REACT_APP_URL_API}/exchanges-received`, {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
        }
      })
      .then(results =>
        this.setState({ exchangesReceived: results.data.response })
      );
  }

  componentDidMount() {
    this.getExchangesReceived();
    this.getExchangesProposed();
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div
        className={classes.root}
        style={{
          width: "97%",
          margin: "90px 5px 0 5px",
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
            <Tab label="Echanges proposés" />
            <Tab label="Echanges reçus" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <Grid container alignItems="center" direction="column">
            {this.state.exchangesProposed.length > 0 ? (
              this.state.exchangesProposed.map((exchangeProposed, index) => (
                <Grid
                  item
                  xs={12}
                  style={{
                    width: "100%",
                    backgroundColor: "rgba(230, 247, 255, 0.8)",
                    borderRadius: "4px",
                    border: "1px solid #009682",
                    marginBottom: "5px"
                  }}
                  key={index}
                >
                  <ThumbnailExchange {...exchangeProposed} />
                </Grid>
              ))
            ) : (
              <p>Vous n'avez proposé aucun échange</p>
            )}
          </Grid>

          <Grid container alignItems="center" direction="column">
            {this.state.exchangesReceived.length > 0 ? (
              this.state.exchangesReceived.map((exchangeReceived, index) => (
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
              ))
            ) : (
              <p>Vous n'avez reçu aucun échange</p>
            )}
          </Grid>
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
