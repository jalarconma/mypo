import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum SymbolType {
  CRYPTO = "CRYPTO",
  STOCK = "STOCK"
}



type CurrentPriceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SymbolMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class CurrentPrice {
  readonly id: string;
  readonly price: number;
  readonly updated: boolean;
  readonly symbol: Symbol;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly currentPriceSymbolId: string;
  constructor(init: ModelInit<CurrentPrice, CurrentPriceMetaData>);
  static copyOf(source: CurrentPrice, mutator: (draft: MutableModel<CurrentPrice, CurrentPriceMetaData>) => MutableModel<CurrentPrice, CurrentPriceMetaData> | void): CurrentPrice;
}

export declare class Symbol {
  readonly id: string;
  readonly symbol: string;
  readonly type: SymbolType | keyof typeof SymbolType;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Symbol, SymbolMetaData>);
  static copyOf(source: Symbol, mutator: (draft: MutableModel<Symbol, SymbolMetaData>) => MutableModel<Symbol, SymbolMetaData> | void): Symbol;
}