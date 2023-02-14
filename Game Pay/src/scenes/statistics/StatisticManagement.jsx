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


const StatisticManagement = () => {
    const { entityName } = useSelector((state) => state.entity);


    const location = useLocation();
    const state = location.state;

    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

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

    const setToday = () => {
        setStartAtDate(getCurrentDate());
        setEndAtDate(getCurrentDate());
    }

    const setWeek = () => {
        setStartAtDate(getWeekAgoDate());
        setEndAtDate(getCurrentDate());
    }
    const [period, setPeriod] = useState('day');

    useEffect(() => {
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
            setStoreList([{ id: -1, name: '無' }, ...dataStoreList.getBrand[0].managerGetStores]);
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
                display="flex"
                justifyContent="space-between"
                alignItems={"center"}
                height={"10%"}
                mb={"1rem"}
            >
                <Header title={selectedItem.entityName} subtitle="統計資料" />
                {/* {startAtDateEpoch} - {endAtDateEpoch} */}
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
                        label="開始時間點"
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
                        label="過期時間"
                        type="date"
                        value={endAtDate}
                        onChange={handleEndAtDateChange}
                        sx={{ width: "160px" }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button sx={{
                        backgroundColor: colors.primary[300],
                        color: colors.grey[100],
                        minWidth: "100px",
                        height: "52px",
                        borderRadius: "10px",
                        ':hover': {
                            bgcolor: colors.primary[300],
                            border: '1px solid white',
                        }
                    }}
                        onClick={() => setToday()}>
                        <Typography color={"white"} variant="h5" fontWeight="600">
                            今天
                        </Typography>
                    </Button>
                    <Button sx={{
                        backgroundColor: colors.primary[300],
                        color: colors.grey[100],
                        minWidth: "100px",
                        height: "52px",
                        borderRadius: "10px",
                        ':hover': {
                            bgcolor: colors.primary[300],
                            border: '1px solid white',
                        }
                    }}
                        onClick={() => setWeek()}>
                        <Typography color={"white"} variant="h5" fontWeight="600">
                            本週
                        </Typography>
                    </Button>
                </Box>

                <FormControl sx={{ minWidth: "120px", display: entityName === "store" ? "none" : "block" }}>
                    <InputLabel id="demo-simple-select-label" >店家過濾</InputLabel>
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
                        財務
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
                            subtitle="總收入"
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
                            subtitle="總投幣"
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
                            subtitle="總支出"
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
                            subtitle="總出貨"
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
                            subtitle="支出比"
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
                            subtitle="出貨比"
                            progress={((displayStatistic.giftQuantityTotal / (displayStatistic.coinQuantityTotal)).toFixed(2))}
                        />
                    </Box>

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
                    <Typography variant="h4" sx={{ color: colors.grey[100], fontWeight: "500", m: "0 0 0 12px" }}>
                        使用者
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
                            title={"總客人"}
                            subtitle1="新客人"
                            val1={numberFormatter(1000)}
                            subtitle2="舊客人"
                            val2={numberFormatter(500)}
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
                            title={currencyFormatter(10000)}
                            subtitle="總免費幣發送"
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
                            title={currencyFormatter(10000)}
                            subtitle="總免費幣使用"
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




const getTodayEpoch = () => {
    return (new Date(getCurrentDate()).getTime() / 1000);
}
const getCurrentEpoch = () => {
    return Math.floor(new Date().getTime() / 1000);
}

const getWeekAgoDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + (date.getDate() - 7)).slice(-2)

    const hour = ("0" + date.getHours()).slice(-2)
    const minute = ("0" + date.getMinutes()).slice(-2)

    return `${year}-${month}-${day}`
}