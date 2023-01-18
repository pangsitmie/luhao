import { gql } from "@apollo/client";

export const Login = gql`
mutation Login($phone: PhoneInput!, $password: String!, $deviceCode: String!, $firebaseToken: String!) {
    login(phone: $phone, password: $password, deviceCode: $deviceCode, firebaseToken: $firebaseToken){
        
    }
  }
`