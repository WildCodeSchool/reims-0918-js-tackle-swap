import React, { Component } from "react";
import PicturesArticleDetails from "./ArticleDetails/PicturesArticleDetails";
import DescriptionArticleDetails from "./ArticleDetails/DescriptionArticleDetails";
import InteractionsArticleDetails from "./ArticleDetails/InteractionsArticleDetails";
import FavoriteArticleDetails from "./ArticleDetails/FavoriteArticle";

import axios from "axios";

import { Row, Col, Container } from "reactstrap";

class ArticleDetails extends Component {
  callApiArticleDetails = id => {
    axios
      .get(`http://localhost:3000/article/${id}`)
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
        <Container>
          <Row>
            <Col>
              <h1>john</h1>
            </Col>
            <Col>
              <FavoriteArticleDetails />
            </Col>
          </Row>
          <Col>
            <Row>
              <PicturesArticleDetails />
            </Row>
            <Row>
              <DescriptionArticleDetails />
            </Row>
            <Row>
              <InteractionsArticleDetails />
            </Row>
          </Col>
        </Container>
      </div>
    );
  }
}

export default ArticleDetails;
