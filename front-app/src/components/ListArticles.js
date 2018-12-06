import React, { Component } from "react";
import ThumbnailArticle from "./ThumbnailArticle";

import axios from "axios";

import PropTypes from "prop-types";
import Pagination from "react-js-pagination";
import Grid from "@material-ui/core/Grid";

class ListArticles extends Component {
  handlePageChange = pageNumber => {
    this.props.changePage(pageNumber);
    this.callApiAllArticles(pageNumber);
  };

  callApiAllArticles = currentPage => {
    axios
      .get(`http://localhost:5000/articles?page=${currentPage}`)
      .then(results => this.props.articlesReceived(results.data.response));
  };

  componentDidMount() {
    this.props.fetchArticles();
    this.callApiAllArticles(this.props.pagination.activePage);
  }
  render() {
    const { pagination, articles } = this.props;
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Grid
              container
              alignItems="center"
              direction="row"
              justify="space-between"
            >
              {articles.map((article, index) => (
                <ThumbnailArticle {...article} key={index} />
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Pagination
          hideDisabled
          activePage={pagination.activePage}
          itemsCountPerPage={pagination.numberArticlesPerPage}
          totalItemsCount={pagination.totalArticles}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}
ListArticles.propTypes = {
  articles: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired
};

export default ListArticles;
