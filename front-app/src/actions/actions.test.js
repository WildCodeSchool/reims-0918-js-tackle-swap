import {
  ARTICLES_RECEIVED,
  FETCH_ARTICLES,
  CHANGE_PAGE,
  ARTICLE_DETAILS
} from "./actionTypes";
import {
  makeArticlesReceivedAction,
  makeFetchArticlesAction,
  makeChangePageAction,
  makeArticleDetailsAction
} from "./actions";

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

describe("makeChangePageAction", () => {
  it("should return a CHANGE_PAGE action", () => {
    const prevState = 2;

    const expected = {
      type: CHANGE_PAGE,
      pageNumber: prevState
    };

    expect(makeChangePageAction(prevState)).toEqual(expected);
  });
});

describe("makeArticleDetailsAction", () => {
  it("should return details of the selected article", () => {
    const responseApi = {
      id: 3,
      name: "leurre de 24",
      description: "Permet de capturer de superbes poissons",
      brand: "MonsieurPêcheur",
      picture: "https//www.photosuperleurre.jpg",
      article_length: 14.5,
      article_weight: 15,
      article_color: "rouge",
      article_state: 3,
      create_at: "",
      lastname: "DE SOTO COBET",
      firstname: "Corentin",
      nickname: "Coco",
      email: "corentin.dsc@gmail.com",
      profil_picture: "url de photo",
      adress: "7 rue Capitaine Alfred Dreyfus",
      postal_code: "51100",
      city: "Reims"
    };

    const expected = {
      type: ARTICLE_DETAILS,
      responseApi
    };
    expect(makeArticleDetailsAction(responseApi)).toEqual(expected);
  });
});
