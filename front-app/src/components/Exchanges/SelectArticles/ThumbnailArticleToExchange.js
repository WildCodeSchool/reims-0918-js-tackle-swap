import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Typography, Button } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
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

class ThumbnailArticleToExchange extends Component {
  goToDetail(id) {
    this.props.history.push(`/article/${id}`);
  }
  render() {
    const { classes } = this.props;

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
              src={`${process.env.REACT_APP_URL_API}${this.props.url_picture}`}
              alt={`${process.env.REACT_APP_URL_API}${this.props.url_picture}`}
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
                <Typography variant="h5">{this.props.name}</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "center"
                }}
              >
                <Button
                  className={classes.button}
                  onClick={() => this.goToDetail(this.props.id)}
                >
                  Détail
                </Button>
                <Button className={classes.button}>Sélectionner</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

ThumbnailArticleToExchange.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ThumbnailArticleToExchange));
