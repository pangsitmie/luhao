export type Machine = {
    id: string;
    name: string;
    status: string;
    code: string;
    uuid: string;
    qrCode: string;
    nfc: string;
    counterCheck: boolean;
    favorite: boolean;
    connStatus: boolean;
    counters: {
        id: string;
        name: string;
    };
};

export type Counter = {
    counterType: string;
    count: number;
}
