import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
// THEME
import { tokens } from "../../theme";
import { Box, Typography, useTheme } from "@mui/material";


import SavingsIcon from '@mui/icons-material/Savings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';

import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import StatPercentBox from '../../components/StatPercentBox';


import { GetStoreStatistic, GetStoreStatisticPeriod } from '../../graphQL/Queries';
import { STORE_GetStoreInfo } from '../../graphQL/StorePrincipalQueries';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';
import { useTranslation } from 'react-i18next';

import "../../index.css";
import { currencyFormatter, getCurrentDate, getCurrentEpoch, getToday6amEpoch, getTodayEpoch, numberFormatter } from '../../utils/Utils';
import { StatisticPeriod, StatisticTotal } from '../../types/Statistic';

const StoreDashboard = () => {
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { t } = useTranslation();

    const [selectedItem, setSelectedItem] = useState({
        id: 0,
        entityName: ""
    });


    const { data } = useQuery(STORE_GetStoreInfo);
    useEffect(() => {
        if (data) {
            setName(data.getStorePrincipal.name);
            setSelectedItem({
                id: data.getStorePrincipal.stores[0].id,
                entityName: data.getStorePrincipal.stores[0].name
            });
        }
    }, [data]);


    const [name, setName] = useState("");
    const [startAtDate, setStartAtDate] = useState(getCurrentDate());
    useEffect(() => {
        setStartAtDateEpoch((new Date(startAtDate).getTime() / 1000) - 7200);
    }, [startAtDate]);

    const [endAtDate, setEndAtDate] = useState(getCurrentDate());
    useEffect(() => {
        if ((new Date(endAtDate).getTime() / 1000) === getTodayEpoch()) {
            setEndAtDateEpoch(getCurrentEpoch());
        } else {
            setEndAtDateEpoch(((new Date(endAtDate).getTime() / 1000) - 7201));
        }
    }, [endAtDate]);


    const [startAtDateEpoch, setStartAtDateEpoch] = useState(getToday6amEpoch());
    const [endAtDateEpoch, setEndAtDateEpoch] = useState(getCurrentEpoch());

    const [displayStatistic, setDisplayStatistic] = useState<StatisticTotal>({
        coinAmountTotal: 0,
        coinQuantityTotal: 0,
        giftAmountTotal: 0,
        giftQuantityTotal: 0,
        revenueRate: 0,
        giftRate: 0
    });
    const { loading: loadingStore, error: errorStore, data: dataStore } = useQuery(GetStoreStatistic, {
        variables: {
            args: [
                {
                    id: selectedItem.id,
                }
            ],
            startAt: startAtDateEpoch,
            endAt: endAtDateEpoch,
            timeGranularity: "day"
        },
        skip: !selectedItem.id // Skip the query if selectedItem.id is falsy
    });
    useEffect(() => {
        if (dataStore) {
            // console.log(dataStore.getStore[0].getStatisticsTotal)
            setDisplayStatistic(dataStore.getStore[0].getStatisticsTotal);
        }
    }, [dataStore]);

    // ================================ GRAPH ================================
    const [lineData, setLineData] = useState<StatisticPeriod[]>([]);

    const { loading: loadingStorePeriod, error: errorStorePeriod, data: dataStorePeriod } = useQuery(GetStoreStatisticPeriod, {
        variables: {
            args: [
                {
                    id: selectedItem.id,
                }
            ],
            timeGranularity: "hour",
            startAt: startAtDateEpoch,
            endAt: endAtDateEpoch
        },
        skip: !selectedItem.id // Skip the query if selectedItem.id is falsy
    });
    useEffect(() => {
        if (dataStorePeriod) {
            // console.log(dataStorePeriod.getStore[0].getStatisticsPeriod)
            setLineData(dataStorePeriod.getStore[0].getStatisticsPeriod);
        }
    }, [dataStorePeriod]);

    // ===================== GRAPH DATA =====================
    const finalData = [];

    const coinAmountTotal = [], giftAmountTotal = [];


    for (const item of lineData) {
        let x = item.timestamp.toString();

        x = new Date(item.timestamp * 1000).toLocaleString("default", {
            day: "numeric",
            month: "short",
            hour: "numeric",
        });
        coinAmountTotal.push({ x, y: item.coinAmountTotal });
        giftAmountTotal.push({ x, y: item.giftAmountTotal });
    }

    finalData.push({ id: t('total_earning'), color: "#219ebc", data: coinAmountTotal });
    finalData.push({ id: t('total_expense'), color: "#fb8500", data: giftAmountTotal });


    if (loadingStorePeriod) return <Loader />;
    if (errorStorePeriod) return <Error />;

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={t('dashboard')} subtitle={t('welcome_back') + name} />
            </Box>

            {/* FINANCE CHARTS */}
            <Box
                padding={"1rem"}
                borderRadius={"12px"}
                sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.074)",
                    border: "1px solid " + colors.grey[500],
                    webkitBackdropFilter: "blur(20px)",
                    backdropFilter: "blur(20px)",
                }}>

                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={"1rem"}>
                    <Typography variant="h4" sx={{ color: colors.grey[100], fontWeight: "500", m: "0 0 0 12px" }}>
                        {t('today_statistic')}
                    </Typography>
                </Box>

                {/* GRID & CHARTS */}
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap="20px"
                >
                    {/* ROW 1 */}
                    <Box
                        className='span3'
                        sx={{
                            background: "linear-gradient(135deg, #386641, #6a994e)",
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={currencyFormatter(displayStatistic.coinAmountTotal)}
                            subtitle={t('total_earning')}
                            icon={
                                <SavingsIcon
                                    sx={{ color: "#FFFFFF", fontSize: "45px" }}
                                />
                            }
                            textColor={"#FFFFFF"}
                        />
                    </Box>

                    <Box
                        className='span3'
                        sx={{
                            background: "linear-gradient(135deg, #921185, #A13796)",
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={currencyFormatter(displayStatistic.coinQuantityTotal)}
                            subtitle={t('total_coin')}
                            icon={
                                <MonetizationOnIcon
                                    sx={{ color: "#FFFFFF", fontSize: "45px" }}
                                />
                            }
                            textColor={"#FFFFFF"}
                        />
                    </Box>

                    <Box
                        className='span3'
                        sx={{
                            background: "linear-gradient(135deg, #F78C1C, #f7ba2c)",
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={currencyFormatter(displayStatistic.giftAmountTotal)}
                            subtitle={t('total_expense')}
                            icon={
                                <ReceiptIcon
                                    sx={{ color: "#FFFFFF", fontSize: "45px" }}
                                />
                            }
                            textColor={"#FFFFFF"}
                        />
                    </Box>

                    <Box
                        className='span3'
                        sx={{
                            background: "linear-gradient(135deg, #4281B7, #4697E7)",
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={numberFormatter(displayStatistic.giftQuantityTotal)}
                            subtitle={t('total_prize')}
                            icon={
                                <InventoryIcon
                                    sx={{ color: "#FFFFFF", fontSize: "45px" }}
                                />
                            }
                            textColor={"#FFFFFF"}
                        />
                    </Box>


                    {/* ROW 2 */}
                    <Box
                        // formula: (revenue-expense) / revenue
                        className='span6'
                        sx={{
                            backgroundColor: colors.primary[400],
                            border: "1px solid " + colors.grey[300],
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatPercentBox
                            title={(!isNaN(displayStatistic.giftAmountTotal) && displayStatistic.coinAmountTotal !== 0) ?
                                ((displayStatistic.giftAmountTotal / (displayStatistic.coinAmountTotal) * 100).toFixed(2) + "%")
                                : "0%"}
                            subtitle={t('expense_rate')}
                            progress={(displayStatistic.giftAmountTotal / displayStatistic.coinAmountTotal).toFixed(2)}
                        />
                    </Box>
                    <Box
                        // formula: (gift count) / total coin inserted
                        className='span6'
                        sx={{
                            backgroundColor: colors.primary[400],
                            border: "1px solid " + colors.grey[300],
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatPercentBox
                            title={(!isNaN(displayStatistic.coinQuantityTotal) && displayStatistic.coinQuantityTotal !== 0) ?
                                ((displayStatistic.giftQuantityTotal / (displayStatistic.coinQuantityTotal) * 100).toFixed(2) + "%")
                                : "0%"}
                            subtitle={t('prize_rate')}
                            progress={((displayStatistic.giftQuantityTotal / (displayStatistic.coinQuantityTotal)).toFixed(2))}
                        />
                    </Box>

                </Box>
            </Box>

            {/* GRAPH */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
                mt="20px"
            >
                {/* ROW 2 */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    borderRadius={"12px"}
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.074)",
                        border: "1px solid rgba(255, 255, 255, 0.222)",
                        webkitBackdropFilter: "blur(20px)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    <Box
                        mt="25px"
                        p="0 30px"
                        display="flex "
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                color={colors.grey[100]}
                            >
                                {t('total_today_earning')}
                            </Typography>
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                color={colors.primary[100]}
                            >
                                {currencyFormatter(displayStatistic.coinAmountTotal)}
                            </Typography>
                        </Box>
                    </Box>
                    <Box height="250px" m="-20px 20px 0 0">
                        <LineChart isDashboard={true} data={finalData} />
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default StoreDashboard
