import { RegisterPortafolioFieldType } from "../enums/register-portafolio-field-type";

export interface RegisterPortafolioAssetField {
  label: string;
  name: string;
  type: RegisterPortafolioFieldType;
  rules?: any
  inputProps?: any;
  format?: string;
  options?: any[];
  hidden?: boolean
}