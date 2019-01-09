import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ls from "local-storage";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "#009682"
  }
});

const InteractionsArticleDetails = props => {
  const { classes, setFlashMessage } = props;

  const goToSwap = () => {
    if (ls.get("jwt-tackle-swap")) {
      console.log("redirection composant échange");
    } else {
      setFlashMessage({
        type: "warning",
        message: "Vous devez être connecté !"
      });
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        style={{ border: "2px solid #009682" }}
        className={classes.button}
        onClick={() => goToSwap()}
      >
        Proposer un échange
      </Button>
      <Button
        variant="contained"
        style={{ border: "2px solid #009682" }}
        className={classes.button}
      >
        Partager
      </Button>
    </div>
  );
};

export default withStyles(styles)(InteractionsArticleDetails);
