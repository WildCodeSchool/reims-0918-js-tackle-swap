import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "#009688"
  }
});

function InteractionsArticleDetails(props) {
  const { classes } = props;
  return (
    <div>
      <Button
        variant="contained"
        style={{ border: "2px solid #009688" }}
        className={classes.button}
      >
        Proposer un échange
      </Button>
      <Button
        variant="contained"
        style={{ border: "2px solid #009688" }}
        className={classes.button}
      >
        Partager
      </Button>
    </div>
  );
}

export default withStyles(styles)(InteractionsArticleDetails);
