import React, { Component } from "react";
import ThumbnailArticleToExchange from "./ThumbnailArticleToExchange";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ls from "local-storage";

class ListArticleToExchange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myArticles: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/my-articles", {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
        }
      })
      .then(result =>
        this.setState({ myArticles: result.data.response.results })
      );
  }
  render() {
    return (
      <Grid container alignItems="center" direction="column">
        {this.state.myArticles.map(article => (
          <ThumbnailArticleToExchange {...article} />
        ))}
        <Button style={{ backgroundColor: "#009682" }}>Valider</Button>
      </Grid>
    );
  }
}

export default ListArticleToExchange;
