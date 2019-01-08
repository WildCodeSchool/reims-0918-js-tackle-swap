import React, { Component } from "react";
import PicturesArticleDetails from "./ArticleDetails/PicturesArticleDetails";
import DescriptionArticleDetails from "./ArticleDetails/DescriptionArticleDetails";
import InteractionsArticleDetails from "./ArticleDetails/InteractionsArticleDetails";
import InteractionsArticleDetailsPreview from "./ArticleDetails/InteractionsArticleDetailsPreview";
import FavoriteArticleDetails from "./ArticleDetails/FavoriteArticle";

import axios from "axios";

class ArticleDetails extends Component {
  constructor(props) {
    super(props);
    this.onlineArticle = this.onlineArticle.bind(this);
  }
  callApiArticleDetails = id => {
    axios
      .get(`http://localhost:5000/article/${id}`)
      .then(results =>
        this.props.articleDetailsReceived(results.data.response[0])
      );
  };

  onlineArticle(idArticle, online) {
    axios
      .put(`http://localhost:5000/article_${idArticle}/online_${online}`)
      .then(results => {
        console.log(results);
        this.props.setFlashMessage(results.data.response.flashMessage);
      });
  }

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
            <InteractionsArticleDetails
              articleDetails={this.props.articleDetails}
            />
          ) : (
            <InteractionsArticleDetailsPreview
              {...this.props.articleDetails}
              onlineArticle={this.onlineArticle}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ArticleDetails;
