/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserPortafolio = /* GraphQL */ `
  query GetUserPortafolio($id: ID!) {
    getUserPortafolio(id: $id) {
      id
      user
      action
      asset_quantity
      action_date
      current_asset_price
      symbol {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUserPortafolios = /* GraphQL */ `
  query ListUserPortafolios(
    $filter: ModelUserPortafolioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserPortafolios(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        action
        asset_quantity
        action_date
        current_asset_price
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUserPortafolios = /* GraphQL */ `
  query SyncUserPortafolios(
    $filter: ModelUserPortafolioFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserPortafolios(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        user
        action
        asset_quantity
        action_date
        current_asset_price
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getCurrentPrice = /* GraphQL */ `
  query GetCurrentPrice($id: ID!) {
    getCurrentPrice(id: $id) {
      id
      price
      updated
      symbol {
        id
        symbol
        type
        userportafolioID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      currentPriceSymbolId
    }
  }
`;
export const listCurrentPrices = /* GraphQL */ `
  query ListCurrentPrices(
    $filter: ModelCurrentPriceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCurrentPrices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        price
        updated
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        currentPriceSymbolId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCurrentPrices = /* GraphQL */ `
  query SyncCurrentPrices(
    $filter: ModelCurrentPriceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCurrentPrices(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        price
        updated
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        currentPriceSymbolId
      }
      nextToken
      startedAt
    }
  }
`;
export const getSymbol = /* GraphQL */ `
  query GetSymbol($id: ID!) {
    getSymbol(id: $id) {
      id
      symbol
      type
      userportafolioID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listSymbols = /* GraphQL */ `
  query ListSymbols(
    $filter: ModelSymbolFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSymbols(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        symbol
        type
        userportafolioID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSymbols = /* GraphQL */ `
  query SyncSymbols(
    $filter: ModelSymbolFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSymbols(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        symbol
        type
        userportafolioID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
