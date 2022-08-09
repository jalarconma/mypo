import { PortafolioFieldType } from "../enums/portafolio-field-type";

export interface PortafolioFormField {
  label: string;
  name: string;
  type: PortafolioFieldType;
  rules?: any
  inputProps?: any;
  format?: string;
  options?: any[];
  multiple?: boolean;
  hidden?: boolean;
}