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
    }
  }
`
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
query GetBrandPrincipal {
    getBrandPrincipal {
      brands {
        id
        name
        vatNumber
        cover
        intro
        logo
        status {
          id
          description
          name
        }
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
  }
`

export const BRAND_GetAllStores = gql`
query ManagerGetStores {
    getBrandPrincipal {
      brands {
        managerGetStores {
          id
      name
      brand {
        id
        name
      }
      status {
        id
        description
        name
      }
      location {
        storeId
        city
        district
        address
      }
        }
      }
    }
  }
`
export const BRAND_CreateStore = gql`
query Brands($name: String!, $location: CreateStoreLocationArgs!, $principal: CreateStorePrincipalArgs!, $cover: String, $intro: String) {
    getBrandPrincipal {
      brands {
        createStore(name: $name, location: $location, principal: $principal, cover: $cover, intro: $intro)
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
              createdAt
              type {
                id
                description
                name
              }
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
        sourceType {
          id
          description
          name
        }
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