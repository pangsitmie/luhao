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
  $currencyName: String
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
    currencyName: $currencyName
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
  $price: Float
  $nfc: String
  $counters: [CounterArgs!]
  $counterCheck: Boolean
) {
  patchMachineForManager(
    machineId: $machineId
    name: $name
    statusId: $statusId
    description: $description
    price: $price
    nfc: $nfc
    counters: $counters
    counterCheck: $counterCheck
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