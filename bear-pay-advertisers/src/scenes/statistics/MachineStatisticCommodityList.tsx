import { Box, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { currencyFormatter } from '../../utils/Utils';
import { useEffect, useMemo } from 'react';
import { CommodityHistoriesType } from '../../types/Statistic';
import { tokens } from '../../theme';



type Props = {
    commodityHistories: CommodityHistoriesType[];
    collapsed: Boolean;
}

const MachineStatisticCommodityHistories = ({ commodityHistories, collapsed }: Props) => {
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { t } = useTranslation();

    console.log("ORIGINAL");
    console.log(commodityHistories);

    const filteredByCounterType = useMemo(() => {
        const filtered: CommodityHistoriesType[] = commodityHistories.filter((item: CommodityHistoriesType) => item.counterType === 2);

        return filtered;
    }, [commodityHistories]);


    const handleDuplicateUpdatedAt = (arr: CommodityHistoriesType[]) => {
        const merged: CommodityHistoriesType[] = [];

        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            const found = merged.find((i: CommodityHistoriesType) => i.updatedAt === item.updatedAt);

            if (!found) {
                merged.push(item);
            } else {
                found.quantity += item.quantity;
                found.amount += item.amount;
                arr.splice(i, 1);
                i--;
            }
        }

        return merged.concat(arr);
    }




    useEffect(() => {
        if (filteredByCounterType) {
            handleDuplicateUpdatedAt(filteredByCounterType);
            console.log("mergedItems");
            console.log(filteredByCounterType);
        }
    }, [filteredByCounterType]);



    return (
        <Box >
            {/* this is for what inside the dropwodn button */}
            {!collapsed && filteredByCounterType.length > 0 && (
                <Box
                    sx={{
                        backgroundColor: colors.blueAccent[900],
                        borderRadius: "8px",
                        padding: "1rem",
                    }}>
                    <Box display={"flex"} alignItems={"center"} gap={"1rem"} justifyContent={"space-between"} borderBottom={"2px solid #cecece"} my={".5rem"}>
                        <Typography variant="h5" sx={{ width: "20%" }}>{`${t('commodity')}${t('name')}`}</Typography>
                        <Typography variant="h6" sx={{ width: "20%" }}>{`${t('commodity')}${t('price')}`}</Typography>
                        <Typography variant="h6" sx={{ width: "20%" }}>{`${t('gift')}${t('quantity')}`}</Typography>
                        <Typography variant="h6" sx={{ width: "20%" }}>{t('total_expense_value')}</Typography>
                        <Typography variant="h6" sx={{ width: "20%" }}>{t('commodity_update_time')}</Typography>
                    </Box>

                    {filteredByCounterType.map((item: any, index: number) => (
                        <Box key={index} borderBottom={index === filteredByCounterType.length - 1 ? "none" : "0.5px solid #cecece"}>
                            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                <Typography variant="h6" sx={{ width: "20%" }}>{item.commodityName}</Typography>
                                <Typography variant="h6" sx={{ width: "20%" }}>{currencyFormatter(item.commodityPrice)}</Typography>
                                <Typography variant="h6" sx={{ width: "20%" }}>{item.quantity}x</Typography>
                                <Typography variant="h6" sx={{ width: "20%" }}>{item.amount}</Typography>
                                <Typography variant="h6" sx={{ width: "20%" }}>{new Date(item.updatedAt * 1000).toLocaleString()}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    )
}

export default MachineStatisticCommodityHistories