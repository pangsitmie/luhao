import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
// QUERIES
import { useQuery } from '@apollo/client'
import { GetReviewList } from '../../graphQL/Queries'
// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { unixTimestampToDatetimeLocal } from 'src/utils/Utils';
import ReviewBrandListModal from './ReviewBrandListModal';
import ReviewStoreListModal from './ReviewStoreListModal';
import ReviewMachineListModal from './ReviewMachineListModal';


const ReviewManagement = () => {
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
    // const [limit, setLimit] = useState(5);
    // const [offset, setOffset] = useState(0);
    // const handlePageChange = ({ limit, offset }) => {
    //     setLimit(limit);
    //     setOffset(offset);
    // }

    const [initNotReviewedItems, setInitNotReviewedItems] = useState([]);
    const [notReviewedItems, setnotReviewedItems] = useState([]);

    const [initReviewedItems, setInitReviewedItems] = useState([]);
    const [reviewedItems, setReviewedItems] = useState([]);



    const { loading: loadingNotReviewed, error: errorNotReviewed, data: dataNotReviewed } = useQuery(GetReviewList, {
        variables: {
            onlyNotReview: true,
        }
    });


    const { loading: loadingReviewed, error: errorReviewed, data: dataReviewed } = useQuery(GetReviewList, {
        variables: {
            onlyNotReview: false,
        }
    });
    useEffect(() => {
        if (dataNotReviewed) {
            setInitNotReviewedItems(dataNotReviewed.getReviewList); //all brand datas
            setnotReviewedItems(dataNotReviewed.getReviewList); //datas for display   
        }
        if (dataReviewed) {
            setInitReviewedItems(dataReviewed.getReviewList); //all brand datas
            setReviewedItems(dataReviewed.getReviewList); //datas for display         
        }
    }, [dataNotReviewed, dataReviewed]);

    // ========================== FUNCTIONS ==========================
    const submitSearch = () => {
        // LOG SEARCH STATES
        console.log("search: " + searchValueRef.current.value + " " + status + " " + review);

        //CALL SEARCH FUNCTION
        let value = searchValueRef.current.value;
        if (value.length > 2) {
            let search = arraySearch(reviewedItems, value);
            setnotReviewedItems(search)
        } else { //IF SEARCH VALUE IS LESS THAN 3 CHARACTERS, RESET BRANDS TO INIT BRANDS
            setnotReviewedItems(initNotReviewedItems)
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

    if (loadingNotReviewed, loadingReviewed) return <Loader />;
    if (errorNotReviewed, errorReviewed) return <Error />;
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
                    {/* <CreateDepositModal /> */}
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
                        <Typography color={colors.grey[100]} variant="h4" fontWeight="600">待審核</Typography>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        background={colors.grey[300]}
                        p="10px"
                    >
                        <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("request")} ID</Typography>
                        </Box>
                        <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{`${t("review")}${t("type")}`} </Typography>
                        </Box>
                        <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("trigger_at_time")}</Typography>
                        </Box>
                        <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
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
                        {notReviewedItems.map((item, i) => (
                            <Box
                                key={`${item.id}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={i === notReviewedItems.length - 1 ? "none" : `3px solid ${colors.primary[500]}`}
                                p="10px"
                            >
                                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.reviewId}</Box>
                                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.type}</Box>
                                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{unixTimestampToDatetimeLocal(item.createdAt)}</Box>
                                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    {
                                        item.type === "brand" ?
                                            <ReviewBrandListModal props={item} showButtons={true} /> :
                                            item.type === "store" ?
                                                <ReviewStoreListModal props={item} showButtons={true} /> :
                                                item.type === "machine" ?
                                                    <ReviewMachineListModal props={item} showButtons={true} /> :
                                                    null
                                    }

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
                        <Typography color={colors.grey[100]} variant="h4" fontWeight="600">已審核</Typography>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        background={colors.grey[300]}
                        p="10px"
                    >
                        <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("request")} ID</Typography>
                        </Box>
                        <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{`${t("review")}${t("type")}`} </Typography>
                        </Box>
                        <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                            <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("trigger_at_time")}</Typography>
                        </Box>
                        <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
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
                        {reviewedItems.map((item, i) => (
                            <Box
                                key={`${item.id}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={i === reviewedItems.length - 1 ? "none" : `3px solid ${colors.primary[500]}`}
                                p="10px"
                            >
                                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.reviewId}</Box>
                                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.type}</Box>
                                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{unixTimestampToDatetimeLocal(item.createdAt)}</Box>
                                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    {
                                        item.type === "brand" ?
                                            <ReviewBrandListModal props={item} showButtons={false} /> :
                                            item.type === "store" ?
                                                <ReviewStoreListModal props={item} showButtons={false} /> :
                                                item.type === "machine" ?
                                                    <ReviewMachineListModal props={item} showButtons={false} /> :
                                                    null
                                    }

                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

            </Box>

        </Box >
    )
}

export default ReviewManagement