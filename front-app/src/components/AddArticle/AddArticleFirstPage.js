import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderField } from "../Form/RenderField";
import { validate } from "../Form/Validate";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "#009682"
  }
});

const AddArticleFirstPage = props => {
  const { handleSubmit, reset, classes } = props;
  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h4>Ajouter un article à votre vitrine :</h4>
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
        <Button
          type="submit"
          variant="contained"
          style={{ border: "2px solid #009682", color: "white" }}
          className={classes.button}
        >
          Passez à l'étape suivante
        </Button>
        <Button
          type="button"
          variant="contained"
          style={{ border: "2px solid #009682", color: "white" }}
          className={classes.button}
          onClick={reset}
        >
          Effacer le formulaire
        </Button>
      </div>
    </form>
  );
};
export default withStyles(styles)(
  reduxForm({
    form: "addArticle",
    validate
  })(AddArticleFirstPage)
);
