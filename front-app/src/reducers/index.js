import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";

import articlesReducer from "./articlesReducer";
import paginationReducer from "./paginationReducer";
import loadingReducer from "./loadingReducer";

const rootReducers = history =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer,
    articles: articlesReducer,
    pagination: paginationReducer,
    loading: loadingReducer
  });

export default rootReducers;
