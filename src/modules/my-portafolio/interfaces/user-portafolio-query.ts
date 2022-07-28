import { UserPortafolio } from "../../../API"

export interface UserPortafolioQuery {
  listUserPortafolios: {
    items: UserPortafolio[]
  }
}