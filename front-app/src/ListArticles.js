import React from "react";
import ThumbnailArticle from "./ThumbnailArticle";
import { Container, Row } from "reactstrap";
import PropTypes from "prop-types";

const ListArticles = ({ list }) => (
  <Container>
    <Row>
      {list.map((article, index) => (
        <ThumbnailArticle {...article} key={index} />
      ))}
    </Row>
  </Container>
);

ListArticles.propTypes = {
  list: PropTypes.array.isRequired
};

export default ListArticles;
