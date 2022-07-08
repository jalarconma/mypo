import { FormSelectorOption } from "../../../core/models/form-selector-option.interface";
import { PortafolioAction, SymbolType, Symbol } from "../../../models";
import { ToggleSelectorOption } from "../../../shared/interfaces/ToggleSelectorOption";

export interface RegisterPortafolioForm {
    assetType: SymbolType | '',
    action: PortafolioAction | '';
    assetActionDate: Date | null;
    assetSymbol: FormSelectorOption;
    mode: string;
    assetQuantity: number;
    dollarAmount: number;
    assetPrice: number;
    estimatedAssetPrice: number;
    estimatedAssetQuantity: number;
}