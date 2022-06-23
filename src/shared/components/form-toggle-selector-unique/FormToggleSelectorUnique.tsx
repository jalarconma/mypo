import { Controller } from "react-hook-form";

import ToggleSelectorUnique from "../toggle-selector-unique/ToggleSelectorUnique";


const FormToggleSelectorUnique = ({ control, name, options, label = '', rules = {} }) => {

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <ToggleSelectorUnique options={options} onChange={onChange} value={value} label={label}/>
      )}
    />
  );
}

export default FormToggleSelectorUnique;