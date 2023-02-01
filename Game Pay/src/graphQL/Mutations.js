import { gql } from "@apollo/client";

export const ManagerLogin = gql`
mutation ManagerLogin($account: String!, $password: String!) {
  managerLogin(account: $account, password: $password)
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

// COINS
export const ManagerCreateCurrencyReward = gql`
mutation ManagerCreateCurrencyReward($currencyId: String!, $sourceType: EManagerCreateRewardSourceType!, $startAt: Int!, $limit: Int, $description: String, $endAt: Int, $comment: String!, $notification: ManagerCreateNotificationField!, $triggerAt: Int, $receiveDaysOverdue: Int!, $amount: Int!, $belongToId: ID!, $belongToRole: EManagerRewardBelongToRole!) {
  managerCreateCurrencyReward(currencyId: $currencyId, sourceType: $sourceType, startAt: $startAt, limit: $limit, description: $description, endAt: $endAt, receiveDaysOverdue: $receiveDaysOverdue, amount: $amount, belongToId: $belongToId, belongToRole: $belongToRole) {
    id
    managerCreateNotificationScheduleToAllMember(comment: $comment, notification: $notification, triggerAt: $triggerAt)
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