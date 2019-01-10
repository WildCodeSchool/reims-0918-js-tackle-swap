import React from "react";
import PropTypes from "prop-types";
import { Grid, Paper } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    color: theme.palette.text.secondary
  }
});

function ThumbnailExchange(props) {
  const { classes } = props;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper classeName={classes.paper}>
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
              <p>Hello</p>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

ThumbnailExchange.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles)(ThumbnailExchange);
