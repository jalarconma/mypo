import { GraphQLResult } from '@aws-amplify/api-graphql'
import React, { FC, useState } from 'react';

import ServicesContextualizer from '../contextualizers/services.contextualizer';
import ProvidedServices from '../enums/provided-services.enum';

import { graphqlQueryWrapper } from '../utils/graphql-query-wrapper';
import { PortafolioHistoryService } from '../interfaces/portafolio-history.service';
import { UserPortafolioQuery } from '../../modules/my-portafolio/interfaces/user-portafolio-query';
import { listUserPortafolios } from '../../graphql/queries';

export const PortafolioHistoryContext = ServicesContextualizer.createContext(ProvidedServices.PortafolioHistoryServiceImpl);

const PortafolioHistoryServiceImpl: FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const portafolioHistoryService: PortafolioHistoryService = {
    getLoading(): boolean {
      return loading;
    },
    getUserPortafolio(): Promise<GraphQLResult<UserPortafolioQuery>> {
      setLoading(true);
      const result =  graphqlQueryWrapper<UserPortafolioQuery>({ query: listUserPortafolios});
      result.then(() => setLoading(false)).catch((err) => {
        setLoading(false)
        throw new Error(err);
      });

      return result;
    },
    getUserPortafolioBySymbolId(symbolId: string): Promise<GraphQLResult<UserPortafolioQuery>> {
      setLoading(true);

      const filter = {
        userPortafolioSymbolId: {
            eq: symbolId
        }
      };

      const result =  graphqlQueryWrapper<UserPortafolioQuery>({ query: listUserPortafolios, variables: { filter }});
      result.then(() => setLoading(false)).catch((err) => {
        setLoading(false)
        throw new Error(err);
      });
      
      return result;
    },
  }

  return (
    <PortafolioHistoryContext.Provider value={portafolioHistoryService}>
      {children}
    </PortafolioHistoryContext.Provider>
  );
};

export default PortafolioHistoryServiceImpl;