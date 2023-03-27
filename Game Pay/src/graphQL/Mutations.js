import { gql } from "@apollo/client";

export const ManagerLogin = gql`
mutation ManagerLogin($account: String!, $password: String!) {
  managerLogin(account: $account, password: $password)
}
`

export const BrandLogin = gql`
mutation BrandPrincipalWebLogin($phone: PhoneInput!, $password: String!) {
  brandPrincipalWebLogin(phone: $phone, password: $password)
}
`
export const StoreLogin = gql`
mutation StorePrincipalWebLogin($account: String!, $password: String!) {
  storePrincipalWebLogin(account: $account, password: $password)
}
`

export const SendVerificationCode = gql`
mutation SendVerificationCode($phone: PhoneInput!, $type: EVerificationCodeType!) {
  sendVerificationCode(phone: $phone, type: $type) 
}
`

// Brands
export const CreateBrand = gql`
mutation CreateBrand($name: String!, $vatNumber: String!, $principal: CreateBrandPrincipalArgs!, $intro: String, $currencyName: String, $cover: String, $logo: String) {
  createBrand(name: $name, vatNumber: $vatNumber, principal: $principal, intro: $intro, currencyName: $currencyName, cover: $cover, logo: $logo)
}
`
export const PatchBrand = gql`
mutation PatchBrandForManager(
  $brandId: ID!
  $name: String
  $vatNumber: String
  $cover: String
  $intro: String
  $logo: String
  $principal: PatchBrandPrincipalArgs
  $statusId: EUpdateBrandStatus
) {
  patchBrandForManager(
    brandId: $brandId
    name: $name
    vatNumber: $vatNumber
    cover: $cover
    intro: $intro
    logo: $logo
    principal: $principal
    statusId: $statusId
  )
}
`
export const PatchMachine = gql`
mutation PatchMachineForManager(
  $machineId: ID!
  $name: String
  $statusId: EUpdateMachineStatus
  $description: String
  $nfc: String
  $counters: [CounterArgs!]
  $counterCheck: Boolean
  $price: Int
) {
  patchMachineForManager(
    machineId: $machineId
    name: $name
    statusId: $statusId
    description: $description
    nfc: $nfc
    counters: $counters
    counterCheck: $counterCheck
    price: $price
  )
}
`
// COINS
export const ManagerCreateCurrencyReward = gql`
mutation ManagerCreateCurrencyReward(
  $currencyId: String!
  $sourceType: EManagerCreateRewardSourceType!
  $startAt: Int!
  $limit: Int
  $description: String
  $endAt: Int
  $comment: String!
  $notification: ManagerCreateNotificationField!
  $triggerAt: Int
  $receiveDaysOverdue: Int!
  $amount: Int!
  $belongToId: ID!
  $belongToRole: EManagerRewardBelongToRole!
) {
  managerCreateCurrencyReward(
    currencyId: $currencyId
    sourceType: $sourceType
    startAt: $startAt
    limit: $limit
    description: $description
    endAt: $endAt
    receiveDaysOverdue: $receiveDaysOverdue
    amount: $amount
    belongToId: $belongToId
    belongToRole: $belongToRole
  ) {
    id
    managerCreateNotificationScheduleToAllMember(
      comment: $comment
      notification: $notification
      triggerAt: $triggerAt
    )
  }
}
`
export const CreateMachineForManager = gql`
mutation CreateMachineForManager(
  $name: String!
  $storeId: ID!
  $code: String!
  $counterCheck: Boolean
  $counters: [CounterArgs!]
  $nfc: String
  $price: Int
  $description: String
) {
  createMachineForManager(
    name: $name
    storeId: $storeId
    code: $code
    counterCheck: $counterCheck
    counters: $counters
    nfc: $nfc
    price: $price
    description: $description
  ) {
    id
  }
}
`

export const PatchMachineFavorite = gql`
mutation PatchMachineFavorite($machineId: ID!, $favorite: Boolean!) {
  patchMachineFavorite(machineId: $machineId, favorite: $favorite)
}
`
// ADS
export const CreateAdvertisement = gql`
mutation CreateAdvertisement($typeId: EAdvertisementType!, $image: String!, $url: String!, $startAt: Int!, $description: String, $endAt: Int) {
  createAdvertisement(typeId: $typeId, image: $image, url: $url, startAt: $startAt, description: $description, endAt: $endAt)
}
`
// NOTIFICATION
export const CreateSystemNotification = gql`
mutation ManagerSetNotificationScheduleToAllMember($comment: String!, $notification: ManagerCreateNotification!, $triggerAt: Int) {
  managerSetNotificationScheduleToAllMember(comment: $comment, notification: $notification, triggerAt: $triggerAt)
}
`

// UPLOAD LOGO, COVER, IMAGE
export const UploadBrandLogo = gql`
mutation GenBrandLogoUploadURI($mimetype: String!, $fileSize: Int!) {
  genBrandLogoUploadURI(mimetype: $mimetype, fileSize: $fileSize)
}
`
export const UploadBrandCover = gql`
mutation GenBrandCoverUploadURI($mimetype: String!, $fileSize: Int!) {
  genBrandCoverUploadURI(mimetype: $mimetype, fileSize: $fileSize)
}
`
export const UploadStoreCover = gql`
mutation GenStoreCoverUploadURI($mimetype: String!, $fileSize: Int!) {
  genStoreCoverUploadURI(mimetype: $mimetype, fileSize: $fileSize)
}
`
export const PatchBillboard = gql`
mutation PatchBrandBillboardForManager(
  $billboardId: ID!
  $title: String
  $content: String
  $description: String
  $image: String
  $startAt: Int
  $endAt: Int
  $statusId: EUpdateBrandBillboardStatus
) {
  patchBrandBillboardForManager(
    billboardId: $billboardId
    title: $title
    content: $content
    description: $description
    image: $image
    startAt: $startAt
    endAt: $endAt
    statusId: $statusId
  )
}

`
export const UploadBillboardImage = gql`
mutation GenBillboardImageUploadURI($mimetype: String!, $fileSize: Int!) {
  genBillboardImageUploadURI(mimetype: $mimetype, fileSize: $fileSize)
}
`
export const UploadAdsImage = gql`
mutation GenAdvertisementImageUploadURI($mimetype: String!, $fileSize: Int!) {
  genAdvertisementImageUploadURI(mimetype: $mimetype, fileSize: $fileSize)
}
`
//version
export const UpdateGamePayVersion = gql`
mutation UpdateCurrentAppVersion($clientName: EAppClient!, $android: String, $ios: String) {
  updateCurrentAppVersion(clientName: $clientName, android: $android, ios: $ios) {
    server
    ios
    android
  }
}
`


export const CreteStorePhysicalReward = gql`
mutation ManagerCreateCurrencyReward(
  $belongToRole: EManagerRewardBelongToRole!
  $belongToId: ID!
  $receiveDaysOverdue: Int
  $amount: Int!
  $currencyId: String!
  $description: String
  $endAt: Int
  $limit: Int
  $sourceType: EManagerCreateRewardSourceType!
  $startAt: Int!
) {
  managerCreateCurrencyReward(
    belongToRole: $belongToRole
    belongToId: $belongToId
    receiveDaysOverdue: $receiveDaysOverdue
    amount: $amount
    currencyId: $currencyId
    description: $description
    endAt: $endAt
    limit: $limit
    sourceType: $sourceType
    startAt: $startAt
  ) {
    id
  }
}
`
// commodity
export const bindCommodityToMachine = gql`
mutation BindCommodityToMachineForManager($machineId: ID!, $commodityId: ID!) {
  bindCommodityToMachineForManager(
    machineId: $machineId
    commodityId: $commodityId
  )
}
`

// deposit
export const CreateDepositItem = gql`
mutation CreateDepositItem(
  $type: EDepositItemType!
  $name: String!
  $price: Int!
  $walletValue: Int!
  $description: String
  $startAt: Int
  $endAt: Int
  $maxPurchaseNum: Int
  $reward: DepositRewardArgs
) {
  createDepositItem(
    type: $type
    name: $name
    price: $price
    walletValue: $walletValue
    description: $description
    startAt: $startAt
    endAt: $endAt
    maxPurchaseNum: $maxPurchaseNum
    reward: $reward
  )
}
`

export const PatchCommodity = gql`
mutation PatchCommodityForManager(
  $commodityId: String!
  $name: String
  $price: Int
  $stock: Int
) {
  patchCommodityForManager(
    commodityId: $commodityId
    name: $name
    price: $price
    stock: $stock
  )
}
`

export const AcceptReview = gql`
mutation AcceptReview($reviewId: ID!) {
  acceptReview(reviewId: $reviewId)
}
`

export const RejectReview = gql`
mutation RejectReview($reviewId: ID!, $reason: String!) {
  rejectReview(reviewId: $reviewId, reason: $reason)
}
`