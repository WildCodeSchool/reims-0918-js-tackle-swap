import React from "react";

const AddArticleSecondPage = props => {
  const { handleChangeAddPicture, picturesUploaded } = props;
  return (
    <form>
      <div>
        <input
          type="file"
          name="picture"
          id="picture"
          onChange={event => handleChangeAddPicture(event)}
        />
      </div>
      {picturesUploaded.length > 0 &&
        picturesUploaded.map((picture, index) => (
          <div key={index}>
            <img
              src={`${process.env.REACT_APP_URL_API}${picture}`}
              alt={picturesUploaded[0]}
              style={{
                maxHeight: 170,
                maxWidth: 170,
                margin: 10,
                width: "100%",
                objectFit: "contain"
              }}
            />
            <p>En faire la photo principale</p>
            <p>Supprimer</p>
          </div>
        ))}
      <div>
        <button>Prévisualiser mon annonce</button>
      </div>
    </form>
  );
};
export default AddArticleSecondPage;
