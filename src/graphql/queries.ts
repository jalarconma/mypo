/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserPortafolio = /* GraphQL */ `
  query GetUserPortafolio($id: ID!) {
    getUserPortafolio(id: $id) {
      id
      user
      owner
      action
      asset_quantity
      action_date
      current_asset_price
      symbol {
        id
        symbol
        type
        displaySymbol
        description
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userPortafolioSymbolId
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
        owner
        action
        asset_quantity
        action_date
        current_asset_price
        createdAt
        updatedAt
        userPortafolioSymbolId
      }
      nextToken
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
        displaySymbol
        description
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        currentPriceSymbolId
      }
      nextToken
    }
  }
`;
export const getSymbol = /* GraphQL */ `
  query GetSymbol($id: ID!) {
    getSymbol(id: $id) {
      id
      symbol
      type
      displaySymbol
      description
      createdAt
      updatedAt
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
        displaySymbol
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
