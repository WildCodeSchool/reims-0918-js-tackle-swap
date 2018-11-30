import React, { Component } from "react";
import ThumbnailArticle from "./ThumbnailArticle";
import { Container, Row } from "reactstrap";

import axios from "axios";

import PropTypes from "prop-types";
import Pagination from "react-js-pagination";

class ListArticles extends Component {
  handlePageChange = pageNumber => {
    this.props.changePage(pageNumber);
    this.callApiAllArticles(pageNumber);
  };

  callApiAllArticles = currentPage => {
    axios
      .get(`http://localhost:3000/articles?page=${currentPage}`)
      .then(results => this.props.articlesReceived(results.data.response));
  };

  componentDidMount() {
    this.props.fetchArticles();
    this.callApiAllArticles(this.props.pagination.activePage);
  }
  render() {
    const { pagination, articles } = this.props;

    return (
      <Container className="pt-3">
        <Row>
          {articles.map((article, index) => (
            <ThumbnailArticle {...article} key={index} />
          ))}
        </Row>
        <Pagination
          hideDisabled
          activePage={pagination.activePage}
          itemsCountPerPage={pagination.numberArticlesPerPage}
          totalItemsCount={pagination.totalArticles}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </Container>
    );
  }
}
ListArticles.propTypes = {
  articles: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired
};

export default ListArticles;
