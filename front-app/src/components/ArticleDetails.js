import React, { Component } from "react";
import PicturesArticleDetails from "./ArticleDetails/PicturesArticleDetails";
import DescriptionArticleDetails from "./ArticleDetails/DescriptionArticleDetails";
import InteractionsArticleDetails from "./ArticleDetails/InteractionsArticleDetails";
import InteractionsArticleDetailsPreview from "./ArticleDetails/InteractionsArticleDetailsPreview";
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
        <div className="ArticleDetails">
          <h2 className="TitleDescription">
            {this.props.articleDetails.name}
            <FavoriteArticleDetails />
          </h2>

          <PicturesArticleDetails {...this.props.articleDetails} />

          <DescriptionArticleDetails {...this.props.articleDetails} />
          {this.props.match.url.includes("article") ? (
            <InteractionsArticleDetails />
          ) : (
            <InteractionsArticleDetailsPreview />
          )}
        </div>
      </div>
    );
  }
}

export default ArticleDetails;
