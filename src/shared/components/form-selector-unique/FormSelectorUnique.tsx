import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

const FormSelectorUnique = ({control, name, options, label = '', rules = {}}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <TextField
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