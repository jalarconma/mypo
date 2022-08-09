import React from "react";

import FormAutocompleteSelector from "../form-autocomplete-selector/FormAutocompleteSelector";
import FormDateSelector from "../form-date-selector/FormDateSelector";
import FormInputNumber from "../form-input-number/FormInputNumber";
import FormInputText from "../form-input-text/FormInputText";
import FormSelectorUnique from "../form-selector-unique/FormSelectorUnique";
import FormToggleSelectorUnique from "../form-toggle-selector-unique/FormToggleSelectorUnique";
import FormDateRangeSelector from "../form-date-range-selector/FormDateRangeSelector";
import { PortafolioFieldType } from "../../enums/portafolio-field-type";

const FormFieldItem = ({ type, control, name, label = '', options = new Array<any>(), format = 'dd/MM/yyyy', multiple = false, rules = {}, inputProps = {} }) => {

  const getFieldByType = () => {
    switch (type) {
      case PortafolioFieldType.SELECTOR_UNIQUE:
        return (
          <FormSelectorUnique
            control={control} name={name} label={label}
            options={options} rules={rules} />
        );
      case PortafolioFieldType.AUTOCOMPLETE_SELECTOR:
        return (
          <FormAutocompleteSelector
            control={control} name={name} label={label}
            options={options} multiple={multiple} rules={rules} />
        );
      case PortafolioFieldType.TOGGLE:
        return (
          <FormToggleSelectorUnique
            control={control} name={name} label={label}
            options={options} rules={rules} />
        );
      case PortafolioFieldType.DATE:
        return (
          <FormDateSelector
            control={control} name={name} label={label}
            rules={rules} format={format} />
        );
      case PortafolioFieldType.DATE_RANGE:
        return (
          <FormDateRangeSelector
            control={control} name={name} label={label}
            rules={rules} format={format} />
        );
      case PortafolioFieldType.NUMERIC:
        return (
          <FormInputNumber
            control={control} name={name} label={label}
            rules={rules} inputProps={inputProps} />
        );
      default:
        return (
          <FormInputText
            control={control} name={name} label={label}
            rules={rules} inputProps={inputProps} />
        );
    }
  }

  return (getFieldByType());
}

export default FormFieldItem;