import { SHOW_ARTICLE_DETAILS } from "../actions/actionTypes";

const showArticleDetailsReducer = (prevState = {}, action) => {
  switch (action.type) {
    case SHOW_ARTICLE_DETAILS:
      return action.responseApi;
    default:
      return prevState;
  }
};

export default showArticleDetailsReducer;
