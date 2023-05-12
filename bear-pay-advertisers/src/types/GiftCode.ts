import { RewardType } from "./Notification"

export type GiftCodeType = {
    id: string
    name: string
    code: string
    reward: RewardType,
    status: string
    description: string
}