import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderField } from "../Form/RenderField";
import { validate } from "../Form/Validate";

const AddArticleFirstPage = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="name"
          component={renderField}
          type="text"
          label="Nom du leurre"
        />
      </div>
      <div>
        <Field
          name="description"
          component={renderField}
          type="textarea"
          label="Description"
        />
      </div>
      <div>
        <Field
          name="brand"
          component={renderField}
          type="text"
          label="Marque"
        />
      </div>

      <div>
        <h5>Description de votre leurre :</h5>
        <div>
          <Field
            name="article_length"
            component={renderField}
            type="number"
            label="Longueur (en cemtimètre)"
          />
        </div>
        <div>
          <Field
            name="article_weight"
            component={renderField}
            type="number"
            label="Poid (en grammes)"
          />
        </div>
        <div>
          <Field
            name="article_color"
            component={renderField}
            label="Couleur principale"
            type="text"
          />
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
      <p>Ajoutez une ou plusieurs photos à l'étape suivante</p>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Passez à l'étape suivante
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Effacer le formulaire
        </button>
      </div>
    </form>
  );
};
export default reduxForm({
  form: "addArticle",
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(AddArticleFirstPage);
