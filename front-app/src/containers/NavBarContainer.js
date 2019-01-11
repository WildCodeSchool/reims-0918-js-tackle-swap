import { connect } from "react-redux";
import NavBar from "../components/Navbar/NavBar";
import { makeShowFlashMessageAction } from "../actions/actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setFlashMessage: responseApi =>
    dispatch(makeShowFlashMessageAction(responseApi))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
