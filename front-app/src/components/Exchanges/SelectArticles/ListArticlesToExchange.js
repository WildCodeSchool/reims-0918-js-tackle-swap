import React, { Component } from "react";
import ThumbnailArticleToExchange from "./ThumbnailArticleToExchange";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ls from "local-storage";
import { withStyles, createStyles, Paper } from "@material-ui/core";
import isArticle from "../../../functions/isArticle";

class ListArticleToExchange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myArticles: [],
      articleToExchange: 0
    };
    this.selectArticleToExchange = this.selectArticleToExchange.bind(this);
  }
  _isMounted = false;
  selectArticleToExchange = id => {
    this.setState({ articleToExchange: parseInt(id) });
  };

  sendProposition() {
    if (this.state.articleToExchange !== 0) {
      axios
        .post(
          `${process.env.REACT_APP_URL_API}/send_proposition/${
            this.props.match.params.id_article
          }`,
          {
            id_offer: this.state.articleToExchange
          },
          {
            headers: {
              accept: "application/json",
              authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
            }
          }
        )
        .then(results => {
          if (results.data.type === "error") {
            this.props.setFlashMessage(results.data.response.flashMessage);
          } else if (results.data.type === "success") {
            this.props.setFlashMessage(results.data.response.flashMessage);
          }
        });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  async componentDidMount() {
    this._isMounted = true;
    if (await isArticle(parseInt(this.props.match.params.id_article))) {
      axios
        .get(
          `${process.env.REACT_APP_URL_API}/swap_in_progress/${
            this.props.match.params.id_article
          }`,
          {
            headers: {
              accept: "application/json",
              authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
            }
          }
        )
        .then(results => {
          if (results.data.response.numberSwapInProgress > 0) {
            this.props.setFlashMessage({
              type: "warning",
              message: "Vous avez déjà proposé un échange pour cet article."
            });
            return this.props.history.push("/mes-echanges");
          }

          axios
            .get(`${process.env.REACT_APP_URL_API}/user_articles`, {
              headers: {
                accept: "application/json",
                authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
              }
            })
            .then(result => {
              if (this._isMounted) {
                this.setState(
                  { myArticles: result.data.response.results },
                  () => {
                    const isMyArticle = this.state.myArticles.filter(
                      article =>
                        article.id ===
                        parseInt(this.props.match.params.id_article)
                    );
                    if (isMyArticle.length > 0) {
                      this.props.setFlashMessage({
                        type: "warning",
                        message: "Vous propriétaire de cet article."
                      });
                      return this.props.history.goBack();
                    }
                  }
                );
              }
            });
        });
    } else {
      this.props.setFlashMessage({
        type: "error",
        message:
          "L'article pour lequel vous désirez proposer un échange n'éxiste pas."
      });
      return this.props.history.goBack();
    }
  }
  render() {
    const { classes } = this.props;
    console.log("article", this.props.match.params.id_article);
    return (
      <Grid container alignItems="center" direction="column">
        {this.state.myArticles.length > 0 ? (
          <form className={classes.form}>
            {this.state.myArticles.map((article, index) => (
              <Paper
                className={classes.paper}
                key={index}
                style={{ marginBottom: "10px" }}
              >
                <Grid item xs={12} style={{ width: "100%" }}>
                  <ThumbnailArticleToExchange
                    selectedArticle={this.state.articleToExchange}
                    selectArticleToExchange={this.selectArticleToExchange}
                    {...article}
                  />
                </Grid>
              </Paper>
            ))}
            <Button
              className={classes.buttonForm}
              onClick={() => this.sendProposition()}
              disabled={this.state.articleToExchange === 0}
            >
              Valider
            </Button>
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
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  buttonForm: {
    backgroundColor: "#009682"
  }
});

export default withStyles(styles)(ListArticleToExchange);
