import React, { useState, useContext, useRef, useEffect } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, IconButton, useTheme, InputBase, TextField, InputAdornment, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Collapse } from "@mui/material";
import StatisticPagination from './StatisticPagination';
import { GetStoreMachineStatisticsPagination } from 'src/graphQL/Queries';
import { ColorModeContext, tokens } from "../../theme";
import { useTranslation } from 'react-i18next';
import SearchIcon from "@mui/icons-material/Search";
import OrderMethodButton from 'src/components/OrderMethodButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const MachineStatistic = ({ MACHINE_ID, START_AT_DATE_EPOCH, END_AT_DATE_EPOCH }) => {
    const { t } = useTranslation();
    const searchValueRef = useRef('');

    // const revenueFilter = useRef(500);
    // const revenueRateFilter = useRef(0.75);
    // const giftRateFilter = useRef(0.25);

    const [revenueFilter, setRevenueFilter] = useState(500);
    const handleRevenueFilterChange = (event) => {
        setRevenueFilter(event.target.value);
    };

    const [revenueRateFilter, setRevenueRateFilter] = useState(75);
    const handleRevenueRateFilterChange = (event) => {
        setRevenueRateFilter(event.target.value);
    };

    const [giftRateFilter, setGiftRateFilter] = useState(25);
    const handleGiftRateFilterChange = (event) => {
        setGiftRateFilter(event.target.value);
    };

    useEffect(() => {
        console.log('revenueFilter', revenueFilter);
        console.log('revenueRateFilter', revenueRateFilter);
        console.log('giftRateFilter', giftRateFilter);
    }, [revenueFilter, revenueRateFilter, giftRateFilter]);


    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [initMachineDatas, setInitMachineDatas] = useState([]);
    const [machineDatas, setMachineDatas] = useState([]);
    const handlePageChange = (data) => {
        setInitMachineDatas(data);
        setMachineDatas(data);
    }

    const [filter, setFilter] = useState('name');
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const [orderMethod, setOrderMethod] = useState('asc');


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



    //SEARCH FUNCTION
    const arraySearch = (array, keyword, filter) => {
        const searchTerm = keyword

        return array.filter(value => {
            return value.node.name.match(new RegExp(searchTerm, 'g'))
        })
    }
    const submitSearch = () => {
        //CALL SEARCH FUNCTION
        let value = searchValueRef.current.value;
        if (value.length > 2) {
            let search = arraySearch(machineDatas, value);
            setMachineDatas(search)
        } else { //IF SEARCH VALUE IS LESS THAN 3 CHARACTERS, RESET BRANDS TO INIT BRANDS
            setMachineDatas(initMachineDatas)
        }
    }


    return (
        <>
            <Box className='flex_media' marginBottom={"2rem"} justifyContent={"space-between"}>
                {/* name Search */}
                {/* <Box>
                    revenue filter {revenueFilter} <br />
                    revenue rate filter {revenueRateFilter} <br />
                    gift rate filter {giftRateFilter} <br />
                </Box> */}

                <Box display={"flex"} gap={"1rem"}>
                    <Box
                        display="flex"
                        backgroundColor={colors.primary[400]}
                        borderRadius="10px"
                        height={"52px"}
                        maxWidth={140}>
                        <InputBase sx={{ textTransform: "capitalize", ml: 2, pr: 2 }}
                            placeholder={`${t('machine_name')}`}
                            inputRef={searchValueRef} />
                    </Box>
                    {/* SEARCH BTN */}
                    <Button sx={{
                        backgroundColor: colors.primary[300],
                        color: colors.grey[100],
                        minWidth: "120px",
                        height: "52px",
                        borderRadius: "10px",
                        ':hover': {
                            bgcolor: colors.primary[300],
                            border: '1px solid white',
                        }
                    }}
                        onClick={submitSearch}>
                        <SearchIcon sx={{ mr: "10px", fontsize: ".8rem", color: "white" }} />
                        <Typography color={"white"} variant="h5" fontWeight="500">
                            {t('search')}
                        </Typography>
                    </Button>
                </Box>

                <Box display="flex" alignItems={"center"} gap={"1rem"} mr=".5rem">
                    <TextField
                        variant="outlined"
                        type="text"
                        label="預估收入"
                        onChange={handleRevenueFilterChange}
                        value={revenueFilter}
                        sx={{ width: "120px", backgroundColor: colors.primary[400], color: "black" }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">元</InputAdornment>,
                        }}
                    />
                    <TextField
                        variant="outlined"
                        type="text"
                        label="預估盈收比"
                        onChange={handleRevenueRateFilterChange}
                        value={revenueRateFilter}
                        sx={{ width: "120px", backgroundColor: colors.primary[400], color: "black" }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                    />
                    <TextField
                        variant="outlined"
                        type="text"
                        label="預估出貨比"
                        onChange={handleGiftRateFilterChange}
                        value={giftRateFilter}
                        sx={{ width: "120px", backgroundColor: colors.primary[400], color: "black" }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                    />
                    <FormControl sx={{ width: 140 }} >
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
                            <MenuItem value={"revenue"}>收入</MenuItem>
                            <MenuItem value={"gift"}>出貨</MenuItem>
                            <MenuItem value={"revenueRate"}>盈收比</MenuItem>
                            <MenuItem value={"giftRate"}>出貨比</MenuItem>
                            <MenuItem value={"favorite"}>最愛</MenuItem>
                        </Select>
                    </FormControl>
                    <OrderMethodButton CALLBACK_FUNCTION={setOrderMethod} />
                </Box>
            </Box>

            <Box className='flex_media' justifyContent={"space-between"} alignItems={"center"}>
                <Box>
                    <StatisticPagination
                        QUERY={GetStoreMachineStatisticsPagination}
                        HANDLE_PAGE_CHANGE={handlePageChange} TYPE={"GET_MACHINE_STATISTIC_LIST"}
                        ARGS_ID={MACHINE_ID}
                        START_AT={START_AT_DATE_EPOCH}
                        END_AT={END_AT_DATE_EPOCH}
                        ORDER_BY={filter}
                        ORDER_METHOD={orderMethod} />
                </Box>
                <Box display={"flex"} gap={"1rem"}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ width: 25, height: 5, backgroundColor: colors.blueAccent[800], marginRight: 2 }}></Box>
                        <div>低於預期</div>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ width: 25, height: 5, backgroundColor: colors.redAccent[800], marginRight: 2 }}></Box>
                        <div>超出預期</div>
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
                }}
            >
                {/* head */}
                <Box sx={{
                    display: "flex",
                }} >
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "120px",
                        padding: "1rem 1.5rem",
                        backgroundColor: colors.primary[400]
                    }}>
                        <Typography variant="h5" color={colors.primary[100]} sx={{ fontSize: "1rem", fontWeight: "500" }} >
                            機臺名稱
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
                                    {isOfflineCoinCollapsed ? <ChevronRightIcon sx={{ color: colors.primary[800] }} /> : <ChevronLeftIcon sx={{ color: colors.primary[800] }} />}
                                </IconButton>
                            </Box>
                        </Box>
                        <Collapse in={!isOfflineCoinCollapsed} hidden={isOfflineCoinCollapsed}>
                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                總Coin {/* TOTAL Amount */}
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                融合上傳金額 {/* Combine Amount */}
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                融合上傳數量 {/* Combine Quantity */}
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                即時上傳金額 {/* Immediate Amount */}
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                即時上傳數量 {/* Immediate Quantity */}
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                離線上傳金額 {/* Offline Amount */}
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                離線上傳數量 {/* Ofline Quantity */}
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
                                    {isOnlineCoinCollapsed ? <ChevronRightIcon sx={{ color: colors.primary[800] }} /> : <ChevronLeftIcon sx={{ color: colors.primary[800] }} />}
                                </IconButton>
                            </Box>
                        </Box>

                        <Box display={"flex"}>
                            {/* collaps item */}
                            <Collapse in={!isOnlineCoinCollapsed} hidden={isOnlineCoinCollapsed}>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    總 Bear Pay {/* immediateAmount */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    線上付費幣上傳金額 {/* Amount */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    線上付費幣上傳數量 {/* Quantity */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    線上免費幣上傳金額 {/* Free Amount */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    線上免費幣上傳數量 {/* Free Quantity */}
                                </TableCell>
                            </Collapse>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "120px",
                        backgroundColor: colors.primary[400]
                    }}>
                        <Typography variant="h5" color={colors.primary[100]} sx={{ fontSize: "1rem", fontWeight: "500" }} >
                            總收入
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
                                    出貨
                                </Typography>
                                <IconButton sx={{ marginLeft: "5px" }} onClick={handleGiftToggle}>
                                    {isGiftCollapsed ? <ChevronRightIcon sx={{ color: colors.primary[800] }} /> : <ChevronLeftIcon sx={{ color: colors.primary[800] }} />}
                                </IconButton>
                            </Box>
                        </Box>
                        <Box display={"flex"}>
                            {/* collaps item */}
                            <Collapse in={!isGiftCollapsed} hidden={isGiftCollapsed}>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    總出貨{/* immediateAmount */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    即時上傳金額 {/* immediateAmount */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    即時上傳數量 {/* immediateQuantity */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    離線上傳金額 {/* offlineAmount */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    離線上傳數量 {/* offlineAmount */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    融合上傳金額 {/* combineAmount */}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                    融合上傳數量 {/* combineQuantity */}
                                </TableCell>
                            </Collapse>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "120px",
                        backgroundColor: colors.primary[400]
                    }}>
                        <Typography variant="h5" color={colors.primary[100]} sx={{ fontSize: "1rem", fontWeight: "500" }} >
                            總支出
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "120px",
                        backgroundColor: colors.primary[400]
                    }}>
                        <Typography variant="h5" color={colors.primary[100]} sx={{ fontSize: "1rem", fontWeight: "500" }} >
                            盈收比
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "120px",
                        backgroundColor: colors.primary[400]
                    }}>
                        <Typography variant="h5" color={colors.primary[100]} sx={{ fontSize: "1rem", fontWeight: "500" }} >
                            出貨比
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
                            細節資料
                        </Typography>
                    </Box>
                </Box>

                {/* ================================================= */}
                <TableBody>
                    {/* later filled with data */}
                    {machineDatas.map((item, i) => {

                        let isBellowRevenueFilter = item.node.coinAmountTotal < revenueFilter;

                        let isBellowRevenueRateFilter = parseInt(item.node.revenueRate + 7) < parseInt(revenueRateFilter);
                        let isAboveRevenueRateFilter = parseInt(item.node.revenueRate - 7) > parseInt(revenueRateFilter);

                        let isBellowGiftRateFilter = parseInt(item.node.giftRate + 7) < parseInt(giftRateFilter);
                        let isAboveGiftRateFilter = parseInt(item.node.giftRate - 7) > parseInt(giftRateFilter);

                        const isOverHighlighted = (isAboveRevenueRateFilter || isAboveGiftRateFilter);
                        const isBellowHighlighted = (isBellowRevenueFilter || isBellowRevenueRateFilter || isBellowGiftRateFilter)

                        return (
                            <Box
                                key={`${item.id}-${i}`}
                                display={"flex"}
                                sx={{
                                    backgroundColor: isOverHighlighted ? colors.redAccent[800] : (isBellowHighlighted ? colors.blueAccent[800] : "transparent"),
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    minWidth: "120px",
                                    padding: "1rem 1.5rem",
                                }}>
                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                        {item.node.name}
                                    </Typography>
                                </TableCell>

                                {/* OFFLINE COINS */}
                                <Box sx={{ alignItems: "center", display: "flex", }}>
                                    <TableCell align="center" sx={{ minWidth: "150px" }}>
                                        <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                            {item.node.coinDetail.combineAmount + item.node.coinDetail.immediateAmount + item.node.coinDetail.offlineAmount}
                                        </Typography>
                                    </TableCell>
                                    <Collapse in={!isOfflineCoinCollapsed} hidden={isOfflineCoinCollapsed}>
                                        <TableCell align="center" sx={{ minWidth: "150px" }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.node.coinDetail.combineAmount}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ minWidth: "150px" }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.node.coinDetail.combineQuantity}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ minWidth: "150px" }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.node.coinDetail.immediateAmount}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ minWidth: "150px" }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.node.coinDetail.immediateQuantity}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ minWidth: "150px" }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.node.coinDetail.offlineAmount}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ minWidth: "150px" }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.node.coinDetail.offlineQuantity}
                                            </Typography>
                                        </TableCell>
                                    </Collapse>
                                </Box>

                                {/* BEAR PAY COIN */}
                                <Box sx={{ alignItems: "center", display: "flex" }}>
                                    <TableCell align="center" sx={{ minWidth: "150px" }}>
                                        <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                            {item.node.coinDetail.onlineCoinAmount + item.node.coinDetail.onlineFreeAmount}
                                        </Typography>
                                    </TableCell>
                                    <Collapse in={!isOnlineCoinCollapsed} hidden={isOnlineCoinCollapsed}>
                                        <TableCell align="center" sx={{ minWidth: "150px" }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.node.coinDetail.onlineCoinAmount}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ minWidth: "150px" }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.node.coinDetail.onlineCoinQuantity}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ minWidth: "150px" }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.node.coinDetail.onlineFreeAmount}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ minWidth: "150px" }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.node.coinDetail.onlineFreeQuantity}
                                            </Typography>
                                        </TableCell>
                                    </Collapse>
                                </Box>

                                <TableCell align="center" sx={{ minWidth: "120px" }}>
                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                        {item.node.coinAmountTotal}
                                    </Typography>
                                </TableCell>


                                {/* GIFT */}
                                <Box sx={{ backgroundColor: "transparent", alignItems: "center", display: "flex" }}>
                                    <TableCell align="center" sx={{ minWidth: "150px" }}>
                                        <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                            {item.node.giftDetail.immediateAmount + item.node.giftDetail.offlineAmount + item.node.giftDetail.combineAmount}
                                        </Typography>
                                    </TableCell>
                                    <Collapse in={!isGiftCollapsed} hidden={isGiftCollapsed} >
                                        <TableCell align="center" sx={{ minWidth: "150px" }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.node.giftDetail.immediateAmount}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ minWidth: "150px" }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.node.giftDetail.immediateQuantity}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ minWidth: "150px" }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.node.giftDetail.offlineAmount}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ minWidth: "150px" }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.node.giftDetail.offlineQuantity}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ minWidth: "150px" }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.node.giftDetail.combineAmount}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ minWidth: "150px" }}>
                                            <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                                {item.node.giftDetail.combineQuantity}
                                            </Typography>
                                        </TableCell>
                                    </Collapse>
                                </Box>

                                <TableCell align="center" sx={{ minWidth: "120px" }}>
                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                        {item.node.giftAmountTotal}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "120px" }}>
                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                        {item.node.revenueRate} %
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "120px", }}>
                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                        {item.node.giftRate} %
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", }}>
                                    <Typography variant="h6" color={colors.primary[100]} sx={{}} >
                                        {t("view")}
                                    </Typography>
                                </TableCell>
                            </Box>
                        );
                    })}
                </TableBody>

            </Box >
        </>
    )
}

export default MachineStatistic