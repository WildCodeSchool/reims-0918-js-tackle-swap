import {
  ARTICLES_RECEIVED,
  CHANGE_PAGE,
  RECEIVED_SEARCH_ARTICLES,
  RECEIVED_NEW_SEARCH_ARTICLES
} from "../actions/actionTypes";

const paginationReducer = (prevState = { activePage: 1 }, action) => {
  switch (action.type) {
    case ARTICLES_RECEIVED:
      return { ...action.responseApi.pagination };
    case RECEIVED_NEW_SEARCH_ARTICLES:
      return { ...action.responseApi.pagination };
    case RECEIVED_SEARCH_ARTICLES:
      return { ...action.responseApi.pagination };
    case CHANGE_PAGE:
      return { ...prevState, activePage: action.pageNumber };
    default:
      return prevState;
  }
};

export default paginationReducer;
