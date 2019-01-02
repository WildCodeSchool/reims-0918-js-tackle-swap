import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";

import axios from "axios";
import ls from "local-storage";

import AddArticleFirstPage from "./AddArticleFirstPage";
import AddArticleSecondPage from "./AddArticleSecondPage";

class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.onSubmitInformations = this.onSubmitInformations.bind(this);
    this.handleChangeAddPicture = this.handleChangeAddPicture.bind(this);
    this.submitPicture = this.submitPicture.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
      idArticle: null,
      selectedFilesUpload: null
    };
  }
  onSubmitInformations = values =>
    axios
      .post("http://localhost:5000/article", values, {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
        }
      })
      .then(result => {
        if (result.data.type === "success") {
          console.log(result.data);
          this.setState({
            page: 2,
            idArticle: result.data.response.insertId
          });
        }
      });

  handleChangeAddPicture = event => {
    this.setState({ selectedFilesUpload: event.target.files[0] }, () =>
      console.log(this.state.selectedFilesUpload)
    );
  };

  submitPicture = event => {
    event.preventDefault();
    const data = new FormData();
    data.append("picture", this.state.selectedFilesUpload);

    axios
      .post(
        `http://localhost:5000/picture/article/${this.state.idArticle}`,
        data,
        {
          headers: {
            ContentType: "multipart/form-data",
            Accept: "application/json",
            authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
          }
        }
      )
      .then(result => console.log(result));
  };

  nextPage(e) {
    e.preventDefault();
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { page } = this.state;
    return (
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            <h4>Ajouter un article à votre vitrine :</h4>
            {page === 1 && (
              <AddArticleFirstPage onSubmit={this.onSubmitInformations} />
            )}
            {page === 2 && (
              <AddArticleSecondPage
                onSubmit={this.nextPage}
                handleChangeAddPicture={this.handleChangeAddPicture}
                submitPicture={this.submitPicture}
              />
            )}
            {page === 3 && <p>Add</p>}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default AddArticle;
