import React, { Component } from "react";
import PicturesArticleDetails from "./ArticleDetails/PicturesArticleDetails";
import DescriptionArticleDetails from "./ArticleDetails/DescriptionArticleDetails";
import InteractionsArticleDetails from "./ArticleDetails/InteractionsArticleDetails";
import InteractionsArticleDetailsPreview from "./ArticleDetails/InteractionsArticleDetailsPreview";
import { withRouter } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

import { Button } from "@material-ui/core";

class ArticleDetails extends Component {
  constructor(props) {
    super(props);
    this.onlineArticle = this.onlineArticle.bind(this);
  }
  callApiArticleDetails = id => {
    this.props.match.url.includes("article")
      ? axios
          .get(`${process.env.REACT_APP_URL_API}/article/${id}`)
          .then(results => {
            if (results.data.response[0]) {
              this.props.articleDetailsReceived(results.data.response[0]);
            } else {
              this.props.setFlashMessage({
                type: "warning",
                message: "L'article n'existe pas."
              });
              this.props.history.push("/");
              return;
            }
          })
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
        this.props.history.push(`/mes-articles/`);
      });
  }
  goBack() {
    this.props.history.goBack();
  }
  componentDidMount() {
    this.callApiArticleDetails(this.props.match.params.id);
  }

  render() {
    if (
      this.props.match.url.includes("previsualisation") &&
      this.props.user.id !== this.props.articleDetails.owner_id &&
      this.props.user.id &&
      this.props.articleDetails.owner_id
    ) {
      this.props.setFlashMessage({
        type: "warning",
        message: "Vous ne pouvez pas accéder à cette page."
      });
      this.props.history.goBack();
      return;
    }

    return (
      <>
        {this.props.match.url.includes("previsualisation") && (
          <InteractionsArticleDetailsPreview
            {...this.props.articleDetails}
            onlineArticle={this.onlineArticle}
          />
        )}
        <div
          style={{
            opacity: "0.9",
            backgroundColor: "white",
            borderCollapse: "collapse"
          }}
        >
          <div
            style={{
              maxWidth: "380px",
              justifyContent: "space-between",
              display: "flex"
            }}
          >
            <div className="TitleDescription">
              {this.props.articleDetails.name}
            </div>
            <div>
              <Button
                style={{
                  paddingLeft: "120px",
                  color: "grey"
                }}
                onClick={() => this.goBack()}
              >
                <CloseIcon />
              </Button>
            </div>
          </div>
          <PicturesArticleDetails {...this.props.articleDetails} />

          <DescriptionArticleDetails {...this.props.articleDetails} />
          {this.props.match.url.includes("article") ? (
            <InteractionsArticleDetails
              setFlashMessage={this.props.setFlashMessage}
              articleDetails={this.props.articleDetails}
              user={this.props.user}
            />
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

export default withRouter(ArticleDetails);
