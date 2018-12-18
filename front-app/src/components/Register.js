import React from "react";
import { Paper, Grid } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import axios from "axios";

import { Field, reduxForm } from "redux-form";

const validate = values => {
  const errors = {};
  if (!values.gender) {
    errors.gender = "Requis.";
  }
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

  if (!values.nickname) {
    errors.nickname = "Requis.";
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

const renderRadioGroup = ({
  input,
  meta: { touched, error, warning },
  label,
  ...rest
}) => (
  <React.Fragment>
    <label>{label} : </label>{" "}
    {touched &&
      ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    <RadioGroup
      {...input}
      {...rest}
      valueselected={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  </React.Fragment>
);

const Register = props => {
  const { handleSubmit, pristine, reset, submitting, setFlashMessage } = props;

  const submit = values =>
    axios
      .post("http://localhost:5000/user", {
        gender: values.gender,
        lastname: values.lastname,
        firstname: values.firstname,
        email: values.email,
        nickname: values.nickname,
        password: values.password
      })
      .then(result => setFlashMessage(result.data.flashMessage))
      .catch(result => console.log("response ERROR:", result));

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper>
          <form onSubmit={handleSubmit(submit)}>
            <Field name="gender" component={renderRadioGroup} label="Sexe">
              <FormControlLabel value="F" control={<Radio />} label="Femme" />
              <FormControlLabel value="M" control={<Radio />} label="Homme" />
            </Field>
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
              name="nickname"
              type="nickname"
              component={renderField}
              label="Pseudo"
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
