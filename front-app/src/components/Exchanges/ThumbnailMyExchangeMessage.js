import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1
  },

  button: {
    margin: theme.spacing.unit,
    backgroundColor: "#009682",
    color: "#ffffff"
  }
});

function ThumbnailMyExchangeMessage(props) {
  const { classes } = props;

  const goToExchangeDetails = id => {
    props.history.push(`/details-echange-${id}`);
  };

  return (
    <Grid
      container
      style={{
        width: "100%",
        backgroundColor: "rgba(230, 247, 255, 0.8)",
        borderRadius: "4px",
        border: "1px solid #009682",
        marginBottom: "5px"
      }}
    >
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
          src={`${process.env.REACT_APP_URL_API}${props.picture}`}
          alt={`${process.env.REACT_APP_URL_API}${props.picture}`}
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
            <Typography
              style={{ color: "#009682", paddingTop: "8px", fontSize: "22px" }}
            >
              {props.name}
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
              className={classes.button}
              onClick={() =>
                goToExchangeDetails(props.swap_in_progress[0].id_swap)
              }
              style={{ color: "white" }}
            >
              Détails de l'échange
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

ThumbnailMyExchangeMessage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ThumbnailMyExchangeMessage));
