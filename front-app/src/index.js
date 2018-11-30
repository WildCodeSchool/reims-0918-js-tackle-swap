import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import articlesReducer from "./reducers/articlesReducer";
import paginationReducer from "./reducers/paginationReducer";
import loadingReducer from "./reducers/loadingReducer";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const store = createStore(
  combineReducers({
    articles: articlesReducer,
    pagination: paginationReducer,
    loading: loadingReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
