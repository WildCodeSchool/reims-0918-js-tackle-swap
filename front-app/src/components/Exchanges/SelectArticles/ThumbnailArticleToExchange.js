import React from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Typography } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";

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

function ThumbnailArticleToExchange(props) {
  const { classes } = props;

  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={2}>
          <Radio
            color="default"
            name="radio-button"
            icon={<RadioButtonUncheckedIcon fontSize="small" />}
            checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
          />
        </Grid>
        <Grid item xs={10}>
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
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

ThumbnailArticleToExchange.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ThumbnailArticleToExchange);
