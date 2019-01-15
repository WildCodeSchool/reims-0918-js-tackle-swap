import React from "react";
import { Paper, Grid } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import axios from "axios";
import { Field, reduxForm } from "redux-form";
import { renderField, renderRadioGroup } from "./Form/RenderField";
import { validate } from "./Form/Validate";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import Button from "@material-ui/core/Button";
import muiThemeable from "material-ui/styles/muiThemeable";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const Register = props => {
  const { handleSubmit, reset, setFlashMessage } = props;

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

  const { classes } = props;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper style={{ opacity: "0.9" }}>
          <form onSubmit={handleSubmit(submit)} style={{ padding: "20px" }}>
            <h4
              style={{
                color: "#00cccc",
                fontSize: "1.5em",
                margin: "0",
                marginBottom: "30px"
              }}
            >
              S'inscrire
            </h4>
            <Field name="gender" component={renderRadioGroup} label="Sexe">
              <FormControlLabel
                value="F"
                control={<Radio />}
                label="Femme"
                style={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  color: props.muiTheme.palette.textColor
                }}
              />
              <FormControlLabel value="M" control={<Radio />} label="Homme" />
            </Field>
            <Field
              name="lastname"
              type="text"
              component={renderField}
              label="Nom"
              style={{ width: "310px" }}
            />
            <Field
              name="firstname"
              type="text"
              component={renderField}
              label="Prénom"
              style={{ width: "310px" }}
            />
            <Field
              name="email"
              type="email"
              component={renderField}
              label="Adresse Mail"
              style={{ width: "310px" }}
            />
            <Field
              name="nickname"
              type="nickname"
              component={renderField}
              label="Pseudo"
              style={{ width: "310px" }}
            />
            <Field
              name="password"
              type="password"
              component={renderField}
              label="Mot de passe"
              style={{ width: "310px" }}
            />
            <Field
              name="passwordBis"
              type="password"
              component={renderField}
              label="Confirmation Mot de passe"
              style={{ width: "310px" }}
            />
            <div style={{ marginTop: "15px" }}>
              <Button
                type="submit"
                variant="contained"
                // style={{ border: "2px solid #009682", color: "white" }}
                className={classes.button}
                color="primary"
              >
                Valider
              </Button>
              <Button
                type="button"
                variant="contained"
                // style={{ border: "2px solid #009682", color: "white" }}
                className={classes.button}
                onClick={reset}
                color="primary"
              >
                Effacer Valeurs
              </Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default compose(
  muiThemeable(),
  withStyles(styles)
)(
  reduxForm({
    form: "register",
    validate
  })(Register)
);
