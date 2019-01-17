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
      <div className={classes.root} style={{ width: "100%" }}>
        <AppBar position="static" color="default">
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
                  style={{ width: "100%", backgroundColor: "transparent" }}
                >
                  <ThumbnailExchange {...exchangeProposed} key={index} />
                </Grid>
              ))
            ) : (
              <p>Vous n'avez proposé aucun échange</p>
            )}
          </Grid>

          <Grid container alignItems="center" direction="column">
            {this.state.exchangesReceived.length > 0 ? (
              this.state.exchangesReceived.map(exchangeReceived => (
                <Grid item xs={12} style={{ width: "100%" }}>
                  <ThumbnailExchange {...exchangeReceived} />{" "}
                </Grid>
              ))
            ) : (
              <p>Vous n'avez reçu aucuns échanges</p>
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
