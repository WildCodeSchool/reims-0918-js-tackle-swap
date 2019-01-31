import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import background from "./images/background-white.jpg";

import ListArticlesContainer from "./containers/ListArticlesContainer";
import NavBarContainer from "./containers/NavBarContainer";
import ArticleDetailsContainer from "./containers/ArticleDetailsContainer";
import LoginContainer from "./containers/LoginContainer";
import RegisterContainer from "./containers/RegisterContainer";
import FlashMessageContainer from "./containers/FlashMessageContainer";
import PrivateMessagesDashboardContainer from "./containers/PrivateMessagesDashboardContainer";
import PrivateMessagesRoomContainer from "./containers/PrivateMessagesRoomContainer";
import AddArticleContainer from "./containers/AddArticleContainer";
import ListExchanges from "./components/Exchanges/ListExchanges";
import ListArticlesToExchangesContainer from "./containers/ListArticlesToExchangesContainer";
import ExchangeDetailsContainer from "./containers/ExchangeDetailsContainer";
import UserProfileContainer from "./containers/UserProfileContainer";
import ListMyArticlesContainer from "./containers/ListMyArticlesContainer";
import ArticleDetailsMessageContainer from "./containers/ArticleDetailsMessageContainer";
import Ikoula from "./components/Ikoula";

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
        <NavBarContainer />
        <div
          style={{
            padding: "5px",
            marginTop: "80px"
          }}
        >
          <Switch>
            <Route exact path="/" component={ListArticlesContainer} />
            <Route
              exact
              path="/article/:id"
              component={ArticleDetailsContainer}
            />
            <Route
              exact
              path="/detail_article/:id"
              component={ArticleDetailsMessageContainer}
            />
            <Route
              exact
              path="/previsualisation/:id"
              component={ArticleDetailsContainer}
            />
            <Route path="/ajouter-un-article" component={AddArticleContainer} />
            <Route path="/se-connecter" component={LoginContainer} />
            <Route path="/s-inscrire" component={RegisterContainer} />
            <Route path="/profil" component={UserProfileContainer} />
            <Route
              path="/messagerie"
              component={PrivateMessagesDashboardContainer}
            />
            <Route
              path="/conversation-:id_article-:id_owner-:id_user"
              component={PrivateMessagesRoomContainer}
            />
            <Route path="/mes-echanges" component={ListExchanges} />
            <Route path="/mes-articles" component={ListMyArticlesContainer} />
            <Route
              path="/proposer-article/:id_article"
              component={ListArticlesToExchangesContainer}
            />
            <Route
              path="/details-echange-:id_swap"
              component={ExchangeDetailsContainer}
            />
          </Switch>
          <FlashMessageContainer />
          <Ikoula />
        </div>
      </div>
    );
  }
}

export default App;
