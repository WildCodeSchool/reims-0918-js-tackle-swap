import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import { renderField } from "./Form/RenderField";
import { validate } from "./Form/Validate";
import axios from "axios";
import ls from "local-storage";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "#009682"
  }
});

const Login = props => {
  const { handleSubmit, reset, setFlashMessage, setUserInformation } = props;

  const submit = values =>
    axios
      .post(`${process.env.REACT_APP_URL_API}/auth/login`, values)
      .then(results => {
        console.log("login");
        ls.set("jwt-tackle-swap", results.data.token);
        setFlashMessage(results.data.flashMessage);
        setUserInformation(results.data.user);
        props.history.push("/");
      })
      .catch(result => console.log("response ERROR:", result));

  const { classes } = props;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper>
          <form onSubmit={handleSubmit(submit)} style={{ padding: "20px" }}>
            <div>
              <div>
                <Field
                  name="nickname"
                  id="nickname"
                  component={renderField}
                  type="text"
                  label="Pseudo"
                />
              </div>
            </div>
            <div>
              <div>
                <Field
                  name="password"
                  id="password"
                  component={renderField}
                  type="password"
                  label="Mot de passe"
                />
              </div>
            </div>
            <div style={{ paddingTop: "20px" }}>
              <Button
                type="submit"
                variant="contained"
                style={{ border: "2px solid #009682", color: "white" }}
                className={classes.button}
              >
                Se connecter
              </Button>
              <Button
                type="button"
                variant="contained"
                style={{ border: "2px solid #009682", color: "white" }}
                className={classes.button}
                onClick={reset}
              >
                Effacer valeurs
              </Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withRouter(
  withStyles(styles)(
    reduxForm({
      form: "login",
      validate
    })(Login)
  )
);
