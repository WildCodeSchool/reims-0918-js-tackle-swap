import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import rootReducers from "./reducers/";
import { createBrowserHistory } from "history";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"; // v1.x
import { MuiThemeProvider as V0MuiThemeProvider } from "material-ui";
import getMuiTheme from "material-ui/styles/getMuiTheme";

const history = createBrowserHistory();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducers(history),
  composeEnhancer(applyMiddleware(routerMiddleware(history)))
);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#009682"
    }
  },

  typography: {
    useNextVariants: true
  }
});

const themeV0 = getMuiTheme({
  palette: {
    // primary: {
    //   main: "#009682"
    // }
    color: "#009682"
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <V0MuiThemeProvider muiTheme={themeV0}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </V0MuiThemeProvider>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
