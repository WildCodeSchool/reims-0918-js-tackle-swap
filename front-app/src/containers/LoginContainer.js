import React, { Component } from "react";
import Login from "../components/Login";

class LoginContainer extends Component {
  submit = values => console.log(values);
  render() {
    return <Login onSubmit={this.submit} />;
  }
}

export default LoginContainer;
