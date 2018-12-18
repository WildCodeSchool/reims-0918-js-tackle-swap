import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import axios from "axios";
import ls from "local-storage";
import { withRouter } from "react-router-dom";

const Login = props => {
  const { handleSubmit, pristine, reset, submitting, setFlashMessage } = props;

  const submit = values =>
    axios
      .post("http://localhost:5000/auth/login", values)
      .then(result => {
        ls.set("jwt-tackle-swap", result.data.token);
        setFlashMessage(result.data.flashMessage);
        props.history.push("/");
      })
      .catch(result => console.log("response ERROR:", result));
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper>
          <form onSubmit={handleSubmit(submit)}>
            <div>
              <label htmlFor="nickname">Pseudo :</label>
              <div>
                <Field
                  name="nickname"
                  id="nickname"
                  component="input"
                  type="text"
                  placeholder="Votre pseudo"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password">Mot de passe :</label>
              <div>
                <Field
                  name="password"
                  id="password"
                  component="input"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button type="submit" disabled={pristine || submitting}>
                Submit
              </button>
              <button
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
              >
                Clear Values
              </button>
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default reduxForm({
  form: "login"
})(Login);
