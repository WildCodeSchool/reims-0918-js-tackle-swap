import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "#009682"
  }
});

function InteractionsArticleDetails(props) {
  const { classes, articleDetails } = props;

  const goToChat = () => {
    props.history.push(`/conversation-article-${articleDetails.id}`);
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ border: "2px solid #009682", display: "block" }}
        className={classes.button}
        onClick={() => goToChat()}
      >
        Contacter le vendeur
      </Button>
      <Button
        variant="contained"
        style={{ border: "2px solid #009682" }}
        className={classes.button}
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
}

export default withRouter(withStyles(styles)(InteractionsArticleDetails));
