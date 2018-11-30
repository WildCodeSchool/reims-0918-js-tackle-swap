import { ARTICLES_RECEIVED, FETCH_ARTICLES } from "./actiontypes";

export const makeArticlesReceivedAction = responseApi => ({
  type: ARTICLES_RECEIVED,
  responseApi
});

export const makeFetchArticlesAction = () => ({
  type: FETCH_ARTICLES
});
