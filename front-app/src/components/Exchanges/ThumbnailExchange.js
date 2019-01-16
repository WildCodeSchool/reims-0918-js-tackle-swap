import React from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Typography } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    backgroundColor: "#e6f7ff"
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "#009682",
    color: "#ffffff"
  }
});

function ThumbnailExchange(props) {
  const { classes } = props;

  const goToArticleDetails = () => {
    props.history.push("/article/2");
  };

  const goToChat = () => {
    props.history.push("/conversation-2-2-1");
  };
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid
          item
          xs={4}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img
            src={`${
              process.env.REACT_APP_URL_API
            }/data/pictures_articles/2/leurre.jpg`}
            alt={`${
              process.env.REACT_APP_URL_API
            }/data/pictures_articles/2/leurre.jpg`}
            style={{
              maxWidth: "95%",
              maxHeight: "95%"
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Typography variant="h5" style={{ color: "#009682" }}>
                ILLEX Tiny Fry 38 SP
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                justify: "space-around"
              }}
            >
              <Button
                style={{ border: "1px solid #009682" }}
                className={classes.button}
                onClick={() => goToChat()}
              >
                Conversation
              </Button>

              <Button
                style={{ border: "1px solid #009682" }}
                className={classes.button}
                onClick={() => goToArticleDetails()}
              >
                Détails
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

ThumbnailExchange.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ThumbnailExchange));
