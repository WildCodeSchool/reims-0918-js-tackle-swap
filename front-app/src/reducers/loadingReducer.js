import { ARTICLES_RECEIVED, FETCH_ARTICLES } from "../actions/actionTypes";

const loadingReducer = (prevState = false, action) => {
  switch (action.type) {
    case ARTICLES_RECEIVED:
      return false;
    case FETCH_ARTICLES:
      return true;
    default:
      return prevState;
  }
};

export default loadingReducer;
