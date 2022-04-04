// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const SymbolType = {
  "CRYPTO": "CRYPTO",
  "STOCK": "STOCK"
};

const { CurrentPrice, Symbol } = initSchema(schema);

export {
  CurrentPrice,
  Symbol,
  SymbolType
};