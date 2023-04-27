import { gql } from "@apollo/client";


export const BRAND_CreateCurrencyReward = gql`
mutation BrandCreateCurrencyReward($belongToRole: EBrandRewardBelongToRole!, $belongToId: ID!, $amount: Int!, $currencyId: String!, $sourceType: EBrandCreateRewardSourceType!, $startAt: Int!, $receiveDaysOverdue: Int, $description: String, $endAt: Int, $limit: Int, $comment: String!, $notification: ManagerCreateNotificationField!, $triggerAt: Int) {
    brandCreateCurrencyReward(belongToRole: $belongToRole, belongToId: $belongToId, amount: $amount, currencyId: $currencyId, sourceType: $sourceType, startAt: $startAt, receiveDaysOverdue: $receiveDaysOverdue, description: $description, endAt: $endAt, limit: $limit) {
      managerCreateNotificationScheduleToAllMember(comment: $comment, notification: $notification, triggerAt: $triggerAt)
    }
  }
`
export const BRAND_CreateMachine = gql`
mutation CreateMachineForBrandPrincipal(
  $name: String!
  $storeId: ID!
  $code: String!
  $counterCheck: Boolean
  $counters: [CounterArgs!]
  $nfc: String
  $price: Int
  $description: String
  $onlyWallet: Boolean
) {
  createMachineForBrandPrincipal(
    name: $name
    storeId: $storeId
    code: $code
    counterCheck: $counterCheck
    counters: $counters
    nfc: $nfc
    price: $price
    description: $description
    onlyWallet: $onlyWallet
  ) {
    id
  }
}
`
export const BRAND_PatchBillboard = gql`
mutation PatchBrandBillboardForBrandPrincipal(
  $billboardId: ID!
  $title: String
  $content: String
  $description: String
  $image: String
  $startAt: Int
  $endAt: Int
  $statusId: EUpdateBrandBillboardStatus
) {
  patchBrandBillboardForBrandPrincipal(
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
export const BRAND_PatchMachine = gql`
mutation PatchMachineForBrandPrincipal(
  $machineId: ID!
  $name: String
  $description: String
  $nfc: String
  $statusId: EUpdateMachineStatus
  $counters: [CounterArgs!]
  $counterCheck: Boolean
  $price: Int
  $onlyWallet: Boolean
) {
  patchMachineForBrandPrincipal(
    machineId: $machineId
    name: $name
    description: $description
    nfc: $nfc
    statusId: $statusId
    counters: $counters
    counterCheck: $counterCheck
    price: $price
    onlyWallet: $onlyWallet
  )
}
`
export const BRAND_PatchCommodity = gql`
mutation PatchCommodityForBrandPrincipal(
  $commodityId: String!
  $name: String
  $price: Int
  $stock: Int
) {
  patchCommodityForBrandPrincipal(
    commodityId: $commodityId
    name: $name
    price: $price
    stock: $stock
  )
}
`
export const BRAND_PatchStore = gql`
mutation PatchStoreForBrandPrincipal(
  $storeId: String!
  $name: String
  $intro: String
  $cover: String
  $principal: PatchStorePrincipalArgs
  $location: PatchStoreLocationArgs
) {
  patchStoreForBrandPrincipal(
    storeId: $storeId
    principal: $principal
    location: $location
    intro: $intro
    cover: $cover
    name: $name
  )
}
`
export const BRAND_BindCommodity = gql`
mutation BindCommodityToMachineForBrandPrincipal(
  $machineId: ID!
  $commodityId: ID!
) {
  bindCommodityToMachineForBrandPrincipal(
    machineId: $machineId
    commodityId: $commodityId
  )
}
`
export const BRAND_CreateGiftCode = gql`
mutation BrandPrincipalCreateGiftCode(
  $name: String!
  $code: String!
  $coinAmount: Int!
  $limit: Int
  $description: String
  $receiveDaysOverdue: Int
  $startAt: Int
  $endAt: Int
) {
  brandPrincipalCreateGiftCode(
    name: $name
    code: $code
    coinAmount: $coinAmount
    limit: $limit
    description: $description
    receiveDaysOverdue: $receiveDaysOverdue
    startAt: $startAt
    endAt: $endAt
  )
}
`