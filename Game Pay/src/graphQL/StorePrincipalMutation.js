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
) {
  updateMachineForStorePrincipal(
    price: $price
    machineId: $machineId
    description: $description
    name: $name
  )
}
`

export const STORE_PatchMachine = gql`
mutation PatchMachineForStorePrincipal(
  $machineId: ID!
  $statusId: EUpdateMachineStatus
  $nfc: String
  $counters: [CounterArgs!]
  $counterCheck: Boolean
) {
  patchMachineForStorePrincipal(
    machineId: $machineId
    statusId: $statusId
    nfc: $nfc
    counters: $counters
    counterCheck: $counterCheck
  )
}
`

export const STORE_PatchStoreStatus = gql`
mutation PatchStoreStatusForPrincipal(
  $storeId: ID!
  $statusId: EUpdateStoreStatus!
) {
  patchStoreStatusForPrincipal(storeId: $storeId, statusId: $statusId)
}
`