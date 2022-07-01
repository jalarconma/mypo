/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserPortafolio = /* GraphQL */ `
  mutation CreateUserPortafolio(
    $input: CreateUserPortafolioInput!
    $condition: ModelUserPortafolioConditionInput
  ) {
    createUserPortafolio(input: $input, condition: $condition) {
      id
      user
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
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userPortafolioSymbolId
    }
  }
`;
export const updateUserPortafolio = /* GraphQL */ `
  mutation UpdateUserPortafolio(
    $input: UpdateUserPortafolioInput!
    $condition: ModelUserPortafolioConditionInput
  ) {
    updateUserPortafolio(input: $input, condition: $condition) {
      id
      user
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
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userPortafolioSymbolId
    }
  }
`;
export const deleteUserPortafolio = /* GraphQL */ `
  mutation DeleteUserPortafolio(
    $input: DeleteUserPortafolioInput!
    $condition: ModelUserPortafolioConditionInput
  ) {
    deleteUserPortafolio(input: $input, condition: $condition) {
      id
      user
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
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userPortafolioSymbolId
    }
  }
`;
export const createCurrentPrice = /* GraphQL */ `
  mutation CreateCurrentPrice(
    $input: CreateCurrentPriceInput!
    $condition: ModelCurrentPriceConditionInput
  ) {
    createCurrentPrice(input: $input, condition: $condition) {
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
export const updateCurrentPrice = /* GraphQL */ `
  mutation UpdateCurrentPrice(
    $input: UpdateCurrentPriceInput!
    $condition: ModelCurrentPriceConditionInput
  ) {
    updateCurrentPrice(input: $input, condition: $condition) {
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
export const deleteCurrentPrice = /* GraphQL */ `
  mutation DeleteCurrentPrice(
    $input: DeleteCurrentPriceInput!
    $condition: ModelCurrentPriceConditionInput
  ) {
    deleteCurrentPrice(input: $input, condition: $condition) {
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
export const createSymbol = /* GraphQL */ `
  mutation CreateSymbol(
    $input: CreateSymbolInput!
    $condition: ModelSymbolConditionInput
  ) {
    createSymbol(input: $input, condition: $condition) {
      id
      symbol
      type
      displaySymbol
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateSymbol = /* GraphQL */ `
  mutation UpdateSymbol(
    $input: UpdateSymbolInput!
    $condition: ModelSymbolConditionInput
  ) {
    updateSymbol(input: $input, condition: $condition) {
      id
      symbol
      type
      displaySymbol
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteSymbol = /* GraphQL */ `
  mutation DeleteSymbol(
    $input: DeleteSymbolInput!
    $condition: ModelSymbolConditionInput
  ) {
    deleteSymbol(input: $input, condition: $condition) {
      id
      symbol
      type
      displaySymbol
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
