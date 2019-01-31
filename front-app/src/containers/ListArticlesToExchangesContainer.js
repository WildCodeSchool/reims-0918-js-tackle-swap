import { connect } from "react-redux";
import ListArticlesToExchanges from "../components/Exchanges/SelectArticles/ListArticlesToExchange";
import { makeShowFlashMessageAction } from "../actions/actions";

const mapStateToProps = state => ({
  articles: state.articles,
  pagination: state.pagination,
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  setFlashMessage: responseApi =>
    dispatch(makeShowFlashMessageAction(responseApi))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListArticlesToExchanges);
