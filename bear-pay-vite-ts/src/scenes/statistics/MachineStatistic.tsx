import { useState, useRef, useEffect } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, IconButton, useTheme, TextField, InputAdornment, TableCell, TableBody, Collapse, SelectChangeEvent } from "@mui/material";
import { tokens } from "../../theme";
import { useTranslation } from 'react-i18next';
import OrderMethodButton from '../../components/OrderMethodButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { currencyFormatter, getRESTEndpoint, numberFormatter } from '../../utils/Utils';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/loader/Loader';
import SearchIcon from "@mui/icons-material/Search";
import { toast } from 'react-toastify';
import { useQuery } from '@apollo/client';
import { HealthCheck } from '../../graphQL/Queries';
import { MachineStatisticTotal } from '../../types/Statistic';
import MachineStatisticCommodityList from './MachineStatisticCommodityList';
import { mockCommodityRecords } from '../../data/mockData';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

type Props = {
    STORE_ID: string,
    START_AT_DATE_EPOCH: number,
    END_AT_DATE_EPOCH: number
}
const MachineStatistic = ({ STORE_ID, START_AT_DATE_EPOCH, END_AT_DATE_EPOCH }: Props) => {
    const { t } = useTranslation();

    const revenueFilterRef = useRef<HTMLInputElement>();
    const revenueRateFilterRef = useRef<HTMLInputElement>();
    const giftRateFilterRef = useRef<HTMLInputElement>();

    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // const [initMachineDatas, setInitMachineDatas] = useState<MachineStatisticTotal[]>([]);
    const [machineDatas, setMachineDatas] = useState<MachineStatisticTotal[]>([]);


    const [filter, setFilter] = useState('name');
    const handleFilterChange = (e: SelectChangeEvent<string>) => {
        setMachineDatas([]);
        // setInitMachineDatas([]);
        setFilter(e.target.value);
    };

    const [orderMethod, setOrderMethod] = useState('asc');
    useEffect(() => {
        setMachineDatas([]);
        // setInitMachineDatas([]);
    }, [orderMethod]);


    // LOADING STATE
    const [loadingState, setLoadingState] = useState(false);
    // const handleLoadingState = (loading: boolean) => {
    //     setLoadingState(loading);
    // }


    const [isGiftCollapsed, setIsGiftCollapsed] = useState(true);
    const handleGiftToggle = () => {
        setIsGiftCollapsed(!isGiftCollapsed);
    };

    const [isOnlineCoinCollapsed, setIsOnlineCoinCollapsed] = useState(true);
    const handleOnlineCoinToggle = () => {
        setIsOnlineCoinCollapsed(!isOnlineCoinCollapsed);
    };

    const [isOfflineCoinCollapsed, setIsOfflineCoinCollapsed] = useState(true);
    const handleOfflineCoinToggle = () => {
        setIsOfflineCoinCollapsed(!isOfflineCoinCollapsed);
    };

    const [commodityRecordsCollapsed, setCommodityRecordsCollapsed] = useState(-1);
    const handleCommodityRecordsToggle = (index: number) => {
        setCommodityRecordsCollapsed((prevCollapsed) =>
            prevCollapsed === index ? -1 : index
        );
    };



    const { refetch: refetchHealthCheck } = useQuery(HealthCheck);
    const REST_FetchMachineStatistics = async () => {
        const MAX_RETRY_ATTEMPTS = 3;
        let retryCount = 0;

        while (retryCount < MAX_RETRY_ATTEMPTS) {
            try {
                setLoadingState(true);

                const URI = `${getRESTEndpoint()}/statistics/store/machines/total`;

                const response = await axios.post(
                    URI,
                    {
                        storeId: STORE_ID,
                        startAt: START_AT_DATE_EPOCH,
                        endAt: END_AT_DATE_EPOCH,
                        order: {
                            by: filter,
                            method: orderMethod,
                        },
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                console.log("RESPONSE:", response);

                if (response.data && response.data.data) {
                    console.log(response.data.data);
                    setMachineDatas(response.data.data);
                    // setInitMachineDatas(response.data.data);
                    break; // exit the loop if the API call was successful
                } else {
                    refetchHealthCheck();
                    toast("Loading...");
                }
            } catch (error) {
                console.log("Error:", error);
            } finally {
                setLoadingState(false);
            }

            retryCount++;
            console.log(`Retrying API call (attempt ${retryCount})...`);

            if (retryCount > 0) {
                await new Promise(resolve => setTimeout(resolve, 1500)); // wait for 1 second before retrying
            }
        }

        if (retryCount === MAX_RETRY_ATTEMPTS) {
            console.log(`Maximum retry attempts (${MAX_RETRY_ATTEMPTS}) exceeded.`);
        }
    };

    useEffect(() => {
        REST_FetchMachineStatistics();
    }, [START_AT_DATE_EPOCH, END_AT_DATE_EPOCH, filter, orderMethod]);

    const submitSearch = () => {
        //CALL SEARCH FUNCTION
        console.log("SEARCH CLICKED");
        console.log(revenueFilterRef.current?.value);
        console.log(revenueRateFilterRef.current?.value);
        console.log(giftRateFilterRef.current?.value);

        const filterMachineData = () => {
            // return machineDatas;
            return machineDatas.map((item) => {
                let isBellowRevenueFilter = item.coinAmountTotal < parseInt(revenueFilterRef.current?.value ?? "0");

                let isAboveRevenueRateFilter = (item.revenueRate - 5) > parseInt(revenueRateFilterRef.current?.value ?? "0");
                let isBellowRevenueRateFilter = (item.revenueRate + 5) < parseInt(revenueRateFilterRef.current?.value ?? "0");

                let isAboveGiftRateFilter = (item.giftRate - 5) > parseInt(giftRateFilterRef.current?.value ?? "0");
                let isBellowGiftRateFilter = (item.giftRate + 5) < parseInt(giftRateFilterRef.current?.value ?? "0");

                let isBlueHighlighted = (isAboveRevenueRateFilter || isBellowGiftRateFilter);
                let isRedHighlighted = (isBellowRevenueFilter || isBellowRevenueRateFilter || isAboveGiftRateFilter);

                console.log("isBlueHighlighted: " + isBlueHighlighted);
                console.log("isRedHighlighted: " + isRedHighlighted);

                return {
                    ...item,
                    isBlueHighlighted,
                    isRedHighlighted,
                };
            });
        }
        setMachineDatas(filterMachineData);
    }



    return (
        <>
            <Box display={"flex"} marginBottom={"2rem"} justifyContent={"space-between"}>
                {/* name Search */}
                {/* <Box>
                    revenue filter {revenueFilter} <br />
                    revenue rate filter {revenueRateFilter} <br />
                    gift rate filter {giftRateFilter} <br />
                    start At epoch {START_AT_DATE_EPOCH} <br />
                    end At epoch {END_AT_DATE_EPOCH} <br />
                </Box> */}



                <Box display="flex" alignItems={"center"} gap={"1rem"} mr=".5rem">
                    <TextField
                        variant="outlined"
                        type="text"
                        label={t('revenue_expectation')}
                        inputRef={revenueFilterRef}
                        sx={{ width: "110px", backgroundColor: colors.primary[400], color: "black" }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">元</InputAdornment>,
                        }}
                    />
                    <TextField
                        variant="outlined"
                        type="text"
                        label={t('revenue_rate_expectation')}
                        inputRef={revenueRateFilterRef}
                        sx={{ width: "110px", backgroundColor: colors.primary[400], color: "black" }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                    />
                    <TextField
                        variant="outlined"
                        type="text"
                        label={t('gift_rate_expectation')}
                        inputRef={giftRateFilterRef}
                        sx={{ width: "120px", backgroundColor: colors.primary[400], color: "black" }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                    />
                    <Button sx={{
                        backgroundColor: colors.primary[300],
                        minWidth: "120px",
                        color: colors.grey[100],
                        height: "52px",
                        borderRadius: "10px",
                        ':hover': {
                            bgcolor: colors.primary[200],
                        }
                    }}
                        onClick={submitSearch}>
                        <SearchIcon sx={{ mr: "5px", fontsize: ".8rem", color: "white" }} />
                        <Typography color={"white"} variant="h5" fontWeight="500" sx={{ textTransform: "capitalize" }}>
                            {t("search")}
                        </Typography>
                    </Button>
                </Box>

                <Box display={"flex"} gap={"1rem"} alignItems={"center"}>
                    <FormControl sx={{ width: 120 }} >
                        <InputLabel id="demo-simple-select-label" >{t('sort_by')}</InputLabel>
                        <Select
                            sx={{ borderRadius: "10px", background: colors.primary[400] }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter}
                            label={t('sort_by')}
                            onChange={handleFilterChange}
                        >
                            <MenuItem value={"name"}>{t('name')}</MenuItem>
                            <MenuItem value={"revenue"}>{t('revenue')}</MenuItem>
                            <MenuItem value={"gift"}>{t('gift')}</MenuItem>
                            <MenuItem value={"revenueRate"}>{t('revenue_rate')}</MenuItem>
                            <MenuItem value={"giftRate"}>{t('gift_rate')}</MenuItem>
                            <MenuItem value={"favorite"}>{t('favorite')}</MenuItem>
                        </Select>
                    </FormControl>
                    <OrderMethodButton CALLBACK_FUNCTION={setOrderMethod} />
                </Box>
            </Box>

            <Box className='flex_media' justifyContent={"space-between"} alignItems={"center"} mb={"1rem"}>

                <Box
                    display={"flex"}
                    gap={"1rem"}
                    mr={".5rem"}
                >
                    <Box>
                        <span>&#177;5% {t('expectation')}</span>

                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ width: 25, height: 5, backgroundColor: colors.blueAccent[800], marginRight: 2 }}></Box>
                        <span>{t('above_expectation')}</span>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ width: 25, height: 5, backgroundColor: colors.redAccent[800], marginRight: 2 }}></Box>
                        <span>{t('bellow_expectation')}</span>
                    </Box>
                </Box>
            </Box>


            {/* ==========================table========================== */}
            <Box
                sx={{
                    background: "transparent",
                    overflow: "auto",
                    borderRadius: "10px",
                    border: "1px solid #E5E5E5",
                    maxHeight: "90vh",
                }}
            >
                {/* head */}
                <Box
                    sx={{
                        display: "flex",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "150px",
                        padding: "1rem 1.5rem",
                        backgroundColor: colors.primary[400]
                    }}>
                        <Typography variant="h5" color={colors.primary[100]} sx={{ fontSize: "1rem", fontWeight: "500" }} >
                            {t('machine_name')}
                        </Typography>
                    </Box>

                    {/* OFFLINE COIN HEAD */}
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        backgroundColor: colors.primary[400]
                    }}>
                        <Box sx={{ minWidth: "150px" }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", paddingLeft: "2.1rem" }}>
                                <Typography variant="h5" color={colors.primary[100]} sx={{ fontSize: "1rem", fontWeight: "500" }} >
                                    Coin
                                </Typography>

                                <IconButton sx={{ marginLeft: "5px", }} onClick={handleOfflineCoinToggle}>
                                    {isOfflineCoinCollapsed ? <ChevronRightIcon sx={{ color: colors.grey[500] }} /> : <ChevronLeftIcon sx={{ color: colors.grey[500] }} />}
                                </IconButton>
                            </Box>
                        </Box>
                        <Collapse in={!isOfflineCoinCollapsed} hidden={isOfflineCoinCollapsed}>
                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                {t('total')} Coin {/* TOTAL Amount */}
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                {t('combine_amount')} {/* Combine Amount */}
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                {t('combine_quantity')} {/* Combine Quantity */}
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                {t('immediate_amount')} {/* Immediate Amount */}
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                {t('immediate_quantity')} {/* Immediate Quantity */}
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                {t('offline_amount')} {/* Offline Amount */}
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                {t('offline_quantity')} {/* Ofline Quantity */}
                            </TableCell>
                        </Collapse>
                    </Box>

                    {/* BEA RPAY ONLINE COIN HEAD */}
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        backgroundColor: colors.primary[400]
                    }}>
                        <Box sx={{ minWidth: "150px" }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", paddingLeft: "2.1rem" }}>
                                <Typography variant="h5" color={colors.primary[100]} sx={{ fontSize: "1rem", fontWeight: "500" }} >
                                    Bear Pay
                                </Typography>

                                <IconButton sx={{ marginLeft: "5px" }} onClick={handleOnlineCoinToggle}>
                                    {isOnlineCoinCollapsed ? <ChevronRightIcon sx={{ color: colors.grey[500] }} /> : <ChevronLeftIcon sx={{ color: colors.grey[500] }} />}
                                </IconButton>
                            </Box>
                        </Box>

                        <Box display={"flex"}>
                            {/* collaps item */}
                            <Collapse in={!isOnlineCoinCollapsed} hidden={isOnlineCoinCollapsed}>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    {t('total')} Bear Pay {/* immediateAmount */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    {t('online_amount')} {/* Amount */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    {t('online_quantity')} {/* Quantity */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    {t('free_amount')} {/* Free Amount */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    {t('free_quantity')} {/* Free Quantity */}
                                </TableCell>
                            </Collapse>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "150px",
                        backgroundColor: colors.primary[400]
                    }}>
                        <Typography variant="h5" color={colors.primary[100]} sx={{ fontSize: "1rem", fontWeight: "500" }} >
                            {t('total')} {t('revenue')}
                        </Typography>
                    </Box>

                    {/* GIFT HEAD */}
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        backgroundColor: colors.primary[400]
                    }}>
                        <Box sx={{ minWidth: "150px" }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", paddingLeft: "2.1rem" }}>
                                <Typography variant="h5" color={colors.primary[100]} sx={{ fontSize: "1rem", fontWeight: "500" }} >
                                    {t('gift')}
                                </Typography>
                                <IconButton sx={{ marginLeft: "5px" }} onClick={handleGiftToggle}>
                                    {isGiftCollapsed ? <ChevronRightIcon sx={{ color: colors.grey[500] }} /> : <ChevronLeftIcon sx={{ color: colors.grey[500] }} />}
                                </IconButton>
                            </Box>
                        </Box>
                        <Box display={"flex"}>
                            {/* collaps item */}
                            <Collapse in={!isGiftCollapsed} hidden={isGiftCollapsed}>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    {t('total')} {t('gift')}{/* immediateAmount */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    {t('immediate_amount')} {/* immediateAmount */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    {t('immediate_quantity')} {/* immediateQuantity */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    {t('offline_amount')} {/* offlineAmount */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    {t('offline_quantity')} {/* offlineAmount */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    {t('combine_amount')} {/* combineAmount */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    {t('combine_quantity')} {/* combineQuantity */}
                                </TableCell>
                            </Collapse>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: commodityRecordsCollapsed ? "150px" : "750px",
                        backgroundColor: colors.primary[400]
                    }}>
                        <Typography variant="h5" color={colors.primary[100]} sx={{ fontSize: "1rem", fontWeight: "500" }} >
                            {t('total_expense')}
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "150px",
                        backgroundColor: colors.primary[400]
                    }}>
                        <Typography variant="h5" color={colors.primary[100]} sx={{ fontSize: "1rem", fontWeight: "500" }} >
                            {t('earning')}
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "150px",
                        backgroundColor: colors.primary[400]
                    }}>
                        <Typography variant="h5" color={colors.primary[100]} sx={{ fontSize: "1rem", fontWeight: "500" }} >
                            {t('expense_rate')}
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "150px",
                        backgroundColor: colors.primary[400]
                    }}>
                        <Typography variant="h5" color={colors.primary[100]} sx={{ fontSize: "1rem", fontWeight: "500" }} >
                            {t('prize_rate')}
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "150px",
                        backgroundColor: colors.primary[400]
                    }}>
                        <Typography variant="h5" color={colors.primary[100]} sx={{ fontSize: "1rem", fontWeight: "500" }} >
                            {t('details')}
                        </Typography>
                    </Box>
                </Box>

                {/* ================================================= */}
                <TableBody>
                    {loadingState ?
                        (
                            <Box
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                p={"1rem"}>
                                <Loader />
                            </Box>
                        )
                        : (
                            machineDatas.map((item, index) => {
                                return (
                                    <Box
                                        key={`${item.id}-${index}`}
                                        display={"flex"}
                                        sx={{
                                            backgroundColor: item.isBlueHighlighted
                                                ? colors.blueAccent[800]
                                                : item.isRedHighlighted
                                                    ? colors.redAccent[800]
                                                    : "transparent", alignItems: "center",
                                            justifyContent: "center",
                                            padding: "0",
                                            margin: "0",
                                        }}
                                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            minWidth: "150px",
                                            padding: ".25rem 1.5rem",
                                        }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{ m: 0, p: 0 }} >
                                                {item.name}
                                            </Typography>
                                        </TableCell>


                                        {/* OFFLINE COINS */}
                                        <Box sx={{ alignItems: "center", display: "flex" }}>
                                            <TableCell align="center"
                                                sx={{
                                                    minWidth: "150px",
                                                    padding: ".25rem 1.5rem",
                                                }}>
                                                <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                    {currencyFormatter(item.coinDetail.combineAmount + item.coinDetail.immediateAmount + item.coinDetail.offlineAmount)}
                                                </Typography>
                                            </TableCell>
                                            <Collapse in={!isOfflineCoinCollapsed} hidden={isOfflineCoinCollapsed}>
                                                <TableCell align="center"
                                                    sx={{
                                                        minWidth: "150px",
                                                        padding: ".25rem 1.5rem",
                                                    }}>
                                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                        {numberFormatter(item.coinDetail.combineAmount)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center"
                                                    sx={{
                                                        minWidth: "150px",
                                                        padding: ".25rem 1.5rem",
                                                    }}>
                                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                        {numberFormatter(item.coinDetail.combineQuantity)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center"
                                                    sx={{
                                                        minWidth: "150px",
                                                        padding: ".25rem 1.5rem",
                                                    }}>
                                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                        {numberFormatter(item.coinDetail.immediateAmount)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center"
                                                    sx={{
                                                        minWidth: "150px",
                                                        padding: ".25rem 1.5rem",
                                                    }}>
                                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                        {numberFormatter(item.coinDetail.immediateQuantity)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center"
                                                    sx={{
                                                        minWidth: "150px",
                                                        padding: ".25rem 1.5rem",
                                                    }}>
                                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                        {numberFormatter(item.coinDetail.offlineAmount)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center"
                                                    sx={{
                                                        minWidth: "150px",
                                                        padding: ".25rem 1.5rem",
                                                    }}>
                                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                        {numberFormatter(item.coinDetail.offlineQuantity)}
                                                    </Typography>
                                                </TableCell>
                                            </Collapse>
                                        </Box>

                                        {/* BEAR PAY COIN */}
                                        <Box sx={{ alignItems: "center", display: "flex" }}>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    minWidth: "150px",
                                                    padding: ".25rem 1.5rem",
                                                }}>
                                                <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                    {currencyFormatter(item.coinDetail.onlineCoinAmount + item.coinDetail.onlineFreeAmount)}
                                                </Typography>
                                            </TableCell>
                                            <Collapse in={!isOnlineCoinCollapsed} hidden={isOnlineCoinCollapsed}>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        minWidth: "150px",
                                                        padding: ".25rem 1.5rem",
                                                    }}>
                                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                        {numberFormatter(item.coinDetail.onlineCoinAmount)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        minWidth: "150px",
                                                        padding: ".25rem 1.5rem",
                                                    }}>
                                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                        {numberFormatter(item.coinDetail.onlineCoinQuantity)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        minWidth: "150px",
                                                        padding: ".25rem 1.5rem",
                                                    }}>
                                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                        {numberFormatter(item.coinDetail.onlineFreeAmount)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        minWidth: "150px",
                                                        padding: ".25rem 1.5rem",
                                                    }}>
                                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                        {numberFormatter(item.coinDetail.onlineFreeQuantity)}
                                                    </Typography>
                                                </TableCell>
                                            </Collapse>
                                        </Box>

                                        <TableCell align="center"
                                            sx={{
                                                minWidth: "150px",
                                                padding: ".25rem 1.5rem",
                                            }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {currencyFormatter(item.coinAmountTotal)}
                                            </Typography>
                                        </TableCell>


                                        {/* GIFT */}
                                        <Box sx={{ backgroundColor: "transparent", alignItems: "center", display: "flex" }}>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    minWidth: "150px",
                                                    padding: ".25rem 1.5rem",
                                                }}>
                                                <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                    {numberFormatter(item.giftDetail.immediateQuantity + item.giftDetail.offlineQuantity + item.giftDetail.combineQuantity)}
                                                </Typography>
                                            </TableCell>
                                            <Collapse in={!isGiftCollapsed} hidden={isGiftCollapsed} >
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        minWidth: "150px",
                                                        padding: ".25rem 1.5rem",
                                                    }}>
                                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                        {numberFormatter(item.giftDetail.immediateAmount)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        minWidth: "150px",
                                                        padding: ".25rem 1.5rem",
                                                    }}>
                                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                        {numberFormatter(item.giftDetail.immediateQuantity)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        minWidth: "150px",
                                                        padding: ".25rem 1.5rem",
                                                    }}>
                                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                        {numberFormatter(item.giftDetail.offlineAmount)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        minWidth: "150px",
                                                        padding: ".3rem 1.5rem",
                                                    }}>
                                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                        {numberFormatter(item.giftDetail.offlineQuantity)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        minWidth: "150px",
                                                        padding: ".25rem 1.5rem",
                                                    }}>
                                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                        {numberFormatter(item.giftDetail.combineAmount)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        minWidth: "150px",
                                                        padding: ".25rem 1.5rem",
                                                    }}>
                                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                        {numberFormatter(item.giftDetail.combineQuantity)}
                                                    </Typography>
                                                </TableCell>
                                            </Collapse>
                                        </Box>

                                        {/* expense */}
                                        <TableCell align="center"
                                            sx={{
                                                minWidth: commodityRecordsCollapsed ? "150px" : "750px",
                                                padding: ".25rem 1.5rem",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "space-between"
                                            }}>

                                            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={"5px"}>
                                                <Typography variant="h6" color={colors.primary[100]}>
                                                    {currencyFormatter(item.giftAmountTotal)}
                                                </Typography>
                                                <Button onClick={() => handleCommodityRecordsToggle(index)} sx={{ padding: "4px", minWidth: "14px" }}>
                                                    {commodityRecordsCollapsed === index ? (
                                                        <ArrowDropUpIcon sx={{ color: colors.grey[500], fontSize: "16px" }} />
                                                    ) : (
                                                        <ArrowDropDownIcon sx={{ color: colors.grey[500], fontSize: "16px" }} />
                                                    )}
                                                </Button>

                                            </Box>
                                            <MachineStatisticCommodityList commodityRecords={mockCommodityRecords} collapsed={commodityRecordsCollapsed !== index}
                                            />
                                        </TableCell>

                                        <TableCell align="center"
                                            sx={{
                                                minWidth: "150px",
                                                padding: ".25rem 1.5rem",
                                            }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {currencyFormatter(item.earning)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center"
                                            sx={{
                                                minWidth: "150px",
                                                padding: ".25rem 1.5rem",
                                            }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.revenueRate} %
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center"
                                            sx={{
                                                minWidth: "150px",
                                                padding: ".25rem 1.5rem",
                                            }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.giftRate} %
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center"
                                            sx={{
                                                minWidth: "150px",
                                                padding: ".25rem 1.5rem",
                                            }}>
                                            <Link
                                                to={"/statistic-management/machine"}
                                                state={{
                                                    data: item,
                                                }}
                                            >
                                                <Button
                                                    sx={{
                                                        padding: "0 2rem",
                                                        borderRadius: "5px",
                                                    }}>
                                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                        {t("view")}
                                                    </Typography>
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </Box>
                                );
                            }))}
                </TableBody>
            </Box >
        </>
    )
}

export default MachineStatistic