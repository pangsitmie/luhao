import { gql } from "@apollo/client";


// ========================= AUTH =========================
export const GetManagerAccessToken = gql`
query GetManagerAccessToken($refreshToken: String!) {
  getManagerAccessToken(refreshToken: $refreshToken)
}
`


// BRAND ACCESS TOKEN
export const GetBrandPrincipalWebAccessToken = gql`
query getBrandPrincipalWebAccessToken($refreshToken: String!) {
  getBrandPrincipalWebAccessToken(refreshToken: $refreshToken)
}
`

// STORE ACCESS TOKEN
export const GetStoreWebAccessToken = gql`
query Query($refreshToken: String!) {
  getStorePrincipalWebAccessToken(refreshToken: $refreshToken)
}
`


// ========================= Member =========================
export const GetAllMember = gql`
query GetAllMember($offset: Int, $limit: Int, $status: EMemberStatus) {
  getAllMember(offset: $offset, limit: $limit, status: $status){
    id
    profile {
      memberId
      nickname
      birthday
      avatar
    }
    phone {
      country
      number
    }
    status
    career {
      memberId
      continuousLoginDays
      totalLoginDays
      lastSignAt
    }
  }
}
`
export const BanMember = gql`
query GetMember($params: [MemberArgs!]!, $reason: String!, $expireAt: Int) {
  getMember(params: $params) {
    ban(reason: $reason, expireAt: $expireAt)
  }
}
`
export const UnbanMember = gql`
query GetMember($params: [MemberArgs!]!, $reason: String!) {
  getMember(params: $params) {
    unban(reason: $reason)
  }
}
`

// ========================= Brand =========================
export const GetAllBrands = gql`
query ManagerGetBrands($limit: Int, $offset: Int) {
  managerGetBrands(limit: $limit, offset: $offset) {
    id
    name
    status
    principal {
      id
      name
      
    }
  }
}
`

export const GetBrandListPagination = gql`
query ManagerGetBrandsPaginatedConnection($next: Next, $previous: Previous) {
  managerGetBrandsPaginatedConnection(next: $next, previous: $previous) {
    edges {
      cursor
      node {
        id
        name
        status
        principal {
          id
          name
        }
      }
    }
    hasNextPage
    hasPreviousPage
    totalPageCount
  }
}
`

export const GetBrandList = gql`
query ManagerGetBrands {
  managerGetBrands {
    id
    name
    currency {
      id
      name
    }
  }
}
`
export const GetBrand = gql`
query GetBrand($args: [BrandArgs!]!) {
  getBrand(args: $args) {
    id
    name
    vatNumber
    status
    currency {
      id
      name
    }
    cover
    intro
    logo
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
`
export const ManagerUpdateBrand = gql`
query GetBrand(
  $args: [BrandArgs!]!
  $name: String
  $vatNumber: String
  $cover: String
  $logo: String
  $currencyName: String
  $principal: PatchBrandPrincipalArgs
  $statusId: EUpdateBrandStatus
  $intro: String
) {
  getBrand(args: $args) {
    updateForManager(
      name: $name
      vatNumber: $vatNumber
      cover: $cover
      logo: $logo
      currencyName: $currencyName
      principal: $principal
      statusId: $statusId
      intro: $intro
    )
  }
}
`
export const UpdateBrandLogoCover = gql`
query GetBrand($args: [BrandArgs!]!, $cover: String, $logo: String) {
  getBrand(args: $args) {
    update(cover: $cover, logo: $logo)
  }
}
`
export const BanBrand = gql`
query GetBrand($args: [BrandArgs!]!, $expireAt: Int, $reason: String!) {
  getBrand(args: $args) {
    ban(expireAt: $expireAt, reason: $reason)
  }
}
`
export const UnbanBrand = gql`
query GetBrand($args: [BrandArgs!]!) {
  getBrand(args: $args) {
    unBan
  }
}
`
export const RemoveBrand = gql`
query GetBrand($args: [BrandArgs!]!) {
  getBrand(args: $args) {
    remove
  }
}
`
export const BrandUploadLogo = gql`
query GetBrand($mimetype: String!, $fileSize: Int!, $args: [BrandArgs!]!) {
  getBrand(args: $args) {
    genLogoUploadURI(mimetype: $mimetype, fileSize: $fileSize)
  }
}
`
export const BrandUploadCover = gql`
query GetBrand($args: [BrandArgs!]!, $mimetype: String!, $fileSize: Int!) {
  getBrand(args: $args) {
    genCoverUploadURI(mimetype: $mimetype, fileSize: $fileSize)
  }
}
`
//========================= STORES =========================
export const GetAllStores = gql`
query ManagerGetStores($limit: Int, $offset: Int) {
  managerGetStores(limit: $limit, offset: $offset) {
    id
    name
    status
    brand {
      id
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
`

export const GetStoreListPagination = gql`
query ManagerGetStoresPaginatedConnection($next: Next, $previous: Previous) {
  managerGetStoresPaginatedConnection(next: $next, previous: $previous) {
    edges {
      cursor
      node {
        id
        name
        status
        brand {
          id
          name
        }
      }
    }
    hasNextPage
    hasPreviousPage
    totalPageCount
  }
}
`
export const GetStore = gql`
query GetStore($args: [StoreArgs!]!) {
  getStore(args: $args) {
    id
    name
    cover
    intro
    status
    brand {
      id
      name
    }
    location {
      city
      district
      address
      description
    }
    principal {
      name
      lineUrl
      email
    }
  }
}
`
export const GetStoreCurrency = gql`
query GetStore($args: [StoreArgs!]!) {
  getStore(args: $args) {
    id
    name
    brand {
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
export const CreateStore = gql`
query GetBrand($args: [BrandArgs!]!, $name: String!, $location: CreateStoreLocationArgs!, $principal: CreateStorePrincipalArgs!, $intro: String, $cover: String!) {
  getBrand(args: $args) {
    createStore(name: $name, location: $location, principal: $principal, intro: $intro, cover: $cover)
  }
}
`
// export const UpdateStore = gql`
// query GetStore($args: [StoreArgs!]!, $name: String, $intro: String, $location: UpdateStoreLocationArgs, $principal: UpdateStorePrincipalArgs, $statusId: EUpdateStoreStatus, $cover: String) {
//   getStore(args: $args) {
//     update(name: $name, intro: $intro, location: $location, principal: $principal, statusId: $statusId, cover: $cover)
//   }
// }
// `
export const BanStore = gql`
query GetStore($args: [StoreArgs!]!, $reason: String!, $expireAt: Int) {
  getStore(args: $args) {
    ban(reason: $reason, expireAt: $expireAt)
  }
}
`
export const UnbanStore = gql`
query GetStore($args: [StoreArgs!]!) {
  getStore(args: $args) {
    unBan
  }
}
`
export const RemoveStore = gql`
query GetStore($args: [StoreArgs!]!) {
  getStore(args: $args) {
    remove
  }
}
`


// ========================= MACHINES =========================
export const GetMachineList = gql`
query GetStore($args: [StoreArgs!]!, $limit: Int, $offset: Int) {
  getStore(args: $args) {
    id
    name
    managerGetMachines(limit: $limit, offset: $offset) {
      id
      uuid
      qrCode
      code
      name
      connStatus
    }
  }
}
`

export const GetMachineListPagination = gql`
query MemberGetMachinesPaginatedConnection(
  $args: [StoreArgs!]!
  $next: Next
  $previous: Previous
) {
  getStore(args: $args) {
    managerGetMachinesPaginatedConnection(next: $next, previous: $previous) {
      edges {
        cursor
        node {
          id
          code
          name
          connStatus
          qrCode
          favorite
        }
      }
      hasNextPage
      hasPreviousPage
      totalPageCount
    }
  }
}
`


export const GetMachine = gql`
query GetMachine($args: [MachineArgs!]!) {
  getMachine(args: $args) {
    id
    uuid
    code
    price
    name
    nfc
    description
    qrCode
    status
    connStatus
    favorite
    counterInfo {
      counters {
        counterType
        count
      }
      counterCheck
    }
    commodity {
      id
      name
      price
      stock
    }
  }
}
`
// export const UpdateMachine = gql`
// query GetMachine(
//   $args: [MachineArgs!]!
//   $price: Float
//   $name: String
//   $description: String
//   $statusId: EUpdateMachineStatus
//   $counterCheck: Boolean
//   $counters: [CounterArgs!]
//   $nfc: String
// ) {
//   getMachine(args: $args) {
//     update(
//       price: $price
//       name: $name
//       description: $description
//       statusId: $statusId
//       counterCheck: $counterCheck
//       counters: $counters
//       nfc: $nfc
//     )
//   }
// }
// `

export const BanMachine = gql`
query GetMachine($args: [MachineArgs!]!, $expireAt: Int, $reason: String!) {
  getMachine(args: $args) {
    ban(expireAt: $expireAt, reason: $reason)
  }
}
`
export const UnBanMachine = gql`
query GetMachine($args: [MachineArgs!]!) {
  getMachine(args: $args) {
    unBan
  }
}
`
export const UnbindMachine = gql`
query GetMachine($args: [MachineArgs!]!) {
  getMachine(args: $args) {
    unbind
  }
}
`

// ========================= BILLBOARDS =========================
export const GetBillboardList = gql`
query ManagerGetBillboards($args: [BrandArgs!]!) {
  getBrand(args: $args) {
    managerGetBillboards {
      id
      title
      content
      description
      startAt
      endAt
      status
    }
  }
}
`

export const GetBillboardListPagination = gql`
query ManagerGetBrandBillboardsPaginatedConnection(
  $args: [BrandArgs!]!
  $next: Next
  $previous: Previous
) {
  getBrand(args: $args) {
    managerGetBrandBillboardsPaginatedConnection(
      next: $next
      previous: $previous
    ) {
      edges {
        cursor
        node {
          id
          title
          content
          status
          description
          startAt
          endAt
        }
      }
      hasNextPage
      hasPreviousPage
      totalPageCount
    }
  }
}
`
export const CreateBillboard = gql`
query GetBrand($args: [BrandArgs!]!, $title: String!, $content: String!, $description: String, $endAt: Int, $startAt: Int!, $image: String) {
  getBrand(args: $args) {
    createBillboard(title: $title, content: $content, description: $description, endAt: $endAt, startAt: $startAt, image: $image)
  }
}
`
export const GetBillboard = gql`
query GetBillboard($args: [BillboardArgs!]!) {
  getBillboard(args: $args) {
    id
    title
    content
    description
    startAt
    endAt
    status
    image
  }
}
`

export const BanBillboard = gql`
query GetBillboard($reason: String!, $args: [BillboardArgs!]!, $expireAt: Int) {
  getBillboard(args: $args) {
    ban(reason: $reason, expireAt: $expireAt)
  }
}
`
export const UnbanBillboard = gql`
query GetBillboard($args: [BillboardArgs!]!) {
  getBillboard(args: $args) {
    unBan
  }
}
`
export const RemoveBillboard = gql`
query GetBillboard($args: [BillboardArgs!]!) {
  getBillboard(args: $args) {
    remove
  }
}
`


// ========================= NOTIFICATIONS =========================
export const ManagerGetAllNotificationSchedules = gql`
query ManagerGetAllNotificationSchedules {
  managerGetAllNotificationSchedules {
    id
    triggerAt
    comment
    status
    notification {
      id
      title
      content
      type
      expireAt
    }
  }
}
`
export const DeleteNotification = gql`
query ManagerGetNotificationSchedules($ids: [ID!]!) {
  managerGetNotificationSchedules(ids: $ids) {
    delete
  }
}
`


// ========================= FREE COINS =========================
// ini dipake buat dapetin semua free coin yang udah dikirim
// tapi disini dapet systemFree || brand dan ini dipake buat separasi 
// liat notion buat details
export const GetSentFreeCoinsList = gql`
query ManagerGetAllNotificationSchedules($onlyRewardType: ERewardType) {
  managerGetAllNotificationSchedules(onlyRewardType: $onlyRewardType) {
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
        status
        sourceType
        endAt
        startAt
        description
        receiveDaysOverdue
        belongToId
        belongToRole
      }
    }
    status
  }
}
`

// ========================= ADS =========================
export const GetAdsList = gql`
query ManagerGetAdvertisements {
  managerGetAdvertisements {
    id
    image
    url
    description
    startAt
    endAt
    status
    type
  }
}
`

export const GetAds = gql`
query GetAdvertisement($args: [AdvertisementArgs!]!) {
  getAdvertisement(args: $args) {
    id
    image
    url
    description
    startAt
    endAt
    status
    type 
  }
}
`
export const UpdateAds = gql`
query GetAdvertisement($args: [AdvertisementArgs!]!, $image: String, $url: String, $description: String, $startAt: Int, $endAt: Int, $statusId: EUpdateAdvertisementStatus) {
  getAdvertisement(args: $args) {
    update(image: $image, url: $url, description: $description, startAt: $startAt, endAt: $endAt, statusId: $statusId)
  }
}
`

export const BanAds = gql`
query GetAdvertisement($args: [AdvertisementArgs!]!, $reason: String!, $expireAt: Int) {
  getAdvertisement(args: $args) {
    ban(reason: $reason, expireAt: $expireAt)
  }
}
`

export const UnbanAds = gql`
query GetAdvertisement($args: [AdvertisementArgs!]!) {
  getAdvertisement(args: $args) {
    unBan
  }
}
`
export const RemoveAds = gql`
query GetAdvertisement($args: [AdvertisementArgs!]!) {
  getAdvertisement(args: $args) {
    remove
  }
}
`

// ========================= VERSION =========================
export const GetCurrentVersion = gql`
query GetCurrentVersion($clientName: EAppClient!) {
  getCurrentVersion(clientName: $clientName) {
    server
    ios
    android
  }
}
`

// ========================= DASHBOARD =========================
export const GetDashboardInit = gql`
query GetDashboardInit {
  getAllMember {
    id
  }
  managerGetBrands {
    id
  }
  managerGetStores {
    id
  }
}
`


// ========================= STATISTIC =========================
export const GetStoreListByBrand = gql`
query GetBrand($args: [BrandArgs!]!) {
  getBrand(args: $args) {
    managerGetStores {
      id
      name
    }
  }
}
`
export const GetBrandStatistic = gql`
query GetBrandStatistic($args: [BrandArgs!]!, $startAt: Int, $endAt: Int, $timeGranularity: EStatisticsTotalTimeGranularity) {
  getBrand(args: $args) {
    getStatisticsTotal(startAt: $startAt, endAt: $endAt, timeGranularity: $timeGranularity) {
      coinAmountTotal
      coinQuantityTotal
      giftAmountTotal
      giftQuantityTotal
      revenueRate
      giftRate
    }
  }
}
`

export const GetStoreStatistic = gql`
query GetStore($args: [StoreArgs!]!, $startAt: Int, $endAt: Int, $timeGranularity: EStatisticsTotalTimeGranularity) {
  getStore(args: $args) {
    getStatisticsTotal(startAt: $startAt, endAt: $endAt, timeGranularity: $timeGranularity) {
      coinAmountTotal
      coinQuantityTotal
      giftAmountTotal
      giftQuantityTotal
      revenueRate
      giftRate
    }
  }
}
`
export const GetBrandStatisticPeriod = gql`
query GetBrand(
  $args: [BrandArgs!]!
  $timeGranularity: EStatisticsPeriodTimeGranularity!
  $startAt: Int
  $endAt: Int
) {
  getBrand(args: $args) {
    getStatisticsPeriod(timeGranularity: $timeGranularity, startAt: $startAt, endAt: $endAt) {
      coinAmountTotal
      coinQuantityTotal
      giftAmountTotal
      giftQuantityTotal
      timestamp
    }
  }
}
`

export const GetStoreStatisticPeriod = gql`
query GetStatisticsPeriod(
  $args: [StoreArgs!]!
  $timeGranularity: EStatisticsPeriodTimeGranularity!
  $startAt: Int
  $endAt: Int
) {
  getStore(args: $args) {
    getStatisticsPeriod(
      timeGranularity: $timeGranularity
      startAt: $startAt
      endAt: $endAt
    ) {
      coinAmountTotal
      coinQuantityTotal
      giftAmountTotal
      giftQuantityTotal
      timestamp
    }
  }
}
`

export const GetStoreMachineStatisticsPagination = gql`
query GetStore(
  $args: [StoreArgs!]!
  $counterType: ECounterType
  $startAt: Int
  $endAt: Int
  $timeGranularity: EStatisticsTotalTimeGranularity
  $order: StatisticsOrderOption
  $next: Next
  $previous: Previous
) {
  getStore(args: $args) {
    getStoreMachinesStatisticsTotalPaginatedConnection(
      counterType: $counterType
      startAt: $startAt
      endAt: $endAt
      timeGranularity: $timeGranularity
      order: $order
      next: $next
      previous: $previous
    ) {
      edges {
        cursor
        node {
          id
          name
          giftRate
          revenueRate
          coinAmountTotal
          coinQuantityTotal
          coinDetail {
            immediateAmount
            immediateQuantity
            offlineAmount
            offlineQuantity
            combineAmount
            combineQuantity
            onlineCoinAmount
            onlineCoinQuantity
            onlineFreeAmount
            onlineFreeQuantity
          }
          giftAmountTotal
          giftQuantityTotal
          giftDetail {
            immediateAmount
            immediateQuantity
            offlineAmount
            offlineQuantity
            combineAmount
            combineQuantity
            onlineCoinAmount
            onlineCoinQuantity
            onlineFreeAmount
            onlineFreeQuantity
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

// ========================= COMMODITY =========================
export const GetCommodityList = gql`
query GetStore($args: [StoreArgs!]!) {
  getStore(args: $args) {
    commodities {
      id
      uuid
      name
      price
      stock
    }
  }
}
`

export const CreateCommodity = gql`
query GetStore($args: [StoreArgs!]!, $price: Int!, $stock: Int, $name: String!) {
  getStore(args: $args) {
    createCommodity(price: $price, stock: $stock, name: $name)
  }
}
`
export const GetMachineCommodity = gql`
query GetMachineCommodity($args: [MachineArgs!]!) {
  getMachine(args: $args) {
    id
    commodity {
      id
      name
      price
      stock
    }
  }
}
`
export const GetCommodity = gql`
query GetCommodity($args: [CommodityArgs!]!) {
  getCommodity(args: $args) {
    name
    price
    stock
    uuid
    id
  }
}
`

// export const UpdateCommodity = gql`
// query GetCommodity($args: [CommodityArgs!]!, $name: String, $price: Int, $stock: Int) {
//   getCommodity(args: $args) {
//     update(name: $name, price: $price, stock: $stock)
//   }
// }
// `

// ========================= DEPOSIT =========================
export const GetDepositList = gql`
query ManagerGetDepositItems(
  $specifyType: EDepositItemType
  $limit: Int
  $offset: Int
) {
  managerGetDepositItems(
    specifyType: $specifyType
    limit: $limit
    offset: $offset
  ) {
    id
    name
    walletValue
  }
}
`

export const GetDepositItem = gql`
query GetDepositItem($args: [DepositItemArgs!]!) {
  getDepositItem(args: $args) {
    id
    type
    name
    status
    price
    walletValue
    description
    createdAt
    startAt
    endAt
    maxPurchaseNum
    reward {
      id
      receiveDaysOverdue
      content {
        ... on CurrencyReward {
          id
          amount
        }
      }
    }
    managerGetPurchaseRecords {
      createdAt
      id
      purchaseId
      reason
      status
    }
  }
}
`


export const UpdateDepositItem = gql`
query GetDepositItem(
  $args: [DepositItemArgs!]!,
  $name: String,
  $description: String,
  $statusId: EUpdateDepositItemStatus
) {
  getDepositItem(args: $args) {
    update(name: $name, description: $description, statusId: $statusId)
  }
}
`

export const RemoveDepositItem = gql`
query GetDepositItem($args: [DepositItemArgs!]!) {
  getDepositItem(args: $args) {
    remove
  }
}
`


// ========================= REVIEW =========================
export const GetReviewList = gql`
query GetReviewList($onlyNotReview: Boolean!) {
  getReviewList(onlyNotReview: $onlyNotReview) {
    id
    createdAt
    requestUserId
    requestUserRole
    reviewId
    sourceId
    status
    type
  }
}
`

export const GetReviewCount = gql`
query GetReviewList($onlyNotReview: Boolean!) {
  getReviewList(onlyNotReview: $onlyNotReview) {
    id
  }
}
`


export const GetBrandReviewData = gql`
query GetBrandReviewData($reviewIds: [String!]!) {
  getBrandReviewData(reviewIds: $reviewIds) {
    id
    name
    vatNumber
    cover
    intro
    logo
    principalName
    principalLineUrl
    principalEmail
  }
}
`

export const GetStoreReviewData = gql`
query GetStoreReviewData($reviewIds: [String!]!) {
  getStoreReviewData(reviewIds: $reviewIds) {
    id
    name
    cover
    intro
    principalName
    principalLineUrl
    principalEmail
    city
    district
    address
    description
  }
}
`