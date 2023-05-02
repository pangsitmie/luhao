import { gql } from "@apollo/client";


export const STORE_PatchCommodity = gql`
mutation PatchCommodityForStorePrincipal(
    $commodityId: String!
    $name: String
    $price: Int
    $stock: Int
  ) {
    patchCommodityForStorePrincipal(
      commodityId: $commodityId
      name: $name
      price: $price
      stock: $stock
    )
  }  
`

export const STORE_CreateMachine = gql`
mutation CreateMachineForStorePrincipal(
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
  createMachineForStorePrincipal(
    name: $name
    storeId: $storeId
    code: $code
    counterCheck: $counterCheck
    counters: $counters
    nfc: $nfc
    price: $price
    description: $description
    onlyWallet: $onlyWallet
  )
}
`

export const STORE_UpdateStore = gql`
mutation UpdateStoreForStorePrincipal(
  $name: String!
  $location: UpdateStoreLocationArgs!
  $principal: UpdateStorePrincipalArgs!
  $storeId: String!
  $cover: String
  $intro: String
) {
  updateStoreForStorePrincipal(
    name: $name
    location: $location
    principal: $principal
    storeId: $storeId
    cover: $cover
    intro: $intro
  )
}
`

export const STORE_UpdateMachine = gql`
mutation UpdateMachineForStorePrincipal(
  $machineId: ID!
  $price: Int!
  $description: String
  $name: String
  $onlyWallet: Boolean
) {
  updateMachineForStorePrincipal(
    price: $price
    machineId: $machineId
    description: $description
    name: $name
    onlyWallet: $onlyWallet
  )
}
`

export const STORE_PatchMachine = gql`
mutation PatchMachineForStorePrincipal(
  $machineId: ID!
  $nfc: String
  $counters: [CounterArgs!]
  $counterCheck: Boolean
  $statusId: EUpdateMachineStatus
  $bonusGameId: ID
) {
  patchMachineForStorePrincipal(
    machineId: $machineId
    nfc: $nfc
    counters: $counters
    counterCheck: $counterCheck
    statusId: $statusId
    bonusGameId: $bonusGameId
  )
}
`

export const STORE_PatchStoreStatus = gql`
mutation PatchStoreStatusForStorePrincipal($storeId: ID!, $statusId: EUpdateStoreStatus!) {
  patchStoreStatusForStorePrincipal(storeId: $storeId, statusId: $statusId)
}
`

export const STORE_CreateBonusGame = gql`
mutation CreateBonusGameForStorePrincipal(
  $storeId: String!
  $type: EBonusGameType!
  $name: String!
  $startAt: Int!
  $maxCurrencyAmount: Int!
  $currencyRewards: [CreateBonusGameCurrencyReward!]!
  $endAt: Int
  $description: String
  $emptyRewards: [CreateBonusGameEmptyReward!]
) {
  createBonusGameForStorePrincipal(
    storeId: $storeId
    type: $type
    name: $name
    startAt: $startAt
    maxCurrencyAmount: $maxCurrencyAmount
    currencyRewards: $currencyRewards
    endAt: $endAt
    description: $description
    emptyRewards: $emptyRewards
  ) {
    id
  }
}
`

export const STORE_PatchBonusGame = gql`
mutation PatchBonusGameForStorePrincipal(
  $bonusGameId: ID!
  $name: String
  $description: String
) {
  patchBonusGameForStorePrincipal(
    bonusGameId: $bonusGameId
    name: $name
    description: $description
  ) {
    id
  }
}
`

export const STORE_PatchBonusGameStatus = gql`
mutation PatchBonusGameStatusForStorePrincipal(
  $bonusGameIds: [ID!]!
  $status: EUpdateBonusGameStatusForStorePrincipal!
) {
  patchBonusGameStatusForStorePrincipal(
    bonusGameIds: $bonusGameIds
    status: $status
  )
}
`
export const STORE_UpdateBonusGame = gql`
mutation UpdateBonusGameForStorePrincipal(
  $bonusGameId: ID!
  $storeId: ID!
  $typeId: EBonusGameType!
  $startAt: Int!
  $endAt: Int
  $maxCurrencyAmount: Int
) {
  updateBonusGameForStorePrincipal(
    bonusGameId: $bonusGameId
    storeId: $storeId
    typeId: $typeId
    startAt: $startAt
    endAt: $endAt
    maxCurrencyAmount: $maxCurrencyAmount
  )
}
`

export const STORE_BindCommodityToMachine = gql`
mutation BindCommodityToMachineForStorePrincipal(
  $machineId: ID!
  $commodityId: ID!
) {
  bindCommodityToMachineForStorePrincipal(
    machineId: $machineId
    commodityId: $commodityId
  )
}
`