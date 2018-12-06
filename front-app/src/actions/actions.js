import {
  ARTICLES_RECEIVED,
  FETCH_ARTICLES,
  CHANGE_PAGE,
  SHOW_ARTICLE_DETAILS
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
