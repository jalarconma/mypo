/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCurrentPrice = /* GraphQL */ `
  mutation CreateCurrentPrice(
    $input: CreateCurrentPriceInput!
    $condition: ModelCurrentPriceConditionInput
  ) {
    createCurrentPrice(input: $input, condition: $condition) {
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
export const updateCurrentPrice = /* GraphQL */ `
  mutation UpdateCurrentPrice(
    $input: UpdateCurrentPriceInput!
    $condition: ModelCurrentPriceConditionInput
  ) {
    updateCurrentPrice(input: $input, condition: $condition) {
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
export const deleteCurrentPrice = /* GraphQL */ `
  mutation DeleteCurrentPrice(
    $input: DeleteCurrentPriceInput!
    $condition: ModelCurrentPriceConditionInput
  ) {
    deleteCurrentPrice(input: $input, condition: $condition) {
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
export const createSymbol = /* GraphQL */ `
  mutation CreateSymbol(
    $input: CreateSymbolInput!
    $condition: ModelSymbolConditionInput
  ) {
    createSymbol(input: $input, condition: $condition) {
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
export const updateSymbol = /* GraphQL */ `
  mutation UpdateSymbol(
    $input: UpdateSymbolInput!
    $condition: ModelSymbolConditionInput
  ) {
    updateSymbol(input: $input, condition: $condition) {
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
export const deleteSymbol = /* GraphQL */ `
  mutation DeleteSymbol(
    $input: DeleteSymbolInput!
    $condition: ModelSymbolConditionInput
  ) {
    deleteSymbol(input: $input, condition: $condition) {
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