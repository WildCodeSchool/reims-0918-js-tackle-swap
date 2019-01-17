import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Typography, Button } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
const styles = theme => ({
  root: {
    width: 500
  },
  articleUnSelected: {
    backgroundColor: "rgba(230, 247, 255, 0.8)",
    borderRadius: "4px",
    border: "1px solid #009682"
  },
  articleSelected: {
    backgroundColor: "#d7e6ed",
    borderRadius: "4px",
    border: "1px solid #009682"
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "#009682",
    color: "#e6f7ff",
    border: "0.5px solid #009682"
  },
  buttonSelected: {
    margin: theme.spacing.unit,
    backgroundColor: "#e6f7ff",
    color: "#009682",
    border: "0.5px solid #009682"
  }
});

class ThumbnailArticleToExchange extends Component {
  goToDetail(id) {
    this.props.history.push(`/article/${id}`);
  }
  render() {
    const { classes, selectArticleToExchange, selectedArticle } = this.props;
    const mainPicture = this.props.pictures.filter(
      picture => picture.main_picture
    );
    const picture = mainPicture[0].url_picture;
    return (
      <div
        className={classes.root}
        style={{
          width: "97%",
          margin: "0px 5px 0 5px",
          borderRadius: "10px",
          backgroundColor: "transparent"
        }}
      >
        <Paper
          className={
            selectedArticle === this.props.id
              ? classes.articleSelected
              : classes.articleUnSelected
          }
        >
          <Grid container>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <img
                src={`${process.env.REACT_APP_URL_API}${picture}`}
                alt={`${process.env.REACT_APP_URL_API}${picture}`}
                style={{
                  maxWidth: "95%",
                  maxHeight: "95%"
                }}
              />
            </Grid>
            <Grid item xs={8}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Typography
                    style={{
                      color: "#00cccc",
                      paddingTop: "8px",
                      fontSize: "22px"
                    }}
                    variant="h5"
                  >
                    {this.props.name}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "center"
                  }}
                >
                  <Button
                    className={classes.button}
                    onClick={() => this.goToDetail(this.props.id)}
                  >
                    Détail
                  </Button>
                  {selectedArticle === this.props.id ? (
                    <Button className={classes.buttonSelected}>
                      Sélectionné
                    </Button>
                  ) : (
                    <Button
                      className={classes.button}
                      onClick={() => selectArticleToExchange(this.props.id)}
                    >
                      Sélectionner
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

ThumbnailArticleToExchange.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ThumbnailArticleToExchange));
