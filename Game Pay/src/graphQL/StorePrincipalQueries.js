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
    }
  }
}
`