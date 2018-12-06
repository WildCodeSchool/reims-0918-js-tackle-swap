import React, { Component } from "react";
import AddArticle from "../components/AddArticle";
import axios from "axios";

class AddArticleContainer extends Component {
  submit = values =>
    axios.post(
      "http://localhost:3000/article",
      Object.assign({ owner_id: 1 }, values)
    );

  render() {
    return <AddArticle onSubmit={this.submit} />;
  }
}

export default AddArticleContainer;
