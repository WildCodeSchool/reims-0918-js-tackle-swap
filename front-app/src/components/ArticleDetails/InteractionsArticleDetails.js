import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ls from "local-storage";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "#009682"
  }
});

const InteractionsArticleDetails = props => {
  const { classes, setFlashMessage, articleDetails, user } = props;

  const goToSwap = () => {
    if (ls.get("jwt-tackle-swap")) {
      props.history.push("/proposer-article");
    } else {
      setFlashMessage({
        type: "warning",
        message: "Vous devez être connecté !"
      });
    }
  };

  const goToChat = () => {
    props.history.push(
      `/conversation-${articleDetails.id}-${articleDetails.owner_id}-${user.id}`
    );
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          border: "2px solid #009682",
          display: "block",
          color: "white"
        }}
        className={classes.button}
        onClick={() => goToChat()}
      >
        Contacter le vendeur
      </Button>
      <Button
        variant="contained"
        style={{ border: "2px solid #009682", color: "white" }}
        className={classes.button}
        onClick={() => goToSwap()}
      >
        Proposer un échange
      </Button>
      <Button
        variant="contained"
        style={{ border: "2px solid #009682", color: "white" }}
        className={classes.button}
      >
        Partager
      </Button>
    </div>
  );
};

export default withRouter(withStyles(styles)(InteractionsArticleDetails));
