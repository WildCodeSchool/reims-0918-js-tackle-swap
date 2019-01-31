import React, { Component } from "react";
import ThumbnailArticleToExchange from "./ThumbnailArticleToExchange";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ls from "local-storage";
import { withStyles, createStyles, Paper } from "@material-ui/core";
import isArticle from "../../../functions/isArticle";

const styles = createStyles({
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "10px"
  },
  paper: {
    backgroundColor: "transparent",
    boxShadow: "none"
  },
  button: {
    backgroundColor: "#009682",
    border: "1px solid #009682",
    display: "block",
    color: "white",
    margin: "0 auto",
    width: "320px",
    boxShadow: "1px 1px 2px 1px rgba(28, 31, 35, .1)"
  }
});

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
            const flashMessage = results.data.response.flashMessage;
            axios
              .post(
                `${
                  process.env.REACT_APP_URL_API
                }/sendMessages/propositionExchange/`,
                { id_article: this.props.match.params.id_article },
                {
                  headers: {
                    accept: "application/json",
                    authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
                  }
                }
              )
              .then(results => {
                if (results.data.type === "error") {
                  this.props.setFlashMessage(
                    results.data.response.flashMessage
                  );
                } else if (results.data.type === "success") {
                  this.props.setFlashMessage(flashMessage);
                  this.props.history.push(
                    `/conversation-${results.data.response.room}`
                  );
                }
              });
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
                this.setState({ myArticles: result.data.response }, () => {
                  const isMyArticle = this.state.myArticles.filter(
                    article =>
                      article.id ===
                      parseInt(this.props.match.params.id_article)
                  );
                  if (isMyArticle.length > 0) {
                    this.props.setFlashMessage({
                      type: "warning",
                      message: "Vous êtes propriétaire de cet article."
                    });
                    return this.props.history.goBack();
                  }
                });
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
              className={classes.button}
              onClick={() => this.sendProposition()}
              disabled={this.state.articleToExchange === 0}
            >
              Valider
            </Button>
          </form>
        ) : (
          <p
            style={{
              margin: "30px",
              color: "rgb(0, 150, 130)",
              fontSize: "18px"
            }}
          >
            Vous devez avoir ajouté des leurres pour proposer un échange =>{" "}
            <a style={{ color: "#009682" }} href="/ajouter-un-article">
              Ajouter un leurre
            </a>
          </p>
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(ListArticleToExchange);
