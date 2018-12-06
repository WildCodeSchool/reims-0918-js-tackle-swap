import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router";

import ListArticlesContainer from "./containers/ListArticlesContainer";
import NavBar from "./components/Navbar/NavBar";
import ArticleDetailsContainer from "./containers/ArticleDetailsContainer";
import AddArticleContainer from "./containers/AddArticleContainer";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={ListArticlesContainer} />
          <Route
            exact
            path="/article/:id"
            component={ArticleDetailsContainer}
          />
          <Route path="/ajouter-un-article" component={AddArticleContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
