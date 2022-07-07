import { FormSelectorOption } from "../../../core/models/form-selector-option.interface";
import { ToggleSelectorOption } from "../../../shared/interfaces/ToggleSelectorOption";

export interface RegisterPortafolioForm {
    assetType: FormSelectorOption,
    action: ToggleSelectorOption;
    assetActionDate: Date | null;
    assetSymbol: FormSelectorOption;
    mode: ToggleSelectorOption;
    assetQuantity: number;
    dollarAmount: number;
    assetPrice: number;
}