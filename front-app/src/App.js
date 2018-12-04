import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router";

import ListArticlesContainer from "./containers/ListArticlesContainer";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ListArticlesContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
