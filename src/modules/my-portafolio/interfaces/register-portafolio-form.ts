import { FormSelectorOption } from "../../../core/models/form-selector-option.interface";
import { PortafolioAction, SymbolType } from "../../../models";

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