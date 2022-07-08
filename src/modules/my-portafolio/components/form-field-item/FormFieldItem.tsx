import FormAutocompleteSelector from "../../../../shared/components/form-autocomplete-selector/FormAutocompleteSelector";
import FormDateSelector from "../../../../shared/components/form-date-selector/FormDateSelector";
import FormInputNumber from "../../../../shared/components/form-input-number/FormInputNumber";
import FormInputText from "../../../../shared/components/form-input-text/FormInputText";
import FormSelectorUnique from "../../../../shared/components/form-selector-unique/FormSelectorUnique";
import FormToggleSelectorUnique from "../../../../shared/components/form-toggle-selector-unique/FormToggleSelectorUnique";
import { RegisterPortafolioFieldType } from "../../enums/register-portafolio-field-type";

const FormFieldItem = ({ type, control, name, label = '', options = new Array<any>(), format = 'dd/MM/yyyy', rules = {}, inputProps = {} }) => {

  const getFieldByType = () => {
    switch (type) {
      case RegisterPortafolioFieldType.SELECTOR_UNIQUE:
        return (
          <FormSelectorUnique
            control={control} name={name} label={label}
            options={options} rules={rules} />
        );
      case RegisterPortafolioFieldType.AUTOCOMPLETE_SELECTOR:
        return (
          <FormAutocompleteSelector
            control={control} name={name} label={label}
            options={options} rules={rules} />
        );
      case RegisterPortafolioFieldType.TOGGLE:
        return (
          <FormToggleSelectorUnique
            control={control} name={name} label={label}
            options={options} rules={rules} />
        );
      case RegisterPortafolioFieldType.DATE:
        return (
          <FormDateSelector
            control={control} name={name} label={label}
            rules={rules} format={format} />
        );
      case RegisterPortafolioFieldType.NUMERIC:
        return (
          <FormInputNumber
            control={control} name={name} label={label} 
            rules={rules} inputProps={inputProps}/>
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