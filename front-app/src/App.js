import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import background from "./images/background-white.jpg";

import ListArticlesContainer from "./containers/ListArticlesContainer";
import NavBar from "./components/Navbar/NavBar";
import ArticleDetailsContainer from "./containers/ArticleDetailsContainer";
import LoginContainer from "./containers/LoginContainer";
import RegisterContainer from "./containers/RegisterContainer";
import FlashMessageContainer from "./containers/FlashMessageContainer";
import PrivateMessagesDashboardContainer from "./containers/PrivateMessagesDashboardContainer";
import PrivateMessagesRoomContainer from "./containers/PrivateMessagesRoomContainer";
import AddArticleContainer from "./containers/AddArticleContainer";
import ListExchanges from "./components/Exchanges/ListExchanges";

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
            <Route
              exact
              path="/previsualisation/:id"
              component={ArticleDetailsContainer}
            />
            <Route path="/ajouter-un-article" component={AddArticleContainer} />
            <Route path="/se-connecter" component={LoginContainer} />
            <Route path="/s-inscrire" component={RegisterContainer} />
            <Route
              path="/messagerie"
              component={PrivateMessagesDashboardContainer}
            />
            <Route
              path="/conversation-:participant-:id"
              component={PrivateMessagesRoomContainer}
            />
            <Route path="/mes-echanges" component={ListExchanges} />
          </Switch>
          <FlashMessageContainer />
        </div>
      </div>
    );
  }
}

export default App;
