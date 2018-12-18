import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import background from "./images/background-white.jpg";

import ListArticlesContainer from "./containers/ListArticlesContainer";
import NavBar from "./components/Navbar/NavBar";
import ArticleDetailsContainer from "./containers/ArticleDetailsContainer";
import AddArticleContainer from "./containers/AddArticleContainer";
import LoginContainer from "./containers/LoginContainer";
import RegisterContainer from "./containers/RegisterContainer";
import FlashMessageContainer from "./containers/FlashMessageContainer";

class App extends Component {
  render() {
    let styles = {
      backgroundImage: "url(" + background + ")",
      backgroundSize: "cover",
      overflow: "hidden",
      minHeight: "100vh"
    };
    return (
      <div style={styles}>
        <NavBar />
        <div style={{ padding: "10px" }}>
          <Switch>
            <Route exact path="/" component={ListArticlesContainer} />
            <Route
              exact
              path="/article/:id"
              component={ArticleDetailsContainer}
            />
            <Route path="/ajouter-un-article" component={AddArticleContainer} />
            <Route path="/se-connecter" component={LoginContainer} />
            <Route path="/s-inscrire" component={RegisterContainer} />
          </Switch>
          <FlashMessageContainer />
        </div>
      </div>
    );
  }
}

export default App;
