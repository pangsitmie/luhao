import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';

// QUERIES
import { useQuery } from '@apollo/client'
import { GetAllStores } from '../../graphQL/Queries'

// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

// COMPONENETS
import { citiesData } from "../../data/mockData";
import StoreListModal from './StoreListModal';
import CreateStoreModal from './CreateStoreModal'
import Pagination from '../../components/Pagination';
import Refresh from '../../components/Refresh';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';

import { useDispatch, useSelector } from "react-redux";
import { BRAND_GetAllStores } from 'src/graphQL/BrandPrincipalQueries';
import CreateStoreModal_B from './CreateStoreModal_B';
import { STORE_GetAllStores } from 'src/graphQL/StorePrincipalQueries';

const StoreManagement = () => {
    const { entityName } = useSelector((state) => state.entity);


    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // STATES
    const [searchFilter, setSearchFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const handleCityChange = (e) => {
        setCityFilter(e.target.value);
    };


    //REF
    const brandRef = useRef('');
    const searchRef = useRef('');

    // PAGINATION
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const handlePageChange = ({ limit, offset }) => {
        setLimit(limit);
        setOffset(offset);
    }

    //FUNCTIONS
    const handleSearchChange = (e) => {
        setSearchFilter(e.target.value);
    };


    const submitSearch = () => {
        console.log(brandRef.current.value + " " + searchRef.current.value + searchFilter + cityFilter);
        //CALL SEARCH FUNCTION
        let brandValue = brandRef.current.value;
        let storeValue = searchRef.current.value;
        if (brandValue.length > 2 && storeValue.length === 0) {
            let search = brandArraySearch(stores, brandValue);
            setStores(search)
        }
        else if (brandValue.length === 0 && storeValue.length > 2) {
            let search = storeArraySearch(stores, storeValue);
            setStores(search)
        }
        else { //IF SEARCH VALUE IS LESS THAN 3 CHARACTERS, RESET BRANDS TO INIT BRANDS
            setStores(initStores)
        }
    }

    //BRAND SEARCH FUNCTION
    const brandArraySearch = (array, keyword) => {
        const searchTerm = keyword

        return array.filter(value => {
            return value.brand.name.match(new RegExp(searchTerm, 'g'))
        })
    }

    // STORE SEARCH FUNCTION
    const storeArraySearch = (array, keyword) => {
        console.log(array, keyword);
        console.log()
        const searchTerm = keyword

        return array.filter(value => {
            return value.name.match(new RegExp(searchTerm, 'g'))
        })
    }

    //========================== GRAPHQL ==========================
    let STORE_INIT_QUERY;
    switch (entityName) {
        case 'company':
            STORE_INIT_QUERY = GetAllStores;
            break;
        case 'brand':
            STORE_INIT_QUERY = BRAND_GetAllStores;
            break;
        case 'store':
            STORE_INIT_QUERY = STORE_GetAllStores;
            break;
        default:
            break;
    }


    const { loading, error, data } = useQuery(STORE_INIT_QUERY, {
        variables: { limit, offset }
    });
    const [initStores, SetInitStores] = useState([]);
    const [stores, setStores] = useState([]);

    useEffect(() => {
        if (data) {
            switch (entityName) {
                case 'company':
                    setStores(data.managerGetStores);
                    SetInitStores(data.managerGetStores);
                    break;
                case 'brand':
                    console.log(data.getBrandPrincipal.brands[0].managerGetStores)
                    setStores(data.getBrandPrincipal.brands[0].managerGetStores);
                    SetInitStores(data.getBrandPrincipal.brands[0].managerGetStores);
                    break;
                case 'store':
                    setStores(data.getStorePrincipal.stores);
                    SetInitStores(data.getStorePrincipal.stores);
                    break;
                default:
                    break;
            }
        }
    }, [data, offset]);


    useEffect(() => {
        if (data) {

        }
    }, [data]);

    if (loading) return <Loader />;
    if (error) return <Error />;

    return (
        <Box p={2} position="flex" flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>店面管理</h1>
            </Box>

            {/* SEARCH DIV */}
            <Box className='flex_media' marginBottom={"2rem"} height={"10%"} alignItems={"center"}>
                {/* name Search */}
                <Box
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"52px"}
                    maxWidth={120}>
                    <InputBase sx={{ ml: 2, pr: 2, flex: 1, minWidth: "200px" }} placeholder="品牌名" inputRef={brandRef} />
                </Box>
                <Box
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"52px"}
                    maxWidth={140}>
                    <InputBase sx={{ m: "0 1rem", height: "100%" }} placeholder="店面名" inputRef={searchRef} />
                </Box>
                <FormControl sx={{ width: 120 }}>
                    <InputLabel id="demo-simple-select-label" >縣市過濾</InputLabel>
                    <Select
                        sx={{ borderRadius: "10px", background: colors.primary[400], height: "100%", width: "auto" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={cityFilter}
                        label="cityFilter"
                        onChange={handleCityChange}
                    >
                        {citiesData.map((city, i) => (
                            <MenuItem
                                value={city.name}
                                key={`${city.id}-${i}`}
                            >
                                {city.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

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
                    {entityName === 'company' ? <CreateStoreModal /> :
                        entityName === 'brand' ? <CreateStoreModal_B /> : null
                    }
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
                    colors={colors.grey[100]}
                    p="10px"
                >

                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">店面名稱</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">狀態</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">商品資料</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">機臺資料</Typography>
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
                    {stores.map((store, i) => (
                        <Box
                            key={`${store.id}-${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`3px solid ${colors.primary[500]}`}
                            p="10px"
                        >
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{store.name}</Box>
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                {(() => {
                                    if (store.status.name === "disable") {
                                        return (
                                            <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                                停用
                                            </Typography>)
                                    }
                                    else if (store.status.name === "banned") {
                                        return (
                                            <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                封鎖
                                            </Typography>)
                                    }
                                    else if (store.status.name === "removed") {
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

                            {/* BUTTON TO MACHINE MANAGEMENT */}
                            <Box
                                width={"20%"}
                                height={"100%"}
                                display={"flex"}
                                alignItems={"center"} justifyContent={"center"}
                                borderRadius="4px"
                            >
                                <Link
                                    to={"/commodity-management"}
                                    state={{
                                        data: store,
                                    }}
                                >
                                    <Button sx={{ color: colors.primary[100], border: "1px solid" + colors.grey[200], borderRadius: "10px", fontSize: ".9rem", padding: ".5rem 2rem" }}>
                                        商品
                                    </Button>
                                </Link>
                            </Box>
                            <Box
                                width={"20%"}
                                height={"100%"}
                                display={"flex"}
                                alignItems={"center"} justifyContent={"center"}
                                borderRadius="4px"
                            >
                                <Link
                                    to={"/machine-management"}
                                    state={{
                                        data: store,
                                    }}
                                >
                                    <Button sx={{ color: colors.primary[100], border: "1px solid" + colors.grey[200], borderRadius: "10px", fontSize: ".9rem", padding: ".5rem 2rem" }}>
                                        機台
                                    </Button>
                                </Link>
                            </Box>
                            <Box
                                width={"20%"}
                                display={"flex"}
                                alignItems={"center"} justifyContent={"center"}
                                borderRadius="4px">
                                <StoreListModal props={store} />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box >
    )
}

export default StoreManagement