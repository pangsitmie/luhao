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