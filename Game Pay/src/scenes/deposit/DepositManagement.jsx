import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';

// QUERIES
import { useQuery } from '@apollo/client'
import { GetDepositList } from '../../graphQL/Queries'
// import { BRAND_GetAllBrands } from '../../graphQL/BrandPrincipalQueries';

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
import DepositListModal from './DepositListModal';
import CreateDepositModal from './CreateDepositModal';

const DepositManagement = () => {
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



    // PAGINATION
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const handlePageChange = ({ limit, offset }) => {
        setLimit(limit);
        setOffset(offset);
    }

    const [initStandingItems, setInitStandingItems] = useState([]);
    const [standingItems, setStandingItems] = useState([]);
    const [initLimitedItems, setInitLimitedItems] = useState([]);
    const [limitedItems, setLimitedItems] = useState([]);


    const { loading: loadingStanding, error: errorStanding, data: dataStanding } = useQuery(GetDepositList, {
        variables: {
            specifyType: "standing",
        }
    });
    useEffect(() => {
        if (dataStanding) {
            console.log(dataStanding)
            setInitStandingItems(dataStanding.managerGetDepositItems || []); //all brand datas
            setStandingItems(dataStanding.managerGetDepositItems || []); //datas for display   
        }
    }, [dataStanding]);


    const { loading: loadingLimited, error: errorLimited, data: dataLimited } = useQuery(GetDepositList, {
        variables: {
            specifyType: "limited",
        }
    });
    useEffect(() => {
        if (dataLimited) {
            console.log(dataLimited)
            setInitLimitedItems(dataLimited.managerGetDepositItems); //all brand datas
            setLimitedItems(dataLimited.managerGetDepositItems); //datas for display         
        }
    }, [dataLimited]);

    // ========================== FUNCTIONS ==========================
    const submitSearch = () => {
        // LOG SEARCH STATES
        console.log("search: " + searchValueRef.current.value + " " + status + " " + review);

        //CALL SEARCH FUNCTION
        let value = searchValueRef.current.value;
        if (value.length > 2) {
            let search = arraySearch(limitedItems, value);
            setStandingItems(search)
        } else { //IF SEARCH VALUE IS LESS THAN 3 CHARACTERS, RESET BRANDS TO INIT BRANDS
            setStandingItems(initStandingItems)
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

    if (loadingStanding, errorLimited) return <Loader />;
    if (errorStanding, errorLimited) return <Error />;
    // ========================== RETURN ==========================
    return (
        // here
        <Box p={2} position="flex" flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>{t("deposit_management")}</h1>
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
                        <MenuItem value={"???"}>{t('none')}</MenuItem>
                        <MenuItem value={"??????"}>{t('normal')}</MenuItem>
                        <MenuItem value={"??????"}>{t('disable')}</MenuItem>
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
                    <CreateDepositModal />
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
                        <Typography color={colors.grey[100]} variant="h4" fontWeight="600">??????</Typography>
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
                        {standingItems.map((item, i) => (
                            <Box
                                key={`${item.id}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={i === standingItems.length - 1 ? "none" : `3px solid ${colors.primary[500]}`}
                                p="10px"
                            >
                                <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.name}</Box>
                                <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.walletValue}</Box>
                                <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    <DepositListModal props={item} />
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
                        <Typography color={colors.grey[100]} variant="h4" fontWeight="600">??????</Typography>
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
                        {limitedItems.map((item, i) => (
                            <Box
                                key={`${item.id}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={i === limitedItems.length - 1 ? "none" : `3px solid ${colors.primary[500]}`}
                                p="10px"
                            >
                                <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.name}</Box>
                                <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.walletValue}</Box>
                                <Box width={"33%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    <DepositListModal props={item} />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

            </Box>

        </Box >
    )
}

export default DepositManagement