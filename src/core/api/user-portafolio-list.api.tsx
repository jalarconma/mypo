import { API, DataStore } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql'
import React, { FC } from 'react';

import ServicesContextualizer from '../contextualizers/services.contextualizer';
import ProvidedServices from '../enums/provided-services.enum';
import { SymbolType, Symbol, UserPortafolio } from '../../models';
import { RegisterPortafolioService } from '../interfaces/register-portafolio.service';
import { StringUtils } from '../../shared/utils/string-utils';

import { createUserPortafolio } from '../../graphql/mutations';
import { graphqlQueryWrapper } from '../utils/graphql-query-wrapper';
import { CreateUserPortafolioInput } from '../../API';
import { UserPortafolioListService } from '../interfaces/user-portafolio-list.service';
import { UserPortafolioQuery } from '../../modules/my-portafolio/interfaces/user-portafolio-query';
import { listUserPortafolios } from '../../graphql/queries';

export const UserPortafolioListServiceContext = ServicesContextualizer.createContext(ProvidedServices.UserPortafolioListServiceImpl);

const UserPortafolioListServiceImpl: FC = ({ children }) => {

  const userPortafolioListService: UserPortafolioListService = {
    getUserPortafolio(): Promise<GraphQLResult<UserPortafolioQuery>> {
      return graphqlQueryWrapper<UserPortafolioQuery>({ query: listUserPortafolios });
    }
  }

  return (
    <UserPortafolioListServiceContext.Provider value={userPortafolioListService}>
      {children}
    </UserPortafolioListServiceContext.Provider>
  );
};

export default UserPortafolioListServiceImpl;