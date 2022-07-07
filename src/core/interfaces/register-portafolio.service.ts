import { SymbolType, Symbol } from "../../models";
import { FormSelectorOption } from "../models/form-selector-option.interface";

export interface RegisterPortafolioService {
  getSymbols(symbolType: SymbolType): Promise<Symbol[]>;
  getPrice(assetType: SymbolType, assetActionDate: Date, assetSymbol: string): Promise<number>
}