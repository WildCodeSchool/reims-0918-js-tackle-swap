import React, { Component } from "react";
import Login from "../components/Login";
import axios from "axios";
import ls from "local-storage";

class LoginContainer extends Component {
  submit = values =>
    axios
      .post("http://localhost:5000/auth/login", values)
      .then(result => ls.set("jwt-tackle-swap", result.data.token))
      .catch(result => console.log("response ERROR:", result));
  render() {
    return <Login onSubmit={this.submit} />;
  }
}

export default LoginContainer;
