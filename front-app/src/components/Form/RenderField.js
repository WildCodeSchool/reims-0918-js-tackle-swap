import React from "react";

import RadioGroup from "@material-ui/core/RadioGroup";

export const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
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
    <RadioGroup
      {...input}
      {...rest}
      valueselected={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  </React.Fragment>
);
