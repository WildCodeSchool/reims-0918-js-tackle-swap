export const validate = values => {
  const errors = {};
  if (!values.gender) {
    errors.gender = "Requis.";
  }
  if (!values.lastname) {
    errors.lastname = "Requis.";
  }

  if (!values.firstname) {
    errors.firstname = "Requis.";
  }

  if (!values.email) {
    errors.email = "Requis";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Adresse mail invalide.";
  }

  if (!values.nickname) {
    errors.nickname = "Requis.";
  }

  if (!values.password) {
    errors.password = "Requis.";
  } else if (values.password.length < 6) {
    errors.password = "6 caractères minimum.";
  }

  if (!values.passwordBis) {
    errors.passwordBis = "Requis.";
  } else if (values.password !== values.passwordBis) {
    errors.passwordBis = "Les deux mots de passes ne sont pas identiques.";
  }

  if (!values.name) {
    errors.name = "Requis.";
  }
  return errors;
};
