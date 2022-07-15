import { PortafolioAction, Symbol, UserPortafolio } from "../../../models";
import { UserPortafolioTotalItem } from "../interfaces/user-portafolio-total-item";

export class UserPortafolioListFactory {

  static groupAssetsBySymbol (items: UserPortafolio[]): any {
    const grouped = items.reduce((acc, obj: UserPortafolio) => {
      const symbol = obj.userPortafolioSymbolId

      if (!acc[symbol]) {
        acc[symbol] = [obj];
      } else {
        acc[symbol].push(obj);
      }

      return acc;
    }, {})
    
    return grouped;
  }

  static calculateTotalizedAsset(symbol: Symbol, assetCurrentPrice: number, assets: UserPortafolio[]): UserPortafolioTotalItem {

    const totalAssetQuantity = assets.reduce((acc: number, obj: UserPortafolio) => {
      return obj.action === PortafolioAction.BUY ? acc + obj.asset_quantity : acc - obj.asset_quantity;
    }, 0);

    const totalBuyActions = assets.reduce((acc: number, obj: UserPortafolio) => {
      return obj.action === PortafolioAction.BUY ? acc + 1 : acc;
    }, 0)

    if(totalAssetQuantity < 0 || totalBuyActions <= 0) {
      return {
        symbol,
        assetQuantity: 0,
        assetMidPrice: 0,
        assetCurrentPrice: 0
      };
    }

    const midAssetBuyPrice = assets.reduce((acc: number, obj: UserPortafolio) => {
      return obj.action === PortafolioAction.BUY ? acc + ((obj.current_asset_price * obj.asset_quantity)/totalAssetQuantity) : acc;
    }, 0)

    return {
      symbol,
      assetQuantity: totalAssetQuantity,
      assetMidPrice: midAssetBuyPrice,
      assetCurrentPrice: assetCurrentPrice,
    };

  }
}