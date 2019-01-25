import { connect } from "react-redux";
import NavBarContext from "../components/Navbar/NavBarContext";
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
)(NavBarContext);
