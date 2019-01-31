import { SEARCH_ARTICLES } from "../actions/actionTypes";

const searchReducer = (prevState = "", action) => {
  switch (action.type) {
    case SEARCH_ARTICLES:
      return action.search;
    default:
      return prevState;
  }
};

export default searchReducer;
