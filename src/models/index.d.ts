import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum PortafolioAction {
  BUY = "BUY",
  SELL = "SELL"
}

export enum SymbolType {
  CRYPTO = "CRYPTO",
  STOCK = "STOCK"
}



type UserPortafolioMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SymbolMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CurrentPriceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class UserPortafolio {
  readonly id: string;
  readonly user: string;
  readonly action: PortafolioAction | keyof typeof PortafolioAction;
  readonly asset_quantity: number;
  readonly action_date: string;
  readonly current_asset_price: number;
  readonly symbol?: Symbol[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserPortafolio, UserPortafolioMetaData>);
  static copyOf(source: UserPortafolio, mutator: (draft: MutableModel<UserPortafolio, UserPortafolioMetaData>) => MutableModel<UserPortafolio, UserPortafolioMetaData> | void): UserPortafolio;
}

export declare class Symbol {
  readonly id: string;
  readonly symbol: string;
  readonly type: SymbolType | keyof typeof SymbolType;
  readonly userportafolioID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Symbol, SymbolMetaData>);
  static copyOf(source: Symbol, mutator: (draft: MutableModel<Symbol, SymbolMetaData>) => MutableModel<Symbol, SymbolMetaData> | void): Symbol;
}

export declare class CurrentPrice {
  readonly id: string;
  readonly price: number;
  readonly updated: boolean;
  readonly symbol: Symbol;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly currentPriceSymbolId: string;
  constructor(init: ModelInit<CurrentPrice, CurrentPriceMetaData>);
  static copyOf(source: CurrentPrice, mutator: (draft: MutableModel<CurrentPrice, CurrentPriceMetaData>) => MutableModel<CurrentPrice, CurrentPriceMetaData> | void): CurrentPrice;
}