import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import background from "./images/background-white.jpg";

import ListArticlesContainer from "./containers/ListArticlesContainer";
import ArticleDetails from "./components/ArticleDetails";
import NavBar from "./components/NavBar";
import ArticleDetailsContainer from "./containers/ArticleDetailsContainer";
import AddArticleContainer from "./containers/AddArticleContainer";

class App extends Component {
  render() {
    let styles = {
      backgroundImage: "url(" + background + ")",
      backgroundSize: "cover",
      overflow: "hidden"
    };
    return (
      <div style={styles}>
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
