import { API, DataStore } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql'
import React, { FC, useState } from 'react';

import ServicesContextualizer from '../contextualizers/services.contextualizer';
import ProvidedServices from '../enums/provided-services.enum';
import { SymbolType, Symbol, UserPortafolio } from '../../models';
import { RegisterPortafolioService } from '../interfaces/register-portafolio.service';
import { StringUtils } from '../../shared/utils/string-utils';

import { createUserPortafolio, updateUserPortafolio } from '../../graphql/mutations';
import { graphqlQueryWrapper } from '../utils/graphql-query-wrapper';
import { CreateUserPortafolioInput, UpdateUserPortafolioInput } from '../../API';

export const RegisterPortafolioContext = ServicesContextualizer.createContext(ProvidedServices.RegisterPortafolioServiceImpl);

const RegisterPortafolioServiceImpl: FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const registerPortafolioService: RegisterPortafolioService = {
    getLoading() {
      return loading;
    },
    getSymbols(assetType: SymbolType): Promise<Symbol[]> {
      setLoading(true);
      const result =  DataStore.query(Symbol, (sym) => sym.type('eq', SymbolType[assetType]));

      result.then(() => setLoading(false)).catch((err) => {
        setLoading(false);
        throw new Error(err);
      });

      return result;
    },
    getPrice(assetType: SymbolType, assetActionDate: Date, assetSymbol: string): Promise<number> {
      setLoading(true);

      const result =  API.get('myporest', '/prices/by-date', {
        'queryStringParameters': {
          "assetType": assetType,
          "date": StringUtils.dateToString(assetActionDate),
          "symbol": assetSymbol
        }
      });

      result.then(() => setLoading(false)).catch((err) => {
        setLoading(false);
        throw new Error(err);
      });

      return result;
    },
    addAssetToPortafolio(asset: CreateUserPortafolioInput): Promise<GraphQLResult<any>> {
      setLoading(true);
      const result =  graphqlQueryWrapper({ query: createUserPortafolio, variables: { input: asset}});

      result.then(() => setLoading(false)).catch((err) => {
        setLoading(false);
        throw new Error(err);
      });

      return result;
    },
    editPortafolioAsset(asset: UpdateUserPortafolioInput): Promise<GraphQLResult<any>> {
      setLoading(true);
      const result =  graphqlQueryWrapper({ query: updateUserPortafolio, variables: { input: asset}});

      result.then(() => setLoading(false)).catch((err) => {
        setLoading(false);
        throw new Error(err);
      });

      return result;
    },
  }

  return (
    <RegisterPortafolioContext.Provider value={registerPortafolioService}>
      {children}
    </RegisterPortafolioContext.Provider>
  );
};

export default RegisterPortafolioServiceImpl;