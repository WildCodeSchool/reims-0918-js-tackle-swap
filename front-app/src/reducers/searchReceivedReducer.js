import {
  RECEIVED_SEARCH_ARTICLES,
  RECEIVED_NEW_SEARCH_ARTICLES
} from "../actions/actionTypes";

const searchReceivedReducer = (prevState = [], action) => {
  switch (action.type) {
    case RECEIVED_SEARCH_ARTICLES:
      return [...prevState, ...action.responseApi.articles];
    case RECEIVED_NEW_SEARCH_ARTICLES:
      return [...action.responseApi.articles];
    default:
      return prevState;
  }
};

export default searchReceivedReducer;
