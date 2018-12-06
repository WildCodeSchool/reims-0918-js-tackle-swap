import { connect } from "react-redux";
import ArticleDetails from "../components/ArticleDetails";
import { makeShowArticleDetailsAction } from "../actions/actions";

const mapStateToProps = state => ({
  articleDetails: state.articleDetails
});

const mapDispatchToProps = dispatch => ({
  articleDetailsReceived: responseApi =>
    dispatch(makeShowArticleDetailsAction(responseApi))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetails);
