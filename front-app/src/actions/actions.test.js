import { ARTICLES_RECEIVED, FETCH_ARTICLES } from "./actiontypes";
import { makeArticlesReceivedAction, makeFetchArticlesAction } from "./actions";

describe("makeArticlesReceivedAction", () => {
  it("should return a ARTICLES_RECEIVED action", () => {
    const responseApi = {
      articles: [
        {
          id: 1,
          name: "leurre de 14",
          picture:
            "https://www.1max2peche.com/wp-content/uploads/2018/03/leurre-storm-360-gt-searchbait-14.jpg"
        },
        {
          id: 2,
          name: "leurre de 14",
          picture:
            "http://theudericus.free.fr/Mer_Ocean/Surfcasting/Leurres/Leurre_Poulpe.jpg"
        }
      ],
      pagination: {
        numberArticlesPerPage: 20,
        totalArticles: 27
      }
    };

    const expected = {
      type: ARTICLES_RECEIVED,
      responseApi
    };

    expect(makeArticlesReceivedAction(responseApi)).toEqual(expected);
  });
});

describe("makeFetchArticlesAction", () => {
  it("should return a FETCH_ARTICLES action", () => {
    const expected = {
      type: FETCH_ARTICLES
    };

    expect(makeFetchArticlesAction()).toEqual(expected);
  });
});
