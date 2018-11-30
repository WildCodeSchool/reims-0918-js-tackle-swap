import { ARTICLES_RECEIVED } from "../actions/actiontypes";

const paginationReducer = (prevState = {}, action) => {
  switch (action.type) {
    case ARTICLES_RECEIVED:
      return { ...action.responseApi.pagination };
    default:
      return prevState;
  }
};

export default paginationReducer;
