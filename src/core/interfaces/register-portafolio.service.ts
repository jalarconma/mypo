import { GraphQLResult } from '@aws-amplify/api-graphql'
import { CreateUserPortafolioInput, DeleteUserPortafolioInput, UpdateUserPortafolioInput } from '../../API';

import { SymbolType, Symbol, UserPortafolio } from "../../models";
import { BaseService } from './base-service';

export interface RegisterPortafolioService extends BaseService {
  getSymbols(symbolType: SymbolType): Promise<Symbol[]>;
  getPrice(assetType: SymbolType, assetActionDate: Date, assetSymbol: string): Promise<number>;
  addAssetToPortafolio(asset: CreateUserPortafolioInput): Promise<GraphQLResult<any>>;
  editPortafolioAsset(asset: UpdateUserPortafolioInput): Promise<GraphQLResult<any>>;
  deletePortafolioAsset(asset: DeleteUserPortafolioInput): Promise<GraphQLResult<any>>;
}