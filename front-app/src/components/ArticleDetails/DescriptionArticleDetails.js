import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  divLeft: {
    justifyContent: "start",
    display: "flex"
  },
  divRight: {
    paddingLeft: "5px"
  },
  color: {
    color: "#999999"
  }
});

const DescriptionArticleDetails = ({
  description,
  article_color,
  article_weight,
  article_length,
  article_state,
  brand,
  classes
}) => (
  <div style={{ maxWidth: "290px" }}>
    <h2 className="TextDescription"> Description</h2>
    <p className="FontSize">{description}</p>
    <h2 className="TextDescription">Caractéristiques</h2>
    <ul style={{ listStyle: "none", padding: "0" }}>
      <div className="FontSize">
        <li>
          <div className={classes.divLeft}>
            <div className={classes.color}>Marque:</div>
            <div className={classes.divRight}>{brand}</div>
          </div>
        </li>
        <li>
          <div className={classes.divLeft}>
            <div className={classes.color}>Couleur:</div>
            <div className={classes.divRight}>{article_color}</div>
          </div>
        </li>
        <li>
          <div className={classes.divLeft}>
            <div className={classes.color}>Poids: </div>
            <div className={classes.divRight}>{article_weight} g</div>
          </div>
        </li>
        <li>
          <div className={classes.divLeft}>
            <div className={classes.color}>Longueur:</div>
            <div className={classes.divRight}>{article_length} mm</div>
          </div>
        </li>
        <li>
          <div className={classes.divLeft}>
            <div className={classes.color}>Etat:</div>
            <div className={classes.divRight}>{article_state}/5</div>
          </div>
        </li>
      </div>
    </ul>
  </div>
);

export default withStyles(styles)(DescriptionArticleDetails);
