import React, { Component } from "react";
import ThumbnailArticleToExchange from "./ThumbnailArticleToExchange";
import Grid from "@material-ui/core/Grid";

class ListArticleToExchange extends Component {
  render() {
    return (
      <Grid container alignItems="center" direction="column">
        <ThumbnailArticleToExchange />
      </Grid>
    );
  }
}

export default ListArticleToExchange;
