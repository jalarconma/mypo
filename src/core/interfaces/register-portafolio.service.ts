import { GraphQLResult } from '@aws-amplify/api-graphql'
import { CreateUserPortafolioInput, DeleteUserPortafolioInput, UpdateUserPortafolioInput } from '../../API';

import { SymbolType, Symbol } from "../../models";
import { UserPortafolioDeleteQuery } from '../../modules/my-portafolio/interfaces/user-portafolio-delete-query';
import { UserPortafolioEditQuery } from '../../modules/my-portafolio/interfaces/user-portafolio-edit-query';
import { BaseService } from './base-service';

export interface RegisterPortafolioService extends BaseService {
  getSymbols(symbolType: SymbolType): Promise<Symbol[]>;
  getPrice(assetType: SymbolType, assetActionDate: Date, assetSymbol: string): Promise<number>;
  addAssetToPortafolio(asset: CreateUserPortafolioInput): Promise<GraphQLResult<any>>;
  editPortafolioAsset(asset: UpdateUserPortafolioInput): Promise<GraphQLResult<UserPortafolioEditQuery>>;
  deletePortafolioAsset(asset: DeleteUserPortafolioInput): Promise<GraphQLResult<UserPortafolioDeleteQuery>>;
}