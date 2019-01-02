import React, { Component } from "react";
import AddArticle from "../components/AddArticle/AddArticle";
import axios from "axios";
import ls from "local-storage";

class AddArticleContainer extends Component {
  render() {
    return <AddArticle />;
  }
}

export default AddArticleContainer;
