import { connect } from "react-redux";
import PrivateMessagesRoom from "../components/PrivateMessagesRoom";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateMessagesRoom);
