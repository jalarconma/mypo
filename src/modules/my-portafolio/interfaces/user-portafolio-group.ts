import { UserPortafolio } from "../../../models";

export interface UserPortafolioGroup {
  assets: UserPortafolio[],
  symbolId: string
}