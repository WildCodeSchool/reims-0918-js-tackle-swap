import { connect } from "react-redux";
import ExchangeDetails from "../components/Exchanges/ExchangeDetails";
import { makeShowFlashMessageAction } from "../actions/actions";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  setFlashMessage: responseApi =>
    dispatch(makeShowFlashMessageAction(responseApi))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeDetails);
