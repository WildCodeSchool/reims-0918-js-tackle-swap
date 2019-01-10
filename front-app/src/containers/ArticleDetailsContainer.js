import { connect } from "react-redux";
import ArticleDetails from "../components/ArticleDetails";
import {
  makeShowArticleDetailsAction,
  makeShowFlashMessageAction
} from "../actions/actions";

const mapStateToProps = state => ({
  articleDetails: state.articleDetails,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  articleDetailsReceived: responseApi =>
    dispatch(makeShowArticleDetailsAction(responseApi)),
  setFlashMessage: responseApi =>
    dispatch(makeShowFlashMessageAction(responseApi))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetails);
