import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';

// QUERIES
import { GetBrandListPagination, SearchBrandByName } from '../../graphQL/Queries'
import { BRAND_GetAllBrands } from '../../graphQL/BrandPrincipalQueries';

// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import BrandListModal from './BrandListModal';

// COMPONENETS
// import CreateBrandModal from './CreateBrandModal';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import Pagination from '../../components/Pagination';
import Loader from '../../components/loader/Loader';
import { useLazyQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { RootState } from '../../redux/store';
import BrandType from '../../types/Brand';
import CreateBrandModal from './CreateBrandModal';

interface BrandNode {
    node: BrandType;
}


type Props = {}
const BrandManagement = (props: Props) => {
    const { entityName } = useSelector((state: RootState) => state.entity);
    const { t } = useTranslation();

    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    // LOADING STATE
    const [loadingState, setLoadingState] = useState(false);
    const handleLoadingState = (loading: boolean) => {
        setLoadingState(loading);
    }

    const [status, setStatus] = useState<string>('');
    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        setStatus(event.target.value);
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

    const [initBrands, setInitBrands] = useState<BrandNode[]>([]);
    const [brands, setBrands] = useState<BrandNode[]>([]);

    const handlePageChange = (data: BrandNode[]) => {
        setBrands(data);
        setInitBrands(data);
    }

    const [refetchCount, setRefetchCount] = useState(0);
    const triggerRefetch = () => {
        setRefetchCount(refetchCount + 1);
    };

    // ========================== SEARCH ==========================
    const searchValueRef = useRef<HTMLInputElement>(null);

    const [ApolloSearchBrandByName, { loading, error, data }] = useLazyQuery(SearchBrandByName);
    useEffect(() => {
        if (data) {
            console.log(data);
            if (data.getBrand.length > 0) {
                const searchData: BrandNode[] = [{ node: { ...data.getBrand[0] } }];
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

    const submitSearch = (): void => {
        // LOG SEARCH STATES
        let searchValue = searchValueRef.current?.value || "";
        if (searchValue === "") {
            setBrands(initBrands);
            return;
        }

        console.log("search " + searchValue);

        ApolloSearchBrandByName({
            variables: {
                args: [
                    {
                        name: searchValue
                    }
                ]
            }
        });

        console.log("search finish");
    };





    return (
        <Box p={2} display={"flex"} flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>{t("brand_management")}</h1>
            </Box>


            {/* SEARCH DIV */}
            <Box display={"flex"} marginBottom={"2rem"} alignItems={"center"} gap={"1rem"}>
                {/* name Search */}
                <Box
                    display="flex"
                    borderRadius="10px"
                    height={"52px"}
                    maxWidth={140}
                    sx={{
                        backgroundColor: colors.primary[400],
                    }}>
                    <InputBase sx={{ ml: 2, pr: 2 }} placeholder={t('brand_name') || ''} inputRef={searchValueRef} />
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
                borderRadius="10px"
                height={"50%"}
                sx={{
                    backgroundColor: colors.primary[400],
                }}
            >
                {/* PAGINATION & REFRESH DIV */}
                <Box
                    display="flex"
                    justifyContent="center"
                    borderBottom={`0px solid ${colors.primary[500]}`}
                    p="15px"
                    sx={{
                        color: colors.grey[100],
                    }}
                >
                    {/* pagination */}
                    <Pagination
                        QUERY={BRAND_INIT_QUERY}
                        HANDLE_PAGE_CHANGE={handlePageChange}
                        TYPE={PAGINATION_PATH_TYPE || ''}
                        REFETCH={refetchCount}
                        HANDLE_LOADING_STATE={handleLoadingState}
                    />
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p="10px"
                    sx={{
                        backgroundColor: colors.primary[400],
                    }}
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
                    borderRadius="12px"
                    height={"100%"}
                    overflow={"auto"}
                    sx={{
                        backgroundColor: colors.primary[400],
                    }}
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