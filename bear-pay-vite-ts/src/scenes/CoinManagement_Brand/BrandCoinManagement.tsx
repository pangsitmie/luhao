import { useEffect, useState, useRef } from 'react'
import { DocumentNode, useQuery } from '@apollo/client'
import { format } from 'date-fns';

// QUERIES
import { GetSentFreeCoinsList } from '../../graphQL/Queries'
// THEME
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// ICONS
import SearchIcon from "@mui/icons-material/Search";

import InputBase from "@mui/material/InputBase";
import CreateBrandCoinModal from './CreateBrandCoinModal';
import BrandCoinListModal from './BrandCoinListModal';
import Loader from '../../components/loader/Loader';
import { useSelector } from "react-redux";
import { BRAND_GetSentFreeCoinList } from '../../graphQL/BrandPrincipalQueries';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../redux/store';
import { NotificationSchedulesType } from '../../types/Notification';


const BrandCoinManagement = () => {
    const { t } = useTranslation();
    const { entityName } = useSelector((state: RootState) => state.entity);


    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    //REF
    const searchValueRef = useRef('');


    // LOADING STATE
    const [loadingState, setLoadingState] = useState(false);
    const handleLoadingState = (loading: boolean) => {
        setLoadingState(loading);
    }


    //GRAPHQL
    let GET_FREE_COIN_SENT_QUERY: DocumentNode = GetSentFreeCoinsList;
    switch (entityName) {
        case 'company':
            GET_FREE_COIN_SENT_QUERY = GetSentFreeCoinsList;
            break;
        case 'brand':
            GET_FREE_COIN_SENT_QUERY = BRAND_GetSentFreeCoinList;
            break;
        default:
            break;
    }

    const { loading, error, data } = useQuery(GET_FREE_COIN_SENT_QUERY,
        {
            variables: {
                onlyRewardType: "currency",
            }
        }
    );
    // const [initNotifications, setInitNotifications] = useState<NotificationSchedulesType[]>([]);
    const [notifications, setNotifications] = useState<NotificationSchedulesType[]>([]);
    useEffect(() => {
        if (data) {
            switch (entityName) {
                case 'company':
                    // setInitNotifications(data.managerGetAllNotificationSchedules); //all brand datas
                    setNotifications(data.managerGetAllNotificationSchedules); //datas for display
                    break;
                case 'brand':
                    // setInitNotifications(data.brandGetAllNotificationSchedules); //all brand datas
                    setNotifications(data.brandGetAllNotificationSchedules); //datas for display
                    break;
                default:
                    break;
            }
            // console.log(data);
        }
        handleLoadingState(loading ? true : false);

        if (error) {
            console.log(error);
        }
    }, [data, error]);


    return (
        <Box p={2} display="flex" flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>{t('brand_free_coin')}</h1>
            </Box>
            {/* SEARCH DIV */}
            <Box display={"flex"} marginBottom={"2rem"} alignItems={"center"} gap={"1rem"}>
                {/* name Search */}
                <Box
                    display="flex"
                    borderRadius="10px"
                    height={"52px"}
                    maxWidth={130}
                    sx={{
                        backgroundColor: colors.primary[400],
                    }}>
                    <InputBase sx={{ ml: 2, pr: 2, flex: 1, minWidth: "200px" }} placeholder={t('start_time') || ''} inputRef={searchValueRef} />
                </Box>
                <Box
                    display="flex"
                    borderRadius="10px"
                    height={"52px"}
                    maxWidth={130}
                    sx={{
                        backgroundColor: colors.primary[400],
                    }}>
                    <InputBase sx={{ ml: 2, pr: 2, flex: 1, minWidth: "200px" }} placeholder={t('end_time') || ''} inputRef={searchValueRef} />
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
                    onClick={() => { }}>
                    <SearchIcon sx={{ mr: "10px", fontsize: ".8rem", color: "white" }} />
                    <Typography color={"white"} variant="h5" fontWeight="500">
                        查詢
                    </Typography>
                </Button>
                <Box
                    display="flex"
                    borderRadius="10px"
                    marginLeft={"auto"}
                    padding={"0"}
                    height={"52px"}
                    sx={{
                        backgroundColor: colors.primary[400],
                    }}
                >
                    <CreateBrandCoinModal />
                </Box>
            </Box>

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
                >
                    <Box width={"100%"}>
                    </Box>


                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p="10px"
                    maxHeight={"100px"}

                >
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('title')}</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('start_time')}</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('end_time')}</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('status')}</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('details')}</Typography>
                    </Box>
                </Box>
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
                        notifications.map((item, i) => {
                            if (item.notification.reward.content.currency.type === "brand") {
                                // Keep track of the index of the last systemFree item
                                const lastBrandCoinIndex = notifications.reduce(
                                    (lastIndex, currentItem, currentIndex) =>
                                        currentItem.notification.reward.content.currency.type === "brand"
                                            ? currentIndex : lastIndex, -1
                                );
                                return (
                                    <Box
                                        key={`${item.id}-${i}`}
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        borderBottom={i === lastBrandCoinIndex ? "none" : `3px solid ${colors.primary[500]}`}
                                        p="10px"
                                    >
                                        <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.notification.title}</Box>
                                        <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{format(new Date(item.triggerAt * 1000), 'MM/dd/yyyy - HH:mm:ss')}</Box>
                                        <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                            {(() => {
                                                if (item.notification.expireAt === null) {
                                                    return t("none")
                                                }
                                                else {
                                                    return format(new Date(item.notification.expireAt * 1000), 'MM/dd/yyyy - HH:mm:ss')
                                                }
                                            })()}
                                        </Box>
                                        <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                            {(() => {
                                                if (item.notification.status === "done") {
                                                    return (
                                                        <Typography variant="h5" color={colors.greenAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                            {t('done')}
                                                        </Typography>)
                                                }
                                                else if (item.notification.status === "failed") {
                                                    return (
                                                        <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                            {t('failed')}
                                                        </Typography>)
                                                }
                                                else {
                                                    return (
                                                        <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                                            {t('normal')}

                                                        </Typography>)
                                                }
                                            })()}
                                        </Box>

                                        <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                            <BrandCoinListModal props={item} />
                                        </Box>
                                    </Box>
                                )
                            }
                        })}
                </Box>
            </Box>
        </Box >
    )
}

export default BrandCoinManagement