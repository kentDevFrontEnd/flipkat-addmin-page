import React from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { ErrorMessage } from "formik";

function InputField(props) {
  const { field, form, label, type } = props;
  const { name } = field;

  const { errors, touched } = form;

  const isError = errors[name] && touched[name];

  return (
    <FormGroup>
      <Label
        htmlFor={name}
        className={isError ? "text-capitalize text-red" : "text-capitalize"}
      >
        {label}:
      </Label>
      <Input type={type} id={name} {...field} invalid={isError} />
      {/* {isError && <FormFeedback>{errors[name]}</FormFeedback>} */}
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default InputField;
