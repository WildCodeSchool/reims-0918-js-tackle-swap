import { connect } from "react-redux";
import NavBar from "../components/Navbar/NavBar";
import {
  makeShowFlashMessageAction,
  makeUserProfileInformationReceivedAction,
  makeSetUserArticlesAction
} from "../actions/actions";

const mapStateToProps = state => ({
  user: state.user
});

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
)(NavBar);
