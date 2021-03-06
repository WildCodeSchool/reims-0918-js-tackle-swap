import { connect } from "react-redux";
import PrivateMessagesRoomContext from "../components/PrivateMessagesRoomContext";
import {
  makeUserProfileInformationReceivedAction,
  makeShowFlashMessageAction
} from "../actions/actions";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  setFlashMessage: responseApi =>
    dispatch(makeShowFlashMessageAction(responseApi)),
  setUserInformation: responseApi =>
    dispatch(makeUserProfileInformationReceivedAction(responseApi))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateMessagesRoomContext);
