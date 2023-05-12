import { useEffect, useState, useRef } from 'react'
// QUERIES
import { useQuery } from '@apollo/client'
import { GetDepositList } from '../../graphQL/Queries'
// THEME
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

// COMPONENETS
import Loader from '../../components/loader/Loader';
import { useTranslation } from 'react-i18next';
import DepositListModal from './DepositListModal';
import CreateDepositModal from './CreateDepositModal';
import { DepositItemType } from '../../types/Deposit';

const DepositManagement = () => {
    const { t } = useTranslation();

    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    // ========================== REF ==========================
    const searchValueRef = useRef('');

    const [standingItems, setStandingItems] = useState<DepositItemType[]>([]);
    const [limitedItems, setLimitedItems] = useState<DepositItemType[]>([]);



    const [standingLoadingState, setStandingLoadingState] = useState(false);
    const handleStandingLoadingState = (loading: boolean) => {
        setStandingLoadingState(loading);
    }

    const [limitedLoadingState, setLimitedLoadingState] = useState(false);
    const handleLimitedLoadingState = (loading: boolean) => {
        setLimitedLoadingState(loading);
    }

    const { loading: loadingStanding, error: errorStanding, data: dataStanding } = useQuery(GetDepositList, {
        variables: {
            specifyType: "standing",
        }
    });
    useEffect(() => {
        if (dataStanding) {
            setStandingItems(dataStanding.managerGetDepositItems || []); //datas for display   
        }
        if (errorStanding) {
            console.log(errorStanding);
        }
        if (loadingStanding) {
            handleStandingLoadingState(true);
        }
        if (!loadingStanding) {
            handleStandingLoadingState(false);
        }
    }, [dataStanding, errorStanding, loadingStanding]);


    const { loading: loadingLimited, error: errorLimited, data: dataLimited } = useQuery(GetDepositList, {
        variables: {
            specifyType: "limited",
        }
    });
    useEffect(() => {
        if (dataLimited) {
            setLimitedItems(dataLimited.managerGetDepositItems); //datas for display         
        }
        if (errorLimited) {
            console.log(errorLimited);
        }
        if (loadingLimited) {
            handleLimitedLoadingState(true);
        }
        if (!loadingLimited) {
            handleLimitedLoadingState(false);
        }
    }, [dataLimited]);

    // ========================== FUNCTIONS ==========================


    // if (errorLimited) return <Loader />;
    // ========================== RETURN ==========================
    return (
        // here
        <Box p={2} display="flex" flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>{t("deposit_management")}</h1>
            </Box>

            {/* SEARCH DIV */}
            <Box display={"flex"} gap={"1rem"} marginBottom={"2rem"} alignItems={"center"}>
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
                    >
                        <Typography color={colors.grey[100]} variant="h4" fontWeight="600">常駐</Typography>
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
                        borderRadius="10px"
                        height={"100%"}
                        overflow={"auto"}
                        sx={{
                            backgroundColor: colors.primary[400],
                        }}
                    >
                        {/* MAP DATA */}
                        {standingLoadingState ?
                            (
                                <Box p={"1rem"}>
                                    <Loader />
                                </Box>
                            )
                            :
                            standingItems.map((item, i) => (
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
                    >
                        <Typography color={colors.grey[100]} variant="h4" fontWeight="600">限時</Typography>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
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
                        borderRadius="12px"
                        height={"100%"}
                        overflow={"auto"}
                    >
                        {/* MAP DATA */}
                        {limitedLoadingState ?
                            (
                                <Box p={"1rem"}>
                                    <Loader />
                                </Box>
                            )
                            :
                            limitedItems.map((item, i) => (
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