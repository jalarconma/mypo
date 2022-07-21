import { UserPortafolioTotalItem } from "../interfaces/user-portafolio-total-item";

export class PortafolioInvestmentUtils {

  static getInvestedAmount(asset: UserPortafolioTotalItem): number {
    return asset.assetQuantity * asset.assetMidPrice;
  }

  static getROIByDollarAmout(asset: UserPortafolioTotalItem): number {
    return PortafolioInvestmentUtils.getAssetMarketValue(asset) - PortafolioInvestmentUtils.getInvestedAmount(asset);
  }

  static getROIByPercentage (asset: UserPortafolioTotalItem): number {
    const investedAmount = PortafolioInvestmentUtils.getInvestedAmount(asset);

    if (investedAmount === 0) {
      return 0
    }

    return (PortafolioInvestmentUtils.getROIByDollarAmout(asset) / investedAmount) * 100
  }

  static getAssetMarketValue (asset: UserPortafolioTotalItem): number  {
    return asset.assetCurrentPrice * asset.assetQuantity;
  }

  static getROIClassName(asset): string {

    if (PortafolioInvestmentUtils.getROIByPercentage(asset) < 0) {
      return 'negative-roi';

    } else if (PortafolioInvestmentUtils.getROIByPercentage(asset) > 0) {
      return 'positive-roi';
    }

    return 'zero-roi';
  }

}