import { connect } from "react-redux";
import ListMyArticles from "../components/MyArticles/ListMyArticles";
import { makeShowFlashMessageAction } from "../actions/actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setFlashMessage: responseApi =>
    dispatch(makeShowFlashMessageAction(responseApi))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListMyArticles);
