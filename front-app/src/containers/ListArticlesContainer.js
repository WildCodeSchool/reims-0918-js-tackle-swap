import { connect } from "react-redux";
import ListArticles from "../components/ListArticles";
import {
  makeArticlesReceivedAction,
  makeFetchArticlesAction,
  makeChangePageAction
} from "../actions/actions";

const mapStateToProps = state => ({
  articles: state.articles,
  pagination: state.pagination,
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  articlesReceived: responseApi =>
    dispatch(makeArticlesReceivedAction(responseApi)),
  fetchArticles: () => dispatch(makeFetchArticlesAction()),
  changePage: pageNumber => dispatch(makeChangePageAction(pageNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListArticles);
