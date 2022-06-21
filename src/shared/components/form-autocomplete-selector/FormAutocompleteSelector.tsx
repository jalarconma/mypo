import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

const FormAutocompleteSelector = ({ control, name, options, label = '', rules = {} }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          disablePortal
          options={options}
          value={value}
          onChange={(event, data) => {
            onChange(data);
            return data;
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      )}
    />
  )
}

export default FormAutocompleteSelector;