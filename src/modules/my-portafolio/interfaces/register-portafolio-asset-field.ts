import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { RegisterPortafolioFieldType } from "../enums/register-portafolio-field-type";

export interface RegisterPortafolioAssetField {
  label: string;
  name: string;
  type: RegisterPortafolioFieldType;
  rules?: any
  inputProps?: Partial<OutlinedInputProps> | undefined;
}