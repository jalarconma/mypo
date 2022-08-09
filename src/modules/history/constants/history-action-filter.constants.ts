import { PortafolioFieldType } from "../../../shared/enums/portafolio-field-type";
import { PortafolioFormField } from "../../../shared/interfaces/portafolio-form-field";
import { ASSET_TYPES } from "../../my-portafolio/constants/register-portafolio-asset..constant";

export const HISTORY_ACTION_FILTER_FIELD_NAME = {
  AssetType: 'assetType',
  AssetSymbol: 'assetSymbol',
}

export const HISTORY_ACTION_FILTER_FIELDS: PortafolioFormField[] = [
  {
    name: HISTORY_ACTION_FILTER_FIELD_NAME.AssetType,
    label: 'Select asset type',
    type: PortafolioFieldType.SELECTOR_UNIQUE,
    options: ASSET_TYPES
  },
  {
    name: HISTORY_ACTION_FILTER_FIELD_NAME.AssetSymbol,
    label: 'Select symbol',
    type: PortafolioFieldType.AUTOCOMPLETE_SELECTOR
  },
];