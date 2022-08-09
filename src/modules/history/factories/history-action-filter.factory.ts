import { FormSelectorOption } from "../../../core/models/form-selector-option.interface";
import { PortafolioFormField } from "../../../shared/interfaces/portafolio-form-field";
import { HISTORY_ACTION_FILTER_FIELDS, HISTORY_ACTION_FILTER_FIELD_NAME } from "../constants/history-action-filter.constants";

export class HistoryActionFilterFactory {

  static getFields(symbols: FormSelectorOption[]): PortafolioFormField[] {
    return HISTORY_ACTION_FILTER_FIELDS.map(field => {

      if (field.name === HISTORY_ACTION_FILTER_FIELD_NAME.AssetSymbol) {
        field.options = symbols;
      }

      return field;
    });
  }
}