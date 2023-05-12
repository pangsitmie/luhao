import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { format } from 'date-fns';

// THEME
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { GetBillboardListPagination, SearchBillboardByTitle } from '../../../graphQL/Queries';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Billboard from '../../../types/Billboard';
import Pagination from '../../../components/Pagination';
import Loader from '../../../components/loader/Loader';
import BillboardListModal from './BillboardListModal';
import CreateBillboardModal from './CreateBillboardModal';

interface BillboardNode {
    node: Billboard;
}
const BillboardManagement = () => {
    const location = useLocation();
    const state = location.state;
    const { t } = useTranslation();

    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ====================== PAGINATION ======================
    const [initData, setInitData] = useState<BillboardNode[]>([]);
    const [billboardData, setBillboardData] = useState<BillboardNode[]>([]);

    const handlePageChange = (data: BillboardNode[]) => {
        setInitData(data);
        setBillboardData(data);
    }

    const [refetchCount, setRefetchCount] = useState(0);
    const triggerRefetch = () => {
        setRefetchCount(refetchCount + 1);
    };

    // LOADING STATE
    const [loadingState, setLoadingState] = useState(false);
    const handleLoadingState = (loading: boolean) => {
        setLoadingState(loading);
    }


    // ========================== SEARCH ==========================
    const searchValueRef = useRef<HTMLInputElement>(null);

    const [ApolloSearchBillboardByTitle, { error, data }] = useLazyQuery(SearchBillboardByTitle);
    useEffect(() => {
        if (data) {
            console.log(data);
            if (data.getBillboard.length > 0) {
                const searchData = [{ node: data.getBillboard[0] }];
                console.log(searchData);
                setBillboardData(searchData);
            } else {
                toast.error(t('cant_find'));
            }
        }
        if (error) {
            toast.error(error.message);
        }
    }, [data])

    const submitSearch = () => {
        // LOG SEARCH STATES
        let searchValue = searchValueRef.current?.value || "";
        if (searchValue === "") {
            setBillboardData(initData);
            return;
        }

        console.log("search " + searchValue);

        ApolloSearchBillboardByTitle({
            variables: {
                args: [
                    {
                        title: searchValue
                    }
                ]
            }
        });

        console.log("search finish");
    };


    return (
        <Box p={2} display={"flex"} flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>{state.data.name} - {t('billboards')}</h1>
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
                    <InputBase sx={{ ml: 2, pr: 2 }} placeholder={`${t('billboards')} ${t('name')}`} inputRef={searchValueRef} />
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
                    <Typography color={"white"} variant="h5" fontWeight="500">
                        {t('search')}
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
                    <CreateBillboardModal props={state.data} />
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
                    <Pagination
                        QUERY={GetBillboardListPagination}
                        HANDLE_PAGE_CHANGE={handlePageChange}
                        TYPE={"GET_BILLBOARD_LIST"}
                        ARGS_ID={state.data.id}
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
                    {loadingState ?
                        (
                            <Box p={"1rem"}>
                                <Loader />
                            </Box>
                        )
                        :
                        billboardData.map((item, i) => (
                            <Box
                                key={`${item.node.id}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={`3px solid ${colors.primary[500]}`}
                                p="10px"
                            >
                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"} padding={"0 1rem"}>{item.node.title}</Box>
                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{format(new Date(item.node.startAt * 1000), 'MM/dd/yyyy - HH:mm:ss')}</Box>
                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    {item.node.endAt === null ? (
                                        <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: colors.primary[100] }}>
                                            {t('none')}
                                        </Typography>
                                    ) : (
                                        format(new Date(item.node.endAt * 1000), 'MM/dd/yyyy - HH:mm:ss')
                                    )}
                                </Box>
                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    {(() => {
                                        if (item.node.status === "disable") {
                                            return (
                                                <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t('disable')}
                                                </Typography>
                                            )
                                        }
                                        else if (item.node.status === "banned") {
                                            return (
                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t('banned')}
                                                </Typography>
                                            )
                                        }
                                        else if (item.node.status === "removed") {
                                            return (
                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t('removed')}
                                                </Typography>)
                                        }
                                        else {
                                            return (
                                                <Typography variant="h5" color={colors.greenAccent[400]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t('normal')}
                                                </Typography>
                                            )
                                        }
                                    })()}
                                </Box>
                                <Box
                                    width={"20%"}
                                    display={"flex"}
                                    alignItems={"center"} justifyContent={"center"}
                                    borderRadius="4px">
                                    <BillboardListModal props={item.node} onUpdate={() => triggerRefetch()} />
                                </Box>
                            </Box>
                        ))}
                </Box>
            </Box>
        </Box >
    )
}


export default BillboardManagement