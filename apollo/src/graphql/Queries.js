import { gql } from "@apollo/client";

export const GetStoresByCoordinate = gql`
query GetStoresByCoordinate($coordinate: CoordinateInput!) {
    getStoresByCoordinate(coordinate: $coordinate) {
      id
      name
      lineUrl
      cover
      intro
      email
      brandId
    }
  }
`