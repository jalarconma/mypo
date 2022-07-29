import { API, DataStore } from 'aws-amplify';
import React, { FC, useState } from 'react';

import ServicesContextualizer from '../contextualizers/services.contextualizer';
import ProvidedServices from '../enums/provided-services.enum';
import { Symbol } from '../../API';
import { Symbol as QuerySymbol } from '../../models'

import { UserPortafolioListService } from '../interfaces/user-portafolio-list.service';
import { UserPortafolioTotalItem } from '../../modules/my-portafolio/interfaces/user-portafolio-total-item';

export const UserPortafolioListServiceContext = ServicesContextualizer.createContext(ProvidedServices.UserPortafolioListServiceImpl);

const UserPortafolioListServiceImpl: FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const userPortafolioListService: UserPortafolioListService = {
    getLoading(): boolean {
      return loading;
    },
    getSymbolById(id: string): Promise<Symbol | QuerySymbol | undefined> {
      setLoading(true);
      const result =  DataStore.query(QuerySymbol, id);
      
      result.then(() => setLoading(false)).catch(() => setLoading(false));

      return result;
    },
    getUserPortafolioTotalized(user: string): Promise<UserPortafolioTotalItem[]> {
      setLoading(true)
      const result =  API.get('myporest', '/portafolio/totalized/by-user', {
        'queryStringParameters': {
          "user": user,
        }
      });

      result.then(() => setLoading(false)).catch(() => setLoading(false));

      return result;
    },
    getUserPortafolioTotalizedBySymbol(user: string, symbolId: string): Promise<UserPortafolioTotalItem> {
      setLoading(true)
      const result =  API.get('myporest', '/portafolio/totalized/by-user/by-asset', {
        'queryStringParameters': {
          "user": user,
          "symbol": symbolId
        }
      });

      result.then(() => setLoading(false)).catch(() => setLoading(false));

      return result;
    }

  }

  return (
    <UserPortafolioListServiceContext.Provider value={userPortafolioListService}>
      {children}
    </UserPortafolioListServiceContext.Provider>
  );
};

export default UserPortafolioListServiceImpl;