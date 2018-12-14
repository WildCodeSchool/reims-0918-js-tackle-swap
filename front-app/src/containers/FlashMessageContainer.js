import { connect } from "react-redux";
import FlashMessage from "../components/FlashMessage";
import { makeCloseFlashMessageAction } from "../actions/actions";

const mapStateToProps = state => ({
  flashMessage: state.flashMessage
});

const mapDispatchToProps = dispatch => ({
  hideFlashMessage: () => dispatch(makeCloseFlashMessageAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashMessage);
