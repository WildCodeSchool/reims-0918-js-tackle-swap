import FlashMessageReducer from "../FlashMessageReducer";
import {
  makeShowFlashMessageAction,
  makeCloseFlashMessageAction
} from "../../actions/actions";

describe("FlashMessageReducer", () => {
  it("handles SHOW_FLASH_MESSAGE action", () => {
    const prevState = { message: "", open: false };
    const responseApi = { message: "Connection réussie", open: true };
    const action = makeShowFlashMessageAction(responseApi);
    const expected = { message: "Connection réussie", open: true };

    expect(FlashMessageReducer(prevState, action)).toEqual(expected);
  });
  it("handles CLOSE_FLASH_MESSAGE action", () => {
    const prevState = {
      message: "Connection réussie",
      open: true,
      type: "success"
    };
    const responseApi = "";

    const action = makeCloseFlashMessageAction(responseApi);
    const expected = { message: "", open: false, type: "success" };

    expect(FlashMessageReducer(prevState, action)).toEqual(expected);
  });
});
