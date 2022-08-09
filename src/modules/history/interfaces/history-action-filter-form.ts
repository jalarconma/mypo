import { FormSelectorOption } from "../../../core/models/form-selector-option.interface";
import { DateRange } from "../../../shared/interfaces/portafolio-date-range";

export interface HistoryActionFilterForm {
  action: FormSelectorOption,
  action_date: DateRange,
  symbol: FormSelectorOption[],
  createdAt: DateRange,
  updatedAt: DateRange,
}