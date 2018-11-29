import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import ListArticles from "./ListArticles";
import Pagination from "react-js-pagination";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      pagination: {
        activePage: 1
      }
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    this.setState(
      {
        pagination: { ...this.state.pagination, activePage: pageNumber }
      },
      () => this.callApiAllArticles(this.state.pagination.activePage)
    );
  }

  callApiAllArticles = currentPage => {
    axios
      .get(`http://localhost:3000/articles?page=${currentPage}`)
      .then(results =>
        this.setState({
          articles: results.data.response.articles,
          pagination: {
            ...this.state.pagination,
            ...results.data.response.pagination
          }
        })
      );
  };

  componentDidMount() {
    this.callApiAllArticles(this.state.pagination.activePage);
  }

  render() {
    return (
      <div>
        <ListArticles list={this.state.articles} />
        <Pagination
          hideDisabled
          activePage={this.state.activePage}
          itemsCountPerPage={20}
          totalItemsCount={1000}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default App;
