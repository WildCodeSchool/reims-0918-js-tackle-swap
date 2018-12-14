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
        <div className="ArticleDetails">
          <h2 className="TitleDescription">
            {this.props.articleDetails.name}
            <i
              className="far fa-heart"
              style={{
                color: "#00cccc",
                fontSize: "22px",
                padding: "5px"
              }}
            />
          </h2>

          <PicturesArticleDetails {...this.props.articleDetails} />

          <DescriptionArticleDetails {...this.props.articleDetails} />

          <InteractionsArticleDetails />
        </div>
      </div>
    );
  }
}

export default ArticleDetails;
