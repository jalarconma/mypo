import { GraphQLResult } from "@aws-amplify/api";

import { UserPortafolioAssetQuery } from "../../modules/my-portafolio/interfaces/user-portafolio-asset-query";
import { UserPortafolioQuery } from "../../modules/my-portafolio/interfaces/user-portafolio-query";
import { BaseService } from "./base-service";

export interface PortafolioHistoryService extends BaseService {
  getUserPortafolioAsset(assetId: string): Promise<GraphQLResult<UserPortafolioAssetQuery>>;
  getUserPortafolio(): Promise<GraphQLResult<UserPortafolioQuery>>;
  getUserPortafolioBySymbolId(symbolId: string): Promise<GraphQLResult<UserPortafolioQuery>>;
}