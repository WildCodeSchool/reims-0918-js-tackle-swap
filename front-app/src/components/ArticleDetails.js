import React, { Component } from "react";
import PicturesArticleDetails from "./ArticleDetails/PicturesArticleDetails";
import DescriptionArticleDetails from "./ArticleDetails/DescriptionArticleDetails";
import InteractionsArticleDetails from "./ArticleDetails/InteractionsArticleDetails";
import FavoriteArticleDetails from "./ArticleDetails/FavoriteArticle";

class ArticleDetails extends Component {
  render() {
    return (
      <div>
        <FavoriteArticleDetails />
        <PicturesArticleDetails />
        <DescriptionArticleDetails />
        <InteractionsArticleDetails />
      </div>
    );
  }
}

export default ArticleDetails;
