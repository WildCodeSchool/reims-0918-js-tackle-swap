import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = {
  card: {
    maxWidth: 300,
    backgroundColor: "#e6f7ff",
    border: "2px solid white"
  },
  media: {
    height: 140
  },
  textTitle: {
    color: "#00cccc"
  },
  textDescription: {
    color: "#009682"
  },
  link: {
    textDecoration: "none"
  }
};

function ThumbnailArticle(props) {
  const { classes, picture, name, id } = props;
  return (
    <Grid item xs={6} sm={4} md={3} lg={2}>
      <Link className={classes.link} to={{ pathname: `/article/${id}` }}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`${process.env.REACT_APP_URL_API}${picture}`}
            />
            <CardContent>
              <Typography
                className={classes.textTitle}
                gutterBottom
                variant="h6"
                component="h2"
              >
                {name}
              </Typography>
              <Typography
                className={classes.textDescription}
                variant="subtitle1"
                component="p"
              >
                Trop beau leurre et bonne qualité...
              </Typography>
              <div
                style={{
                  textAlign: "right",
                  color: "#009682",
                  paddingRight: "0px"
                }}
              >
                <i style={{ color: "#00cccc" }} className="far fa-heart" />
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
}

ThumbnailArticle.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ThumbnailArticle);
