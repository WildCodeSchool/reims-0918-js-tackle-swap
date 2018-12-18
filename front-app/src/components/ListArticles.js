import React, { Component } from "react";
import ThumbnailArticle from "./ThumbnailArticle";
import InfiniteScroll from "react-infinite-scroller";

import axios from "axios";
import ls from "local-storage";

import PropTypes from "prop-types";
import Pagination from "react-js-pagination";
import Grid from "@material-ui/core/Grid";

class ListArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreItems: true
    };
  }
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
    const loader = (
      <div className="loader" key={0}>
        Loading ...
      </div>
    );
    const result = articles.map((article, index) => (
      <ThumbnailArticle {...article} key={index} />
    ));
    return (
      <InfiniteScroll
        pageStart={1}
        loadMore={this.callApiAllArticles}
        hasMore={pagination.nextPage}
        loader={loader}
      >
        <Grid
          container
          spacing={8}
          alignItems="center"
          direction="row"
          justify="space-around"
        >
          {result}
        </Grid>
      </InfiniteScroll>
    );
  }
}
ListArticles.propTypes = {
  articles: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired
};

export default ListArticles;
