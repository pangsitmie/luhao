export type NotificationSchedulesType = {
    id: string,
    notification: NotificationType,
    triggerAt: number,
    comments: string,
}


export type NotificationType = {
    id: string,
    type: string,
    title: string,
    expireAt: number,
    status: string,
    content: string,
}