import { FormSelectorOption } from "../../../core/models/form-selector-option.interface";
import { ToggleSelectorOption } from "../../../shared/interfaces/ToggleSelectorOption";

export interface RegisterPortafolioForm {
    action: ToggleSelectorOption;
    assetActionDate: Date | null;
    assetSymbol: FormSelectorOption;
    assetQuantity: number;
    dollarAmount: number;
    assetPrice: number;
}