import React, { Component } from "react";
import ThumbnailExchange from "./ThumbnailExchange";
import Grid from "@material-ui/core/Grid";

class ListExchanges extends Component {
  render() {
    return (
      <Grid container alignItems="center" direction="column">
        <ThumbnailExchange />
      </Grid>
    );
  }
}

export default ListExchanges;
