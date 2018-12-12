import React, { Component } from "react";
import Login from "../components/Login";
import axios from "axios";
import ls from "local-storage";

class LoginContainer extends Component {
  submit = values =>
    axios
      .post("http://localhost:5000/auth/login", values)
      .then(result => ls.set("token-tackle-swap", result.data.token));
  render() {
    return <Login onSubmit={this.submit} />;
  }
}

export default LoginContainer;
