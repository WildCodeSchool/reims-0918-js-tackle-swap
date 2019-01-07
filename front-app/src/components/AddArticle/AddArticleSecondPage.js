import React, { Fragment } from "react";
import { Grid, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const AddArticleSecondPage = props => {
  const {
    handleChangeAddPicture,
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
        <form>
          <input
            type="file"
            name="picture"
            id="picture"
            onChange={event => handleChangeAddPicture(event)}
          />
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
      <div>
        <button onClick={() => goToPreview(idArticle)}>
          Prévisualiser mon annonce
        </button>
      </div>
    </Fragment>
  );
};
export default withRouter(AddArticleSecondPage);
