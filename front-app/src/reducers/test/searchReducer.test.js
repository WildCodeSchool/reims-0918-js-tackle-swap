import searchReducer from "../searchReducer";
import { makeSearchArticlesAction } from "../../actions/actions";

describe("searchReducer", () => {
  it("handle SEARCH_ARTICLES in input", () => {
    const prevState = "";
    const search = "search";

    const action = makeSearchArticlesAction(search);
    const expected = "search";
    expect(searchReducer(prevState, action)).toEqual(expected);
  });
});
