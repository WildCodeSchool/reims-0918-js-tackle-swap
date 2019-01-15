import React, { Component, Fragment } from "react";
import ThumbnailArticle from "./ThumbnailArticle";
import InfiniteScroll from "react-infinite-scroller";

import axios from "axios";

import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import SearchArticles from "./SearchArticles";

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

  callApiAllArticles = (currentPage, search = "") => {
    axios
      .get(
        `${
          process.env.REACT_APP_URL_API
        }/articles?page=${currentPage}&s=${search}`
      )
      .then(results => {
        if (results.data.response !== "no-results") {
          if (search) {
            this.props.searchReceived(results.data.response);
          } else {
            this.props.articlesReceived(results.data.response);
          }
        } else {
          console.log("plus de résultats");
        }
      });
  };

  componentDidMount() {
    if (!(this.props.articles.length > 0)) {
      this.props.fetchArticles();
      this.callApiAllArticles(this.props.pagination.activePage);
    }
  }
  handleChangeSearch(e) {
    this.props.setSearchArticles(e.target.value);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.callApiAllArticles(1, this.props.search);
    }
  }
  render() {
    const { pagination, articles, search } = this.props;
    const loader = (
      <div className="loader" key={0}>
        Loading ...
      </div>
    );
    return (
      <Fragment>
        <SearchArticles
          search={search}
          handleChangeSearch={this.handleChangeSearch.bind(this)}
        />
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
            {articles.map((article, index) => (
              <ThumbnailArticle {...article} key={index} />
            ))}
          </Grid>
        </InfiniteScroll>
      </Fragment>
    );
  }
}
ListArticles.propTypes = {
  articles: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired
};

export default ListArticles;
