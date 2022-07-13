import { UserPortafolio } from "../../../models"

export interface UserPortafolioQuery {
  listUserPortafolios: {
    items: UserPortafolio[]
  }
}