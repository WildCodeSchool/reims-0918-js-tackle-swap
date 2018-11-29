import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { Button } from "reactstrap";

import ListArticles from "./ListArticles";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      pagination: {
        activePage: 1
      }
    };
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
      </div>
    );
  }
}

export default App;
