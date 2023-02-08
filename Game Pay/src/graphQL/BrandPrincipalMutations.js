import { gql } from "@apollo/client";


export const BRAND_CreateCurrencyReward = gql`
mutation BrandCreateCurrencyReward($belongToRole: EBrandRewardBelongToRole!, $belongToId: ID!, $amount: Int!, $currencyId: String!, $sourceType: EBrandCreateRewardSourceType!, $startAt: Int!, $receiveDaysOverdue: Int, $description: String, $endAt: Int, $limit: Int, $comment: String!, $notification: ManagerCreateNotificationField!, $triggerAt: Int) {
    brandCreateCurrencyReward(belongToRole: $belongToRole, belongToId: $belongToId, amount: $amount, currencyId: $currencyId, sourceType: $sourceType, startAt: $startAt, receiveDaysOverdue: $receiveDaysOverdue, description: $description, endAt: $endAt, limit: $limit) {
      managerCreateNotificationScheduleToAllMember(comment: $comment, notification: $notification, triggerAt: $triggerAt)
    }
  }
`