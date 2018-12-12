import React from "react";

const DescriptionArticleDetails = ({
  description,
  article_color,
  article_weight,
  article_length,
  article_state,
  brand
}) => (
  <div>
    <h1>Description</h1>
    <p>{description}</p>
    <h2>Catégorie : </h2>
    <h2>Caractéristiques</h2>
    <ul>
      <li>Marque: {brand}</li>
      <li>Couleur: {article_color}</li>
      <li>Poids: {article_weight} g</li>
      <li>Longueur: {article_length} mm</li>
      <li>Etat: {article_state}/5</li>
    </ul>
  </div>
);

export default DescriptionArticleDetails;
