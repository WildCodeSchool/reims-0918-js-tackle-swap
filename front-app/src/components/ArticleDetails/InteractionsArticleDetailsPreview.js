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
  const { classes, onlineArticle, online } = props;
  const idArticle = props.id;
  console.log(props);
  return (
    <div>
      <Button
        variant="contained"
        style={{ border: "2px solid #009682", color: "white" }}
        className={classes.button}
      >
        Modifier mon annonce
      </Button>
      {online ? (
        <Button
          variant="contained"
          style={{ border: "2px solid #009682", color: "white" }}
          className={classes.button}
          onClick={() => onlineArticle(idArticle, false)}
        >
          Mettre hors ligne
        </Button>
      ) : (
        <Button
          variant="contained"
          style={{ border: "2px solid #009682", color: "white" }}
          className={classes.button}
          onClick={() => onlineArticle(idArticle, true)}
        >
          Mettre en ligne
        </Button>
      )}
    </div>
  );
}

export default withStyles(styles)(InteractionsArticleDetails);
