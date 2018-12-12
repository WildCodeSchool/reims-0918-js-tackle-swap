import React, { Component } from "react";
import Register from "../components/Register";

class RegisterContainer extends Component {
  submit = values =>
    console.log({
      lastname: values.lastname,
      firstname: values.firstname,
      email: values.email,
      password: values.password
    });
  render() {
    return <Register onSubmit={this.submit} />;
  }
}

export default RegisterContainer;
