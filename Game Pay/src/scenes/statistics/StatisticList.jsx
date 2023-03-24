import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { useQuery } from '@apollo/client'
// QUERIES
import { GetAllBrands, GetBrandListPagination } from '../../graphQL/Queries'
import { BRAND_GetAllBrands, BRAND_GetBrandList } from '../../graphQL/BrandPrincipalQueries'
import { STORE_GetAllStores } from 'src/graphQL/StorePrincipalQueries';

// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import Refresh from '../../components/Refresh';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

const StatisticList = () => {
    const { entityName } = useSelector((state) => state.entity);
    const { t } = useTranslation();
    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ========================== STATES AND HANDLERS ==========================

    const [filter, setFilter] = useState('品牌名');
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };





    // ========================== REF ==========================
    const searchValueRef = useRef('');

    //========================== GRAPHQL ==========================
    const [initBrands, setInitBrands] = useState([]);
    const [brands, setBrands] = useState([]);


    let LIST_QUERY;
    let PAGINATION_PATH_TYPE;

    switch (entityName) {
        case 'company':
            LIST_QUERY = GetBrandListPagination;
            PAGINATION_PATH_TYPE = 'GET_BRAND_LIST';
            break;
        case 'brand':
            LIST_QUERY = BRAND_GetAllBrands;
            PAGINATION_PATH_TYPE = 'GET_BRAND_PRINCIPAL_BRAND_LIST';
            break;
        case 'store':
            LIST_QUERY = STORE_GetAllStores;
        default:
            break;
    }

    // ====================== PAGINATION ======================

    const handlePageChange = (data) => {
        setBrands(data);
        setInitBrands(data);
    }

    // ========================== FUNCTIONS ==========================
    const submitSearch = () => {
        // LOG SEARCH STATES
        console.log("search: " + searchValueRef.current.value + " ");

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




    // if (loading) return <Loader />;
    // if (error) return <Error />;
    // ========================== RETURN ==========================
    return (
        <Box p={2} position="flex" flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>{t('statistic')}</h1>
            </Box>

            {/* here */}
            {/* SEARCH DIV */}
            <Box className={"flex_media"}
                display="flex" marginBottom={"2rem"} height={"10%"} alignItems={"center"}>
                {/* name Search */}
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"52px"}>
                    <InputBase sx={{ ml: "1rem", pr: 2 }} placeholder={t('brand_name')} inputRef={searchValueRef} />
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

            {/* here */}
            {/* TABLE DIV */}
            <Box
                backgroundColor={colors.primary[400]}
                borderRadius="10px"
                height={"100%"}
            >
                {/* PAGINATION & REFRESH DIV */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    borderBottom={`0px solid ${colors.primary[500]}`}
                    colors={colors.grey[100]}
                    p="15px 0 10px 0"
                >
                    <Pagination QUERY={LIST_QUERY} HANDLE_PAGE_CHANGE={handlePageChange} TYPE={PAGINATION_PATH_TYPE} />
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    background={colors.grey[300]}
                    p="10px"
                >
                    <Box display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500" ml="15px">{t('brand_name')}</Typography>
                    </Box>

                    <Box display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500" mr="25px">{t('statistic_info')}</Typography>
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
                            borderBottom={i === brands.length - 1 ? "none" : `3px solid ${colors.primary[500]}`}
                            p="10px"
                        >
                            <Box display="flex" alignItems={"center"} justifyContent={"center"} m={"0 15px"}>
                                <Typography color={colors.grey[100]} variant="h5" fontWeight="500">
                                    {brand.node.name}
                                </Typography>
                            </Box>
                            <Box
                                height={"100%"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"space-evenly"}
                                borderRadius="4px"
                                m={"0 15px"}
                            >
                                <Link
                                    to={"/statistic-management"}
                                    state={{
                                        data: brand.node,
                                    }}
                                >
                                    <Button sx={{ color: colors.primary[100], border: "1px solid" + colors.grey[200], borderRadius: "10px", fontSize: ".9rem", padding: ".5rem 1.2rem" }}>
                                        {t('view')}
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    ))}

                </Box>

            </Box>
        </Box >
    )
}

export default StatisticList