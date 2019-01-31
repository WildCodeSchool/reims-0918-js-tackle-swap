import paginationReducer from "../paginationReducer";
import { makeArticlesReceivedAction } from "../../actions/actions";

describe("paginationReducer", () => {
  it("handles ARTICLES_RECEIVED action", () => {
    const prevState = { activePage: 1 };
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
        activePage: 1,
        numberArticlesPerPage: 20,
        totalArticles: 27
      }
    };
    const action = makeArticlesReceivedAction(responseApi);
    const expected = {
      activePage: 1,
      numberArticlesPerPage: 20,
      totalArticles: 27
    };
    expect(paginationReducer(prevState, action)).toEqual(expected);
  });

  it("handles ARTICLES_RECEIVED action for next page", () => {
    const prevState = {
      activePage: 2,
      numberArticlesPerPage: 20,
      totalArticles: 27
    };
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
        activePage: 2,
        numberArticlesPerPage: 20,
        totalArticles: 27
      }
    };
    const action = makeArticlesReceivedAction(responseApi);
    const expected = {
      activePage: 2,
      numberArticlesPerPage: 20,
      totalArticles: 27
    };
    expect(paginationReducer(prevState, action)).toEqual(expected);
  });

  const expected = {
    activePage: 2,
    numberArticlesPerPage: 20,
    totalArticles: 28
  };
});
