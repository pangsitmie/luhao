export type AdvertiserType = {
    id: string;
    name: string;
    account: string;
    password: string;
    statusId: string;
    principalName: string;
    principalPhone: string;

    //only for update
    principalPhoneNumber?: string;
};

