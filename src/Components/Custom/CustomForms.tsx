import React, { useEffect, useState } from "react";
import _ from "lodash";
import { validator } from "./validator";
import InputTextField from "./InputTextField";
import styles from "./CustomForms.module.scss";

import { SelectChangeEvent } from "@mui/material";

type ObjectType = { [key: string]: string | boolean | number };
export type OnChangeEventType = React.ChangeEvent<HTMLInputElement>;

type FormFields = {
  name: string;
  type?: string;
  label?: string;
  component: string;
  required?: boolean;
  isOptional?: boolean;
  width: string;
  options?: Array<{ key: string; value: string }>;
};

type FormData = {
  form_container: string;
  inputHeight?: string;
  buttonName: string;
  button_class: string;
  initialState: ObjectType;
  formFields: Array<FormFields>;
};

type CustomFormsProps = {
  formData: FormData;
  formSubmit: any;
};

const CustomForms: React.FC<CustomFormsProps> = (props) => {
  const { formData, formSubmit } = props;
  const { formFields, initialState, inputHeight = "90px" } = formData;

  const [errors, setErrors] = useState<ObjectType>({});
  const [disable, setDisable] = useState(true);
  const [data, setData] = useState(initialState);

  useEffect(() => {
    const allDataExist = Object.values(data).every((value) => value);
    if (allDataExist) {
      const isError = Object.keys(errors).every(
        (k: keyof ObjectType) => !errors[k]
      );
      if (isError) {
        return setDisable(false);
      } else {
        return setDisable(true);
      }
    }
    setDisable(true);
  }, [errors, data]);

  const onChange = (event: OnChangeEventType | SelectChangeEvent<any>) => {
    const {
      target: { value, name },
    } = event;
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const formValidate = (event: OnChangeEventType) => {
    const {
      target: { value, name },
    } = event;
    const valid: ObjectType | undefined = validator(name, value, data);
    if (valid && valid[name]) {
      setErrors((prevState) => ({ ...prevState, ...valid }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formSubmit({ ...data });
    setData(initialState);
    setDisable(true);
  };

  const renderInputFields = (formFields: FormFields) => {
    const { name, label, type, component, width } = formFields;

    switch (component) {
      case "INPUT_FIELD":
        return (
          <div style={{ width, height: inputHeight }}>
            <InputTextField
              type={type ?? ""}
              name={name}
              label={label || ""}
              onChange={onChange}
              formValidate={formValidate}
              value={data[name]}
              error={Boolean(errors[name])}
              helperText={errors[name]}
            />
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit}>
        <div className={formData.form_container ? formData.form_container : ""}>
          {formFields &&
            formFields.map((formFields: FormFields, i) => (
              <React.Fragment key={i}>
                {renderInputFields(formFields)}
              </React.Fragment>
            ))}
        </div>
        <button
          className={formData.button_class ? formData.button_class : ""}
          style={disable ? { opacity: 0.5 } : { opacity: 1 }}
          disabled={disable}
        >
          {formData.buttonName}
        </button>
      </form>
    </div>
  );
};

export default CustomForms;
