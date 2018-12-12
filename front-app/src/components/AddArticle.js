import React, { Fragment } from "react";
import { Field, reduxForm } from "redux-form";

const AddArticle = props => {
  const { handleSubmit, pristine, reset, submitting, onSubmit } = props;
  return (
    <Fragment>
      <h4>Ajouter un article à votre vitrine :</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nom du leurre :</label>
          <div>
            <Field
              name="name"
              component="input"
              type="text"
              placeholder="Nom du leurre"
            />
          </div>
        </div>
        <div>
          <label>Description :</label>
          <div>
            <Field
              name="description"
              component="textarea"
              placeholder="Description"
            />
          </div>
        </div>
        <div>
          <label>Marque :</label>
          <div>
            <Field
              name="brand"
              component="input"
              type="text"
              placeholder="Marque"
            />
          </div>
        </div>
        <div>
          <label>Photo :</label>
          <div>
            <Field
              name="picture"
              component="input"
              type="text"
              placeholder="Lien vers la photo"
            />
          </div>
        </div>
        <div>
          <h5>Description de votre leurre :</h5>
          <div>
            <label>Longueur de l'article :</label>
            <div>
              <Field name="article_length" component="input" type="number" />
            </div>
          </div>
          <div>
            <label>Poid de l'article :</label>
            <div>
              <Field name="article_weight" component="input" type="number" />
            </div>
          </div>
          <div>
            <label>Couleur de l'article :</label>
            <div>
              <Field name="article_color" component="input" type="text" />
            </div>
          </div>
          <div>
            <label>État de l'article :</label>
            <div>
              <Field name="article_state" component="select">
                <option />
                <option value="1">Usé</option>
                <option value="2">Bon état</option>
                <option value="3">Très bon état</option>
                <option value="4">Comme neuf</option>
              </Field>
            </div>
          </div>
        </div>

        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default reduxForm({
  form: "addArticle"
})(AddArticle);
