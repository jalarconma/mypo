// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PortafolioAction = {
  "BUY": "BUY",
  "SELL": "SELL"
};

const SymbolType = {
  "CRYPTO": "CRYPTO",
  "STOCK": "STOCK"
};

const { UserPortafolio, Symbol, CurrentPrice } = initSchema(schema);

export {
  UserPortafolio,
  Symbol,
  CurrentPrice,
  PortafolioAction,
  SymbolType
};