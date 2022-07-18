import { GraphQLResult } from '@aws-amplify/api-graphql'
import { Symbol } from '../../models';
import { UserPortafolioQuery } from '../../modules/my-portafolio/interfaces/user-portafolio-query';
import { UserPortafolioTotalItem } from '../../modules/my-portafolio/interfaces/user-portafolio-total-item';

export interface UserPortafolioListService {
  getLoading(): boolean;
  getUserPortafolio(): Promise<GraphQLResult<UserPortafolioQuery>>;
  getSymbolById(id: string): Promise<Symbol | undefined>
  getUserPortafolioTotalized(user: string):Promise<UserPortafolioTotalItem[]>
}