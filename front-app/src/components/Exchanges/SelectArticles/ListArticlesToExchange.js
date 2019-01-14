import React, { Component } from "react";
import ThumbnailArticleToExchange from "./ThumbnailArticleToExchange";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ls from "local-storage";
import { withStyles, createStyles, Paper } from "@material-ui/core";

class ListArticleToExchange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myArticles: [],
      articleToExchange: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = event => {
    this.setState({ articleToExchange: parseInt(event.target.value) });
  };
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_URL_API}/user_articles`, {
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
    const { classes } = this.props;
    console.log("article", this.props.match.params.id_article);
    return (
      <Grid container alignItems="center" direction="column">
        {this.state.myArticles.length > 0 ? (
          <form className={classes.form}>
            {this.state.myArticles.map((article, index) => (
              <Paper className={classes.paper} key={index}>
                <Grid
                  item
                  xs={12}
                  style={{ width: "100%", marginBottom: "10px" }}
                >
                  <ThumbnailArticleToExchange
                    handleChange={this.handleChange}
                    {...article}
                  />
                </Grid>
              </Paper>
            ))}
            <Button className={classes.buttonForm}>Valider</Button>
          </form>
        ) : (
          <p>
            Vous devez avoir ajouté des leurres pour proposer un échange =>{" "}
            <a href="/ajouter-un-article">Ajouter un leurre</a>
          </p>
        )}
      </Grid>
    );
  }
}

const styles = createStyles({
  form: {
    width: "100%"
  },
  buttonForm: {
    backgroundColor: "#009682"
  }
});

export default withStyles(styles)(ListArticleToExchange);
