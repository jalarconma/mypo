/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCurrentPrice = /* GraphQL */ `
  query GetCurrentPrice($id: ID!) {
    getCurrentPrice(id: $id) {
      id
      price
      last_update
      symbol {
        id
        symbol
        type
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
        last_update
        symbol {
          id
          symbol
          type
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
        last_update
        symbol {
          id
          symbol
          type
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