import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";

const validate = values => {
  const errors = {};
  if (!values.lastname) {
    errors.lastname = "Requis.";
  }

  if (!values.firstname) {
    errors.firstname = "Requis.";
  }

  if (!values.email) {
    errors.email = "Requis";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Adresse mail invalide.";
  }

  if (!values.password) {
    errors.password = "Requis.";
  } else if (values.password.length < 6) {
    errors.password = "6 caractères minimum.";
  }

  if (!values.passwordBis) {
    errors.passwordBis = "Requis.";
  } else if (values.password !== values.passwordBis) {
    errors.passwordBis = "Les deux mots de passes ne sont pas identiques.";
  }

  return errors;
};
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const Register = props => {
  const { handleSubmit, pristine, reset, submitting, onSubmit } = props;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field
              name="lastname"
              type="text"
              component={renderField}
              label="Nom"
            />
            <Field
              name="firstname"
              type="text"
              component={renderField}
              label="Prénom"
            />
            <Field
              name="email"
              type="email"
              component={renderField}
              label="Adresse Mail"
            />
            <Field
              name="password"
              type="password"
              component={renderField}
              label="Mot de passe"
            />
            <Field
              name="passwordBis"
              type="password"
              component={renderField}
              label="Confirmation Mot de passe"
            />
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
  form: "register",
  validate
})(Register);
