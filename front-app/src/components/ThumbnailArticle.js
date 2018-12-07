import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardBody,
  CardImg,
  Row,
  Col,
  CardSubtitle
} from "reactstrap";
import propTypes from "prop-types";

const ThumbnailArticle = ({ name, picture, id }) => {
  return (
    <Col xs="6" sm="4" md="4" lg="3">
      <Link to={{ pathname: `/article/${id}` }}>
        <Card style={{ border: "2px solid black" }} className="mb-3">
          <CardImg top width="100%" src={picture} alt="Picture article" />
          <CardBody style={{ padding: "0" }} className="text-center">
            <CardTitle>{name}</CardTitle>
            <CardSubtitle>Categorie</CardSubtitle>
            <Row>
              <Col xs={{ size: "4", offset: "8" }}>
                <i className="far fa-heart" />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Link>
    </Col>
  );
};

ThumbnailArticle.propTypes = {
  picture: propTypes.string.isRequired,
  name: propTypes.string.isRequired
};

export default ThumbnailArticle;
