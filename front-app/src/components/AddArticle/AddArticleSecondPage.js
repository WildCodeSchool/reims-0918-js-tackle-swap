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
      {picturesUploaded.length > 0 && (
        <div>
          <img
            src={`${process.env.REACT_APP_URL_API}${picturesUploaded[0]}`}
            alt={picturesUploaded[0]}
          />
        </div>
      )}
      <div>
        <button>Prévisualiser mon annonce</button>
      </div>
    </form>
  );
};
export default AddArticleSecondPage;