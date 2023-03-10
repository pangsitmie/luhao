import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useQuery, gql, useLazyQuery } from '@apollo/client'
import { format } from 'date-fns';

// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, IconButton, useTheme, InputBase, TextField, InputAdornment } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";

import { GetBrandStatistic, GetStoreListByBrand, GetStoreStatistic } from '../../graphQL/Queries'

import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';

import SavingsIcon from '@mui/icons-material/Savings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import GroupIcon from '@mui/icons-material/Group';

import StatBox from "../../components/StatBox";
import StatPercentBox from '../../components/StatPercentBox';
import Header from '../../components/Header';
import StatBoxSplit from '../../components/StatBoxSplit';
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from 'react-i18next';
const StatisticManagement = () => {
    const { entityName } = useSelector((state) => state.entity);
    const { t } = useTranslation();

    const location = useLocation();
    const state = location.state;

    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [startAtDate, setStartAtDate] = useState(getCurrentDate());
    useEffect(() => {
        const newStartDate = (new Date(startAtDate).getTime() / 1000) - 7200;
        setStartAtDateEpoch(newStartDate);
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

    const [startAtDateEpoch, setStartAtDateEpoch] = useState(getToday6amEpoch());
    const [endAtDateEpoch, setEndAtDateEpoch] = useState(getCurrentEpoch());

    const setToday = () => {
        setStartAtDate(getCurrentDate());
        setEndAtDate(getCurrentDate());
    }
    const setYesterday = () => {
        setStartAtDate(getYesterdayDate());
        setEndAtDate(getCurrentDate());
    }

    const setWeek = () => {
        setStartAtDate(getWeekAgoDate());
        setEndAtDate(getCurrentDate());
    }
    const [period, setPeriod] = useState('day');

    useEffect(() => {
        // console.log("startAtDateEpoch", startAtDateEpoch);
        // console.log("endAtDateEpoch", endAtDateEpoch);
        const epochDifference = endAtDateEpoch - startAtDateEpoch;
        switch (true) {
            case epochDifference > 2592000:
                setPeriod('month');
                break;
            case epochDifference > 604800:
                setPeriod('week');
                break;
            case epochDifference > 0:
                setPeriod('day');
                break;
        }
    }, [startAtDateEpoch, endAtDateEpoch]);



    const [displayStatistic, setDisplayStatistic] = useState({});
    const [storeList, setStoreList] = useState([]);
    const [storeListFilter, setStoreListFilter] = useState('');
    const [selectedItem, setSelectedItem] = useState({
        id: entityName === "store" ? state.data.id : -1,
        entityName: state.data.name
    });



    // ======================== GET STORE LIST FOR DROPDOWN ========================
    const { data: dataStoreList } = useQuery(GetStoreListByBrand,
        {
            variables: {
                args: [
                    {
                        id: state.data.id,
                    }
                ]
            },
            skip: entityName === "store"
        }
    );
    useEffect(() => {
        if (dataStoreList) {
            setStoreList([{ id: -1, name: '???' }, ...dataStoreList.getBrand[0].managerGetStores]);
        }
    }, [dataStoreList]);


    // ======================== GET BRAND STATISTIC ========================
    const { loading: loadingBrand, error: errorBrand, data: dataBrand } = useQuery(GetBrandStatistic, {
        variables: {
            args: [
                {
                    id: state.data.id,
                }
            ],
            startAt: startAtDateEpoch,
            endAt: endAtDateEpoch,
            timeGranularity: period
        },
        // ...((endAtDateEpoch - startAtDateEpoch > 86400) ? { variables: { timeGranularity: "day" } } : {}),
        skip: selectedItem.id !== -1 || entityName === "store" //skip if store is selected
    });


    // ======================== GET STORE STATISTIC ========================
    const { loading: loadingStore, error: errorStore, data: dataStore } = useQuery(GetStoreStatistic, {
        variables: {
            args: [
                {
                    id: selectedItem.id,
                }
            ],
            startAt: startAtDateEpoch,
            endAt: endAtDateEpoch,
            timeGranularity: period
        },
        skip: selectedItem.id === -1
    });

    useEffect(() => {
        if (dataBrand) {
            setDisplayStatistic(dataBrand.getBrand[0].getStatisticsTotal);
        }
        if (dataStore) {
            setDisplayStatistic(dataStore.getStore[0].getStatisticsTotal);
        }
    }, [dataBrand, dataStore]);

    // ========================
    const handleStoreListChange = (e) => {
        const targetId = e.target.value;
        //find the brand id from brand list
        const store = storeList.find(store => store.id === targetId);
        if (store) {
            setSelectedItem(
                {
                    id: store.id,
                    entityName: store.id === -1 ? state.data.name : store.name
                }
            );
            setStoreListFilter(targetId);
        }
    };

    if (loadingBrand, loadingStore) return <Loader />;
    if (errorBrand, errorStore) return <Error />;

    return (
        <Box p={2} position="flex" flexDirection={"column"}>
            <Box

                height={"10%"}
                mb={"1rem"}
            >
                <Header title={selectedItem.entityName} subtitle={t('statistic_info')} />
            </Box>



            <Box
                alignItems={"center"}
                justifyContent={"space-between"}
                className={"flex_media"}
                mb={"1rem"}
            >
                <Box display={"flex"} gap={"1rem"} >
                    <TextField
                        id="datetime-local"
                        label={t('start_time')}
                        type="date"
                        value={startAtDate}
                        onChange={handleStartAtDateChange}
                        sx={{ width: "160px" }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        id="datetime-local"
                        label={t('end_time')}
                        type="date"
                        value={endAtDate}
                        onChange={handleEndAtDateChange}
                        sx={{ width: "160px" }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>

                <FormControl sx={{ minWidth: "120px", display: entityName === "store" ? "none" : "block" }}>
                    <InputLabel id="demo-simple-select-label" >{t('store_filter')}</InputLabel>
                    <Select
                        required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={storeListFilter}
                        label="storeListFilter"
                        onChange={handleStoreListChange}
                        sx={{
                            borderRadius: "10px",
                            background: colors.primary[400],
                            height: "100%",
                            width: "100%"
                        }}
                    >
                        {storeList.map((item, i) => (
                            <MenuItem
                                value={item.id}
                                key={`${i}`}
                            >
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>



            <Box display={"flex"} gap={"1rem"} mb={"1rem"}>
                <Button
                    sx={{
                        backgroundColor: colors.primary[300],
                        color: colors.grey[100],
                        borderRadius: "8px",
                        padding: "0.5rem 1.5rem",
                        minWidth: "100px",
                        ':hover': {
                            bgcolor: colors.primary[200],
                        }
                    }}
                    onClick={() => setToday()}>
                    <Typography color={"white"} variant="h6" fontWeight="600">
                        {t('today')}
                    </Typography>
                </Button>
                <Button
                    sx={{
                        backgroundColor: colors.primary[300],
                        color: colors.grey[100],
                        borderRadius: "8px",
                        padding: "0.5rem 1.5rem",
                        minWidth: "100px",
                        ':hover': {
                            bgcolor: colors.primary[200],
                        }
                    }}
                    onClick={() => setYesterday()}>
                    <Typography color={"white"} variant="h6" fontWeight="600">
                        {t('yesterday')}
                    </Typography>
                </Button>
                <Button
                    sx={{
                        backgroundColor: colors.primary[300],
                        color: colors.grey[100],
                        borderRadius: "8px",
                        padding: "0.5rem 1.5rem",
                        minWidth: "100px",
                        ':hover': {
                            bgcolor: colors.primary[200],
                        }
                    }}
                    onClick={() => setWeek()}>
                    <Typography color={"white"} variant="h6" fontWeight="600">
                        {t('this_week')}
                    </Typography>
                </Button>
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

                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} >
                    <Typography variant="h4" sx={{ color: colors.grey[100], fontWeight: "bold", m: "0 0 0 10px" }}>
                        {t('finance')}
                    </Typography>

                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={".5rem"}>
                        <Typography variant="h4" sx={{ color: colors.grey[100], fontWeight: "500", m: "0 0 0 12px" }}>
                            {t('details')}
                        </Typography>
                        <Link
                            to={"/statistic-management/finance"}
                            state={{
                                data: state.data,
                            }}
                        >
                            <IconButton>
                                <NavigateNextIcon />
                            </IconButton>
                        </Link>
                    </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={"1rem"}>
                    <Typography variant="h6" sx={{ textTransform: "none", color: colors.grey[100], fontWeight: "500", m: "0 0 0 10px" }}>
                        {t('data_shown_text')}
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
                            title={((displayStatistic.giftAmountTotal / displayStatistic.coinAmountTotal * 100).toFixed(2) + "%")}
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
                            title={((displayStatistic.giftQuantityTotal / (displayStatistic.coinQuantityTotal) * 100).toFixed(2) + "%")}
                            subtitle={t('prize_rate')}
                            progress={((displayStatistic.giftQuantityTotal / (displayStatistic.coinQuantityTotal)).toFixed(2))}
                        />
                    </Box>



                    {/* ROW3
                    <Box
                        className='span4'
                        sx={{
                            backgroundColor: colors.primary[400],
                            border: "1px solid " + colors.grey[300],
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={currencyFormatter(10000)}
                            subtitle="????????????????????????"
                            icon={
                                <MonetizationOnIcon
                                    sx={{ color: colors.redAccent[300], fontSize: "45px" }}
                                />
                            }
                        />
                    </Box>

                    <Box
                        className='span4'
                        sx={{
                            backgroundColor: colors.primary[400],
                            border: "1px solid " + colors.grey[300],
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={currencyFormatter(7000)}
                            subtitle="??????????????????????????????"
                            icon={
                                <MonetizationOnIcon
                                    sx={{ color: colors.blueAccent[300], fontSize: "45px" }}
                                />
                            }
                        />
                    </Box>

                    <Box
                        className='span4'
                        sx={{
                            backgroundColor: colors.primary[400],
                            border: "1px solid " + colors.grey[300],
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={currencyFormatter(5000)}
                            subtitle="????????????????????????"
                            icon={
                                <MonetizationOnIcon
                                    sx={{ color: colors.greenAccent[300], fontSize: "45px" }}
                                />
                            }
                        />
                    </Box> */}
                </Box>
            </Box>


            {/* USERS CHARTS */}
            <Box
                mt={"2rem"}
                padding={"1rem"}
                borderRadius={"12px"}
                sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.074)",
                    border: "1px solid " + colors.grey[500],
                    webkitBackdropFilter: "blur(20px)",
                    backdropFilter: "blur(20px)",
                }}>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={"1rem"}>
                    <Typography variant="h4" sx={{ color: colors.grey[100], fontWeight: "bold", m: "0 0 0 10px" }}>
                        {t('users')}
                    </Typography>
                    <Link
                        to={"/statistic-management/user"}
                        state={{
                            data: displayStatistic,
                        }}
                    >
                        <IconButton>
                            <NavigateNextIcon />
                        </IconButton>
                    </Link>
                </Box>


                {/* GRID & CHARTS */}
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap="20px"
                >
                    {/* ROW 1 */}
                    <Box
                        className='span4'
                        sx={{
                            backgroundColor: colors.primary[400],
                            border: "1px solid " + colors.grey[300],
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBoxSplit
                            title={t('total_users')}
                            subtitle1={t('new_users')}
                            val1={numberFormatter(0)}
                            subtitle2={t('returning_users')}
                            val2={numberFormatter(0)}
                            icon={
                                <GroupIcon
                                    sx={{ color: colors.primary[100], fontSize: "45px" }}
                                />
                            }
                        />
                    </Box>
                    <Box
                        className='span4'
                        sx={{
                            backgroundColor: colors.primary[400],
                            border: "1px solid " + colors.grey[300],
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={numberFormatter(0)}
                            subtitle={t('followers')}
                            icon={
                                <MonetizationOnIcon
                                    sx={{ color: colors.greenAccent[300], fontSize: "45px" }}
                                />
                            }
                        />
                    </Box>
                    <Box
                        className='span4'
                        sx={{
                            backgroundColor: colors.primary[400],
                            border: "1px solid " + colors.grey[300],
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={numberFormatter(0)}
                            subtitle={t('followers')}
                            icon={
                                <MonetizationOnIcon
                                    sx={{ color: colors.greenAccent[300], fontSize: "45px" }}
                                />
                            }
                        />
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default StatisticManagement

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

    const hour = ("0" + date.getHours()).slice(-2)
    const minute = ("0" + date.getMinutes()).slice(-2)

    return `${year}-${month}-${day}`
}

const getYesterdayDate = () => {
    const date = new Date()
    date.setDate(date.getDate() - 1) // subtract 1 day from current date
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)

    const hour = ("0" + date.getHours()).slice(-2)
    const minute = ("0" + date.getMinutes()).slice(-2)

    return `${year}-${month}-${day}`
}




const getTodayEpoch = () => {
    return (new Date(getCurrentDate()).getTime() / 1000);
}
const getCurrentEpoch = () => {
    return Math.floor(new Date().getTime() / 1000);
}
const getToday6amEpoch = () => {
    return (new Date(getCurrentDate() + " 06:00:00").getTime() / 1000);
}

const getWeekAgoDate = () => {
    const date = new Date()
    date.setDate(date.getDate() - 7) // subtract 7 days from current date
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)

    const hour = ("0" + date.getHours()).slice(-2)
    const minute = ("0" + date.getMinutes()).slice(-2)

    return `${year}-${month}-${day}`
}
