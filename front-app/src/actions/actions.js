import {
  ARTICLES_RECEIVED,
  FETCH_ARTICLES,
  CHANGE_PAGE,
  SHOW_ARTICLE_DETAILS,
  SHOW_FLASH_MESSAGE,
  CLOSE_FLASH_MESSAGE,
  USER_PROFIL_RECEIVED,
  SEARCH_ARTICLES,
  RECEIVED_SEARCH_ARTICLES,
  RECEIVED_NEW_SEARCH_ARTICLES
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

export const makeUserProfileInformationReceivedAction = responseApi => ({
  type: USER_PROFIL_RECEIVED,
  user: responseApi
});

export const makeSearchArticlesAction = search => ({
  type: SEARCH_ARTICLES,
  search
});

export const makeSearchReceivedAction = responseApi => ({
  type: RECEIVED_SEARCH_ARTICLES,
  responseApi
});
export const makeNewSearchReceivedAction = responseApi => ({
  type: RECEIVED_NEW_SEARCH_ARTICLES,
  responseApi
});
