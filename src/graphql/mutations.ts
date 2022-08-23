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
export const updateUserPortafolio = /* GraphQL */ `
  mutation UpdateUserPortafolio(
    $input: UpdateUserPortafolioInput!
    $condition: ModelUserPortafolioConditionInput
  ) {
    updateUserPortafolio(input: $input, condition: $condition) {
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
export const deleteUserPortafolio = /* GraphQL */ `
  mutation DeleteUserPortafolio(
    $input: DeleteUserPortafolioInput!
    $condition: ModelUserPortafolioConditionInput
  ) {
    deleteUserPortafolio(input: $input, condition: $condition) {
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
    }
  }
`;
