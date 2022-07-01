/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserPortafolioInput = {
  id?: string | null,
  user: string,
  action: PortafolioAction,
  asset_quantity: number,
  action_date: string,
  current_asset_price: number,
  _version?: number | null,
  userPortafolioSymbolId: string,
};

export enum PortafolioAction {
  BUY = "BUY",
  SELL = "SELL",
}


export type ModelUserPortafolioConditionInput = {
  user?: ModelStringInput | null,
  action?: ModelPortafolioActionInput | null,
  asset_quantity?: ModelFloatInput | null,
  action_date?: ModelStringInput | null,
  current_asset_price?: ModelFloatInput | null,
  and?: Array< ModelUserPortafolioConditionInput | null > | null,
  or?: Array< ModelUserPortafolioConditionInput | null > | null,
  not?: ModelUserPortafolioConditionInput | null,
  userPortafolioSymbolId?: ModelIDInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelPortafolioActionInput = {
  eq?: PortafolioAction | null,
  ne?: PortafolioAction | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UserPortafolio = {
  __typename: "UserPortafolio",
  id: string,
  user: string,
  action: PortafolioAction,
  asset_quantity: number,
  action_date: string,
  current_asset_price: number,
  symbol: Symbol,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  userPortafolioSymbolId: string,
};

export type Symbol = {
  __typename: "Symbol",
  id: string,
  symbol: string,
  type: SymbolType,
  displaySymbol: string,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export enum SymbolType {
  CRYPTO = "CRYPTO",
  STOCK = "STOCK",
}


export type UpdateUserPortafolioInput = {
  id: string,
  user?: string | null,
  action?: PortafolioAction | null,
  asset_quantity?: number | null,
  action_date?: string | null,
  current_asset_price?: number | null,
  _version?: number | null,
  userPortafolioSymbolId?: string | null,
};

export type DeleteUserPortafolioInput = {
  id: string,
  _version?: number | null,
};

export type CreateCurrentPriceInput = {
  id?: string | null,
  price: number,
  updated: boolean,
  _version?: number | null,
  currentPriceSymbolId: string,
};

export type ModelCurrentPriceConditionInput = {
  price?: ModelFloatInput | null,
  updated?: ModelBooleanInput | null,
  and?: Array< ModelCurrentPriceConditionInput | null > | null,
  or?: Array< ModelCurrentPriceConditionInput | null > | null,
  not?: ModelCurrentPriceConditionInput | null,
  currentPriceSymbolId?: ModelIDInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type CurrentPrice = {
  __typename: "CurrentPrice",
  id: string,
  price: number,
  updated: boolean,
  symbol: Symbol,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  currentPriceSymbolId: string,
};

export type UpdateCurrentPriceInput = {
  id: string,
  price?: number | null,
  updated?: boolean | null,
  _version?: number | null,
  currentPriceSymbolId?: string | null,
};

export type DeleteCurrentPriceInput = {
  id: string,
  _version?: number | null,
};

export type CreateSymbolInput = {
  id?: string | null,
  symbol: string,
  type: SymbolType,
  displaySymbol: string,
  description?: string | null,
  _version?: number | null,
};

export type ModelSymbolConditionInput = {
  symbol?: ModelStringInput | null,
  type?: ModelSymbolTypeInput | null,
  displaySymbol?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelSymbolConditionInput | null > | null,
  or?: Array< ModelSymbolConditionInput | null > | null,
  not?: ModelSymbolConditionInput | null,
};

export type ModelSymbolTypeInput = {
  eq?: SymbolType | null,
  ne?: SymbolType | null,
};

export type UpdateSymbolInput = {
  id: string,
  symbol?: string | null,
  type?: SymbolType | null,
  displaySymbol?: string | null,
  description?: string | null,
  _version?: number | null,
};

export type DeleteSymbolInput = {
  id: string,
  _version?: number | null,
};

export type ModelUserPortafolioFilterInput = {
  id?: ModelIDInput | null,
  user?: ModelStringInput | null,
  action?: ModelPortafolioActionInput | null,
  asset_quantity?: ModelFloatInput | null,
  action_date?: ModelStringInput | null,
  current_asset_price?: ModelFloatInput | null,
  and?: Array< ModelUserPortafolioFilterInput | null > | null,
  or?: Array< ModelUserPortafolioFilterInput | null > | null,
  not?: ModelUserPortafolioFilterInput | null,
  userPortafolioSymbolId?: ModelIDInput | null,
};

export type ModelUserPortafolioConnection = {
  __typename: "ModelUserPortafolioConnection",
  items:  Array<UserPortafolio | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelCurrentPriceFilterInput = {
  id?: ModelIDInput | null,
  price?: ModelFloatInput | null,
  updated?: ModelBooleanInput | null,
  and?: Array< ModelCurrentPriceFilterInput | null > | null,
  or?: Array< ModelCurrentPriceFilterInput | null > | null,
  not?: ModelCurrentPriceFilterInput | null,
  currentPriceSymbolId?: ModelIDInput | null,
};

export type ModelCurrentPriceConnection = {
  __typename: "ModelCurrentPriceConnection",
  items:  Array<CurrentPrice | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSymbolFilterInput = {
  id?: ModelIDInput | null,
  symbol?: ModelStringInput | null,
  type?: ModelSymbolTypeInput | null,
  displaySymbol?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelSymbolFilterInput | null > | null,
  or?: Array< ModelSymbolFilterInput | null > | null,
  not?: ModelSymbolFilterInput | null,
};

export type ModelSymbolConnection = {
  __typename: "ModelSymbolConnection",
  items:  Array<Symbol | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type CreateUserPortafolioMutationVariables = {
  input: CreateUserPortafolioInput,
  condition?: ModelUserPortafolioConditionInput | null,
};

export type CreateUserPortafolioMutation = {
  createUserPortafolio?:  {
    __typename: "UserPortafolio",
    id: string,
    user: string,
    action: PortafolioAction,
    asset_quantity: number,
    action_date: string,
    current_asset_price: number,
    symbol:  {
      __typename: "Symbol",
      id: string,
      symbol: string,
      type: SymbolType,
      displaySymbol: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userPortafolioSymbolId: string,
  } | null,
};

export type UpdateUserPortafolioMutationVariables = {
  input: UpdateUserPortafolioInput,
  condition?: ModelUserPortafolioConditionInput | null,
};

export type UpdateUserPortafolioMutation = {
  updateUserPortafolio?:  {
    __typename: "UserPortafolio",
    id: string,
    user: string,
    action: PortafolioAction,
    asset_quantity: number,
    action_date: string,
    current_asset_price: number,
    symbol:  {
      __typename: "Symbol",
      id: string,
      symbol: string,
      type: SymbolType,
      displaySymbol: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userPortafolioSymbolId: string,
  } | null,
};

export type DeleteUserPortafolioMutationVariables = {
  input: DeleteUserPortafolioInput,
  condition?: ModelUserPortafolioConditionInput | null,
};

export type DeleteUserPortafolioMutation = {
  deleteUserPortafolio?:  {
    __typename: "UserPortafolio",
    id: string,
    user: string,
    action: PortafolioAction,
    asset_quantity: number,
    action_date: string,
    current_asset_price: number,
    symbol:  {
      __typename: "Symbol",
      id: string,
      symbol: string,
      type: SymbolType,
      displaySymbol: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userPortafolioSymbolId: string,
  } | null,
};

export type CreateCurrentPriceMutationVariables = {
  input: CreateCurrentPriceInput,
  condition?: ModelCurrentPriceConditionInput | null,
};

export type CreateCurrentPriceMutation = {
  createCurrentPrice?:  {
    __typename: "CurrentPrice",
    id: string,
    price: number,
    updated: boolean,
    symbol:  {
      __typename: "Symbol",
      id: string,
      symbol: string,
      type: SymbolType,
      displaySymbol: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    currentPriceSymbolId: string,
  } | null,
};

export type UpdateCurrentPriceMutationVariables = {
  input: UpdateCurrentPriceInput,
  condition?: ModelCurrentPriceConditionInput | null,
};

export type UpdateCurrentPriceMutation = {
  updateCurrentPrice?:  {
    __typename: "CurrentPrice",
    id: string,
    price: number,
    updated: boolean,
    symbol:  {
      __typename: "Symbol",
      id: string,
      symbol: string,
      type: SymbolType,
      displaySymbol: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    currentPriceSymbolId: string,
  } | null,
};

export type DeleteCurrentPriceMutationVariables = {
  input: DeleteCurrentPriceInput,
  condition?: ModelCurrentPriceConditionInput | null,
};

export type DeleteCurrentPriceMutation = {
  deleteCurrentPrice?:  {
    __typename: "CurrentPrice",
    id: string,
    price: number,
    updated: boolean,
    symbol:  {
      __typename: "Symbol",
      id: string,
      symbol: string,
      type: SymbolType,
      displaySymbol: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    currentPriceSymbolId: string,
  } | null,
};

export type CreateSymbolMutationVariables = {
  input: CreateSymbolInput,
  condition?: ModelSymbolConditionInput | null,
};

export type CreateSymbolMutation = {
  createSymbol?:  {
    __typename: "Symbol",
    id: string,
    symbol: string,
    type: SymbolType,
    displaySymbol: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateSymbolMutationVariables = {
  input: UpdateSymbolInput,
  condition?: ModelSymbolConditionInput | null,
};

export type UpdateSymbolMutation = {
  updateSymbol?:  {
    __typename: "Symbol",
    id: string,
    symbol: string,
    type: SymbolType,
    displaySymbol: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteSymbolMutationVariables = {
  input: DeleteSymbolInput,
  condition?: ModelSymbolConditionInput | null,
};

export type DeleteSymbolMutation = {
  deleteSymbol?:  {
    __typename: "Symbol",
    id: string,
    symbol: string,
    type: SymbolType,
    displaySymbol: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetUserPortafolioQueryVariables = {
  id: string,
};

export type GetUserPortafolioQuery = {
  getUserPortafolio?:  {
    __typename: "UserPortafolio",
    id: string,
    user: string,
    action: PortafolioAction,
    asset_quantity: number,
    action_date: string,
    current_asset_price: number,
    symbol:  {
      __typename: "Symbol",
      id: string,
      symbol: string,
      type: SymbolType,
      displaySymbol: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userPortafolioSymbolId: string,
  } | null,
};

export type ListUserPortafoliosQueryVariables = {
  filter?: ModelUserPortafolioFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserPortafoliosQuery = {
  listUserPortafolios?:  {
    __typename: "ModelUserPortafolioConnection",
    items:  Array< {
      __typename: "UserPortafolio",
      id: string,
      user: string,
      action: PortafolioAction,
      asset_quantity: number,
      action_date: string,
      current_asset_price: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      userPortafolioSymbolId: string,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUserPortafoliosQueryVariables = {
  filter?: ModelUserPortafolioFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUserPortafoliosQuery = {
  syncUserPortafolios?:  {
    __typename: "ModelUserPortafolioConnection",
    items:  Array< {
      __typename: "UserPortafolio",
      id: string,
      user: string,
      action: PortafolioAction,
      asset_quantity: number,
      action_date: string,
      current_asset_price: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      userPortafolioSymbolId: string,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetCurrentPriceQueryVariables = {
  id: string,
};

export type GetCurrentPriceQuery = {
  getCurrentPrice?:  {
    __typename: "CurrentPrice",
    id: string,
    price: number,
    updated: boolean,
    symbol:  {
      __typename: "Symbol",
      id: string,
      symbol: string,
      type: SymbolType,
      displaySymbol: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    currentPriceSymbolId: string,
  } | null,
};

export type ListCurrentPricesQueryVariables = {
  filter?: ModelCurrentPriceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCurrentPricesQuery = {
  listCurrentPrices?:  {
    __typename: "ModelCurrentPriceConnection",
    items:  Array< {
      __typename: "CurrentPrice",
      id: string,
      price: number,
      updated: boolean,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      currentPriceSymbolId: string,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncCurrentPricesQueryVariables = {
  filter?: ModelCurrentPriceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncCurrentPricesQuery = {
  syncCurrentPrices?:  {
    __typename: "ModelCurrentPriceConnection",
    items:  Array< {
      __typename: "CurrentPrice",
      id: string,
      price: number,
      updated: boolean,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      currentPriceSymbolId: string,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetSymbolQueryVariables = {
  id: string,
};

export type GetSymbolQuery = {
  getSymbol?:  {
    __typename: "Symbol",
    id: string,
    symbol: string,
    type: SymbolType,
    displaySymbol: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListSymbolsQueryVariables = {
  filter?: ModelSymbolFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSymbolsQuery = {
  listSymbols?:  {
    __typename: "ModelSymbolConnection",
    items:  Array< {
      __typename: "Symbol",
      id: string,
      symbol: string,
      type: SymbolType,
      displaySymbol: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncSymbolsQueryVariables = {
  filter?: ModelSymbolFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncSymbolsQuery = {
  syncSymbols?:  {
    __typename: "ModelSymbolConnection",
    items:  Array< {
      __typename: "Symbol",
      id: string,
      symbol: string,
      type: SymbolType,
      displaySymbol: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateUserPortafolioSubscriptionVariables = {
  user?: string | null,
};

export type OnCreateUserPortafolioSubscription = {
  onCreateUserPortafolio?:  {
    __typename: "UserPortafolio",
    id: string,
    user: string,
    action: PortafolioAction,
    asset_quantity: number,
    action_date: string,
    current_asset_price: number,
    symbol:  {
      __typename: "Symbol",
      id: string,
      symbol: string,
      type: SymbolType,
      displaySymbol: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userPortafolioSymbolId: string,
  } | null,
};

export type OnUpdateUserPortafolioSubscriptionVariables = {
  user?: string | null,
};

export type OnUpdateUserPortafolioSubscription = {
  onUpdateUserPortafolio?:  {
    __typename: "UserPortafolio",
    id: string,
    user: string,
    action: PortafolioAction,
    asset_quantity: number,
    action_date: string,
    current_asset_price: number,
    symbol:  {
      __typename: "Symbol",
      id: string,
      symbol: string,
      type: SymbolType,
      displaySymbol: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userPortafolioSymbolId: string,
  } | null,
};

export type OnDeleteUserPortafolioSubscriptionVariables = {
  user?: string | null,
};

export type OnDeleteUserPortafolioSubscription = {
  onDeleteUserPortafolio?:  {
    __typename: "UserPortafolio",
    id: string,
    user: string,
    action: PortafolioAction,
    asset_quantity: number,
    action_date: string,
    current_asset_price: number,
    symbol:  {
      __typename: "Symbol",
      id: string,
      symbol: string,
      type: SymbolType,
      displaySymbol: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userPortafolioSymbolId: string,
  } | null,
};

export type OnCreateCurrentPriceSubscription = {
  onCreateCurrentPrice?:  {
    __typename: "CurrentPrice",
    id: string,
    price: number,
    updated: boolean,
    symbol:  {
      __typename: "Symbol",
      id: string,
      symbol: string,
      type: SymbolType,
      displaySymbol: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    currentPriceSymbolId: string,
  } | null,
};

export type OnUpdateCurrentPriceSubscription = {
  onUpdateCurrentPrice?:  {
    __typename: "CurrentPrice",
    id: string,
    price: number,
    updated: boolean,
    symbol:  {
      __typename: "Symbol",
      id: string,
      symbol: string,
      type: SymbolType,
      displaySymbol: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    currentPriceSymbolId: string,
  } | null,
};

export type OnDeleteCurrentPriceSubscription = {
  onDeleteCurrentPrice?:  {
    __typename: "CurrentPrice",
    id: string,
    price: number,
    updated: boolean,
    symbol:  {
      __typename: "Symbol",
      id: string,
      symbol: string,
      type: SymbolType,
      displaySymbol: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    currentPriceSymbolId: string,
  } | null,
};

export type OnCreateSymbolSubscription = {
  onCreateSymbol?:  {
    __typename: "Symbol",
    id: string,
    symbol: string,
    type: SymbolType,
    displaySymbol: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateSymbolSubscription = {
  onUpdateSymbol?:  {
    __typename: "Symbol",
    id: string,
    symbol: string,
    type: SymbolType,
    displaySymbol: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteSymbolSubscription = {
  onDeleteSymbol?:  {
    __typename: "Symbol",
    id: string,
    symbol: string,
    type: SymbolType,
    displaySymbol: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
