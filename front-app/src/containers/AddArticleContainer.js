import { connect } from "react-redux";
import AddArticle from "../components/AddArticle/AddArticle";
import { makeShowFlashMessageAction } from "../actions/actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setFlashMessage: responseApi =>
    dispatch(makeShowFlashMessageAction(responseApi))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddArticle);
