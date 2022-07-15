import { Symbol } from "../../../models";

export interface UserPortafolioTotalItem {
  symbol: Symbol;
  assetQuantity: number;
  assetMidPrice: number;
  assetCurrentPrice: number
}