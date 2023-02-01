import { gql } from "@apollo/client";


// ========================= AUTH =========================
export const GetManagerAccessToken = gql`
query GetManagerAccessToken($refreshToken: String!) {
  getManagerAccessToken(refreshToken: $refreshToken)
}
`
export const GetAccessToken = gql`
query getAccessToken($refreshToken: String!) {
  getAccessToken(refreshToken: $refreshToken)
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
    status {
      name
    }
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
`

export const GetBrandList = gql`
query ManagerGetBrands {
  managerGetBrands {
    id
    name
    currency {
      id
      name
      type {
        id
        name
      }
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
    status {
      name
    }
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
export const UpdateBrand = gql`
query GetBrand($args: [BrandArgs!]!, $name: String, $vatNumber: String, $intro: String, $currencyName: String, $principal: UpdateBrandPrincipalArgs, $statusId: EUpdateBrandStatus, $cover: String, $logo: String) {
  getBrand(args: $args) {
    update(name: $name, vatNumber: $vatNumber, intro: $intro, currencyName: $currencyName, principal: $principal, statusId: $statusId, cover: $cover, logo: $logo)
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
`
export const GetStore = gql`
query GetStore($args: [StoreArgs!]!) {
  getStore(args: $args) {
    id
    name
    cover
    intro
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
export const CreateStore = gql`
query GetBrand($args: [BrandArgs!]!, $name: String!, $location: CreateStoreLocationArgs!, $principal: CreateStorePrincipalArgs!, $intro: String, $cover: String!) {
  getBrand(args: $args) {
    createStore(name: $name, location: $location, principal: $principal, intro: $intro, cover: $cover)
  }
}
`
export const UpdateStore = gql`
query GetStore($args: [StoreArgs!]!, $name: String, $intro: String, $location: UpdateStoreLocationArgs, $principal: UpdateStorePrincipalArgs, $statusId: EUpdateStoreStatus, $cover: String) {
  getStore(args: $args) {
    update(name: $name, intro: $intro, location: $location, principal: $principal, statusId: $statusId, cover: $cover)
  }
}
`
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
export const CreateMachineFromGetStores = gql`
query GetStore($args: [StoreArgs!]!, $code: String!, $price: Int, $name: String, $description: String, $counterCheck: Boolean, $counters: [CounterArgs!]) {
  getStore(args: $args) {
    createMachine(code: $code, price: $price, name: $name, description: $description, counterCheck: $counterCheck, counters: $counters) 
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
      status {
        id
        description
        name
      }
      connStatus
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
    description
    qrCode
    status {
      id
      description
      name
    }
    connStatus
    counterInfo {
      counters {
        counterType
        count
      }
      counterCheck
    }
  }
}
`
export const UpdateMachine = gql`
query GetMachine($args: [MachineArgs!]!, $price: Float, $name: String, $description: String, $statusId: EUpdateMachineStatus, $counterCheck: Boolean, $counters: [CounterArgs!]) {
  getMachine(args: $args) {
    update(price: $price, name: $name, description: $description, statusId: $statusId, counterCheck: $counterCheck, counters: $counters)
  }
}
`

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
export const RemoveMachine = gql`
query GetMachine($args: [MachineArgs!]!) {
  getMachine(args: $args) {
    remove
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
      status {
        id
        description
        name
      }
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
    status {
      id
      description
      name
    name
    }
    image
  }
}
`
export const UpdateBillboard = gql`
query GetBillboard($args: [BillboardArgs!]!, $title: String, $content: String, $description: String, $startAt: Int, $endAt: Int, $statusId: EUpdateBrandBillboardStatus, $image: String) {
  getBillboard(args: $args) {
    update(title: $title, content: $content, description: $description, startAt: $startAt, endAt: $endAt, statusId: $statusId, image: $image)
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
    status {
      id
      description
      name
    }
    notification {
      id
      title
      content
      type {
        id
        name
      }
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
    status {
      id
      description
      name
    }
    type {
      id
      description
      name
    }
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
    status {
      id
      description
      name
    }
    type {
      id
      description
      name
    }
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