import React, { useEffect, useState, useContext, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { format } from 'date-fns';

// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { color } from '@mui/system';
import { citiesData } from "../../data/mockData";
import { GetBillboardList } from '../../graphQL/Queries';
import CreateBillboardModal from './CreateBillboardModal';
import BillboardListModal from './BillboardListModal';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';
import Refresh from '../../components/Refresh';
import Pagination from '../../components/Pagination';

const BillboardManagement = () => {
    const location = useLocation();
    const state = location.state;
    console.log(state); // output: "the-page-id"
    console.log("STATE" + state.data.id); // output: "the-page-id"
    console.log("STATE" + state.data.name); // output: "the-page-id"

    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    // ======================== STATES ========================

    // PAGINATION
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const handlePageChange = ({ limit, offset }) => {
        setLimit(limit);
        setOffset(offset);
    }


    const [searchFilter, setSearchFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [billboardData, setBillboardData] = useState([]);

    //REF
    const brandRef = useRef('');
    const searchRef = useRef('');

    const { loading, error, data } = useQuery(GetBillboardList
        , {
            variables: {
                args: [
                    {
                        id: state.data.id
                    }
                ],
            }
        }
    );
    useEffect(() => {
        if (data) {
            console.log(data.getBrand[0].managerGetBillboards);
            setBillboardData(data.getBrand[0].managerGetBillboards);
        }
        else {
            console.log("no data");
        }
    }, [data]);


    //FUNCTIONS
    const handleSearchChange = (e) => {
        setSearchFilter(e.target.value);
    };
    const handleCityChange = (e) => {
        setCityFilter(e.target.value);
    };
    const handleDelete = (e) => {
        const id = e.target.id;
        console.log(id);
        var result = window.confirm("Are you sure you want to delete this user?");
        if (result) {
            console.log("deleted");
        } else {
            console.log("not deleted");
        }
    };
    const submitSearch = () => {
        console.log(brandRef.current.value + " " + searchRef.current.value + searchFilter + cityFilter);
    }

    if (loading) return <Loader />;
    if (error) return <Error />;

    return (
        <Box p={2} position="flex" height={"100%"} overflow={"hidden"} flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>{state.data.name} - 告示牌管理</h1>
            </Box>

            {/* SEARCH DIV */}
            <Box display="flex" marginBottom={"2rem"} height={"10%"} alignItems={"center"}>
                {/* name Search */}
                <Box
                    display="flex"
                    mr={"1rem"}
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"52px"}>
                    <InputBase sx={{ ml: 2, pr: 2, flex: 1, minWidth: "200px" }} placeholder="機台名稱" inputRef={brandRef} />
                </Box>

                {/* SEARCH BTN */}
                <Button sx={{
                    backgroundColor: colors.primary[300],
                    color: colors.grey[100],
                    minWidth: "120px",
                    height: "52px",
                    marginLeft: "1rem",
                    borderRadius: "10px",
                    padding: "0px",
                    marginRight: "2rem",
                    ':hover': {
                        bgcolor: colors.primary[300],
                        border: '1px solid white',
                    }
                }}
                    onClick={submitSearch}>
                    <SearchIcon sx={{ mr: "10px", fontsize: ".8rem", color: "white" }} />
                    <Typography color={"white"} variant="h5" fontWeight="500">
                        查詢
                    </Typography>
                </Button>

                <Box
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    marginLeft={"auto"}
                    padding={"0"}
                    height={"52px"}
                >
                    <CreateBillboardModal props={state.data} />
                </Box>
            </Box>


            {/* TABLE DIV */}
            <Box
                backgroundColor={colors.primary[400]}
                borderRadius="10px"
                height={"50%"}
            >
                {/* PAGINATION & REFRESH DIV */}
                <Box
                    display="flex"
                    justifyContent="center"
                    borderBottom={`0px solid ${colors.primary[500]}`}
                    colors={colors.grey[100]}
                    p="15px"
                >
                    <Box width={"90%"}>
                        {/* pagination */}
                        <Pagination
                            limit={limit}
                            offset={offset}
                            onPageChange={handlePageChange}
                        />
                    </Box>

                    <Box width={"10%"}>
                        {/* refresh button */}
                        <Refresh
                            limit={limit}
                            offset={offset}
                            onPageChange={handlePageChange} />
                    </Box>
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    background={colors.grey[300]}
                    p="10px"
                    maxHeight={"100px"}
                >
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">標題</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">開始時間</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">結束時間</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">狀態</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">更新資料</Typography>
                    </Box>
                </Box>

                <Box
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"100%"}
                    overflow={"auto"}
                >
                    {billboardData.map((item, i) => (
                        <Box
                            key={`${item.id}-${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`3px solid ${colors.primary[500]}`}
                            p="10px"
                        >
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"} padding={"0 1rem"}>{item.title}</Box>
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{format(new Date(item.startAt * 1000), 'MM/dd/yyyy - HH:mm:ss')}</Box>
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                {item.endAt === null ? (
                                    <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                                        無
                                    </Typography>
                                ) : (
                                    format(new Date(item.endAt * 1000), 'MM/dd/yyyy - HH:mm:ss')
                                )}
                            </Box>
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                {(() => {
                                    if (item.status.name === "disable") {
                                        return (
                                            <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                                停用
                                            </Typography>
                                        )
                                    }
                                    else if (item.status.name === "banned") {
                                        return (
                                            <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                封鎖
                                            </Typography>
                                        )
                                    }
                                    else if (item.status.name === "removed") {
                                        return (
                                            <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                删除
                                            </Typography>)
                                    }
                                    else {
                                        return (
                                            <Typography variant="h5" color={colors.greenAccent[400]} sx={{ margin: ".5rem .5rem" }}>
                                                正常
                                            </Typography>
                                        )
                                    }
                                })()}
                            </Box>
                            {/* <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{currencyFormatter(machine.price)}</Box> */}
                            <Box
                                width={"20%"}
                                display={"flex"}
                                alignItems={"center"} justifyContent={"center"}
                                borderRadius="4px">
                                <BillboardListModal props={item} />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box >
    )
}

const defaultOptions = {
    significantDigits: 2,
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
    )}${options.decimalSeparator}${decimal}`
}

export default BillboardManagement