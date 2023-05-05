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
import AccountSetting from './AccountSetting';

const Setting = () => {
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
            PAGINATION_PATH_TYPE = 'GET_STORE_PRINCIPAL_STORE_LIST';
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
                <h1 className='userManagement_title'>{t('setting')}</h1>
            </Box>

            {/* TABLE DIV */}
            <Box
                backgroundColor={colors.primary[400]}
                borderRadius="10px"
                height={"100%"}
            >
                <Box
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"100%"}
                    overflow={"auto"}
                >
                    {/* MAP DATA */}

                    <Box

                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p="10px"
                    >
                        <Box display="flex" alignItems={"center"} justifyContent={"center"} m={"0 15px"}>
                            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">
                                {t('account_setting')}
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
                            <AccountSetting props={{ id: "1" }} />
                        </Box>
                    </Box>
                </Box>

            </Box>

        </Box >
    )
}

export default Setting