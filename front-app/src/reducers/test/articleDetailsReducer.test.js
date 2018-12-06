import showArticleDetailsReducer from "../showArticleDetailsReducer";
import { makeShowArticleDetailsAction } from "../../actions/actions";

describe("showArticleDetailsReducer", () => {
  it("handles SHOW_ARTICLE_DETAILS action", () => {
    const prevState = {};
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
      nickname: "Coco",
      email: "corentin.dsc@gmail.com",
      profil_picture: "url de photo",
      postal_code: "51100",
      city: "Reims"
    };

    const action = makeShowArticleDetailsAction(responseApi);
    const expected = {
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
      nickname: "Coco",
      email: "corentin.dsc@gmail.com",
      profil_picture: "url de photo",
      postal_code: "51100",
      city: "Reims"
    };
    expect(showArticleDetailsReducer(prevState, action)).toEqual(expected);
  });
});
