import { useEffect, useState, useRef } from 'react'

// QUERIES
import { GetAllAdvertiserPaginatedConnection, SearchBrandByName } from '../../graphQL/Queries'

// THEME
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
// import BrandListModal from './BrandListModal';

// COMPONENETS
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import Pagination from '../../components/Pagination';
import Loader from '../../components/loader/Loader';
import { useLazyQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { RootState } from '../../redux/store';
import CreateAdvertiserModal from './CreateAdvertiserModal';
import { AdvertiserType } from '../../types/Advertiser';
import AdvertiserListModal from './AdvertiserListModal';

interface AdvertiserNode {
    node: AdvertiserType;
}



const AdvertiserManagement = () => {
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



    //========================== GRAPHQL ==========================

    let LIST_PAGINATION_QUERY = GetAllAdvertiserPaginatedConnection;
    let PAGINATION_PATH_TYPE = 'GET_ADVERTISER_LIST';

    // ====================== PAGINATION ======================

    const [initAdvertisers, setInitAdvertisers] = useState<AdvertiserNode[]>([]);
    const [advertisers, setAdvertisers] = useState<AdvertiserNode[]>([]);

    const handlePageChange = (data: AdvertiserNode[]) => {
        setAdvertisers(data);
        setInitAdvertisers(data);
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
                const searchData: AdvertiserNode[] = [{ node: { ...data.getBrand[0] } }];
                console.log(searchData);
                setAdvertisers(searchData);
            } else {
                toast.error(t('cant_find'));
            }
        }
        if (error) {
            toast.error(error.message);
        }
        if (loading) {
            console.log("loading");
        }
    }, [data])

    const submitSearch = (): void => {
        // LOG SEARCH STATES
        let searchValue = searchValueRef.current?.value || "";
        if (searchValue === "") {
            setAdvertisers(initAdvertisers);
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
                <h1 className='userManagement_title'>{t("advertiser_management")}</h1>
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
                    <InputBase sx={{ ml: 2, pr: 2 }} placeholder={t('advertiser_name') || ''} inputRef={searchValueRef} />
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
                        <CreateAdvertiserModal onUpdate={() => triggerRefetch()} />
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
                        QUERY={LIST_PAGINATION_QUERY}
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
                    <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("advertiser_name")}</Typography>
                    </Box>
                    <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("principal_name")}</Typography>
                    </Box>
                    <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("status")}</Typography>
                    </Box>
                    <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
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
                        advertisers.map((item, i) => (
                            <Box
                                key={`${item.node.id}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={i === advertisers.length - 1 ? "none" : `3px solid ${colors.primary[500]}`}
                                p="10px"
                            >
                                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.node.name}</Box>
                                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.node.principalName}</Box>
                                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    {(() => {
                                        if (item.node.statusId === "disable") {
                                            return (
                                                <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t("disable")}
                                                </Typography>)
                                        }
                                        else if (item.node.statusId === "banned") {
                                            return (
                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t("banned")}
                                                </Typography>)
                                        }
                                        else if (item.node.statusId === "removed") {
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

                                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    <AdvertiserListModal props={item.node} onUpdate={() => triggerRefetch()} />
                                </Box>
                            </Box>
                        ))}

                </Box>

            </Box>
        </Box >
    )
}

export default AdvertiserManagement