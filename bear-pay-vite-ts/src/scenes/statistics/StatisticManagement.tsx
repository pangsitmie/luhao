import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'


// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, IconButton, useTheme, InputBase, TextField, InputAdornment, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, SelectChangeEvent } from "@mui/material";
import { tokens } from "../../theme";

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
import { useSelector } from "react-redux";

import { useTranslation } from 'react-i18next';
import MachineStatistic from './MachineStatistic';
import { currencyFormatter, getCurrentDate, getCurrentEpoch, getToday6amEpoch, getTodayEpoch, getWeekAgoDate, getYesterdayDate, numberFormatter } from '../../utils/Utils';
import Store from '../../types/Store';
import { RootState } from '../../redux/store';
import { StatisticTotal } from '../../types/Statistic';




type SelectedItem = {
    id: number;
    entityName: string;
}





const StatisticManagement = () => {
    const { entityName } = useSelector((state: RootState) => state.entity);
    const { t } = useTranslation();

    const location = useLocation();
    const state = location.state;
    const searchRef = useRef('');



    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [startAtDate, setStartAtDate] = useState(getCurrentDate());
    useEffect(() => {
        const newStartDate = (new Date(startAtDate).getTime() / 1000) - 7200;
        setStartAtDateEpoch(newStartDate);
    }, [startAtDate]);
    function handleStartAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
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
    function handleEndAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
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



    const [displayStatistic, setDisplayStatistic] = useState<StatisticTotal>({
        coinAmountTotal: 0,
        coinQuantityTotal: 0,
        giftAmountTotal: 0,
        giftQuantityTotal: 0,
        revenueRate: 0,
        giftRate: 0,
        exchange100AmountTotal: 0,
        exchange100QuantityTotal: 0,
        exchange50AmountTotal: 0,
        exchange50QuantityTotal: 0,
    });
    const [storeList, setStoreList] = useState<Store[]>([]);
    const [storeListFilter, setStoreListFilter] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<SelectedItem>({
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
            console.log(dataBrand);
            setDisplayStatistic(dataBrand.getBrand[0].getStatisticsTotal);
        }
        if (dataStore) {
            console.log(dataStore);
            setDisplayStatistic(dataStore.getStore[0].getStatisticsTotal);
        }
    }, [dataBrand, dataStore]);

    // ========================
    const handleStoreListChange = (e: SelectChangeEvent<string>) => {
        const targetId = e.target.value;
        //find the brand id from brand list
        const store = storeList.find(store => store.id === targetId);
        if (store) {
            setSelectedItem(
                {
                    id: parseInt(store.id),
                    entityName: parseInt(store.id) === -1 ? state.data.name : store.name
                }
            );
            setStoreListFilter(targetId);
        }
    };

    if (loadingStore) return <Loader />;
    if (errorStore) return <Error />;

    return (
        <Box p={2} display="flex" flexDirection={"column"}>
            <Box
                height={"10%"}
                mb={"1rem"}
            >
                <Header title={selectedItem.entityName} subtitle={t('statistic_info')} />
            </Box>



            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                // className={"flex_media"}
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


            {/* LOG IMPORTANT STUFF */}
            {/* <Box display={"flex"} gap={"1rem"} mb={"1rem"}>
                {selectedItem.id} -  startAt: {startAtDateEpoch} - endAt: {endAtDateEpoch} - period: {period} -
            </Box> */}



            {/* FINANCE CHARTS */}
            <Box
                padding={"1rem"}
                borderRadius={"12px"}
                sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.074)",
                    border: "1px solid " + colors.grey[500],
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
                            textColor="#FFFFFF"
                        />
                    </Box>

                    <Box
                        className='span3'
                        sx={{
                            background: "linear-gradient(135deg, #921185, #A13796)",
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={numberFormatter(displayStatistic.coinQuantityTotal)}
                            subtitle={t('total_coin')}
                            icon={
                                <MonetizationOnIcon
                                    sx={{ color: "#ffffff", fontSize: "45px" }}
                                />
                            }
                            textColor="#FFFFFF"
                        />
                    </Box>

                    <Box
                        className='span3'
                        sx={{
                            background: "linear-gradient(135deg, #F78C1C, #f7ba2c)",
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBox
                            title={currencyFormatter(displayStatistic.giftAmountTotal)}
                            subtitle={t('total_expense')}
                            icon={
                                <ReceiptIcon
                                    sx={{ color: "#ffffff", fontSize: "45px" }}
                                />
                            }
                            textColor="#FFFFFF"
                        />
                    </Box>

                    <Box
                        className='span3'
                        sx={{
                            background: "linear-gradient(135deg, #4281B7, #4697E7)",
                            backgroundColor: "rgba(255, 255, 255, 0.074)",
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
                            textColor="#FFFFFF"
                        />
                    </Box>


                    {/* ROW 2 */}
                    <Box
                        // formula: (revenue-expense) / revenue
                        className='span6'
                        sx={{
                            backgroundColor: colors.primary[400],
                            border: "1px solid " + colors.grey[300],
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatPercentBox
                            title={`${numberFormatter(displayStatistic.revenueRate)}%`}
                            // title={((displayStatistic.giftAmountTotal / displayStatistic.coinAmountTotal * 100).toFixed(2) + "%")}
                            subtitle={t('expense_rate')}
                            progress={(displayStatistic.revenueRate / 100).toFixed(2)}
                        />
                    </Box>
                    <Box
                        // formula: (gift count) / total coin inserted
                        className='span6'
                        sx={{
                            backgroundColor: colors.primary[400],
                            border: "1px solid " + colors.grey[300],
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatPercentBox
                            title={`${numberFormatter(displayStatistic.giftRate)}%`}
                            // title={((displayStatistic.giftQuantityTotal / (displayStatistic.coinQuantityTotal) * 100).toFixed(2) + "%")}
                            subtitle={t('prize_rate')}
                            progress={(displayStatistic.giftRate / 100).toFixed(2)}
                        />
                    </Box>
                    <Box
                        // formula: (gift count) / total coin inserted
                        className='span6'
                        sx={{
                            backgroundColor: colors.primary[400],
                            border: "1px solid " + colors.grey[300],
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBoxSplit
                            title={t('exchange_100')}
                            subtitle1={t('amount')}
                            val1={numberFormatter(displayStatistic.exchange100AmountTotal)}
                            subtitle2={t('quantity')}
                            val2={numberFormatter(displayStatistic.exchange100QuantityTotal)}
                            icon={
                                <MonetizationOnIcon
                                    sx={{ color: colors.redAccent[600], fontSize: "45px" }}
                                />
                            }
                        />
                    </Box>
                    <Box
                        // formula: (gift count) / total coin inserted
                        className='span6'
                        sx={{
                            backgroundColor: colors.primary[400],
                            border: "1px solid " + colors.grey[300],
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <StatBoxSplit
                            title={t('exchange_50')}
                            subtitle1={t('amount')}
                            val1={numberFormatter(displayStatistic.exchange50AmountTotal)}
                            subtitle2={t('quantity')}
                            val2={numberFormatter(displayStatistic.exchange50QuantityTotal)}
                            icon={
                                <MonetizationOnIcon
                                    sx={{ color: colors.blueAccent[600], fontSize: "45px" }}
                                />
                            }
                        />
                    </Box>
                </Box>
            </Box>




            {/* USERS CHARTS */}
            {/* <Box
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
                </Box>
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap="20px"
                >
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
            </Box> */}

            {/* MACHINE TABLE */}
            {selectedItem.id !== -1 && (
                <Box
                    mt={"2rem"}
                    padding={"1rem"}
                    borderRadius={"12px"}
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.074)",
                        border: "1px solid " + colors.grey[500],
                        backdropFilter: "blur(20px)",
                    }}>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={"1rem"}>
                        <Typography variant="h4" sx={{ color: colors.grey[100], fontWeight: "bold", m: "1rem 0 1rem 5px" }}>
                            {t('machines')} {t('statistic')}
                        </Typography>
                    </Box>

                    {/* the list is handled in this componenet */}
                    <MachineStatistic STORE_ID={selectedItem.id.toString()} START_AT_DATE_EPOCH={startAtDateEpoch} END_AT_DATE_EPOCH={endAtDateEpoch} />
                </Box>
            )}
        </Box >
    )
}

export default StatisticManagement
