import { USER_PROFIL_RECEIVED } from "../actions/actionTypes";

const userProfileReducer = (prevState = {}, action) => {
  switch (action.type) {
    case USER_PROFIL_RECEIVED:
      return action.user;
    default:
      return prevState;
  }
};

export default userProfileReducer;
