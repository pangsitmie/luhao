import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';

// QUERIES
import { GetBrandListPagination, SearchBrandByName } from '../../graphQL/Queries'
import { BRAND_GetAllBrands } from '../../graphQL/BrandPrincipalQueries';

// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import BrandListModal from './BrandListModal';

// COMPONENETS
import CreateBrandModal from './CreateBrandModal';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import Pagination from 'src/components/Pagination';
import Loader from 'src/components/loader/Loader';
import { useLazyQuery } from '@apollo/client';
import { toast } from 'react-toastify';

const BrandManagement = () => {
    const { entityName } = useSelector((state) => state.entity);
    const { t } = useTranslation();


    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ========================== STATES AND HANDLERS ==========================

    // const [filter, setFilter] = useState('品牌名');
    // const handleFilterChange = (e) => {
    //     setFilter(e.target.value);
    // };

    // LOADING STATE
    const [loadingState, setLoadingState] = useState(false);
    const handleLoadingState = (loading) => {
        setLoadingState(loading);
    }

    const [status, setStatus] = useState('');
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const [review, setReview] = useState('');
    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    //========================== GRAPHQL ==========================

    let BRAND_INIT_QUERY;
    let PAGINATION_PATH_TYPE;
    switch (entityName) {
        case 'company':
            BRAND_INIT_QUERY = GetBrandListPagination;
            PAGINATION_PATH_TYPE = 'GET_BRAND_LIST';
            break;
        case 'brand':
            BRAND_INIT_QUERY = BRAND_GetAllBrands;
            PAGINATION_PATH_TYPE = 'GET_BRAND_PRINCIPAL_BRAND_LIST';
            break;
        default:
            break;
    }

    // ====================== PAGINATION ======================

    const [initBrands, setInitBrands] = useState([]);
    const [brands, setBrands] = useState([]);
    const handlePageChange = (data) => {
        setBrands(data);
        setInitBrands(data);
    }

    const [refetchCount, setRefetchCount] = useState(0);
    const triggerRefetch = () => {
        setRefetchCount(refetchCount + 1);
    };

    // ========================== SEARCH ==========================
    const searchValueRef = useRef('');

    const [ApolloSearchBrandByName, { loading, error, data }] = useLazyQuery(SearchBrandByName);
    useEffect(() => {
        if (data) {
            console.log(data);
            if (data.getBrand.length > 0) {
                const searchData = [{ node: data.getBrand[0] }];
                console.log(searchData);
                setBrands(searchData);
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
            setBrands(initBrands);
            return;
        }

        console.log("search " + value);

        ApolloSearchBrandByName({
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

    // ========================== RETURN ==========================
    return (
        // here
        <Box p={2} position="flex" flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>{t("brand_management")}</h1>
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
                    <InputBase sx={{ ml: 2, pr: 2 }} placeholder={t('brand_name')} inputRef={searchValueRef} />
                </Box>
                <FormControl sx={{ width: 100 }} >
                    <InputLabel id="demo-simple-select-label" >{t('status')}</InputLabel>
                    <Select
                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label={t("status")}
                        onChange={handleStatusChange}
                    >
                        <MenuItem value={"無"}>{t('none')}</MenuItem>
                        <MenuItem value={"正常"}>{t('normal')}</MenuItem>
                        <MenuItem value={"停用"}>{t('disable')}</MenuItem>
                    </Select>
                </FormControl>
                {/* <FormControl sx={{ minWidth: 100 }} >
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
                    <Typography color={"white"} variant="h5" fontWeight="500" sx={{ textTransform: "capitalize" }}>
                        {t("search")}
                    </Typography>
                </Button>

                {entityName === 'company' ? (
                    <Box
                        display="flex"
                        borderRadius="10px"
                        marginLeft={"auto"}
                        height={"52px"}
                    >
                        <CreateBrandModal />
                    </Box>
                ) : null}

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
                    {/* pagination */}
                    <Pagination
                        QUERY={BRAND_INIT_QUERY}
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
                    background={colors.grey[300]}
                    p="10px"
                >
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("brand_name")}</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("principal_name")}</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("status")}</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("billboard")}</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("details")}</Typography>
                    </Box>
                </Box>

                {/* here */}
                <Box
                    backgroundColor={colors.primary[400]}
                    borderRadius="12px"
                    height={"100%"}
                    overflow={"auto"}
                >
                    {/* MAP DATA */}
                    {loadingState ?
                        (
                            <Box p={"1rem"}>
                                <Loader />
                            </Box>
                        )
                        :
                        brands.map((brand, i) => (
                            <Box
                                key={`${brand.id}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={i === brands.length - 1 ? "none" : `3px solid ${colors.primary[500]}`}
                                p="10px"
                            >
                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{brand.node.name}</Box>
                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{brand.node.principal.name}</Box>
                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    {(() => {
                                        if (brand.node.status === "disable") {
                                            return (
                                                <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t("disable")}
                                                </Typography>)
                                        }
                                        else if (brand.node.status === "banned") {
                                            return (
                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t("banned")}
                                                </Typography>)
                                        }
                                        else if (brand.node.status === "removed") {
                                            return (
                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t("deleted")}
                                                </Typography>)
                                        }
                                        else {
                                            return (
                                                <Typography variant="h5" color={colors.greenAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t("normal")}
                                                </Typography>)
                                        }
                                    })()}
                                </Box>
                                <Box
                                    width={"20%"}
                                    height={"100%"}
                                    display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    borderRadius="4px"
                                >
                                    <Link
                                        to={"/billboard-management"}
                                        state={{
                                            data: brand.node,
                                        }}
                                    >
                                        <Button sx={{ color: colors.primary[100], border: "1px solid" + colors.grey[200], borderRadius: "10px", fontSize: ".9rem", padding: ".5rem 1.5rem" }}>
                                            {t("manage")}
                                        </Button>
                                    </Link>
                                </Box>

                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    <BrandListModal props={brand.node} onUpdate={() => triggerRefetch()} />
                                </Box>
                            </Box>
                        ))}

                </Box>

            </Box>
        </Box >
    )
}

export default BrandManagement