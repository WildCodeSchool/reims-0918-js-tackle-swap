import React, { Component } from "react";
import ThumbnailExchange from "./ThumbnailExchange";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
});

class ListExchanges extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  // getExchangeProposed(){
  //   axios
  //   .get(`${process.env.REACT_APP_URL_API}/exchanges-proposed`, {
  //     headers: {
  //       Accept: "application/json",
  //       authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
  //     }
  //   })
  //   .then()
  // }

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
            <Grid item xs={12} style={{ width: "100%", marginBottom: "10px" }}>
              <ThumbnailExchange />
            </Grid>
            <Grid item xs={12} style={{ width: "100%", marginBottom: "10px" }}>
              <ThumbnailExchange />
            </Grid>
          </Grid>
          <Grid container alignItems="center" direction="column">
            <Grid item xs={12} style={{ width: "100%", marginBottom: "10px" }}>
              <ThumbnailExchange />
            </Grid>
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
