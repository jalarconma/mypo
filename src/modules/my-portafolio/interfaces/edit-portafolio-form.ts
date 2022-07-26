import { PortafolioAction } from "../../../models";

export interface EditPortafolioForm {
    action: PortafolioAction | '';
    assetActionDate: Date | null;
    mode: string;
    assetQuantity: number;
    dollarAmount: number;
    assetPrice: number;
    estimatedAssetPrice: number;
    estimatedAssetQuantity: number;
}