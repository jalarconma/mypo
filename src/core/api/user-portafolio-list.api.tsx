import { API, DataStore } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql'
import React, { FC, useState } from 'react';

import ServicesContextualizer from '../contextualizers/services.contextualizer';
import ProvidedServices from '../enums/provided-services.enum';
import { Symbol,  } from '../../models';

import { graphqlQueryWrapper } from '../utils/graphql-query-wrapper';
import { UserPortafolioListService } from '../interfaces/user-portafolio-list.service';
import { UserPortafolioQuery } from '../../modules/my-portafolio/interfaces/user-portafolio-query';
import { listUserPortafolios } from '../../graphql/queries';
import { UserPortafolioTotalItem } from '../../modules/my-portafolio/interfaces/user-portafolio-total-item';

export const UserPortafolioListServiceContext = ServicesContextualizer.createContext(ProvidedServices.UserPortafolioListServiceImpl);

const UserPortafolioListServiceImpl: FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const userPortafolioListService: UserPortafolioListService = {
    getLoading(): boolean {
      return loading;
    },
    getUserPortafolio(): Promise<GraphQLResult<UserPortafolioQuery>> {
      setLoading(true)
      return graphqlQueryWrapper<UserPortafolioQuery>({ query: listUserPortafolios });
    },
    getSymbolById(id: string): Promise<Symbol | undefined> {
      setLoading(true)
      return DataStore.query(Symbol, id);
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
    }

  }

  return (
    <UserPortafolioListServiceContext.Provider value={userPortafolioListService}>
      {children}
    </UserPortafolioListServiceContext.Provider>
  );
};

export default UserPortafolioListServiceImpl;