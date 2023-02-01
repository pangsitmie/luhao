import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { format } from 'date-fns';

// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, IconButton, useTheme, InputBase } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";

import { GetBrandStatistic } from '../../graphQL/Queries'


import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';

import SavingsIcon from '@mui/icons-material/Savings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import StatBox from "../../components/StatBox";
import StatPercentBox from '../../components/StatPercentBox';

const StatisticManagement = () => {
    const location = useLocation();
    const state = location.state;

    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    // ======================== STATES ========================
    const startValueRef = useRef('');
    const endValueRef = useRef('');

    const [brandStatistic, setBrandStatistic] = useState({});
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
            setBrandStatistic(data.getBrand[0].getStatisticsTotal);
            setStoreList(data.getBrand[0].managerGetStores);
            console.log(brandStatistic);
        }
    }, [data]);

    const handleStoreListChange = (e) => {
        const targetId = e.target.value;

        //find the brand id from brand list
        const store = storeList.find(store => store.id === targetId);

        if (store) {
            setStoreListFilter(targetId);
        }
    };




    if (loading) return <Loader />;
    if (error) return <Error />;

    return (
        <Box p={2} position="flex" height={"100%"} overflow={"hidden"} flexDirection={"column"}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems={"center"}
                height={"10%"}
                mb={"1rem"}
            >
                <h1 className='userManagement_title'>{state.data.name} - 統計</h1>

            </Box>
            <Box
                display="flex"
                alignItems={"center"}
                justifyContent={"space-between"}
                mb={"2rem"}
            >
                <Box display={"flex"}>
                    <Box
                        display="flex"
                        mr={"1rem"}
                        borderRadius="10px"
                        height={"52px"}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            border: "1px solid rgba(255, 255, 255, 0.222)",
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}>
                        <InputBase sx={{ ml: 2, pr: 2, flex: 1, width: "200px" }} placeholder="開始時間" inputRef={startValueRef} />
                    </Box>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}>
                        <Typography variant="h4" sx={{ color: colors.grey[100], fontWeight: "500" }}>
                            ~
                        </Typography>
                    </Box>
                    <Box
                        display="flex"
                        ml={"1rem"}
                        borderRadius="10px"
                        height={"52px"}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            border: "1px solid rgba(255, 255, 255, 0.222)",
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}>
                        <InputBase sx={{ ml: 2, pr: 2, flex: 1, width: "200px" }} placeholder="結束時間" inputRef={endValueRef} />
                    </Box>

                    <Button sx={{
                        backgroundColor: colors.primary[300],
                        ml: "1rem",
                        color: colors.grey[100],
                        minWidth: "150px",
                        height: "52px",
                        borderRadius: "10px",
                        padding: "0px",
                        ':hover': {
                            bgcolor: colors.primary[300],
                            border: '1px solid white',
                        }
                    }}
                        onClick={() => { }}>
                        <Typography color={"white"} variant="h5" fontWeight="500">
                            查詢
                        </Typography>
                    </Button>
                </Box>

                <FormControl sx={{ minWidth: 150, }}>
                    <InputLabel id="demo-simple-select-label" >店家過濾</InputLabel>
                    <Select
                        sx={{ borderRadius: "10px", background: colors.primary[400], height: "100%", width: "auto" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={storeListFilter}
                        label="storeListFilter"
                        onChange={handleStoreListChange}
                        required
                    >
                        {storeList.map((item, i) => (
                            <MenuItem
                                value={item.id}
                                key={`${i}`}
                            >
                                {item.id} - {item.name}
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
                    border: "1px solid rgba(255, 255, 255, 0.222)",
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
                            data: brandStatistic,
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
                        gridColumn="span 3"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={"12px"}
                        // sx={{
                        //     backgroundColor: "rgba(255, 255, 255, 0.074)",
                        //     border: "1px solid rgba(255, 255, 255, 0.222)",
                        //     webkitBackdropFilter: "blur(20px)",
                        //     backdropFilter: "blur(20px)",
                        // }}
                        sx={{
                            background: "linear-gradient(135deg, #0b3866, #4436BD)",
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={currencyFormatter(brandStatistic.coinTotal)}
                            subtitle="總收入"
                            icon={
                                <SavingsIcon
                                    sx={{ color: colors.grey[100], fontSize: "45px" }}
                                />
                            }
                        />
                    </Box>

                    <Box
                        gridColumn="span 3"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={"12px"}
                        sx={{
                            background: "linear-gradient(135deg, #921185, #A13796)",
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={currencyFormatter(10000)}
                            subtitle="免費幣"
                            icon={
                                <MonetizationOnIcon
                                    sx={{ color: colors.grey[100], fontSize: "45px" }}
                                />
                            }
                        />
                    </Box>

                    <Box
                        gridColumn="span 3"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={"12px"}
                        sx={{
                            background: "linear-gradient(135deg, #4281B7, #4697E7)",
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={numberFormatter(brandStatistic.giftTotal)}
                            subtitle="總出貨"
                            icon={
                                <InventoryIcon
                                    sx={{ color: colors.grey[100], fontSize: "45px" }}
                                />
                            }
                        />
                    </Box>

                    <Box
                        gridColumn="span 3"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={"12px"}
                        sx={{
                            background: "linear-gradient(135deg, #DD9325, #E0A62C)",
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={currencyFormatter(10000)}
                            subtitle="總支出"
                            icon={
                                <ReceiptIcon
                                    sx={{ color: colors.grey[100], fontSize: "45px" }}
                                />
                            }
                        />
                    </Box>


                    {/* ROW 2 */}
                    <Box
                        // formula: revenue / expense
                        gridColumn="span 6"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={"12px"}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            border: "1px solid rgba(255, 255, 255, 0.222)",
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatPercentBox
                            title={"50%"}
                            subtitle="營收比"
                            progress=".5"
                        />
                    </Box>
                    <Box
                        // formula: revenue / (gift*10)
                        gridColumn="span 6"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={"12px"}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            border: "1px solid rgba(255, 255, 255, 0.222)",
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatPercentBox
                            title={"30%"}
                            subtitle="出貨比"
                            progress=".3"
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
                    border: "1px solid rgba(255, 255, 255, 0.222)",
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
                            data: brandStatistic,
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
                        gridColumn="span 4"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={"12px"}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            border: "1px solid rgba(255, 255, 255, 0.222)",
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={currencyFormatter(10000)}
                            subtitle="總收入"
                            icon={
                                <SavingsIcon
                                    sx={{ color: colors.grey[100], fontSize: "45px" }}
                                />
                            }
                        />
                    </Box>

                    <Box
                        gridColumn="span 4"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={"12px"}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            border: "1px solid rgba(255, 255, 255, 0.222)",
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={currencyFormatter(10000)}
                            subtitle="免費幣"
                            icon={
                                <MonetizationOnIcon
                                    sx={{ color: colors.grey[100], fontSize: "45px" }}
                                />
                            }
                        />
                    </Box>

                    <Box
                        gridColumn="span 4"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={"12px"}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            border: "1px solid rgba(255, 255, 255, 0.222)",
                            webkitBackdropFilter: "blur(20px)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={10000}
                            subtitle="總出貨"
                            icon={
                                <InventoryIcon
                                    sx={{ color: colors.grey[100], fontSize: "45px" }}
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