import { useEffect, useState, useRef } from 'react'
import { useQuery } from '@apollo/client'
import { format } from 'date-fns';
import SearchIcon from "@mui/icons-material/Search";

// QUERIES
import { HealthCheck } from '../../graphQL/Queries'
// THEME
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// ICONS
import InputBase from "@mui/material/InputBase";
import CreateSystemNotificationModal from './CreateSystemNotificationModal';
import SystemNotificationListModal from './SystemNotificationListModal';
import Loader from '../../components/loader/Loader';
import { useTranslation } from 'react-i18next';
import { getRESTEndpoint } from '../../utils/Utils';
import axios from 'axios';
import { toast } from 'react-toastify';

const SystemNotificationManagement = () => {
    const { t } = useTranslation();
    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    // ========================== REF ==========================
    const searchValueRef = useRef('');

    // LOADING STATE
    const [loadingState, setLoadingState] = useState(false);


    //========================== GRAPHQL ==========================
    // const { loading, error, data } = useQuery(ManagerGetAllNotificationSchedules);
    const [notifications, setNotifications] = useState<any[]>([]);

    const { refetch: refetchHealthCheck } = useQuery(HealthCheck);

    const REST_FetchNotificationList = async () => {
        console.log("REST_FetchNotificationList");
        const MAX_RETRY_ATTEMPTS = 3;
        let retryCount = 0;

        while (retryCount < MAX_RETRY_ATTEMPTS) {
            try {
                setLoadingState(true);
                let URI = `${getRESTEndpoint()}/notificationSchedule/getAll`;

                const response = await axios.post(URI,
                    {
                        // body
                    },
                    {
                        headers: {
                            // need to put Authorization Bearer token
                            'Authorization': 'Bearer ' + localStorage.getItem('token'),
                            'Content-Type': 'application/json',
                        }
                    });
                console.log(response);
                if (response.data && response.data.data) {
                    console.log(response.data.data);
                    setNotifications(response.data.data); //datas for display

                    break; // exit the loop if the API call was successful
                } else {
                    refetchHealthCheck();
                    toast("Loading...");
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoadingState(false);
            }

            retryCount++;
            console.log(`Retrying API call (attempt ${retryCount})...`);

            if (retryCount > 0) {
                await new Promise(resolve => setTimeout(resolve, 1500)); // wait for 1 second before retrying
            }
        }
        if (retryCount === MAX_RETRY_ATTEMPTS) {
            console.log(`Maximum retry attempts (${MAX_RETRY_ATTEMPTS}) exceeded.`);
        }
    };

    useEffect(() => {
        REST_FetchNotificationList();
    }, []);

    const submitSearch = (): void => {
        console.log("search")
    }

    // ========================== RETURN ==========================
    return (
        <Box p={2} display="flex" flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>{`${t('notification')} & ${t('free_coin')}`}</h1>
            </Box>

            {/* SEARCH DIV */}
            <Box display={"flex"} marginBottom={"2rem"} alignItems={"center"} gap={"1rem"}>

                <Box
                    display="flex"
                    borderRadius="10px"
                    height={"52px"}
                    maxWidth={180}
                    sx={{
                        backgroundColor: colors.primary[400],
                    }}>
                    <InputBase sx={{ ml: 2, pr: 2 }} placeholder={t('title') || ''} inputRef={searchValueRef} />
                </Box>

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
                    padding={"0"}
                    height={"52px"}

                >
                    <CreateSystemNotificationModal />
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
                    sx={{
                        color: colors.grey[100],
                    }}
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
                    <Box width={"10%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('status')}</Typography>
                    </Box>
                    <Box width={"10%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('type')}</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('details')}</Typography>
                    </Box>
                </Box>
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
                        notifications.map((item, i) => {
                            if (item.notificationType === "system") {
                                // Keep track of the index of the last systemFree item
                                const lastNotificationIndex = notifications.reduce(
                                    (lastIndex, currentItem, currentIndex) =>
                                        currentItem.notificationType === "system"
                                            ? currentIndex : lastIndex, -1
                                );
                                return (
                                    <Box
                                        key={`${item.id}-${i}`}
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        borderBottom={i === lastNotificationIndex ? "none" : `3px solid ${colors.primary[500]}`}
                                        p="10px"
                                    >
                                        <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.notificationTitle}</Box>
                                        <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{format(new Date(item.triggerAt * 1000), 'MM/dd/yyyy - HH:mm:ss')}</Box>

                                        <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                            {(() => {
                                                if (item.notificationExpiredAt === null) {
                                                    return t('none')
                                                }
                                                else {
                                                    return format(new Date(item.notificationExpiredAt * 1000), 'MM/dd/yyyy - HH:mm:ss')
                                                }
                                            })()}
                                        </Box>
                                        <Box width={"10%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                            {(() => {
                                                if (item.status === "done") {
                                                    return (
                                                        <Typography variant="h5" color={colors.greenAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                            {t('done')}
                                                        </Typography>)
                                                }
                                                else if (item.status === "failed") {
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
                                        <Box width={"10%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                            {item.rewardType === null ? t('none') :
                                                item.rewardType === "systemFreeCurrency" ? t('system_free_coin') :
                                                    item.rewardType === "brandCurrency" ? t('brand_free_coin') : t('none')}
                                        </Box>

                                        <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                            <SystemNotificationListModal scheduleId={item.scheduleId} triggerAt={item.triggerAt} rewardType={item.rewardType} />
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

export default SystemNotificationManagement