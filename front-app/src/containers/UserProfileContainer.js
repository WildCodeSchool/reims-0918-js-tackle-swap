import { connect } from "react-redux";
import MainProfile from "../components/UserProfile/MainProfile";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainProfile);
