import React from "react";

import TextField from "material-ui/TextField";
import { RadioButtonGroup } from "material-ui/RadioButton";

export const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  ...custom
}) => (
  <div>
    <TextField
      type={type}
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  </div>
);

export const renderRadioGroup = ({
  input,
  meta: { touched, error, warning },
  label,
  ...rest
}) => (
  <React.Fragment>
    <label>{label} : </label>{" "}
    {touched &&
      ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    <RadioButtonGroup
      {...input}
      {...rest}
      valueselected={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  </React.Fragment>
);
