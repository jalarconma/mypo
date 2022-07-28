import { Symbol } from '../../API';
import { UserPortafolioTotalItem } from '../../modules/my-portafolio/interfaces/user-portafolio-total-item';

export interface UserPortafolioListService {
  getLoading(): boolean;
  getSymbolById(id: string): Promise<Symbol | undefined>
  getUserPortafolioTotalized(user: string):Promise<UserPortafolioTotalItem[]>
}