import React from "react";
import { CardImg } from "reactstrap";

const PicturesArticleDetails = ({ picture }) => (
  <div>
    <CardImg top width="100%" src={picture} alt="Picture article" />
  </div>
);

export default PicturesArticleDetails;
