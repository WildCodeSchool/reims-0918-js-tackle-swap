import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router";

import ListArticlesContainer from "./containers/ListArticlesContainer";
<<<<<<< HEAD
import ArticleDetails from "./components/ArticleDetails";
import NavBar from "./components/NavBar";
=======
import ArticleDetailsContainer from "./containers/ArticleDetailsContainer";
import AddArticleContainer from "./containers/AddArticleContainer";
>>>>>>> dev

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
