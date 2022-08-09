import React from "react";

import { Controller } from "react-hook-form";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const FormAutocompleteSelector = ({ control, name, options, label = '', rules = {}, multiple = false}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          multiple={multiple}
          disablePortal
          options={options}
          value={value}
          onChange={(event, data) => {
            onChange(data);
            return data;
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField error={!!error} helperText={error?.message} {...params} label={label} />}
        />
      )}
    />
  )
}

export default FormAutocompleteSelector;