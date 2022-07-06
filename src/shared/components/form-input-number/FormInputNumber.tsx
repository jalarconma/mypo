import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

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