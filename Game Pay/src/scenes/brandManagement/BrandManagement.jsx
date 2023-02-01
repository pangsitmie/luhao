import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { useQuery } from '@apollo/client'
// import { format } from 'date-fns';

// QUERIES
import { GetAllBrands } from '../../graphQL/Queries'
// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import BrandListModal from './BrandListModal';
import CreateBrandModal from './CreateBrandModal';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import Refresh from '../../components/Refresh';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';


const BrandManagement = () => {
    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ========================== STATES AND HANDLERS ==========================

    const [filter, setFilter] = useState('品牌名');
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const [status, setStatus] = useState('');
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const [review, setReview] = useState('');
    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    // ========================== REF ==========================
    const searchValueRef = useRef('');
    const filterRef = useRef('品牌名');

    //========================== GRAPHQL ==========================

    // PAGINATION
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const handlePageChange = ({ limit, offset }) => {
        setLimit(limit);
        setOffset(offset);
    }

    const [initBrands, setInitBrands] = useState([]);
    const [brands, setBrands] = useState([]);

    const { loading, error, data } = useQuery(GetAllBrands, {
        variables: { limit, offset }
    });
    useEffect(() => {
        if (data) {
            setInitBrands(data.managerGetBrands); //all brand datas
            setBrands(data.managerGetBrands); //datas for display
        }
    }, [data, offset]);

    // ========================== FUNCTIONS ==========================
    const submitSearch = () => {
        // LOG SEARCH STATES
        console.log("search: " + searchValueRef.current.value + " " + status + " " + review);

        //CALL SEARCH FUNCTION
        let value = searchValueRef.current.value;
        if (value.length > 2) {
            let search = arraySearch(brands, value);
            setBrands(search)
        } else { //IF SEARCH VALUE IS LESS THAN 3 CHARACTERS, RESET BRANDS TO INIT BRANDS
            setBrands(initBrands)
        }
    };

    //SEARCH FUNCTION
    const arraySearch = (array, keyword, filter) => {
        const searchTerm = keyword

        return array.filter(value => {
            return value.name.match(new RegExp(searchTerm, 'g')) ||
                value.principal.name.match(new RegExp(searchTerm, 'g'))
        })
    }




    if (loading) return <Loader />;
    if (error) return <Error />;
    // ========================== RETURN ==========================
    return (
        // here
        <Box p={2} position="flex" height={"100%"} overflow={"hidden"} flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>品牌管理</h1>
            </Box>

            {/* here */}
            {/* SEARCH DIV */}
            <Box display="flex" marginBottom={"2rem"} height={"10%"} alignItems={"center"}>
                {/* name Search */}
                <Box
                    display="flex"
                    mr={"1rem"}
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"52px"}>
                    <InputBase sx={{ ml: 2, pr: 2, flex: 1, width: "200px" }} placeholder="品牌名 或 負責人" inputRef={searchValueRef} />
                </Box>
                <FormControl sx={{ minWidth: 150, mr: "1rem" }} >
                    <InputLabel id="demo-simple-select-label" >狀態</InputLabel>
                    <Select
                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={handleStatusChange}
                    >
                        <MenuItem value={"無"}>無</MenuItem>
                        <MenuItem value={"正常"}>正常</MenuItem>
                        <MenuItem value={"停用"}>停用</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }} >
                    <InputLabel id="demo-simple-select-label" >審核</InputLabel>
                    <Select
                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={review}
                        label="Review"
                        onChange={handleReviewChange}
                    >
                        <MenuItem value={"無"}>無</MenuItem>
                        <MenuItem value={"通過"}>通過</MenuItem>
                        <MenuItem value={"待審核"}>待審核</MenuItem>
                        <MenuItem value={"封鎖"}>封鎖</MenuItem>
                    </Select>
                </FormControl>
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
                    borderRadius="10px"
                    marginLeft={"auto"}
                    height={"52px"}
                    padding={"0"}
                >
                    <CreateBrandModal />
                </Box>
            </Box>

            {/* here */}
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
                >
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">品牌名稱</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">品牌負責人</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">狀態</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">告示牌管理</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">更新資料</Typography>
                    </Box>
                </Box>

                {/* here */}
                <Box
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"100%"}
                    overflow={"auto"}
                >
                    {/* MAP DATA */}
                    {brands.map((brand, i) => (
                        <Box
                            key={`${brand.id}-${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`3px solid ${colors.primary[500]}`}
                            p="10px"
                        >
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{brand.name}</Box>
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{brand.principal.name}</Box>
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                {(() => {
                                    if (brand.status.name === "disable") {
                                        return (
                                            <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                                停用
                                            </Typography>)
                                    }
                                    else if (brand.status.name === "banned") {
                                        return (
                                            <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                封鎖
                                            </Typography>)
                                    }
                                    else if (brand.status.name === "removed") {
                                        return (
                                            <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                移除
                                            </Typography>)
                                    }
                                    else {
                                        return (
                                            <Typography variant="h5" color={colors.greenAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                正常
                                            </Typography>)
                                    }
                                })()}
                            </Box>
                            <Box
                                width={"20%"}
                                height={"100%"}
                                display={"flex"}
                                alignItems={"center"} justifyContent={"center"}
                                borderRadius="4px"
                            >
                                <Link
                                    to={"/billboard-management"}
                                    state={{
                                        data: brand,
                                    }}
                                >
                                    <Button sx={{ color: colors.primary[100], border: "1px solid" + colors.grey[200], borderRadius: "10px", fontSize: ".9rem", padding: ".5rem 1.2rem" }}>
                                        告示牌管理
                                    </Button>
                                </Link>
                            </Box>

                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                <BrandListModal props={brand} />
                            </Box>
                        </Box>
                    ))}

                </Box>

            </Box>
        </Box >
    )
}

export default BrandManagement