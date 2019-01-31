import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = {
  card: {
    maxWidth: 300,
    backgroundColor: "rgba(230, 247, 255, 0.9)",
    border: "2px solid white"
  },
  media: {
    height: 140
  },
  textTitle: {
    color: "#00cccc",
    whiteSpace: "nowrap",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  textDescription: {
    color: "#009682"
  },
  link: {
    textDecoration: "none"
  }
};

function ThumbnailArticle(props) {
  const { classes, pictures, name, description, id } = props;
  const mainPicture = pictures.filter(picture => picture.main_picture);
  const picture = mainPicture[0].url_picture;
  return (
    <Grid item xs={6} sm={4} md={3} lg={2}>
      <Link className={classes.link} to={{ pathname: `/article/${id}` }}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <img
                src={`${process.env.REACT_APP_URL_API}${picture}`}
                alt={`${process.env.REACT_APP_URL_API}${picture}`}
                style={{ width: "100%", height: 140, objectFit: "contain" }}
              />
              <Typography
                className={classes.textTitle}
                gutterBottom
                variant="h6"
                component="p"
              >
                {name}
              </Typography>
              <p
                className={classes.textDescription}
                style={{
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: 15,
                  lineHeight: "30px",
                  maxHeight: "60px"
                }}
              >
                {description}
              </p>
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
