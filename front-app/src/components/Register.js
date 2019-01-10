import React from "react";
import { Paper, Grid } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import axios from "axios";
import { Field, reduxForm } from "redux-form";
import { renderField, renderRadioGroup } from "./Form/RenderField";
import { validate } from "./Form/Validate";

const Register = props => {
  const { handleSubmit, pristine, reset, submitting, setFlashMessage } = props;

  const submit = values =>
    axios
      .post(`${process.env.REACT_APP_URL_API}/user`, {
        gender: values.gender,
        lastname: values.lastname,
        firstname: values.firstname,
        email: values.email,
        nickname: values.nickname,
        password: values.password
      })
      .then(result => {
        setFlashMessage(result.data.flashMessage);
        props.history.push("/se-connecter");
      })
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
