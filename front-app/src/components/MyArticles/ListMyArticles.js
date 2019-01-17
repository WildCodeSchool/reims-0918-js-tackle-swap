import React, { Component } from "react";
import { Grid, Paper, Button } from "@material-ui/core";

class ListMyArticles extends Component {
  goToDetail(id) {
    this.props.history.push(`/article/${id}`);
  }
  render() {
    return (
      <div>
        <Grid container>
          {this.props.userArticles.map((article, index) => (
            <Grid item xs={12} key={index}>
              <Paper>
                <Grid container>
                  <Grid item xs={4}>
                    <img
                      src={`${process.env.REACT_APP_URL_API}${
                        article.pictures[0].url_picture
                      }`}
                      style={{
                        maxWidth: "95%",
                        maxHeight: "95%"
                      }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container>
                      <Grid item xs={12}>
                        <p>{article.name}</p>
                      </Grid>
                      <Grid item xs={12}>
                        <Button onClick={() => this.goToDetail(article.id)}>
                          Détail
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        {article.online ? "En ligne" : "Hors ligne"}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default ListMyArticles;
