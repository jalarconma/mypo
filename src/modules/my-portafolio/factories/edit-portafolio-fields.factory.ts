import { EDIT_PORTAFOLIO_ASSET_FIELDS, EDIT_PORTAFOLIO_ASSET_FIELD_NAME } from "../constants/edit-portafolio-asset.constant";
import { RegisterPortafolioAssetField } from "../interfaces/register-portafolio-asset-field";

export class EditPortafolioFieldsFactory {

  static getEditFields(mode: string): RegisterPortafolioAssetField[] {
    return EDIT_PORTAFOLIO_ASSET_FIELDS.map(field => {

      if (field.name === EDIT_PORTAFOLIO_ASSET_FIELD_NAME.AssetQuantity) {
        field.hidden = mode !== EDIT_PORTAFOLIO_ASSET_FIELD_NAME.AssetQuantity;
      }

      if (field.name === EDIT_PORTAFOLIO_ASSET_FIELD_NAME.EstimatedAssetPrice) {
        field.hidden = mode !== EDIT_PORTAFOLIO_ASSET_FIELD_NAME.AssetQuantity;
      }

      if (field.name === EDIT_PORTAFOLIO_ASSET_FIELD_NAME.DollarAmount) {
        field.hidden = mode !== EDIT_PORTAFOLIO_ASSET_FIELD_NAME.DollarAmount;
      }

      if (field.name === EDIT_PORTAFOLIO_ASSET_FIELD_NAME.EstimatedAssetQuantity) {
        field.hidden = mode !== EDIT_PORTAFOLIO_ASSET_FIELD_NAME.DollarAmount;
      }

      return field;
    });
  }
}