import { FormSelectorOption } from "../../core/models/form-selector-option.interface";
import { DateRange } from "./portafolio-date-range";

export interface PortafolioFilterForm {
  action: FormSelectorOption,
  action_date: DateRange,
  symbol: FormSelectorOption[],
  createdAt: DateRange,
  updatedAt: DateRange,
}