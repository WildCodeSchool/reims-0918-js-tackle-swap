import { SHOW_FLASH_MESSAGE } from "../actions/actionTypes";
import { CLOSE_FLASH_MESSAGE } from "../actions/actionTypes";

const FlashMessageReducer = (
  prevState = { message: "", open: false },
  action
) => {
  switch (action.type) {
    case SHOW_FLASH_MESSAGE:
      return { ...action.flashMessage, open: true };
    case CLOSE_FLASH_MESSAGE:
      return { message: "", open: false, type: "success" };
    default:
      return prevState;
  }
};

export default FlashMessageReducer;
