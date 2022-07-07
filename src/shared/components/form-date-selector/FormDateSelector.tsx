import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Controller } from "react-hook-form";

const FormDateSelector = ({ control, name, label = "", rules = {}, format = "dd/MM/yyyy" }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={1}>
            <MobileDatePicker
              label={label}
              inputFormat={format}
              value={value}
              onChange={onChange}
              renderInput={(params) => <TextField error={!!error} fullWidth {...params} />}
            />
            <FormHelperText error={!!error}>{error?.message}</FormHelperText>
          </Stack>
        </LocalizationProvider>
      )}
    />
  );
}

export default FormDateSelector;