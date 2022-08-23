/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserPortafolio = /* GraphQL */ `
  subscription OnCreateUserPortafolio($owner: String) {
    onCreateUserPortafolio(owner: $owner) {
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
export const onUpdateUserPortafolio = /* GraphQL */ `
  subscription OnUpdateUserPortafolio($owner: String) {
    onUpdateUserPortafolio(owner: $owner) {
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
export const onDeleteUserPortafolio = /* GraphQL */ `
  subscription OnDeleteUserPortafolio($owner: String) {
    onDeleteUserPortafolio(owner: $owner) {
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
export const onCreateSymbol = /* GraphQL */ `
  subscription OnCreateSymbol {
    onCreateSymbol {
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
export const onUpdateSymbol = /* GraphQL */ `
  subscription OnUpdateSymbol {
    onUpdateSymbol {
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
export const onDeleteSymbol = /* GraphQL */ `
  subscription OnDeleteSymbol {
    onDeleteSymbol {
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
