import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { tokens } from '../../theme';
import { useState } from 'react';


type Props = {
    commodityRecords: any[];
    collapsed: Boolean;
}

const MachineStatisticCommodityList = ({ commodityRecords, collapsed }: Props) => {
    const { t } = useTranslation();
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    return (
        <>
            {/* this is for what inside the dropwodn button */}
            {!collapsed && commodityRecords && (
                <Box>
                    <Box display={"flex"} alignItems={"center"} gap={"1rem"} justifyContent={"space-between"} borderBottom={"2px solid #cecece"} my={".5rem"}>
                        <Typography variant="h5" sx={{ width: "20%" }}>{t('name')}</Typography>
                        <Typography variant="h6" sx={{ width: "20%" }}>{t('price')}</Typography>
                        <Typography variant="h6" sx={{ width: "20%" }}>{t('quantity')}</Typography>
                        <Typography variant="h6" sx={{ width: "20%" }}>{t('total')}</Typography>
                        <Typography variant="h6" sx={{ width: "20%" }}>{t('date')}</Typography>
                    </Box>

                    {commodityRecords.map((commodityRecord: any, index: number) => (
                        <Box key={index} borderBottom={index === commodityRecords.length - 1 ? "none" : "0.5px solid #cecece"}>
                            <Box display={"flex"} alignItems={"center"} gap={"12px"} justifyContent={"space-between"}>
                                <Typography variant="h6" sx={{ width: "20%" }}>{commodityRecord.name}</Typography>
                                <Typography variant="h6" sx={{ width: "20%" }}>{commodityRecord.price}</Typography>
                                <Typography variant="h6" sx={{ width: "20%" }}>{commodityRecord.quantity}x</Typography>
                                <Typography variant="h6" sx={{ width: "20%" }}>{commodityRecord.total}</Typography>
                                <Typography variant="h6" sx={{ width: "20%" }}>{commodityRecord.date}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </>
    )
}

export default MachineStatisticCommodityList