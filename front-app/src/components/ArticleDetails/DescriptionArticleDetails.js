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
    <h2 className="TextDescription"> Description</h2>
    <p className="FontSize">{description}</p>
    <h2 className="TextDescription">Caractéristiques</h2>
    <ul>
      <div className="FontSize">
        <li>Marque: {brand}</li>
        <li>Couleur: {article_color}</li>
        <li>Poids: {article_weight} g</li>
        <li>Longueur: {article_length} mm</li>
        <li>Etat: {article_state}/5</li>
      </div>
    </ul>
  </div>
);

export default DescriptionArticleDetails;
