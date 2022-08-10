import { FormSelectorOption } from "../../../core/models/form-selector-option.interface";
import { PortafolioFormField } from "../../../shared/interfaces/portafolio-form-field";
import { HISTORY_ACTION_FILTER_FIELDS, HISTORY_ACTION_FILTER_FIELD_NAME } from "../constants/history-action-filter.constants";
import { Symbol } from '../../../API';

export class HistoryActionFilterFactory {

  static getFields(symbols: FormSelectorOption[]): PortafolioFormField[] {
    return HISTORY_ACTION_FILTER_FIELDS.map(field => {

      if (field.name === HISTORY_ACTION_FILTER_FIELD_NAME.Symbol) {
        field.options = symbols;
      }

      return field;
    });
  }

  static symbolsToSelectorMapper(symbols: Symbol[]): FormSelectorOption[] {

    if(!symbols || !symbols.length) {
      return [];
    }

    return symbols.map(symbol => ({  id: symbol.id, label: symbol.displaySymbol}));
  }
}