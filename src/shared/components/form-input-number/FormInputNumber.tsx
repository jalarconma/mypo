import React from "react";

import { Controller } from "react-hook-form";

import TextField from "@mui/material/TextField";

const FormInputNumber = ({control, name, label = '', rules = {}, inputProps = {}}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField error={!!error} fullWidth label={label} type="number" variant="outlined"
          InputProps={inputProps} 
          onChange={onChange} value={value} helperText={error?.message}/>
      )}
    />
  );
}

export default FormInputNumber;