import { gql } from "@apollo/client";


export const BRAND_CreateCurrencyReward = gql`
mutation BrandCreateCurrencyReward($belongToRole: EBrandRewardBelongToRole!, $belongToId: ID!, $amount: Int!, $currencyId: String!, $sourceType: EBrandCreateRewardSourceType!, $startAt: Int!, $receiveDaysOverdue: Int, $description: String, $endAt: Int, $limit: Int, $comment: String!, $notification: ManagerCreateNotificationField!, $triggerAt: Int) {
    brandCreateCurrencyReward(belongToRole: $belongToRole, belongToId: $belongToId, amount: $amount, currencyId: $currencyId, sourceType: $sourceType, startAt: $startAt, receiveDaysOverdue: $receiveDaysOverdue, description: $description, endAt: $endAt, limit: $limit) {
      managerCreateNotificationScheduleToAllMember(comment: $comment, notification: $notification, triggerAt: $triggerAt)
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
  $price: Float
  $description: String
  $nfc: String
  $statusId: EUpdateMachineStatus
  $counters: [CounterArgs!]
  $counterCheck: Boolean
) {
  patchMachineForBrandPrincipal(
    machineId: $machineId
    name: $name
    price: $price
    description: $description
    nfc: $nfc
    statusId: $statusId
    counters: $counters
    counterCheck: $counterCheck
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