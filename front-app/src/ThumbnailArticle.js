import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row
} from "reactstrap";

const ThumbnailArticle = props => {
  return (
    <Col xs="6" sm="4" md="4" lg="3">
      <Card className="mb-3" style={{ border: "1px solid black" }}>
        <CardImg top width="100%" src={props.picture} alt="article picture" />
        <CardBody style={{ padding: "0" }}>
          <Row>
            <Col>
              <CardTitle>{props.name}</CardTitle>
              <CardSubtitle>Catégorie</CardSubtitle>
            </Col>
          </Row>
          <Row>
            <Col xs={{ size: 4, offset: 8 }}>
              <i class="far fa-heart" />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ThumbnailArticle;
