import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, Button, Typography, useTheme, IconButton, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import LineChart from "../../components/LineChart";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from '../../components/Header';
import { useQuery } from '@apollo/client'

import { mockLineData } from "src/data/mockData";
import { GetStoreListByBrand, GetStatisticGraph } from 'src/graphQL/Queries';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const FinanceStatistic = () => {
    const location = useLocation();
    const state = location.state;

    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ===================== STATE =====================
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


    useEffect(() => {
        const epochDifference = endAtDateEpoch - startAtDateEpoch;
        switch (true) {
            case epochDifference > 2592000:
                setPeriod('month');
                console.log('month');
                break;
            case epochDifference > 604800:
                setPeriod('week');
                console.log('week');
                break;
            case epochDifference > 86400:
                setPeriod('day');
                console.log('day');
                break;
            case epochDifference >= 0:
                console.log('hour');
                setPeriod('hour');
                break;
        }
    }, [startAtDateEpoch, endAtDateEpoch]);

    const [storeList, setStoreList] = useState([]);
    const [storeListFilter, setStoreListFilter] = useState('');
    const [selectedItem, setSelectedItem] = useState({
        id: -1,
        entityName: state.data.name
    });

    const { data: dataStoreList } = useQuery(GetStoreListByBrand,
        {
            variables: {
                args: [
                    {
                        id: state.data.id,
                    }
                ]
            }
        }
    );
    useEffect(() => {
        if (dataStoreList) {
            setStoreList([{ id: -1, name: '無' }, ...dataStoreList.getBrand[0].managerGetStores]);
        }
    }, [dataStoreList]);

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



    // ===================== GRAPH DATA =====================
    const [period, setPeriod] = useState('hour');
    const [lineData, setLineData] = useState([]);

    const { loading, error, data } = useQuery(GetStatisticGraph, {
        variables: {
            args: [
                {
                    id: state.data.id
                }
            ],
            timeGranularity: period,
            startAt: startAtDateEpoch,
            endAt: endAtDateEpoch
        }
    });
    useEffect(() => {
        if (data) {
            setLineData(data.getBrand[0].getStatisticsPeriod);
        }
    }, [data]);

    const setToday = () => {
        setStartAtDate(getCurrentDate());
        setEndAtDate(getCurrentDate());
    }

    const setWeek = () => {
        setStartAtDate(getWeekAgoDate());
        setEndAtDate(getCurrentDate());
    }


    // ===================== GRAPH DATA =====================
    const finalData = [];

    const coinAmountTotal = [],
        coinQuantityTotal = [],
        giftAmountTotal = [],
        giftQuantityTotal = [];


    for (const item of lineData) {
        let x = item.timestamp;
        switch (period) {
            case 'hour':
                x = new Date(item.timestamp * 1000).toLocaleString("default", {
                    day: "numeric",
                    month: "short",
                    hour: "numeric",
                });
                break;
            case 'day':
                x = new Date(item.timestamp * 1000).toLocaleDateString("default", {
                    day: "numeric",
                    month: "short"
                });
                break;
            case 'week':
                let weekStart = new Date(item.timestamp * 1000);
                let weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);
                x = `${weekStart.toLocaleDateString("default", {
                    day: "numeric",
                    month: "short"
                })} - ${weekEnd.toLocaleDateString("default", {
                    day: "numeric",
                    month: "short"
                })}`;
                break;
            case 'month':
                x = new Date(item.timestamp * 1000).toLocaleDateString("default", {
                    month: "short",
                    year: "numeric"
                });
                break;
        }


        coinAmountTotal.push({ x, y: item.coinAmountTotal });
        coinQuantityTotal.push({ x, y: item.coinQuantityTotal });
        giftAmountTotal.push({ x, y: item.giftAmountTotal });
        giftQuantityTotal.push({ x, y: item.giftQuantityTotal });
    }


    // console.log(coinAmountTotal, giftAmountTotal);

    finalData.push({ id: "Coin Qty Tot", color: "#6a994e", data: coinQuantityTotal });
    finalData.push({ id: "Coin Amt Tot", color: "#219ebc", data: coinAmountTotal });
    finalData.push({ id: "Gift Amt Tot", color: "#fb8500", data: giftAmountTotal });
    finalData.push({ id: "Gift Qty Tot", color: "#ffb703", data: giftQuantityTotal });

    // console.log("finalData");
    // console.log(finalData);


    const handleClick = (selected) => {
        setPeriod(selected);
    };

    return (
        <Box m="20px" >
            {/* HEADER */}
            <Box Box display="flex" alignItems="center" gap={"1rem"} mb={"1rem"} >
                <Box>
                    <IconButton onClick={() => window.history.back()}>
                        <ArrowBackIcon />
                    </IconButton>
                </Box>
                <Box>
                    <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "0 0 5px 0" }}>
                        財務細節資料
                    </Typography>
                </Box>
            </Box >

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

                {/* <Box>
                    UNIX TIME: {startAtDate}: {startAtDateEpoch} --- {endAtDate}: {endAtDateEpoch}
                </Box> */}
                <FormControl sx={{ minWidth: "120px" }}>
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


            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                <Box
                    gridColumn="span 12"
                    gridRow="span 3"
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
                                mb="10px"
                            >
                                總收入 - Mock Data
                            </Typography>
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                color={colors.primary[100]}
                            >
                                NTD 10,000,000
                            </Typography>
                        </Box>
                        <Box
                            display={"flex"}
                            border={"1px solid #fff"}
                            borderRadius={"6px"}>
                            <Button
                                sx={{
                                    borderRadius: "0px",
                                    backgroundColor: period === 'hour' ? "rgba(255, 255, 255, 0.074)" : "transparent",
                                    border: period === 'hour' ? "1px solid rgba(255, 255, 255, 0.222)" : "1px solid transparent",
                                    webkitBackdropFilter: period === 'hour' ? "blur(20px)" : "none",
                                    backdropFilter: period === 'hour' ? "blur(20px)" : "none",
                                }}
                                onClick={() => handleClick('hour')}
                            >
                                <Typography variant="h6" fontWeight="400" color={colors.grey[100]}>
                                    時
                                </Typography>
                            </Button>
                            <Button
                                sx={{
                                    borderRadius: "0px",
                                    backgroundColor: period === 'day' ? "rgba(255, 255, 255, 0.074)" : "transparent",
                                    border: period === 'day' ? "1px solid rgba(255, 255, 255, 0.222)" : "1px solid transparent",
                                    webkitBackdropFilter: period === 'day' ? "blur(20px)" : "none",
                                    backdropFilter: period === 'day' ? "blur(20px)" : "none",
                                }}
                                onClick={() => handleClick('day')}
                            >
                                <Typography variant="h6" fontWeight="400" color={colors.grey[100]}>
                                    天
                                </Typography>
                            </Button>
                            <Button
                                sx={{
                                    borderRadius: "0px",
                                    backgroundColor: period === 'week' ? "rgba(255, 255, 255, 0.074)" : "transparent",
                                    border: period === 'week' ? "1px solid rgba(255, 255, 255, 0.222)" : "1px solid transparent",
                                    webkitBackdropFilter: period === 'week' ? "blur(20px)" : "none",
                                    backdropFilter: period === 'week' ? "blur(20px)" : "none",
                                }}
                                onClick={() => handleClick('week')}
                            >
                                <Typography variant="h6" fontWeight="400" color={colors.grey[100]}>
                                    周
                                </Typography>
                            </Button>
                            <Button
                                sx={{
                                    borderRadius: "0px",
                                    backgroundColor: period === 'month' ? "rgba(255, 255, 255, 0.074)" : "transparent",
                                    border: period === 'month' ? "1px solid rgba(255, 255, 255, 0.222)" : "1px solid transparent",
                                    webkitBackdropFilter: period === 'month' ? "blur(20px)" : "none",
                                    backdropFilter: period === 'month' ? "blur(20px)" : "none",
                                }}
                                onClick={() => handleClick('month')}
                            >
                                <Typography variant="h6" fontWeight="400" color={colors.grey[100]}>
                                    月
                                </Typography>
                            </Button>


                        </Box>

                    </Box>
                    <Box height="400px" m="-20px 0 0 0">
                        <LineChart isDashboard={true} data={finalData} />
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default FinanceStatistic

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
// const getToday6Epoch = () => {
//     return (new Date(getCurrentDate()).getTime() / 1000) - 7200;
// }
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