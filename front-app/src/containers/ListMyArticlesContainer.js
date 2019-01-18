import { connect } from "react-redux";
import ListMyArticles from "../components/MyArticles/ListMyArticles";
import {
  makeShowFlashMessageAction,
  makeSetUserArticlesAction
} from "../actions/actions";

const mapStateToProps = state => ({
  userArticles: state.userArticles
});

const mapDispatchToProps = dispatch => ({
  setFlashMessage: responseApi =>
    dispatch(makeShowFlashMessageAction(responseApi)),
  setUserArticles: responseApi =>
    dispatch(makeSetUserArticlesAction(responseApi))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListMyArticles);
