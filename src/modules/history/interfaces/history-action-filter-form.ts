import { FormSelectorOption } from "../../../core/models/form-selector-option.interface";
import { SymbolType } from "../../../models";

export interface HistoryActionFilterForm {
  assetType: SymbolType | '',
  assetSymbol: FormSelectorOption;
}