import React, { Fragment } from "react";
import { Grid, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const AddArticleSecondPage = props => {
  const {
    submitPicture,
    picturesUploaded,
    defineMainPicture,
    deletePicture,
    idArticle
  } = props;

  const goToPreview = idArticle => {
    props.history.push(`/previsualisation/${idArticle}`);
  };
  return (
    <Fragment>
      <div>
        <p
          style={{
            color: "rgb(0, 204, 204)",
            fontSize: "1.2em",
            margin: "0px",
            padding: "15px",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          Ajouter Une photo:{" "}
        </p>
        <form style={{ padding: "15px", textAlign: "center" }}>
          {picturesUploaded.length < 3 && (
            <input
              className="picture"
              type="file"
              name="picture"
              id="picture"
              onChange={event => submitPicture(event)}
            />
          )}
        </form>
        {picturesUploaded.length > 0 && (
          <Grid container>
            {picturesUploaded.map((pictureUploaded, index) => (
              <Grid item key={index}>
                <Grid container>
                  <Grid item xs={6}>
                    <img
                      src={`${process.env.REACT_APP_URL_API}${
                        pictureUploaded.picture
                      }`}
                      alt={pictureUploaded[0]}
                      style={{
                        maxHeight: 140,
                        maxWidth: 140,
                        margin: 10,
                        width: "100%",
                        objectFit: "contain"
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    {pictureUploaded.mainPicture ? (
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#009682", color: "white" }}
                        disabled
                      >
                        Photo principale
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() =>
                          defineMainPicture(pictureUploaded.idPicture)
                        }
                      >
                        Mettre photo principale
                      </Button>
                    )}
                    <Button
                      onClick={() => deletePicture(pictureUploaded.idPicture)}
                    >
                      Supprimer la photo
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      <div style={{ padding: "20px" }}>
        <Button
          style={{
            backgroundColor: "#009682",
            border: "1px solid #009682",
            display: "block",
            color: "white",
            margin: "0 auto",
            width: "320px"
          }}
          onClick={() => goToPreview(idArticle)}
        >
          Prévisualiser mon annonce
        </Button>
      </div>
    </Fragment>
  );
};
export default withRouter(AddArticleSecondPage);
