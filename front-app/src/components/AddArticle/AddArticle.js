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
    this.submitPicture = this.submitPicture.bind(this);
    this.defineMainPicture = this.defineMainPicture.bind(this);
    this.deletePicture = this.deletePicture.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
      idArticle: null,
      selectedFilesUpload: null,
      picturesUploaded: []
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

  submitPicture = event => {
    const data = new FormData();
    data.append("picture", event.target.files[0]);

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
      .then(result => {
        console.log(result);
        document.getElementById("picture").value = "";
        this.setState({
          picturesUploaded: [
            ...this.state.picturesUploaded,
            result.data.response
          ]
        });
      })
      .catch(error =>
        console.log(error.response.data.response.flashMessage.message)
      );
  };

  defineMainPicture(idPicture) {
    axios
      .put(
        `http://localhost:5000/main?idPicture=${idPicture}&idArticle=${
          this.state.idArticle
        }`,
        {
          headers: {
            Accept: "application/json",
            authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
          }
        }
      )
      .then(results => {
        const { idPicture } = results.data.response;
        const picturesUploaded = [...this.state.picturesUploaded];
        const newPicturesUplaoded = picturesUploaded.map(picture =>
          picture.idPicture === parseInt(idPicture)
            ? { ...picture, mainPicture: 1 }
            : { ...picture, mainPicture: 0 }
        );
        this.setState({ picturesUploaded: newPicturesUplaoded });
      });
  }
  deletePicture(idPicture) {
    axios
      .delete(`http://localhost:5000/picture/${idPicture}`, {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
        }
      })
      .then(results => {
        const { idPicture } = results.data.response;
        const picturesUploaded = [...this.state.picturesUploaded];
        const newPicturesUplaoded = picturesUploaded.filter(
          picture => picture.idPicture !== parseInt(idPicture)
        );
        this.setState({ picturesUploaded: newPicturesUplaoded });
      });
  }

  nextPage() {
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
            {page === 1 && (
              <AddArticleFirstPage onSubmit={this.onSubmitInformations} />
            )}
            {page === 2 && (
              <AddArticleSecondPage
                submitPicture={this.submitPicture}
                picturesUploaded={this.state.picturesUploaded}
                idArticle={this.state.idArticle}
                defineMainPicture={this.defineMainPicture}
                deletePicture={this.deletePicture}
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
