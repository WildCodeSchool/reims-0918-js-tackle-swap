import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";

import articlesReducer from "./articlesReducer";
import paginationReducer from "./paginationReducer";
import loadingReducer from "./loadingReducer";
import showArticleDetailsReducer from "./showArticleDetailsReducer";
import FlashMessageReducer from "./FlashMessageReducer";
import userProfileReducer from "./userProfileReducer";
import searchReducer from "./searchReducer";
import searchReceivedReducer from "./searchReceivedReducer";
import userArticlesReducer from "./userArticlesReducer";

const rootReducers = history =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer,
    articles: articlesReducer,
    pagination: paginationReducer,
    loading: loadingReducer,
    articleDetails: showArticleDetailsReducer,
    flashMessage: FlashMessageReducer,
    user: userProfileReducer,
    search: searchReducer,
    searchResults: searchReceivedReducer,
    userArticles: userArticlesReducer
  });

export default rootReducers;
