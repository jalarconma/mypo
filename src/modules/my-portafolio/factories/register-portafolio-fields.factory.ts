import { FormSelectorOption } from "../../../core/models/form-selector-option.interface";
import { REGISTER_PORTAFOLIO_ASSET_FIELDS, REGISTER_PORTAFOLIO_ASSET_FIELD_NAME } from "../constants/register-portafolio-asset..constant";
import { EditPortafolioForm } from "../interfaces/edit-portafolio-form";
import { RegisterPortafolioAssetField } from "../interfaces/register-portafolio-asset-field";
import { RegisterPortafolioForm } from "../interfaces/register-portafolio-form";

export class RegisterPortafolioFieldsFactory {

  static getRegisterFields(mode: string, symbols: FormSelectorOption[]): RegisterPortafolioAssetField[] {
    return REGISTER_PORTAFOLIO_ASSET_FIELDS.map(field => {

      if (field.name === REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.AssetSymbol) {
        field.options = symbols;
      }

      if (field.name === REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.AssetQuantity) {
        field.hidden = mode !== REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.AssetQuantity;
      }

      if (field.name === REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.EstimatedAssetPrice) {
        field.hidden = mode !== REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.AssetQuantity;
      }

      if (field.name === REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.DollarAmount) {
        field.hidden = mode !== REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.DollarAmount;
      }

      if (field.name === REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.EstimatedAssetQuantity) {
        field.hidden = mode !== REGISTER_PORTAFOLIO_ASSET_FIELD_NAME.DollarAmount;
      }

      return field;
    });
  }

  static getAssetQuantity(data: RegisterPortafolioForm | EditPortafolioForm): number {

    if(data.assetQuantity && data.assetQuantity > 0) {
      return data.assetQuantity;
    }

    if(data.dollarAmount && data.dollarAmount > 0) {
      return data.estimatedAssetQuantity;
    }

    return 0;
  }
}