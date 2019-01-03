import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "#009682"
  }
});

function InteractionsArticleDetails(props) {
  const { classes } = props;
  return (
    <div>
      <Button
        variant="contained"
        style={{ border: "2px solid #009682" }}
        className={classes.button}
      >
        Modifier mon annonce
      </Button>
      <Button
        variant="contained"
        style={{ border: "2px solid #009682" }}
        className={classes.button}
      >
        Mettre en ligne
      </Button>
    </div>
  );
}

export default withStyles(styles)(InteractionsArticleDetails);
