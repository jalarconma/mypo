import { GraphQLResult } from "@aws-amplify/api";
import { UserPortafolioQuery } from "../../modules/my-portafolio/interfaces/user-portafolio-query";
import { BaseService } from "./base-service";

export interface PortafolioHistoryService extends BaseService {
  getUserPortafolio(): Promise<GraphQLResult<UserPortafolioQuery>>;
  getUserPortafolioBySymbolId(symbolId: string): Promise<GraphQLResult<UserPortafolioQuery>>;
}