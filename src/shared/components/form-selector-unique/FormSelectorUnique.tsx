import React from "react";

import { Controller } from "react-hook-form";

import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const FormSelectorUnique = ({control, name, options, label = '', rules = {}}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          error={!!error}
          helperText={error?.message}
          select
          fullWidth 
          label={label}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  )
}

export default FormSelectorUnique;