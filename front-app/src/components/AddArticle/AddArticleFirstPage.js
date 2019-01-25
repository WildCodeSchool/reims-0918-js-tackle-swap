import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderField } from "../Form/RenderField";
import { validate } from "../Form/Validate";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  button: {
    backgroundColor: "#009682",
    border: "1px solid #009682",
    display: "block",
    color: "white",
    margin: "0 auto",
    width: "320px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

const currencies = [
  {
    value: "",
    label: ""
  },
  {
    value: "Usé",
    label: "Usé"
  },
  {
    value: "Bon état",
    label: "Bon état"
  },
  {
    value: "Très bon état",
    label: "Très bon état"
  },
  {
    value: "Comme neuf",
    label: "Comme neuf"
  }
];

class AddArticleFirstPage extends React.Component {
  state = {
    currency: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { handleSubmit, reset, classes } = this.props;
    return (
      <form
        onSubmit={handleSubmit}
        style={{ padding: "20px", textAlign: "center" }}
      >
        <h4 style={{ color: "#00cccc", fontSize: "1.2em", margin: "0" }}>
          Ajouter un article à votre vitrine :
        </h4>
        <div>
          <Field
            name="name"
            component={renderField}
            type="text"
            label="Nom du leurre"
            style={{ width: "310px" }}
          />
        </div>
        <div>
          <Field
            name="description"
            component={renderField}
            type="textarea"
            label="Description"
            style={{ width: "310px" }}
          />
        </div>
        <div>
          <Field
            name="brand"
            component={renderField}
            type="text"
            label="Marque"
            style={{ width: "310px" }}
          />
        </div>

        <div>
          <h5
            style={{
              color: "#00cccc",
              fontSize: "1.2em",
              margin: "0",
              marginTop: "30px"
            }}
          >
            Description de votre leurre :
          </h5>
          <div>
            <Field
              name="article_length"
              component={renderField}
              type="number"
              label="Longueur (en cemtimètre)"
              style={{ width: "310px" }}
            />
          </div>
          <div>
            <Field
              name="article_weight"
              component={renderField}
              type="number"
              label="Poid (en grammes)"
              style={{ width: "310px" }}
            />
          </div>
          <div>
            <Field
              name="article_color"
              component={renderField}
              label="Couleur principale"
              type="text"
              style={{ width: "310px" }}
            />
          </div>
          <TextField
            id="standard-select-currency-native"
            select
            label="Etat de l'article"
            className={classes.textField}
            value={this.state.currency}
            onChange={this.handleChange("currency")}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Veuillez sélectionner l'état de l'article"
            margin="normal"
          >
            {currencies.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </div>
        <p style={{ color: "#009682" }}>
          Ajouter une ou plusieurs photos à l'étape suivante
        </p>
        <div>
          <div style={{ padding: "5px" }}>
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
            >
              Passer à l'étape suivante
            </Button>
          </div>
          <div style={{ padding: "5px" }}>
            <Button
              type="button"
              variant="contained"
              className={classes.button}
              onClick={reset}
            >
              Effacer le formulaire
            </Button>
          </div>
        </div>
      </form>
    );
  }
}
export default withStyles(styles)(
  reduxForm({
    form: "addArticle",
    validate
  })(AddArticleFirstPage)
);
