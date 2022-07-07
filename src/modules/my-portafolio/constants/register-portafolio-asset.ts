import { FormSelectorOption } from "../../../core/models/form-selector-option.interface";
import { PortafolioAction, SymbolType } from "../../../models";
import { ToggleSelectorOption } from "../../../shared/interfaces/ToggleSelectorOption";
import { RegisterPortafolioAssetField } from "../interfaces/register-portafolio-asset-field";

export const REGISTER_PORTAFOLIO_ASSET_FIELDS: RegisterPortafolioAssetField[] = [];

export const PORTAFOLIO_TOGGLE_ACTIONS: ToggleSelectorOption[] = [
    { value: PortafolioAction.BUY, label: PortafolioAction.BUY, selectionColor: 'success' },
    { value: PortafolioAction.SELL, label: PortafolioAction.SELL, selectionColor: 'error' }
];

export const ASSET_TYPES: FormSelectorOption[] = [
    { id: SymbolType.CRYPTO, label: SymbolType.CRYPTO },
    { id: SymbolType.STOCK, label: SymbolType.STOCK }
];