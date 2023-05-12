import { useEffect, useState, useRef } from 'react'
// QUERIES
import { useQuery } from '@apollo/client'
import { GetReviewList } from '../../graphQL/Queries'
// THEME
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// ICONS
import InputBase from "@mui/material/InputBase";
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';
import { useTranslation } from 'react-i18next';
import { unixTimestampToDatetimeLocal } from '../../utils/Utils';
// import ReviewBrandListModal from './ReviewBrandListModal';
// import ReviewStoreListModal from './ReviewStoreListModal';
// import ReviewMachineListModal from './ReviewMachineListModal';
import ReviewBonusGameListModal from './ReviewBonusGameListModal';
import { ReviewItemType } from '../../types/Review';
import ReviewBrandListModal from './ReviewBrandListModal';
import ReviewStoreListModal from './ReviewStoreListModal';
import ReviewMachineListModal from './ReviewMachineListModal';


const ReviewManagement = () => {
    const { t } = useTranslation();

    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ========================== STATES AND HANDLERS ==========================


    const [status, setStatus] = useState('');
    const handleStatusChange = (e: SelectChangeEvent<string>) => {
        setStatus(e.target.value);
    };


    const [refetchCount, setRefetchCount] = useState(0);
    const triggerRefetch = () => {
        setRefetchCount(refetchCount + 1);
    };

    useEffect(() => {
        refetchNotReviewed();
        // refetchReviewed();
    }, [refetchCount]);

    // ========================== REF ==========================
    const searchValueRef = useRef('');

    //========================== GRAPHQL ==========================

    const [notReviewedItems, setnotReviewedItems] = useState<ReviewItemType[]>([]);


    const { loading: loadingNotReviewed, error: errorNotReviewed, data: dataNotReviewed, refetch: refetchNotReviewed } = useQuery(GetReviewList, {
        variables: {
            onlyNotReview: true,
        }
    });

    useEffect(() => {
        if (dataNotReviewed) {
            setnotReviewedItems(dataNotReviewed.getReviewList); //datas for display   
        }
    }, [dataNotReviewed]);


    if (loadingNotReviewed) return <Loader />;
    if (errorNotReviewed) return <Error />;
    // ========================== RETURN ==========================
    return (
        // here
        <Box p={2} display="flex" flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>{t("review")}</h1>
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
                    <InputBase sx={{ ml: 2, pr: 2 }} placeholder={t('name') || ''} inputRef={searchValueRef} />
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


            </Box>

            {/* TABLE DIV */}
            <Box display={"flex"} gap={"1rem"}>
                <Box
                    borderRadius="10px"
                    height={"50%"}
                    width={"100%"}
                    sx={{
                        backgroundColor: colors.primary[400],
                    }}
                >
                    {/* PAGINATION & REFRESH DIV */}
                    <Box
                        borderBottom={`0px solid ${colors.primary[500]}`}
                        p="15px 25px"
                        sx={{
                            color: colors.grey[100],
                        }}
                    >
                        <Typography color={colors.grey[100]} variant="h4" fontWeight="600">{t('待審核')}</Typography>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
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
                        borderRadius="10px"
                        height={"100%"}
                        overflow={"auto"}
                        sx={{
                            backgroundColor: colors.primary[400],
                        }}
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
                                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{unixTimestampToDatetimeLocal(parseInt(item.createdAt))}</Box>
                                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    {
                                        item.type === "brand" ?
                                            <ReviewBrandListModal props={item} onUpdate={triggerRefetch} showButtons={true} /> :
                                            item.type === "store" ?
                                                <ReviewStoreListModal props={item} onUpdate={triggerRefetch} showButtons={true} /> :
                                                item.type === "machine" ?
                                                    <ReviewMachineListModal props={item} onUpdate={triggerRefetch} showButtons={true} /> :
                                                    item.type === "bonusGame" ?
                                                        <ReviewBonusGameListModal props={item} onUpdate={triggerRefetch} showButtons={true} /> :
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







// <Box
//                     backgroundColor={colors.primary[400]}
//                     borderRadius="10px"
//                     height={"50%"}
//                     width={"100%"}
//                 >
//                     {/* PAGINATION & REFRESH DIV */}
//                     <Box
//                         borderBottom={`0px solid ${colors.primary[500]}`}
//                         colors={colors.grey[100]}
//                         p="15px 25px"
//                     >
//                         <Typography color={colors.grey[100]} variant="h4" fontWeight="600">{t('reviewed')}</Typography>
//                     </Box>
//                     <Box
//                         display="flex"
//                         justifyContent="space-between"
//                         alignItems="center"
//                         borderBottom={`4px solid ${colors.primary[500]}`}
//                         background={colors.grey[300]}
//                         p="10px"
//                     >
//                         <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
//                             <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("request")} ID</Typography>
//                         </Box>
//                         <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
//                             <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{`${t("review")}${t("type")}`} </Typography>
//                         </Box>
//                         <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
//                             <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("trigger_at_time")}</Typography>
//                         </Box>
//                         <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
//                             <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("details")}</Typography>
//                         </Box>
//                     </Box>

//                     {/* here */}
//                     <Box
//                         backgroundColor={colors.primary[400]}
//                         borderRadius="12px"
//                         height={"100%"}
//                         overflow={"auto"}
//                     >
//                         {/* MAP DATA */}
//                         {reviewedItems.map((item, i) => (
//                             <Box
//                                 key={`${item.id}-${i}`}
//                                 display="flex"
//                                 justifyContent="space-between"
//                                 alignItems="center"
//                                 borderBottom={i === reviewedItems.length - 1 ? "none" : `3px solid ${colors.primary[500]}`}
//                                 p="10px"
//                             >
//                                 <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.reviewId}</Box>
//                                 <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.type}</Box>
//                                 <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{unixTimestampToDatetimeLocal(item.createdAt)}</Box>
//                                 <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
//                                     {
//                                         item.type === "brand" ?
//                                             <ReviewBrandListModal props={item} onUpdate={triggerRefetch} showButtons={false} /> :
//                                             item.type === "store" ?
//                                                 <ReviewStoreListModal props={item} onUpdate={triggerRefetch} showButtons={false} /> :
//                                                 item.type === "machine" ?
//                                                     <ReviewMachineListModal props={item} onUpdate={triggerRefetch} showButtons={false} /> :
//                                                     item.type === "bonusGame" ?
//                                                         <ReviewBonusGameListModal props={item} onUpdate={triggerRefetch} showButtons={false} /> :
//                                                         null
//                                     }

//                                 </Box>
//                             </Box>
//                         ))}
//                     </Box>
//                 </Box>