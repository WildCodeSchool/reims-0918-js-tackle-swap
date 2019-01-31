import { connect } from "react-redux";
import Login from "../components/Login";
import {
  makeShowFlashMessageAction,
  makeSetUserArticlesAction,
  makeUserProfileInformationReceivedAction
} from "../actions/actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setFlashMessage: responseApi =>
    dispatch(makeShowFlashMessageAction(responseApi)),
  setUserInformation: responseApi =>
    dispatch(makeUserProfileInformationReceivedAction(responseApi)),
  setUserArticles: responseApi =>
    dispatch(makeSetUserArticlesAction(responseApi))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
