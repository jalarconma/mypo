import { GraphQLResult } from '@aws-amplify/api-graphql'
import React, { FC, useState } from 'react';

import ServicesContextualizer from '../contextualizers/services.contextualizer';
import ProvidedServices from '../enums/provided-services.enum';

import { graphqlQueryWrapper } from '../utils/graphql-query-wrapper';
import { PortafolioHistoryService } from '../interfaces/portafolio-history.service';
import { UserPortafolioQuery } from '../../modules/my-portafolio/interfaces/user-portafolio-query';
import { getUserPortafolio, listUserPortafolios } from '../../graphql/queries';
import { UserPortafolioAssetQuery } from '../../modules/my-portafolio/interfaces/user-portafolio-asset-query';
import { listFullUserPortafolios } from '../../graphql/custom-queries';

export const PortafolioHistoryContext = ServicesContextualizer.createContext(ProvidedServices.PortafolioHistoryServiceImpl);

const PortafolioHistoryServiceImpl: FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const portafolioHistoryService: PortafolioHistoryService = {
    getLoading(): boolean {
      return loading;
    },
    getUserPortafolioAsset(assetId: string): Promise<GraphQLResult<UserPortafolioAssetQuery>>{
      setLoading(true);
      const result =  graphqlQueryWrapper<UserPortafolioAssetQuery>({ query: getUserPortafolio, variables: { id: assetId}});
      result.then(() => setLoading(false)).catch((err) => {
        setLoading(false)
        throw new Error(err);
      });

      return result;
    },
    getUserPortafolio(): Promise<GraphQLResult<UserPortafolioQuery>> {
      setLoading(true);
      const result =  graphqlQueryWrapper<UserPortafolioQuery>({ query: listFullUserPortafolios});
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

      const result =  graphqlQueryWrapper<UserPortafolioQuery>({ query: listFullUserPortafolios, variables: { filter }});
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