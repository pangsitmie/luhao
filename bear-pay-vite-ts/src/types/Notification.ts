export type NotificationSchedulesType = {
    id: string,
    notification: NotificationType,
    triggerAt: number,
    // comments: string,
    comment: string,
}


export type NotificationType = {
    id: string,
    type: string,
    title: string,
    expireAt: number,
    status: string,
    content: string,
    reward: RewardType,
}
export type RewardType = {
    id: string,
    limit: number,
    receiveDaysOverdue: number,
    description: string,
    status: string,
    startAt: number,
    endAt: number,
    belongToId: string,
    belongToRole: string,
    content: {
        id: string,
        currency: CurrencyType,
        amount: number,
    }
}
export type CurrencyType = {
    id: string,
    name: string,
    type: string,
}