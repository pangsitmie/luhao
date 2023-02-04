import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useQuery, gql, useLazyQuery } from '@apollo/client'
import { format } from 'date-fns';

// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, IconButton, useTheme, InputBase, TextField } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";

import { GetBrandStatistic, GetStoreStatistic } from '../../graphQL/Queries'


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
import { display } from '@mui/system';
import StatBoxSplit from '../../components/StatBoxSplit';


const StatisticManagement = () => {
    const location = useLocation();
    const state = location.state;

    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    // ======================== STATES ========================

    //title state is first initialize as brand name and updated when store name is selected
    const [selectedItem, setSelectedItem] = useState({
        id: state.data.id,
        entityName: state.data.name
    });

    const [startAtDate, setStartAtDate] = useState('');
    function handleStartAtDateChange(event) {
        setStartAtDate(event.target.value);
    }

    const [endAtDate, setEndAtDate] = useState('');
    function handleEndAtDateChange(event) {
        setEndAtDate(event.target.value);
    }

    const [brandStatistic, setBrandStatistic] = useState({});
    const [displayStatistic, setDisplayStatistic] = useState({});

    const [storeList, setStoreList] = useState([]);

    const [storeListFilter, setStoreListFilter] = useState('');

    const { loading, error, data } = useQuery(GetBrandStatistic, {
        variables: {
            args: [
                {
                    id: state.data.id,
                }
            ],
        }
    });
    useEffect(() => {
        if (data) {
            // set the data to brandStatistic first
            setBrandStatistic(data.getBrand[0].getStatisticsTotal);
            setDisplayStatistic(data.getBrand[0].getStatisticsTotal);
            setStoreList([{ id: -1, name: '無' }, ...data.getBrand[0].managerGetStores]);

        }
    }, [data]);


    const [ApolloGetBrandStatistic, { loading: loadingBrand, error: errorBrand, data: dataBrand }] = useLazyQuery(GetBrandStatistic);



    const [ApolloGetStoreStatistic, { loading: loadingStore, error: errorStore, data: dataStore }] = useLazyQuery(GetStoreStatistic);
    const handleStoreListChange = (e) => {
        const targetId = e.target.value;

        if (targetId === -1) {
            setSelectedItem({
                id: state.data.id,
                entityName: state.data.name
            });

            setDisplayStatistic(brandStatistic);
            setStoreListFilter(targetId);
            return;
        }

        //find the brand id from brand list
        const store = storeList.find(store => store.id === targetId);
        if (store) {
            setSelectedItem(
                {
                    id: store.id,
                    entityName: store.name
                }
            );

            setStoreListFilter(targetId);

            const startAtDateObj = new Date(startAtDate);
            const endAtDateObj = new Date(endAtDate);

            let startAtUnix = startAtDateObj.getTime() / 1000;
            let endAtUnix = endAtDateObj.getTime() / 1000;
            let nowUnix = Math.floor(Date.now() / 1000);

            const variables = {
                args: [
                    {
                        id: targetId,
                    }
                ],
            };
            //check if startAtUnix is filled
            //insert startAtUnix to variables
            if (!isNaN(startAtUnix)) {
                variables.startAt = startAtUnix;
            }
            //insert endAtUnix to variables if it is selected

            if (!isNaN(endAtUnix)) {
                variables.endAt = endAtUnix;
            }

            if (endAtUnix < startAtUnix) {
                alert("End date must be greater than start date");
                return;
            }

            ApolloGetStoreStatistic({ variables }).then((res) => {
                setDisplayStatistic(res.data.getStore[0].getStatisticsTotal);
            }).catch((err) => {
                console.log(err);
            });
        }
    };

    // ========================== FUNCTIONS ==========================
    const submitSearch = () => {
        console.log("SEARCH" + selectedItem.id + selectedItem.name);
        console.log(selectedItem === state.data.name);

        const startAtDateObj = new Date(startAtDate);
        const endAtDateObj = new Date(endAtDate);

        let startAtUnix = startAtDateObj.getTime() / 1000;
        let endAtUnix = endAtDateObj.getTime() / 1000;
        let nowUnix = Math.floor(Date.now() / 1000);

        const variables = {
            args: [
                {
                    id: selectedItem.id,
                }
            ],
        };
        //check if startAtUnix is filled
        if (!isNaN(startAtUnix)) {
            variables.startAt = startAtUnix;
        }
        //insert endAtUnix to variables if it is selected

        if (!isNaN(endAtUnix)) {
            variables.endAt = endAtUnix;
        }
        if (endAtUnix < startAtUnix) {
            alert("End date must be greater than start date");
            return;
        }
        console.log(selectedItem);
        console.log(variables);


        // we want to search brand statistic with corespondinc time frame
        if (selectedItem.name === state.data.name) {
            ApolloGetBrandStatistic({ variables }).then((res) => {
                console.log(res);
                setDisplayStatistic(res.data.getBrand[0].getStatisticsTotal);
            }).catch((err) => {
                console.log(err);
            });
            return;
        }
        else {
            ApolloGetStoreStatistic({ variables }).then((res) => {
                setDisplayStatistic(res.data.getStore[0].getStatisticsTotal);
            }).catch((err) => {
                console.log(err);
            });
            return;
        }
    };


    if (loading) return <Loader />;
    if (error) return <Error />;

    return (
        <Box p={2} position="flex" flexDirection={"column"}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems={"center"}
                height={"10%"}
                mb={"1rem"}
            >
                <Header title={selectedItem.name} subtitle="統計資料" />
            </Box>

            <Box
                alignItems={"center"}
                justifyContent={"space-between"}
                className={"flex_media"}
                mb={"1rem"}
            >
                <Box className={"flex_media"} >
                    <TextField
                        id="datetime-local"
                        label="開始時間點"
                        type="datetime-local"
                        // defaultValue="2017-05-24T10:30"
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
                        type="datetime-local"
                        // defaultValue="2017-05-24T10:30"
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
                        minWidth: "90px",
                        height: "52px",
                        borderRadius: "10px",
                        padding: "0px",
                        ':hover': {
                            bgcolor: colors.primary[300],
                            border: '1px solid white',
                        }
                    }}
                        onClick={submitSearch}>
                        <Typography color={"white"} variant="h5" fontWeight="500">
                            查詢
                        </Typography>
                    </Button>
                </Box>

                <FormControl sx={{ minWidth: "150px" }}>
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
                        className='span3'
                        sx={{
                            background: "linear-gradient(135deg, #386641, #6a994e)",
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={currencyFormatter(displayStatistic.coinTotal * 10)}
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
                            title={currencyFormatter(5)}
                            subtitle="免費幣"
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
                            background: "linear-gradient(135deg, #4281B7, #4697E7)",
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={numberFormatter(displayStatistic.giftTotal)}
                            subtitle="總出貨"
                            icon={
                                <InventoryIcon
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
                            title={currencyFormatter(100)}
                            subtitle="總支出"
                            icon={
                                <ReceiptIcon
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
                            // we still dont have expenses and free coin data
                            title={((100 / (displayStatistic.coinTotal * 10) * 100).toFixed(2) + "%")}
                            subtitle="支出比"
                            progress={(100 / (displayStatistic.coinTotal * 10)).toFixed(2)}
                        />
                    </Box>
                    <Box
                        // formula: (gift*10) / revenue
                        // we still dont have expenses and free coin data

                        className='span6'
                        sx={{
                            backgroundColor: colors.primary[400],
                            border: "1px solid " + colors.grey[300],
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatPercentBox
                            title={((displayStatistic.giftTotal / (displayStatistic.coinTotal) * 100).toFixed(2) + "%")}
                            subtitle="出貨比"
                            progress={((displayStatistic.giftTotal / (displayStatistic.coinTotal)).toFixed(2))}
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
                        to={"/statistic-management/finance"}
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
                            title={"客人数量"}
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