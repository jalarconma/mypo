import FormHelperText from "@mui/material/FormHelperText";
import { Controller } from "react-hook-form";

import ToggleSelectorUnique from "../toggle-selector-unique/ToggleSelectorUnique";


const FormToggleSelectorUnique = ({ control, name, options, label = '', rules = {} }) => {

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <ToggleSelectorUnique options={options} onChange={onChange} value={value} label={label} />
          <FormHelperText error={!!error}>{error?.message}</FormHelperText>
        </>
      )}
    />
  );
}

export default FormToggleSelectorUnique;