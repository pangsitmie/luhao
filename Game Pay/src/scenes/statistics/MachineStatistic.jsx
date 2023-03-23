import React, { useState, useContext, useRef } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, IconButton, useTheme, InputBase, TextField, InputAdornment, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Collapse } from "@mui/material";
import StatisticPagination from './StatisticPagination';
import { GetStoreMachineStatisticsPagination } from 'src/graphQL/Queries';
import { ColorModeContext, tokens } from "../../theme";
import { useTranslation } from 'react-i18next';
import SearchIcon from "@mui/icons-material/Search";
import OrderMethodButton from 'src/components/OrderMethodButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const MachineStatistic = ({ MACHINE_ID, START_AT_DATE_EPOCH, END_AT_DATE_EPOCH }) => {
    const { t } = useTranslation();
    const searchRef = useRef('');

    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);


    const [machineDatas, setMachineDatas] = useState([]);
    const handlePageChange = (data) => {
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


    const submitSearch = () => {

    }


    return (
        <>
            <Box className='flex_media' marginBottom={"2rem"} height={"10%"} alignItems={"center"} justifyContent={"space-between"}>
                {/* name Search */}
                <Box className='flex_media'>
                    <Box
                        display="flex"
                        backgroundColor={colors.primary[400]}
                        borderRadius="10px"
                        height={"52px"}
                        maxWidth={140}>
                        <InputBase sx={{ textTransform: "capitalize", ml: 2, pr: 2 }}
                            placeholder={`${t('machine_name')}`}
                            inputRef={searchRef} />
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
                <Box display="flex" gap={"1rem"}>
                    <FormControl sx={{ width: 140 }} >
                        <InputLabel id="demo-simple-select-label" >Filter</InputLabel>
                        <Select
                            sx={{ borderRadius: "10px", background: colors.primary[400] }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter}
                            label="Filter"
                            onChange={handleFilterChange}
                        >
                            <MenuItem value={"name"}>{t('name')}</MenuItem>
                            <MenuItem value={"revenue"}>收入</MenuItem>
                            <MenuItem value={"gift"}>總出貨</MenuItem>
                            <MenuItem value={"giftRate"}>出貨比</MenuItem>
                            <MenuItem value={"favorite"}>最愛</MenuItem>
                        </Select>
                    </FormControl>
                    <OrderMethodButton CALLBACK_FUNCTION={setOrderMethod} />
                </Box>
            </Box>

            <Paper className='mui_table_container' >
                <StatisticPagination
                    QUERY={GetStoreMachineStatisticsPagination}
                    HANDLE_PAGE_CHANGE={handlePageChange} TYPE={"GET_MACHINE_STATISTIC_LIST"}
                    ARGS_ID={MACHINE_ID}
                    START_AT={START_AT_DATE_EPOCH}
                    END_AT={END_AT_DATE_EPOCH}
                    ORDER_BY={filter}
                    ORDER_METHOD={orderMethod} />
                <Table sx={{ backgroundColor: "transparent" }}>
                    <TableHead sx={{ backgroundColor: "transparent" }}>
                        <TableRow>
                            <TableCell align="center" sx={{ minWidth: "50px" }}>
                                ID
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: "150px" }}>
                                機臺名稱
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: "150px" }}>
                                總收入
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: "150px" }}>
                                總支出
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: "150px" }}>
                                盈收比
                            </TableCell>
                            <TableCell align="center" sx={{ minWidth: "150px" }}>
                                出貨比
                            </TableCell>

                            {/* OFFLINE COIN HEAD */}
                            <TableCell align="center" sx={{ minWidth: "150px" }}>
                                <TableRow >
                                    <TableCell colSpan={isOfflineCoinCollapsed ? 1 : 6} align="center" >
                                        線下投幣
                                        <IconButton sx={{ marginLeft: "5px", marginBottom: "5px" }} onClick={handleOfflineCoinToggle}>
                                            {isOfflineCoinCollapsed ? <ExpandMoreIcon sx={{ color: "white" }} /> : <ExpandLessIcon sx={{ color: "white" }} />}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                        總線下投幣 {/* immediateAmount */}
                                    </TableCell>

                                    <Collapse in={!isOfflineCoinCollapsed} hidden={isOfflineCoinCollapsed}>
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
                                </TableRow>
                            </TableCell>

                            {/* ONLINE COIN HEAD */}
                            <TableCell>
                                <TableRow >
                                    <TableCell colSpan={isOnlineCoinCollapsed ? 1 : 5} align="center" >
                                        線上投幣
                                        <IconButton sx={{ marginLeft: "5px", marginBottom: "5px" }} onClick={handleOnlineCoinToggle}>
                                            {isOnlineCoinCollapsed ? <ExpandMoreIcon sx={{ color: "white" }} /> : <ExpandLessIcon sx={{ color: "white" }} />}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                        總線上投幣 {/* immediateAmount */}
                                    </TableCell>

                                    {/* collaps item */}
                                    <Collapse in={!isOnlineCoinCollapsed} hidden={isOnlineCoinCollapsed}>
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
                                </TableRow>
                            </TableCell>

                            {/* GIFT HEAD */}
                            <TableCell>
                                <TableRow >
                                    <TableCell colSpan={isGiftCollapsed ? 1 : 6} align="center" >
                                        禮品
                                        <IconButton sx={{ marginLeft: "5px", marginBottom: "5px" }} onClick={handleGiftToggle}>
                                            {isGiftCollapsed ? <ExpandMoreIcon sx={{ color: "white" }} /> : <ExpandLessIcon sx={{ color: "white" }} />}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                        線禮品{/* immediateAmount */}
                                    </TableCell>

                                    {/* collaps item */}
                                    <Collapse in={!isGiftCollapsed} hidden={isGiftCollapsed}>
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
                                </TableRow>
                            </TableCell>




                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* later filled with data */}
                        {machineDatas.map((item, i) => (
                            <TableRow
                                key={`${item.id}-${i}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" sx={{ minWidth: "50px", backgroundColor: "#3D4354" }}>
                                    {item.node.id}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px" }}>
                                    {item.node.name}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", backgroundColor: "#3D4354" }}>
                                    {item.node.coinAmountTotal}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px" }}>
                                    {item.node.giftAmountTotal}
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px", backgroundColor: "#3D4354" }}>
                                    {item.node.revenueRate} %
                                </TableCell>
                                <TableCell align="center" sx={{ minWidth: "150px" }}>
                                    {item.node.giftRate} %
                                </TableCell>

                                {/* OFFLINE COINS */}
                                <TableCell align="center" sx={{ backgroundColor: "#3D4354" }}>
                                    <TableRow sx={{ display: "table-row" }}>
                                        <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                            {item.node.coinDetail.combineAmount + item.node.coinDetail.immediateAmount + item.node.coinDetail.offlineAmount}
                                        </TableCell>
                                        <Collapse in={!isOfflineCoinCollapsed} hidden={isOfflineCoinCollapsed}>
                                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                                {item.node.coinDetail.combineAmount}
                                            </TableCell>
                                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                                {item.node.coinDetail.combineQuantity}
                                            </TableCell>
                                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                                {item.node.coinDetail.immediateAmount}
                                            </TableCell>
                                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                                {item.node.coinDetail.immediateQuantity}
                                            </TableCell>
                                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                                {item.node.coinDetail.offlineAmount}
                                            </TableCell>
                                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                                {item.node.coinDetail.offlineQuantity}
                                            </TableCell>
                                        </Collapse>
                                    </TableRow>
                                </TableCell>

                                {/* ONLINE COIN */}
                                <TableCell align="center" sx={{ backgroundColor: "transparent" }}>
                                    <TableRow sx={{ display: "table-row" }}>
                                        <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                            {item.node.coinDetail.onlineCoinAmount + item.node.coinDetail.onlineFreeAmount}
                                        </TableCell>
                                        <Collapse in={!isOnlineCoinCollapsed} hidden={isOnlineCoinCollapsed}>
                                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                                {item.node.coinDetail.onlineCoinAmount}
                                            </TableCell>
                                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                                {item.node.coinDetail.onlineCoinQuantity}
                                            </TableCell>
                                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                                {item.node.coinDetail.onlineFreeAmount}
                                            </TableCell>
                                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                                {item.node.coinDetail.onlineFreeQuantity}
                                            </TableCell>
                                        </Collapse>
                                    </TableRow>
                                </TableCell>

                                {/* GIFT */}
                                <TableCell align="center" sx={{ backgroundColor: "#3D4354" }}>
                                    <TableRow sx={{ display: "table-row" }}>
                                        <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                            {item.node.giftDetail.immediateAmount + item.node.giftDetail.offlineAmount + item.node.giftDetail.combineAmount}
                                        </TableCell>
                                        <Collapse in={!isGiftCollapsed} hidden={isGiftCollapsed}>
                                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                                {item.node.giftDetail.immediateAmount}
                                            </TableCell>
                                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                                {item.node.giftDetail.immediateQuantity}
                                            </TableCell>
                                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                                {item.node.giftDetail.offlineAmount}
                                            </TableCell>
                                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                                {item.node.giftDetail.offlineQuantity}
                                            </TableCell>
                                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                                {item.node.giftDetail.combineAmount}
                                            </TableCell>
                                            <TableCell align="center" sx={{ minWidth: "150px", borderBottom: "none" }}>
                                                {item.node.giftDetail.combineQuantity}
                                            </TableCell>
                                        </Collapse>
                                    </TableRow>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </>
    )
}

export default MachineStatistic