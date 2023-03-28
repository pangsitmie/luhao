import { gql } from "@apollo/client";


export const BRAND_GetBrandInfo = gql`
query Brands {
  getBrandPrincipal {
    email
    lineUrl
    name
    phone {
      country
      number
    }
    brands {
      id
      name
      logo
    }
  }
}
`
// export const BRAND_GetBrandList = gql`
// query GetBrandList {
//   getBrandPrincipal {
//     brands {
//       id
//       name
//     }
//   }
// }
// `
export const BRAND_GetBrandCurrencyList = gql`
query GetBrandPrincipal {
  getBrandPrincipal {
    brands {
      id
      name
      currency {
        id
        name
      }
    }
  }
}
`
export const BRAND_GetAllBrands = gql`
query GetBrandsPaginatedConnection($next: Next, $previous: Previous) {
  getBrandPrincipal {
    getBrandsPaginatedConnection(next: $next, previous: $previous) {
      edges {
        cursor
        node {
          id
          name
          vatNumber
          cover
          intro
          logo
          status
          principal {
            id
            name
            phone {
              country
              number
            }
            lineUrl
            email
            createdAt
          }
        }
      }
      hasNextPage
      hasPreviousPage
      totalPageCount
    }
  }
}
`

export const BRAND_UpdateBrand = gql`
mutation UpdateBrandForBrandPrincipal(
  $name: String!
  $vatNumber: String!
  $principal: UpdateBrandPrincipalArgs!
  $brandId: ID!
  $cover: String
  $intro: String
  $logo: String
) {
  updateBrandForBrandPrincipal(
    name: $name
    vatNumber: $vatNumber
    principal: $principal
    brandId: $brandId
    cover: $cover
    intro: $intro
    logo: $logo
  )
}
`

export const BRAND_GetAllStores = gql`
query ManagerGetStoresPaginatedConnection($next: Next, $previous: Previous) {
  getBrandPrincipal {
    brands {
      managerGetStoresPaginatedConnection(next: $next, previous: $previous) {
        edges {
          cursor
          node {
            id
            name
            brand {
              id
              name
            }
            status
          }
        }
        hasNextPage
        hasPreviousPage
        totalPageCount
      }
    }
  }
}
`
export const BRAND_CreateStore = gql`
query Brands(
  $name: String!
  $location: CreateStoreLocationArgs!
  $principal: CreateStorePrincipalArgs!
  $intro: String
  $cover: String
) {
  getBrandPrincipal {
    brands {
      createStore(
        name: $name
        location: $location
        principal: $principal
        intro: $intro
        cover: $cover
      )
    }
  }
}
`

export const BRAND_GetSentFreeCoinList = gql`
query BrandGetAllNotificationSchedules($onlyRewardType: ERewardType) {
  brandGetAllNotificationSchedules(onlyRewardType: $onlyRewardType) {
    id
    triggerAt
    createdAt
    comment
    notification {
      id
      title
      content
      expireAt
      reward {
        id
        content {
          ... on CurrencyReward {
            id
            amount
            currency {
              id
              name
              type 
            }
          }
        }
        limit
        status {
          id
          description
          name
        id
          description
          name
        }
        sourceType
        endAt
        startAt
        description
        receiveDaysOverdue
        belongToId
        belongToRole
      }
    }
    status {
      id
      description
      name
    }
  }
}
`



export const BRAND_DeleteNotification = gql`
query BrandGetNotificationSchedules($ids: [ID!]!) {
  brandGetNotificationSchedules(ids: $ids) {
    delete
  }
}
`

export const BRAND_GetMachineReviewData = gql`
query GetMachineReviewData($reviewIds: [String!]!) {
  getMachineReviewData(reviewIds: $reviewIds) {
    id
    code
    price
    name
    description
  }
}
`
