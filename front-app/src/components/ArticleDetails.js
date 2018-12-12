import React, { Component } from "react";
import PicturesArticleDetails from "./ArticleDetails/PicturesArticleDetails";
import DescriptionArticleDetails from "./ArticleDetails/DescriptionArticleDetails";
import InteractionsArticleDetails from "./ArticleDetails/InteractionsArticleDetails";
import FavoriteArticleDetails from "./ArticleDetails/FavoriteArticle";

import axios from "axios";

class ArticleDetails extends Component {
  callApiArticleDetails = id => {
    axios
      .get(`http://localhost:5000/article/${id}`)
      .then(results =>
        this.props.articleDetailsReceived(results.data.response[0])
      );
  };

  componentDidMount() {
    this.callApiArticleDetails(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <h1>{this.props.articleDetails.name}</h1>

        <FavoriteArticleDetails />

        <PicturesArticleDetails {...this.props.articleDetails} />

        <DescriptionArticleDetails {...this.props.articleDetails} />

        <InteractionsArticleDetails />
      </div>
    );
  }
}

export default ArticleDetails;
