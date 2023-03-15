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
query Stores {
    getStorePrincipal {
      stores {
        id
        name
        brand {
          id
          name
        }
        status
        location {
          storeId
          city
          district
          address
        }
      }
    }
  }
`