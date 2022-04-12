/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserPortafolio = /* GraphQL */ `
  subscription OnCreateUserPortafolio {
    onCreateUserPortafolio {
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
export const onUpdateUserPortafolio = /* GraphQL */ `
  subscription OnUpdateUserPortafolio {
    onUpdateUserPortafolio {
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
export const onDeleteUserPortafolio = /* GraphQL */ `
  subscription OnDeleteUserPortafolio {
    onDeleteUserPortafolio {
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
export const onCreateCurrentPrice = /* GraphQL */ `
  subscription OnCreateCurrentPrice {
    onCreateCurrentPrice {
      id
      price
      updated
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
export const onUpdateCurrentPrice = /* GraphQL */ `
  subscription OnUpdateCurrentPrice {
    onUpdateCurrentPrice {
      id
      price
      updated
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
export const onDeleteCurrentPrice = /* GraphQL */ `
  subscription OnDeleteCurrentPrice {
    onDeleteCurrentPrice {
      id
      price
      updated
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
export const onCreateSymbol = /* GraphQL */ `
  subscription OnCreateSymbol {
    onCreateSymbol {
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
export const onUpdateSymbol = /* GraphQL */ `
  subscription OnUpdateSymbol {
    onUpdateSymbol {
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
export const onDeleteSymbol = /* GraphQL */ `
  subscription OnDeleteSymbol {
    onDeleteSymbol {
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
