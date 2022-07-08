import { API, DataStore } from 'aws-amplify';
import { FC, useState } from 'react';

import ServicesContextualizer from '../contextualizers/services.contextualizer';
import ProvidedServices from '../enums/provided-services.enum';
import { SymbolType, Symbol, UserPortafolio } from '../../models';
import { RegisterPortafolioService } from '../interfaces/register-portafolio.service';
import { StringUtils } from '../../shared/utils/string-utils';
import { FormSelectorOption } from '../models/form-selector-option.interface';

export const RegisterPortafolioContext = ServicesContextualizer.createContext(ProvidedServices.RegisterPortafolioServiceImpl);

const RegisterPortafolioServiceImpl: FC = ({ children }) => {

  const registerPortafolioService: RegisterPortafolioService = {
    getSymbols(assetType: SymbolType): Promise<Symbol[]> {
      return DataStore.query(Symbol, (sym) => sym.type('eq', SymbolType[assetType]));
    },
    getPrice(assetType: SymbolType, assetActionDate: Date, assetSymbol: string): Promise<number> {
      return API.get('myporest', '/prices/by-date', {
        'queryStringParameters': {
          "assetType": assetType,
          "date": StringUtils.dateToString(assetActionDate),
          "symbol": assetSymbol
        }
      });
    },
    addAssetToPortafolio(asset: UserPortafolio): Promise<UserPortafolio> {
      return DataStore.save(asset);
    }
  }

  return (
    <RegisterPortafolioContext.Provider value={registerPortafolioService}>
      {children}
    </RegisterPortafolioContext.Provider>
  );
};

export default RegisterPortafolioServiceImpl;