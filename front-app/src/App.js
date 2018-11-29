import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { Button } from "reactstrap";

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
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  callApiAllArticles = currentPage => {
    axios
      .get(`http://localhost:3000/articles?page=${currentPage}`)
      .then(response =>
        this.setState({
          articles: response.data.articles,
          pagination: {
            ...this.state.pagination,
            ...response.data.pagination
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
        <Button onClick={() => this.callApiAllArticles(1)}>Page 1</Button>
        <Button onClick={() => this.callApiAllArticles(2)}>Page 2</Button>
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
