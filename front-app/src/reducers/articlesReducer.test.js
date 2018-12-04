import articlesReducer from "./articlesReducer";
import { makeArticlesReceivedAction } from "../actions/actions";

describe("articlesReducer", () => {
  it("handles ARTICLES_RECEIVED action", () => {
    const prevState = [];
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
    const action = makeArticlesReceivedAction(responseApi);
    const expected = [
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
    ];
    expect(articlesReducer(prevState, action)).toEqual(expected);
  });
});
