import { connect } from "react-redux";
import ArticleDetails from "../components/ArticleDetails";
import {
  makeShowArticleDetailsAction,
  makeShowFlashMessageAction,
  makeUserProfileInformationReceivedAction
} from "../actions/actions";

const mapStateToProps = state => ({
  articleDetails: state.articleDetails,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  articleDetailsReceived: responseApi =>
    dispatch(makeShowArticleDetailsAction(responseApi)),
  setFlashMessage: responseApi =>
    dispatch(makeShowFlashMessageAction(responseApi)),

  setUserInformation: responseApi =>
    dispatch(makeUserProfileInformationReceivedAction(responseApi))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetails);
