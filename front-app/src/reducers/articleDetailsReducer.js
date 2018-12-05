import { ARTICLE_DETAILS } from "../actions/actionTypes";

const articleDetailsReducer = (prevState = {}, action) => {
  switch (action.type) {
    case ARTICLE_DETAILS:
      return action.responseApi;
    default:
      return prevState;
  }
};

export default articleDetailsReducer;
