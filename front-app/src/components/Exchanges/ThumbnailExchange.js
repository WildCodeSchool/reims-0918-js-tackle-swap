import React from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Typography } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    color: theme.palette.text.secondary
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "#009682",
    border: "0.5px solid #009682"
  }
});

function ThumbnailExchange(props) {
  const { classes } = props;

  return (
    <Grid item xs={12}>
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
              }/data/pictures_articles/default.png`}
              alt={`${
                process.env.REACT_APP_URL_API
              }/data/pictures_articles/default.png`}
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
                <Typography variant="h5">Nom article</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Typography variant="body1">Description article</Typography>
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
                <Button className={classes.button}>Conversations</Button>

                <Button className={classes.button}>Détails</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

ThumbnailExchange.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ThumbnailExchange);
