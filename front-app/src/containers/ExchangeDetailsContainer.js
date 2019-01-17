import { connect } from "react-redux";
import ExchangeDetails from "../components/Exchanges/ExchangeDetails";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeDetails);
