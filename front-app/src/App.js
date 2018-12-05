import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router";

import ListArticlesContainer from "./containers/ListArticlesContainer";
import ArticleDetails from "./components/ArticleDetails";
import NavBar from "./components/NavBar";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={ListArticlesContainer} />
          <Route exact path="/article" component={ArticleDetails} />
        </Switch>
      </div>
    );
  }
}

export default App;
