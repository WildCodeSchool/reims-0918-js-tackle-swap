import userProfileReducer from "../userProfileReducer";
import { makeUserProfileInformationReceivedAction } from "../../actions/actions";

describe("userProfileReducer", () => {
  it("handles USER_PROFIL_RECEIVED action", () => {
    const prevState = {};
    const responseApi = {
      lastname: "APEUPRES",
      firstname: "Jean-Michel",
      adress: "8 rue du Moulin"
    };
    const action = makeUserProfileInformationReceivedAction(responseApi);
    const expected = {
      lastname: "APEUPRES",
      firstname: "Jean-Michel",
      adress: "8 rue du Moulin"
    };
    expect(userProfileReducer(prevState, action)).toEqual(expected);
  });
});
