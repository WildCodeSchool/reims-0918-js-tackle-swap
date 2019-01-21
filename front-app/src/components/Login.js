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
    backgroundColor: "#009682",
    border: "1px solid #009682",
    display: "block",
    color: "white",
    margin: "0 auto",
    width: "320px"
  }
});

const Login = props => {
  const {
    handleSubmit,
    setFlashMessage,
    setUserInformation,
    setUserArticles
  } = props;

  const submit = values =>
    axios
      .post(`${process.env.REACT_APP_URL_API}/auth/login`, values)
      .then(results => {
        ls.set("jwt-tackle-swap", results.data.token);
        setFlashMessage(results.data.flashMessage);
        setUserInformation(results.data.user);
        axios
          .get(`${process.env.REACT_APP_URL_API}/user_articles`, {
            headers: {
              Accept: "application/json",
              authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
            }
          })
          .then(results => {
            setUserArticles(results.data.response);
            props.history.goBack();
            return;
          });
      })
      .catch(result => console.log("response ERROR:", result));

  const { classes } = props;
  console.log(props.history);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper style={{ opacity: "0.9", textAlign: "center" }}>
          <form onSubmit={handleSubmit(submit)} style={{ padding: "20px" }}>
            <h4
              style={{
                color: "#00cccc",
                fontSize: "1.5em",
                margin: "0"
              }}
            >
              Se connecter
            </h4>
            <div>
              <div>
                <Field
                  name="nickname"
                  id="nickname"
                  component={renderField}
                  type="text"
                  label="Pseudo"
                  style={{ width: "310px" }}
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
                  style={{ width: "310px" }}
                />
              </div>
            </div>
            <div style={{ paddingTop: "20px" }}>
              <div style={{ padding: "5px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.button}
                >
                  Se connecter
                </Button>
              </div>
              <p style={{ color: "#009682" }}>
                Vous n'êtes pas inscrit?{" "}
                <a href="/s-inscrire" style={{ color: "#009682" }}>
                  Inscrivez-vous
                </a>
              </p>
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
