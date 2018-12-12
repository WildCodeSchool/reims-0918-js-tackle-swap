import React, { Component } from "react";
import AddArticle from "../components/AddArticle";
import axios from "axios";
import ls from "local-storage";

class AddArticleContainer extends Component {
  submit = values =>
    axios
      .post("http://localhost:5000/article", values, {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
        }
      })
      .then(result => console.log(result));

  render() {
    return <AddArticle onSubmit={this.submit} />;
  }
}

export default AddArticleContainer;
