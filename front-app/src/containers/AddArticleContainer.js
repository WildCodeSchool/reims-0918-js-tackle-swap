import React, { Component } from "react";
import AddArticle from "../components/AddArticle";
import axios from "axios";
import ls from "local-storage";

class AddArticleContainer extends Component {
  submit = values =>
    axios.post("http://localhost:5000/article", {
      headers: {
        accept: "application/json",
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
      },
      body: values
    });

  render() {
    return <AddArticle onSubmit={this.submit} />;
  }
}

export default AddArticleContainer;
