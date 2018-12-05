import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import articlesReducer from "./articlesReducer";
import paginationReducer from "./paginationReducer";
import loadingReducer from "./loadingReducer";
import showArticleDetailsReducer from "./showArticleDetailsReducer";

const rootReducers = history =>
  combineReducers({
    router: connectRouter(history),
    articles: articlesReducer,
    pagination: paginationReducer,
    loading: loadingReducer,
    articleDetails: showArticleDetailsReducer
  });

export default rootReducers;
