import React, { Component } from "react";
import ThumbnailExchange from "./ThumbnailExchange";
import Grid from "@material-ui/core/Grid";

class ListExchanges extends Component {
  render() {
    return (
      <Grid container alignItems="center" direction="column">
        <Grid item xs={12} style={{ width: "100%", marginBottom: "10px" }}>
          <ThumbnailExchange />
        </Grid>
      </Grid>
    );
  }
}

export default ListExchanges;
