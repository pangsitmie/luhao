import React, { useEffect, useState, useContext } from 'react'
import { useQuery } from '@apollo/client'

import "../../index.css";
import { GetBrandStatistic, GetBrandStatisticPeriod, GetStoreListByBrand, GetStoreStatistic } from '../../graphQL/Queries'
import { BRAND_GetBrandInfo } from 'src/graphQL/BrandPrincipalQueries';

// THEME
import { ColorModeContext, tokens } from "../../theme";
import { Box, Typography, useTheme } from "@mui/material";
import * as yup from "yup";


import SavingsIcon from '@mui/icons-material/Savings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';


import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import StatPercentBox from 'src/components/StatPercentBox';


import Loader from 'src/components/loader/Loader';
import Error from 'src/components/error/Error';

import { useTranslation } from 'react-i18next';

const BrandDashboard = () => {
    const { t } = useTranslation();

    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [selectedItem, setSelectedItem] = useState({
        id: 0,
        entityName: ""
    });

    // GET BRAND INFO
    const { loading, error, data } = useQuery(BRAND_GetBrandInfo);
    useEffect(() => {
        if (data) {
            setName(data.getBrandPrincipal.name);
            setSelectedItem({
                id: data.getBrandPrincipal.brands[0].id,
                entityName: data.getBrandPrincipal.brands[0].id
            });
        }
    }, [data]);


    const [name, setName] = useState("");
    const [startAtDate, setStartAtDate] = useState(getCurrentDate());
    useEffect(() => {
        setStartAtDateEpoch((new Date(startAtDate).getTime() / 1000) - 7200);
    }, [startAtDate]);
    function handleStartAtDateChange(event) {
        setStartAtDate(event.target.value);
    }

    const [endAtDate, setEndAtDate] = useState(getCurrentDate());
    useEffect(() => {
        if ((new Date(endAtDate).getTime() / 1000) === getTodayEpoch()) {
            setEndAtDateEpoch(getCurrentEpoch());
        } else {
            setEndAtDateEpoch(((new Date(endAtDate).getTime() / 1000) - 7201));
        }
    }, [endAtDate]);
    function handleEndAtDateChange(event) {
        setEndAtDate(event.target.value);
    }

    const [startAtDateEpoch, setStartAtDateEpoch] = useState(getCurrentDate());
    const [endAtDateEpoch, setEndAtDateEpoch] = useState(getCurrentEpoch());

    const [displayStatistic, setDisplayStatistic] = useState({});
    const { loading: loadingBrand, error: errorBrand, data: dataBrand } = useQuery(GetBrandStatistic, {
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
        if (dataBrand) {
            setDisplayStatistic(dataBrand.getBrand[0].getStatisticsTotal);
        }
    }, [dataBrand]);




    // ================================ GRAPH ================================
    const [lineData, setLineData] = useState([]);

    const { loading: loadingBrandPeriod, error: errorBrandPeriod, data: dataBrandPeriod } = useQuery(GetBrandStatisticPeriod, {
        variables: {
            args: [
                {
                    id: selectedItem.id
                }
            ],
            timeGranularity: "hour",
            startAt: startAtDateEpoch,
            endAt: endAtDateEpoch
        },
        skip: !selectedItem.id // Skip the query if selectedItem.id is falsy
    });
    useEffect(() => {
        if (dataBrandPeriod) {
            setLineData(dataBrandPeriod.getBrand[0].getStatisticsPeriod);
        }
    }, [dataBrandPeriod]);

    // ===================== GRAPH DATA =====================
    const finalData = [];

    const coinAmountTotal = [], giftAmountTotal = [];


    for (const item of lineData) {
        let x = item.timestamp;

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



    if (loadingBrand, loadingBrandPeriod) return <Loader />;
    if (errorBrand, errorBrandPeriod) return <Error />;

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
                                    sx={{ color: colors.primary[100], fontSize: "45px" }}
                                />
                            }
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
                                    sx={{ color: colors.primary[100], fontSize: "45px" }}
                                />
                            }
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
                                    sx={{ color: colors.primary[100], fontSize: "45px" }}
                                />
                            }
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
                                    sx={{ color: colors.primary[100], fontSize: "45px" }}
                                />
                            }
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
                            // title={((displayStatistic.giftAmountTotal / displayStatistic.coinAmountTotal * 100).toFixed(2) + "%")}
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

export default BrandDashboard

const defaultOptions = {
    significantDigits: '0',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    symbol: 'NT'
}

const currencyFormatter = (value, options) => {
    if (typeof value !== 'number') value = 0.0
    options = { ...defaultOptions, ...options }
    value = value.toFixed(options.significantDigits)

    const [currency, decimal] = value.split('.')
    return `${options.symbol} ${currency.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        options.thousandsSeparator
    )}`
}

const numberFormatter = (value, options) => {
    if (typeof value !== 'number') value = 0.0
    options = { ...defaultOptions, ...options }
    value = value.toFixed(options.significantDigits)

    const [number] = value.split('.')
    return `${number.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        options.thousandsSeparator
    )}`
}

const getCurrentDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)


    return `${year}-${month}-${day}`
}

const getTodayEpoch = () => {
    return (new Date(getCurrentDate()).getTime() / 1000);
}
const getCurrentEpoch = () => {
    return Math.floor(new Date().getTime() / 1000);
}


