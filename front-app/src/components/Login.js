import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";

const Login = props => {
  const { handleSubmit, pristine, reset, submitting, onSubmit } = props;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email">Adresse Mail :</label>
              <div>
                <Field
                  name="email"
                  id="email"
                  component="input"
                  type="text"
                  placeholder="Email"
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
