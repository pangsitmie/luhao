import { useState, } from 'react'
// QUERIES
import { GetBrandListPagination } from '../../graphQL/Queries'
import { BRAND_GetAllBrands } from '../../graphQL/BrandPrincipalQueries'
import { STORE_GetAllStores } from '../../graphQL/StorePrincipalQueries';

// THEME
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";


import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import Loader from '../../components/loader/Loader';
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { RootState } from '../../redux/store';
import BrandType from '../../types/Brand';
import Store from '../../types/Store';


interface BrandNode {
    node: BrandType;
}
interface StoreNode {
    node: Store;
}

const StatisticList = () => {
    const { entityName } = useSelector((state: RootState) => state.entity);
    const { t } = useTranslation();
    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    // ========================== REF ==========================


    //========================== GRAPHQL ==========================
    // const [initBrands, setInitBrands] = useState<BrandNode[] | StoreNode[]>([]);
    const [brands, setBrands] = useState<BrandNode[] | StoreNode[]>([]);

    // LOADING STATE
    const [loadingState, setLoadingState] = useState(false);
    const handleLoadingState = (loading: boolean) => {
        setLoadingState(loading);
    }


    let LIST_QUERY;
    let PAGINATION_PATH_TYPE: string = '';

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
            break;
        default:
            break;
    }

    // ====================== PAGINATION ======================

    const handlePageChange = (data: BrandNode[]) => {
        setBrands(data);
        // setInitBrands(data);
    }

    // ========================== FUNCTIONS ==========================

    // ========================== RETURN ==========================
    return (
        <Box p={2} display="flex" flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>{t('statistic')}</h1>
            </Box>

            {/* TABLE DIV */}
            <Box
                borderRadius="10px"
                height={"100%"}
                sx={{
                    backgroundColor: colors.primary[400],
                }}
            >
                {/* PAGINATION & REFRESH DIV */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    borderBottom={`0px solid ${colors.primary[500]}`}
                    p="15px 0 10px 0"
                    sx={{
                        color: colors.grey[100],
                    }}
                >
                    <Pagination
                        QUERY={LIST_QUERY}
                        HANDLE_PAGE_CHANGE={handlePageChange}
                        TYPE={PAGINATION_PATH_TYPE}
                        HANDLE_LOADING_STATE={handleLoadingState}
                        REFETCH={0}
                    />
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
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
                    borderRadius="10px"
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
                                key={`${brand.node.id}-${i}`}
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