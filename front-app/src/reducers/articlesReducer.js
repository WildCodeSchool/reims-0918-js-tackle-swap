import {
  ARTICLES_RECEIVED,
  RECEIVED_SEARCH_ARTICLES
} from "../actions/actionTypes";

const articlesReducer = (prevState = [], action) => {
  switch (action.type) {
    case ARTICLES_RECEIVED:
      return [...prevState, ...action.responseApi.articles];
    case RECEIVED_SEARCH_ARTICLES:
      return [...action.responseApi.articles];
    default:
      return prevState;
  }
};

export default articlesReducer;
