import React, { Component } from "react";
import PicturesArticleDetails from "./ArticleDetails/PicturesArticleDetails";
import DescriptionArticleDetails from "./ArticleDetails/DescriptionArticleDetails";
import InteractionsArticleDetails from "./ArticleDetails/InteractionsArticleDetails";
import FavoriteArticleDetails from "./ArticleDetails/FavoriteArticle";

import axios from "axios";

import { Row, Col, Card, CardTitle } from "reactstrap";

class ArticleDetails extends Component {
  callApiArticleDetails = id => {
    axios
      .get(`http://localhost:3000/article/${id}`)
      .then(results => this.props.articleDetails(results.data.response[0]));
  };

  componentDidMount() {
    this.callApiArticleDetails(this.props.match.params.id);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Card>
          <Row>
            <Col>
              <CardTitle>john</CardTitle>
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
        </Card>
      </div>
    );
  }
}

export default ArticleDetails;
