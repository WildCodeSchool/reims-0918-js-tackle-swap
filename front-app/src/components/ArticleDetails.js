import React, { Component } from "react";
import PicturesArticleDetails from "./ArticleDetails/PicturesArticleDetails";
import DescriptionArticleDetails from "./ArticleDetails/DescriptionArticleDetails";
import InteractionsArticleDetails from "./ArticleDetails/InteractionsArticleDetails";
import InteractionsArticleDetailsPreview from "./ArticleDetails/InteractionsArticleDetailsPreview";
import FavoriteArticleDetails from "./ArticleDetails/FavoriteArticle";
import { withRouter } from "react-router-dom";

import axios from "axios";
import ls from "local-storage";

import isConnected from "../functions/isConnected";

class ArticleDetails extends Component {
  constructor(props) {
    super(props);
    this.onlineArticle = this.onlineArticle.bind(this);
  }
  callApiArticleDetails = id => {
    this.props.match.url.includes("article")
      ? axios
          .get(`${process.env.REACT_APP_URL_API}/article/${id}`)
          .then(results =>
            this.props.articleDetailsReceived(results.data.response[0])
          )
      : axios
          .get(`${process.env.REACT_APP_URL_API}/preview/${id}`)
          .then(results =>
            this.props.articleDetailsReceived(results.data.response[0])
          );
  };

  onlineArticle(idArticle, online) {
    axios
      .put(
        `${process.env.REACT_APP_URL_API}/article_${idArticle}/online_${online}`
      )
      .then(results => {
        this.props.setFlashMessage(results.data.response.flashMessage);
        this.props.history.push(`/article/${idArticle}`);
      });
  }

  componentDidMount() {
    this.callApiArticleDetails(this.props.match.params.id);
    if (isConnected() && !this.props.user.id) {
      axios
        .get(`${process.env.REACT_APP_URL_API}/personnal-informations`, {
          headers: {
            Accept: "application/json",
            authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
          }
        })
        .then(results => {
          this.props.setUserInformation(results.data.response);
        });
    }
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
              setFlashMessage={this.props.setFlashMessage}
              articleDetails={this.props.articleDetails}
              user={this.props.user}
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

export default withRouter(ArticleDetails);
