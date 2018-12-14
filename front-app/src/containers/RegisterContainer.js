import React, { Component } from "react";
import Register from "../components/Register";
import axios from "axios";

class RegisterContainer extends Component {
  submit = values =>
    axios
      .post("http://localhost:5000/user", {
        gender: values.gender,
        lastname: values.lastname,
        firstname: values.firstname,
        email: values.email,
        nickname: values.nickname,
        password: values.password
      })
      .then(result => console.log("user add", result))
      .catch(result => console.log("response ERROR:", result));

  render() {
    return <Register onSubmit={this.submit} />;
  }
}

export default RegisterContainer;
