import { TextField } from "@mui/material";
import React from "react";
import { OnChangeEventType } from "./CustomForms";
import styles from "./CustomForms.module.scss";

type InputTextFieldProps = {
  type: string;
  name: string;
  label?: string;
  onChange: (e: OnChangeEventType) => void;
  formValidate?: (e: OnChangeEventType) => void;
  optionalChange?: (e: OnChangeEventType) => void;
  error?: boolean;
  value: string | number | boolean;
  helperText?: string | number | boolean;
  placeHolder?: string;
};

const InputTextField: React.FC<InputTextFieldProps> = (props) => {
  const {
    type,
    name,
    label,
    onChange,
    formValidate,
    placeHolder,
    value,
    error,
    helperText,
  } = props;

  return (
    <>
      <div className={styles.label}>
        {label && (
          <label className="fs_15px_purple_c_bold" htmlFor="">
            {label}
          </label>
        )}
      </div>

      <TextField
        id="standard-basic"
        placeholder={placeHolder ?? ""}
        variant="standard"
        style={{ width: "100%" }}
        size="small"
        type={type}
        name={name}
        onChange={onChange}
        onBlur={(e: any) =>
          typeof formValidate === "function" && formValidate(e)
        }
        value={value}
        error={error}
        helperText={helperText}
        inputProps={{ style: { fontSize: 15 } }}
      />
    </>
  );
};

export default InputTextField;
