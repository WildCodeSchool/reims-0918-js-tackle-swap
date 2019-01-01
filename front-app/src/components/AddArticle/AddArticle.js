import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import AddArticleFirstPage from "./AddArticleFirstPage";

class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    };
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;
    return (
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            <h4>Ajouter un article à votre vitrine :</h4>
            {page === 1 && <AddArticleFirstPage onSubmit={this.nextPage} />}
            {page === 2 && <p>Suivant</p>}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default AddArticle;
