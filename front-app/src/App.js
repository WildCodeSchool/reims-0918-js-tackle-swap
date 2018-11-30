import React, { Component } from "react";
import "./App.css";

import ListArticlesContainer from "./containers/ListArticlesContainer";

class App extends Component {
  render() {
    return (
      <div>
        <ListArticlesContainer />
      </div>
    );
  }
}

export default App;
