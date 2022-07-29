import { Symbol } from '../../API';
import { Symbol as QuerySymbol } from '../../models';
import { UserPortafolioTotalItem } from '../../modules/my-portafolio/interfaces/user-portafolio-total-item';

export interface UserPortafolioListService {
  getLoading(): boolean;
  getSymbolById(id: string): Promise<Symbol | QuerySymbol | undefined>
  getUserPortafolioTotalized(user: string):Promise<UserPortafolioTotalItem[]>,
  getUserPortafolioTotalizedBySymbol(user: string, symbolId: string):Promise<UserPortafolioTotalItem>
}