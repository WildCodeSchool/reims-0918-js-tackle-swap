import {
  ARTICLES_RECEIVED,
  FETCH_ARTICLES,
  CHANGE_PAGE,
  SHOW_ARTICLE_DETAILS,
  SHOW_FLASH_MESSAGE,
  CLOSE_FLASH_MESSAGE
} from "./actionTypes";

export const makeArticlesReceivedAction = responseApi => ({
  type: ARTICLES_RECEIVED,
  responseApi
});

export const makeFetchArticlesAction = () => ({
  type: FETCH_ARTICLES
});

export const makeChangePageAction = pageNumber => ({
  type: CHANGE_PAGE,
  pageNumber
});

export const makeShowArticleDetailsAction = responseApi => ({
  type: SHOW_ARTICLE_DETAILS,
  responseApi
});

export const makeShowFlashMessageAction = responseApi => ({
  type: SHOW_FLASH_MESSAGE,
  flashMessage: responseApi
});

export const makeCloseFlashMessageAction = () => ({
  type: CLOSE_FLASH_MESSAGE
});
