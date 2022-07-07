import { FormSelectorOption } from "../../../core/models/form-selector-option.interface";
import { PortafolioAction, SymbolType } from "../../../models";
import { ToggleSelectorOption } from "../../../shared/interfaces/ToggleSelectorOption";
import { RegisterPortafolioFieldType } from "../enums/register-portafolio-field-type";
import { RegisterPortafolioAssetField } from "../interfaces/register-portafolio-asset-field";

export const REGISTER_PORTAFOLIO_ASSET_FIELD_NAME = {
  AssetType: 'assetType',
  AssetSymbol: 'assetSymbol',
  Action: 'action',
  AssetActionDate : 'assetActionDate',
  AssetPrice: 'assetPrice',
  Mode: 'mode',
  AssetQuantity: 'assetQuantity',
  EstimatedAssetPrice: 'estimatedAssetPrice',
  DollarAmount: 'dollarAmount',
  EstimatedAssetQuantity: 'estimatedAssetQuantity'
}

export const PORTAFOLIO_TOGGLE_ACTIONS: ToggleSelectorOption[] = [
  { value: PortafolioAction.BUY, label: PortafolioAction.BUY, selectionColor: 'success' },
  { value: PortafolioAction.SELL, label: PortafolioAction.SELL, selectionColor: 'error' }
];

export const ASSET_TYPES: FormSelectorOption[] = [
  { id: SymbolType.CRYPTO, label: SymbolType.CRYPTO },
  { id: SymbolType.STOCK, label: SymbolType.STOCK }
];

export const REGISTER_PORTAFOLIO_MODES: ToggleSelectorOption[] = [
  { label: 'Asset quantity', value: REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.AssetQuantity, selectionColor: 'primary' },
  { label: 'Dollar amout', value: REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.DollarAmount, selectionColor: 'primary' }
];

export const REGISTER_PORTAFOLIO_ASSET_FIELDS: RegisterPortafolioAssetField[] = [
  {
    name: REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.AssetType,
    label: 'Select asset type',
    type: RegisterPortafolioFieldType.SELECTOR_UNIQUE,
    options: ASSET_TYPES
  },
  {
    name: REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.AssetSymbol,
    label: 'Select symbol',
    type: RegisterPortafolioFieldType.AUTOCOMPLETE_SELECTOR,
    rules: { validate: (symbol: FormSelectorOption) => symbol.id !== '' ? true : 'the symbol is required' }
  },
  {
    name: REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.Action,
    label: 'Action',
    type: RegisterPortafolioFieldType.TOGGLE,
    rules:{ validate: (symbol: ToggleSelectorOption) => symbol.value !== '' ? true : 'the action is required' },
    options: PORTAFOLIO_TOGGLE_ACTIONS
  },
  {
    name: REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.AssetActionDate,
    label: 'Select action date',
    type: RegisterPortafolioFieldType.DATE,
    rules:{ required: 'The action date is required' }
  },
  {
    name: REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.AssetPrice,
    label: 'Asset price in USD',
    type: RegisterPortafolioFieldType.NUMERIC,
    rules: { validate: (price: number) => !isNaN(price) && price > 0 ? true : 'the price is required' }
    //inputProps: {startAdornment: <InputAdornment position="start">$</InputAdornment>}
  },
  {
    name: REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.Mode,
    label: 'Mode',
    type: RegisterPortafolioFieldType.TOGGLE,
    options: REGISTER_PORTAFOLIO_MODES
  },
  {
    name: REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.AssetQuantity,
    label: 'Asset quantity',
    type: RegisterPortafolioFieldType.NUMERIC,
    rules: {validate: (price: number) => !isNaN(price) && price > 0 ? true : 'the price is required'}
  },
  {
    name: REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.EstimatedAssetPrice, 
    label: 'Estimated asset price in USD',
    type: RegisterPortafolioFieldType.NUMERIC,
    //inputProps: {startAdornment: <InputAdornment position="start">$</InputAdornment>}
  },
  {
    name: REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.DollarAmount,
    label: 'Dollar amount',
    type: RegisterPortafolioFieldType.NUMERIC,
    rules: {validate: (price: number) => !isNaN(price) && price > 0 ? true : 'the price is required'},
    //inputProps: { startAdornment: <InputAdornment position="start">$</InputAdornment> }
  },
  {
    name: REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.EstimatedAssetQuantity,
    label: 'Estimated asset quantity',
    type: RegisterPortafolioFieldType.NUMERIC
  }
];