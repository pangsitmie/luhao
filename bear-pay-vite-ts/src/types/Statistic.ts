export type StatisticTotal = {
    coinAmountTotal: number;
    coinQuantityTotal: number;
    giftAmountTotal: number;
    giftQuantityTotal: number;
    revenueRate: number;
    giftRate: number;
    exchange100AmountTotal: number;
    exchange100QuantityTotal: number;
    exchange50AmountTotal: number;
    exchange50QuantityTotal: number;
};

export type StatisticPeriod = {
    timestamp: number;
    coinAmountTotal: number;
    coinQuantityTotal: number;
    giftAmountTotal: number;
    giftQuantityTotal: number;
};

export type MachineStatisticTotal = {
    id: string;
    name: string;
    coinAmountTotal: number;
    coinQuantityTotal: number;
    giftAmountTotal: number;
    giftQuantityTotal: number;
    revenueRate: number;
    giftRate: number;
    earning: number;
    coinDetail: CoinDetail;
    giftDetail: GiftDetail;

    //this is only for rendering UI purpose
    isBlueHighlighted?: boolean;
    isRedHighlighted?: boolean;
};
export type MachineStatisticPeriodType = {
    timestamp: number;
    coinAmountTotal: number;
    coinQuantityTotal: number;
    giftAmountTotal: number;
    giftQuantityTotal: number;
    revenueRate: number;
    giftRate: number;
    earning: number;
    coinDetail: CoinDetail;
    giftDetail: GiftDetail;
};
export type ConnRecords = {
    timestamp: number;
    connStatus: boolean;
};
type CoinDetail = {
    combineAmount: number;
    combineQuantity: number;
    immediateAmount: number;
    immediateQuantity: number;
    offlineAmount: number;
    offlineQuantity: number;
    onlineCoinAmount: number;
    onlineCoinQuantity: number;
    onlineFreeAmount: number;
    onlineFreeQuantity: number;
};

type GiftDetail = {
    combineAmount: number;
    combineQuantity: number;
    immediateAmount: number;
    immediateQuantity: number;
    offlineAmount: number;
    offlineQuantity: number;
    onlineCoinAmount: number;
    onlineCoinQuantity: number;
    onlineFreeAmount: number;
    onlineFreeQuantity: number;
};
