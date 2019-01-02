import React from "react";

const AddArticleSecondPage = props => {
  const { handleChangeAddPicture, submitPicture } = props;
  return (
    <form>
      <div>
        <input
          type="file"
          name="pictures"
          multiple
          onChange={event => handleChangeAddPicture(event)}
        />
      </div>
      <div>
        <button onClick={event => submitPicture(event)}>
          Ajouter mon leurre
        </button>
      </div>
    </form>
  );
};
export default AddArticleSecondPage;
