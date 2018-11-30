import { ARTICLES_RECEIVED } from "../actions/actiontypes";

const articlesReducer = (prevState = [], action) => {
  switch (action.type) {
    case ARTICLES_RECEIVED:
      return action.responseApi.articles;
    default:
      return prevState;
  }
};

export default articlesReducer;
