import React, { useEffect, useState, useRef } from 'react'
import { useQuery } from '@apollo/client'
import { format } from 'date-fns';
import SearchIcon from "@mui/icons-material/Search";

// QUERIES
import { ManagerGetAllNotificationSchedules } from '../../graphQL/Queries'
// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// ICONS
import InputBase from "@mui/material/InputBase";
import CreateSystemNotificationModal from './CreateSystemNotificationModal';
import SystemNotificationListModal from './SystemNotificationListModal';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';
import { useTranslation } from 'react-i18next';
import { NotificationSchedulesType, NotificationType } from '../../types/Notification';

const SystemNotificationManagement = () => {
    const { t } = useTranslation();
    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ========================== STATES AND HANDLERS ==========================
    const [status, setStatus] = useState('');
    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        setStatus(event.target.value);
    };

    // ========================== REF ==========================
    const searchValueRef = useRef('');
    const filterRef = useRef('品牌名');


    //========================== GRAPHQL ==========================
    const { loading, error, data } = useQuery(ManagerGetAllNotificationSchedules);
    const [notifications, setNotifications] = useState<NotificationSchedulesType[]>([]);
    useEffect(() => {
        if (data) {
            setNotifications(data.managerGetAllNotificationSchedules); //datas for display
        }
    }, [data]);

    console.log(notifications);

    if (loading) return <Loader />;
    if (error) return <Error />;

    const submitSearch = (): void => {
        console.log("search")
    }

    // ========================== RETURN ==========================
    return (
        <Box p={2} display="flex" flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>{t('system_notification')}</h1>
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
                    <Box width={"90%"}>

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
                    borderRadius="12px"
                    height={"100%"}
                    overflow={"auto"}
                    sx={{
                        backgroundColor: colors.primary[400],
                    }}
                >
                    {/* MAP DATA */}
                    {notifications.map((item, i) => {
                        if (item.notification.type === "system") {
                            // Keep track of the index of the last systemFree item
                            const lastNotificationIndex = notifications.reduce(
                                (lastIndex, currentItem, currentIndex) =>
                                    currentItem.notification.type === "system"
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
                                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.notification.title}</Box>
                                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{format(new Date(item.triggerAt * 1000), 'MM/dd/yyyy - HH:mm:ss')}</Box>

                                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                        {(() => {
                                            if (item.notification.expireAt === null) {
                                                return t('none')
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
                                        <SystemNotificationListModal props={item} />
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