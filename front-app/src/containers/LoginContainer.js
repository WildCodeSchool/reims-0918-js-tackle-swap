import { connect } from "react-redux";
import Login from "../components/Login";
import { makeShowFlashMessageAction } from "../actions/actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setFlashMessage: responseApi =>
    dispatch(makeShowFlashMessageAction(responseApi))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
