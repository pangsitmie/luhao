import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';

// QUERIES
import { useQuery } from '@apollo/client'
import { GetAllBrands } from '../../graphQL/Queries'
import { BRAND_GetAllBrands } from '../../graphQL/BrandPrincipalQueries';

// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

// COMPONENETS
import Pagination from '../../components/Pagination';
import Refresh from '../../components/Refresh';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import RechargeListModal from './RechargeListModal';
import CreateRechargeModal from './CreateRechargeModal';

const RechargeManagement = () => {
    const { entityName } = useSelector((state) => state.entity);
    const { t } = useTranslation();


    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ========================== STATES AND HANDLERS ==========================

    const [filter, setFilter] = useState('');
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
    const filterRef = useRef('');

    //========================== GRAPHQL ==========================

    let BRAND_INIT_QUERY;
    switch (entityName) {
        case 'company':
            BRAND_INIT_QUERY = GetAllBrands;
            break;
        case 'brand':
            BRAND_INIT_QUERY = BRAND_GetAllBrands;
            break;
        default:
            break;
    }




    // PAGINATION
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const handlePageChange = ({ limit, offset }) => {
        setLimit(limit);
        setOffset(offset);
    }

    const [initBrands, setInitBrands] = useState([]);
    const [brands, setBrands] = useState([]);

    const { loading, error, data } = useQuery(BRAND_INIT_QUERY, {
        variables: { limit, offset }
    });
    useEffect(() => {
        if (data) {
            switch (entityName) {
                case 'company':
                    setInitBrands(data.managerGetBrands); //all brand datas
                    setBrands(data.managerGetBrands); //datas for display
                    break;
                case 'brand':
                    setInitBrands(data.getBrandPrincipal.brands); //all brand datas
                    setBrands(data.getBrandPrincipal.brands); //datas for display
                    break;
                default:
                    break;
            }
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
        <Box p={2} position="flex" flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>{t("recharge_management")}</h1>
            </Box>

            {/* SEARCH DIV */}
            <Box className='flex_media' marginBottom={"2rem"} height={"10%"} alignItems={"center"}>
                {/* name Search */}
                <Box
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"52px"}
                    maxWidth={140}>
                    <InputBase sx={{ ml: 2, pr: 2 }} placeholder={t('name')} inputRef={searchValueRef} />
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


                <Box
                    display="flex"
                    borderRadius="10px"
                    marginLeft={"auto"}
                    height={"52px"}
                >
                    <CreateRechargeModal />
                </Box>


            </Box>

            {/* TABLE DIV */}
            <Box display={"flex"} gap={"1rem"}>
                <Box
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"50%"}
                    width={"100%"}
                >
                    {/* PAGINATION & REFRESH DIV */}
                    <Box
                        borderBottom={`0px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px 25px"
                    >
                        <Typography color={colors.grey[100]} variant="h4" fontWeight="600">常駐</Typography>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        background={colors.grey[300]}
                        p="10px"
                    >
                        <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("name")}</Typography>
                        </Box>
                        <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("amount")}</Typography>
                        </Box>
                        <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("details")}</Typography>
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
                                <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>COIN</Box>
                                <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>100</Box>
                                <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    <RechargeListModal props={brand} />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"50%"}
                    width={"100%"}
                >
                    {/* PAGINATION & REFRESH DIV */}
                    <Box
                        borderBottom={`0px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px 25px"
                    >
                        <Typography color={colors.grey[100]} variant="h4" fontWeight="600">限時</Typography>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        background={colors.grey[300]}
                        p="10px"
                    >
                        <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("name")}</Typography>
                        </Box>
                        <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("amount")}</Typography>
                        </Box>
                        <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"}>
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
                        {brands.map((brand, i) => (
                            <Box
                                key={`${brand.id}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={i === brands.length - 1 ? "none" : `3px solid ${colors.primary[500]}`}
                                p="10px"
                            >
                                <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>LIMITED COIN</Box>
                                <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>100</Box>
                                <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    <RechargeListModal props={brand} />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

            </Box>

        </Box >
    )
}

export default RechargeManagement