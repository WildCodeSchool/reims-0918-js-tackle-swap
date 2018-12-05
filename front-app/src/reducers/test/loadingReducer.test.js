import {
  makeFetchArticlesAction,
  makeArticlesReceivedAction
} from "../../actions/actions";
import loadingReducer from "../loadingReducer";

describe("loadingReducer", () => {
  it("handles FETCH_ARTICLES action", () => {
    const prevState = false;
    expect(loadingReducer(prevState, makeFetchArticlesAction())).toEqual(true);
  });
  it("handles ARTICLES_RECEIVED action", () => {
    const prevState = true;
    expect(loadingReducer(prevState, makeArticlesReceivedAction([]))).toEqual(
      false
    );
  });
});
