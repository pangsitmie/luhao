import { useState, useRef } from 'react'

// THEME
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

// COMPONENETS
import { useTranslation } from 'react-i18next';
import Pagination from '../../components/Pagination';
import CreateGiftCodeModal from './CreateBonusGameModal';
import BonusGameListModal from './BonusGameListModal';
import { STORE_GetBonusGamePaginatedConnection } from '../../graphQL/StorePrincipalQueries';
import { BonusGameType } from '../../types/BonusGame';
import Loader from '../../components/loader/Loader';

interface BonusGameNode {
    node: BonusGameType;
}
const BonusGameManagement = () => {
    const { t } = useTranslation();
    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    // ========================== REF ==========================
    const searchValueRef = useRef<HTMLInputElement>(null);

    //========================== GRAPHQL ==========================


    const [initItems, setInitItems] = useState<BonusGameNode[]>([]);
    const [items, setItems] = useState<BonusGameNode[]>([]);

    let INIT_DATA_QUERY = STORE_GetBonusGamePaginatedConnection;
    let PAGINATION_PATH_TYPE = "GET_STORE_PRINCIPAL_BONUS_GAME_LIST";

    const handlePageChange = (data: BonusGameNode[]) => {
        setInitItems(data);
        setItems(data);
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


    // ========================== FUNCTIONS ==========================
    const submitSearch = () => {
        //CALL SEARCH FUNCTION
        let value = searchValueRef.current?.value || '';
        if (value.length > 2) {
            let search = arraySearch(items, value);
            setItems(search)
        } else { //IF SEARCH VALUE IS LESS THAN 3 CHARACTERS, RESET BRANDS TO INIT BRANDS
            setItems(initItems)
        }
    };

    //SEARCH FUNCTION
    const arraySearch = (array: BonusGameNode[], keyword: string,) => {
        const searchTerm = keyword

        return array.filter(value => {
            return value.node.name.match(new RegExp(searchTerm, 'g'))
        })
    }

    // ========================== RETURN ==========================
    return (
        // here
        <Box p={2} display="flex" flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>{t("bonus_game")}{t('management')}</h1>
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
                    <InputBase sx={{ ml: 2, pr: 2 }} placeholder={t('bonus_game') || ''} inputRef={searchValueRef} />
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

                <Box
                    display="flex"
                    borderRadius="10px"
                    marginLeft={"auto"}
                    height={"52px"}
                >
                    <CreateGiftCodeModal onUpdate={triggerRefetch} />
                </Box>

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
                        QUERY={INIT_DATA_QUERY}
                        HANDLE_PAGE_CHANGE={handlePageChange}
                        TYPE={PAGINATION_PATH_TYPE}
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
                >
                    <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("name")}</Typography>
                    </Box>
                    <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("reward")}</Typography>
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
                        items.map((item, i) => (
                            <Box
                                key={`${item.node.id}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={i === items.length - 1 ? "none" : `3px solid ${colors.primary[500]}`}
                                p="10px"
                            >
                                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.node.id}{item.node.name}</Box>
                                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.node.type}</Box>
                                <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    {(() => {
                                        if (item.node.status === "disable") {
                                            return (
                                                <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t("disable")}
                                                </Typography>)
                                        }
                                        else if (item.node.status === "banned") {
                                            return (
                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t("banned")}
                                                </Typography>)
                                        }
                                        else if (item.node.status === "removed") {
                                            return (
                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t("deleted")}
                                                </Typography>)
                                        }
                                        else if (item.node.status === "notReview") {
                                            return (
                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t("not_reviewed")}
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
                                    <BonusGameListModal props={item.node} onUpdate={triggerRefetch} />
                                </Box>
                            </Box>
                        ))}

                </Box>

            </Box>
        </Box >
    )
}

export default BonusGameManagement