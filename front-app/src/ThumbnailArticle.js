import React from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardImg,
  Row,
  Col,
  CardSubtitle
} from "reactstrap";

const ThumbnailArticle = props => {
  return (
    <Col xs="6" sm="4" md="4" lg="3">
      <Card style={{ border: "2px solid black" }} className="mb-3">
        <CardImg top width="100%" src={props.picture} alt="Picture article" />
        <CardBody style={{ padding: "0" }} className="text-center">
          <CardTitle>{props.name}</CardTitle>
          <CardSubtitle>Categorie</CardSubtitle>
          <Row>
            <Col xs={{ size: "4", offset: "8" }}>
              <i class="far fa-heart" />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ThumbnailArticle;
