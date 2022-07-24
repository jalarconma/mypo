import React from "react";

import { Controller } from "react-hook-form";

import TextField from "@mui/material/TextField";

const FormInputText = ({ control, name, label = '', rules = {}, inputProps = {}}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField error={!!error} fullWidth label={label} variant="outlined"
          InputProps={inputProps}
          onChange={onChange} value={value} helperText={error?.message} />
      )}
    />
  );

}

export default FormInputText;