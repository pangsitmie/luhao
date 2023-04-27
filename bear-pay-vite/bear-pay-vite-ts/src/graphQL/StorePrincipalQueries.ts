import { gql } from "@apollo/client";

export const STORE_GetStoreInfo = gql`
query GetStorePrincipal {
  getStorePrincipal {
    id
    name
    email
    lineUrl
    stores {
      id
      name
      brand {
        id
        currency {
          id
          name
        }
      }
    }
  }
}
`
export const STORE_GetStoreCurrency = gql`
query GetStorePrincipal {
  getStorePrincipal {
    id
    stores {
      id
      brand {
        id
        currency {
          id
          name
        }
      }
    }
  }
}
`

export const STORE_GetAllStores = gql`
query GetStoresPaginatedConnection($next: Next, $previous: Previous) {
  getStorePrincipal {
    getStoresPaginatedConnection(next: $next, previous: $previous) {
      edges {
        cursor
        node {
           id
            name
            status
        }
      }
      hasNextPage
      hasPreviousPage
      totalPageCount
      allCursors
    }
  }
}
`

export const STORE_GetBonusGamePaginatedConnection = gql`
query GetBonusGamesPaginatedConnectionForStorePrincipal(
  $next: Next
  $previous: Previous
) {
  getBonusGamesPaginatedConnectionForStorePrincipal(
    next: $next
    previous: $previous
  ) {
    edges {
      node {
        id
        storeId
        type
        name
        description
        startAt
        endAt
        status
        maxCurrencyAmount
        nowCurrencyAmount
        createdAt
      }
      cursor
    }
    hasNextPage
    hasPreviousPage
    totalPageCount
    allCursors
  }
}
`

export const STORE_GetBonusGame = gql`
query GetBonusGameForStorePrincipal($bonusGameId: ID!) {
  getBonusGameForStorePrincipal(bonusGameId: $bonusGameId) {
    id
    storeId
    type
    name
    description
    startAt
    endAt
    status
    maxCurrencyAmount
    nowCurrencyAmount
    createdAt
  }
}
`