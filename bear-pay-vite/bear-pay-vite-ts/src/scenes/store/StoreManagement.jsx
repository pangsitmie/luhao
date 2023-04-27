import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';

// QUERIES
import { GetStoreListPagination, SearchStoreByName } from '../../graphQL/Queries'

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
import Loader from '../../components/loader/Loader';

import { useSelector } from "react-redux";
import { BRAND_GetAllStores } from 'src/graphQL/BrandPrincipalQueries';
import CreateStoreModal_B from './CreateStoreModal_B';
import { STORE_GetAllStores } from 'src/graphQL/StorePrincipalQueries';
import { useTranslation } from 'react-i18next';
import { useLazyQuery } from '@apollo/client';
import { toast } from 'react-toastify';

const StoreManagement = () => {
    const { entityName } = useSelector((state) => state.entity);
    const { t } = useTranslation();


    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [initStores, SetInitStores] = useState([]);
    const [stores, setStores] = useState([]);
    const handlePageChange = (data) => {
        setStores(data);
        SetInitStores(data);
    }

    // STATES
    const [searchFilter, setSearchFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const handleCityChange = (e) => {
        setCityFilter(e.target.value);
    };

    // LOADING STATE
    const [loadingState, setLoadingState] = useState(false);
    const handleLoadingState = (loading) => {
        setLoadingState(loading);
    }

    // ========================== SEARCH ==========================
    const searchValueRef = useRef('');

    const [ApolloSearchStoredByName, { loading, error, data }] = useLazyQuery(SearchStoreByName);
    useEffect(() => {
        if (data) {
            console.log(data);
            if (data.getStore.length > 0) {
                const searchData = [{ node: data.getStore[0] }];
                console.log(searchData);
                setStores(searchData);
            } else {
                toast.error(t('cant_find'));
            }
        }
        if (error) {
            toast.error(error.message);
        }
    }, [data])

    const submitSearch = () => {
        // LOG SEARCH STATES
        let value = searchValueRef.current.value;
        if (value === "") {
            setStores(initStores);
            return;
        }

        console.log("search " + value);

        ApolloSearchStoredByName({
            variables: {
                args: [
                    {
                        name: value
                    }
                ]
            }
        });

        console.log("search finish");
    };

    //========================== GRAPHQL ==========================
    let STORE_INIT_QUERY;
    let PAGINATION_PATH_TYPE;

    switch (entityName) {
        case 'company':
            STORE_INIT_QUERY = GetStoreListPagination;
            PAGINATION_PATH_TYPE = "GET_STORE_LIST"
            break;
        case 'brand':
            STORE_INIT_QUERY = BRAND_GetAllStores;
            PAGINATION_PATH_TYPE = "GET_BRAND_PRINCIPAL_STORE_LIST"
            break;
        case 'store':
            STORE_INIT_QUERY = STORE_GetAllStores;
            PAGINATION_PATH_TYPE = "GET_STORE_PRINCIPAL_STORE_LIST"
            break;
        default:
            break;
    }





    const [refetchCount, setRefetchCount] = useState(0);
    const triggerRefetch = () => {
        setRefetchCount(refetchCount + 1);
    };


    return (
        <Box p={2} position="flex" flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>{t('store_management')}</h1>
            </Box>

            {/* SEARCH DIV */}
            <Box display={"flex"} marginBottom={"2rem"} alignItems={"center"} gap={"1rem"}>
                {/* name Search */}
                <Box
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"52px"}
                    maxWidth={140}>
                    <InputBase sx={{ ml: 2, pr: 2 }} placeholder={t('store_name')} inputRef={searchValueRef} />
                </Box>
                {/* <FormControl sx={{ width: 120 }}>
                    <InputLabel id="demo-simple-select-label" >
                        {t('county_filter')}
                    </InputLabel>
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
                </FormControl> */}

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
                    {/* pagination */}
                    <Pagination
                        QUERY={STORE_INIT_QUERY}
                        HANDLE_PAGE_CHANGE={handlePageChange}
                        TYPE={PAGINATION_PATH_TYPE}
                        REFETCH={refetchCount}
                        HANDLE_LOADING_STATE={handleLoadingState}
                    />
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    colors={colors.grey[100]}
                    p="10px"
                >

                    <Box width={"15%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('store_name')}</Typography>
                    </Box>
                    <Box width={"15%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('status')}</Typography>
                    </Box>
                    <Box width={"15%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('products')}</Typography>
                    </Box>
                    <Box width={"15%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('machines')}</Typography>
                    </Box>
                    <Box width={"15%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('details')}</Typography>
                    </Box>
                </Box>
                <Box
                    backgroundColor={colors.primary[400]}
                    borderRadius="12px"
                    height={"100%"}
                    overflow={"auto"}
                >
                    {loadingState ?
                        (
                            <Box p={"1rem"}>
                                <Loader />
                            </Box>
                        )
                        :
                        stores.map((store, i) => (
                            <Box
                                key={`${store.id}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={i === stores.length - 1 ? "none" : `3px solid ${colors.primary[500]}`}
                                p="10px"
                            >
                                <Box width={"15%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{store.node.name}</Box>
                                <Box width={"15%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    {(() => {
                                        if (store.node.status === "disable") {
                                            return (
                                                <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t('disable')}
                                                </Typography>)
                                        }
                                        else if (store.node.status === "banned") {
                                            return (
                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t('banned')}
                                                </Typography>)
                                        }
                                        else if (store.node.status === "removed") {
                                            return (
                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t('deleted')}
                                                </Typography>)
                                        }
                                        else if (store.node.status === "notReview") {
                                            return (
                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t("not_reviewed")}
                                                </Typography>)
                                        }
                                        else {
                                            return (
                                                <Typography variant="h5" color={colors.greenAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t('normal')}
                                                </Typography>)
                                        }
                                    })()}
                                </Box>

                                {/* BUTTON TO MACHINE MANAGEMENT */}

                                <Box
                                    width={"15%"}
                                    height={"100%"}
                                    display={"flex"}
                                    alignItems={"center"} justifyContent={"center"}
                                    borderRadius="4px"
                                >
                                    <Link
                                        to={"/commodity-management"}
                                        state={{
                                            data: store.node,
                                        }}
                                    >
                                        <Button sx={{ color: colors.primary[100], border: "1px solid" + colors.grey[200], borderRadius: "10px", fontSize: ".9rem", padding: ".5rem 1.5rem" }}>
                                            {t('manage')}
                                        </Button>
                                    </Link>
                                </Box>
                                <Box
                                    width={"15%"}
                                    height={"100%"}
                                    display={"flex"}
                                    alignItems={"center"} justifyContent={"center"}
                                    borderRadius="4px"
                                >
                                    <Link
                                        to={"/machine-management"}
                                        state={{
                                            data: store.node,
                                        }}
                                    >
                                        <Button sx={{ color: colors.primary[100], border: "1px solid" + colors.grey[200], borderRadius: "10px", fontSize: ".9rem", padding: ".5rem 1.5rem" }}>
                                            {t('manage')}
                                        </Button>
                                    </Link>
                                </Box>
                                <Box
                                    width={"15%"}
                                    display={"flex"}
                                    alignItems={"center"} justifyContent={"center"}
                                    borderRadius="4px">
                                    <StoreListModal props={store.node} onUpdate={() => triggerRefetch()} />
                                </Box>
                                {/* <Box>
                                {store.node.id}
                            </Box> */}
                            </Box>
                        ))}
                </Box>
            </Box>
        </Box >
    )
}

export default StoreManagement