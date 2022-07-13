import { GraphQLResult } from '@aws-amplify/api-graphql'
import { UserPortafolioQuery } from '../../modules/my-portafolio/interfaces/user-portafolio-query';

export interface UserPortafolioListService {
  getUserPortafolio(): Promise<GraphQLResult<UserPortafolioQuery>>;
}