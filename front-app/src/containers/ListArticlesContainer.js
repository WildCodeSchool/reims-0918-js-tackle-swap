import { connect } from "react-redux";
import ListArticles from "../components/ListArticles";
import {
  makeArticlesReceivedAction,
  makeFetchArticlesAction,
  makeChangePageAction,
  makeSearchArticlesAction,
  makeSearchReceivedAction
} from "../actions/actions";

const mapStateToProps = state => ({
  articles: state.articles,
  pagination: state.pagination,
  loading: state.loading,
  search: state.search
});

const mapDispatchToProps = dispatch => ({
  articlesReceived: responseApi =>
    dispatch(makeArticlesReceivedAction(responseApi)),
  fetchArticles: () => dispatch(makeFetchArticlesAction()),
  changePage: pageNumber => dispatch(makeChangePageAction(pageNumber)),
  setSearchArticles: search => dispatch(makeSearchArticlesAction(search)),
  searchReceived: responseApi => dispatch(makeSearchReceivedAction(responseApi))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListArticles);
