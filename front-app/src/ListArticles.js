import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardImg,
  Container,
  Row,
  Col
} from "reactstrap";

class ListArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [
        {
          id: 1,
          name: "leurre de 14",
          swap: 0,
          description: "Super leurre de bonne qualité",
          brand: "monsieurpecheur",
          article_length: 14.5,
          article_weight: 15,
          article_color: "rouge",
          article_state: 3,
          create_at: "2018-11-28T09:18:52.000Z",
          owner_id: 1
        },
        {
          id: 1,
          name: "leurre de 18",
          swap: 0,
          description: "Super leurre de bonne qualité",
          brand: "monsieurpecheur",
          article_length: 14.5,
          article_weight: 15,
          article_color: "rouge",
          article_state: 3,
          create_at: "2018-11-28T09:18:52.000Z",
          owner_id: 1
        },
        {
          id: 1,
          name: "leurre de 14",
          swap: 0,
          description: "Super leurre de bonne qualité",
          brand: "monsieurpecheur",
          article_length: 14.5,
          article_weight: 15,
          article_color: "rouge",
          article_state: 3,
          create_at: "2018-11-28T09:18:52.000Z",
          owner_id: 1
        }
      ]
    };
  }

  render() {
    return (
      <Container>
        <Row>
          {this.state.articles.map(article => (
            <Col xs="6" sm="4" md="4" lg="3">
              <Card>
                <CardImg
                  top
                  width="100%"
                  src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180"
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle>Name:{article.name}</CardTitle>
                  <CardText>Description:{article.description}</CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default ListArticles;
