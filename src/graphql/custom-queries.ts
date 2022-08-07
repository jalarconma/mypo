export const listFullUserPortafolios = /* GraphQL */ `
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
      nextToken
    }
  }
`;