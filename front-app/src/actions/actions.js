import {
  ARTICLES_RECEIVED,
  FETCH_ARTICLES,
  CHANGE_PAGE,
  ARTICLE_DETAILS
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

export const makeArticleDetailsAction = responseApi => ({
  type: ARTICLE_DETAILS,
  responseApi
});
