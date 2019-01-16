import { ARTICLES_RECEIVED } from "../actions/actionTypes";

const articlesReducer = (prevState = [], action) => {
  switch (action.type) {
    case ARTICLES_RECEIVED:
      return [...prevState, ...action.responseApi.articles];
    default:
      return prevState;
  }
};

export default articlesReducer;
