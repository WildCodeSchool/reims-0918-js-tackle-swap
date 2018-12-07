import React from "react";
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
    maxWidth: 300
  },
  media: {
    height: 140
  }
};

function ThumbnailArticle(props) {
  const { classes, picture, name } = props;
  return (
    <Grid xs={6} sm={4} md={3} lg={2}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media} image={picture} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography component="p">Description</Typography>
          </CardContent>
        </CardActionArea>
        {/* { <Col xs="6" sm="4" md="4" lg="3">
      <Card
        style={{
          border: "1px solid white",
          backgroundColor: "#eaf5f9",
          color: "#2accce"
        }}
        className="mb-3"
      >
        <CardImg top width="100%" src={picture} alt="Picture article" />
        <CardBody style={{ padding: "0" }} className="text-center">
          <CardTitle>{name}</CardTitle>
          <CardSubtitle>Categorie</CardSubtitle>
          <Row>
            <Col xs={{ size: "4", offset: "8" }}>
              <i className="far fa-heart" />
            </Col>
          </Row>
        </CardBody>} */}
      </Card>
    </Grid>
  );
}

ThumbnailArticle.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ThumbnailArticle);
