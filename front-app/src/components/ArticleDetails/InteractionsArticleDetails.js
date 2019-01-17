import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ls from "local-storage";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  button: {
    backgroundColor: "#009682",
    border: "1px solid #009682",
    display: "block",
    color: "white",
    margin: "0 auto",
    width: "320px"
  }
});

const InteractionsArticleDetails = props => {
  const { classes, setFlashMessage, articleDetails, user } = props;

  const goToSwap = id_article => {
    if (ls.get("jwt-tackle-swap")) {
      props.history.push(`/proposer-article/${id_article}`);
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
      <div style={{ padding: "5px" }}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => goToChat()}
        >
          Contacter le vendeur
        </Button>
      </div>
      <div style={{ padding: "5px" }}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => goToSwap(articleDetails.id)}
        >
          Proposer un échange
        </Button>
      </div>
      <div style={{ padding: "5px" }}>
        <Button variant="contained" className={classes.button}>
          Partager
        </Button>
      </div>
    </div>
  );
};

export default withRouter(withStyles(styles)(InteractionsArticleDetails));
