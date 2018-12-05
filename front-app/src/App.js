import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import background from "./images/background-white.jpg";

import ListArticlesContainer from "./containers/ListArticlesContainer";
import ArticleDetails from "./components/ArticleDetails";

class App extends Component {
  render() {
    let styles = {
      backgroundImage: "url(" + background + ")",
      backgroundSize: "cover",
      overflow: "hidden"
    };
    return (
      <div style={styles}>
        <Switch>
          <Route exact path="/" component={ListArticlesContainer} />
          <Route exact path="/article" component={ArticleDetails} />
        </Switch>
      </div>
    );
  }
}

export default App;
