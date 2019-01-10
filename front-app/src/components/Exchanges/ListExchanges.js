import React, { Component } from "react";
import ThumbnailExchange from "./ThumbnailExchange";
import Grid from "@material-ui/core/Grid";

class ListExchanges extends Component {
  render() {
    return (
      <Grid
        container
        spacing={8}
        alignItems="center"
        direction="row"
        justify="space-around"
      >
        <ThumbnailExchange />
      </Grid>
    );
  }
}

export default ListExchanges;
