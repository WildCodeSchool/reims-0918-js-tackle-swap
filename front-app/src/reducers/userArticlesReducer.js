import { SET_USER_ARTICLES } from "../actions/actionTypes";

const userProfileReducer = (prevState = [], action) => {
  switch (action.type) {
    case SET_USER_ARTICLES:
      return action.userArticles;
    default:
      return prevState;
  }
};

export default userProfileReducer;
