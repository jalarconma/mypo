import { GraphQLResult } from '@aws-amplify/api-graphql'
import { CreateUserPortafolioInput } from '../../API';

import { SymbolType, Symbol, UserPortafolio } from "../../models";

export interface RegisterPortafolioService {
  getLoading(): boolean;
  getSymbols(symbolType: SymbolType): Promise<Symbol[]>;
  getPrice(assetType: SymbolType, assetActionDate: Date, assetSymbol: string): Promise<number>;
  addAssetToPortafolio(asset: CreateUserPortafolioInput): Promise<GraphQLResult<any>>;
}