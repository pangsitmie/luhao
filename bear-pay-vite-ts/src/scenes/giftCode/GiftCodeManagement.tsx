import { useEffect, useState, useRef } from 'react'

// QUERIES
import { DocumentNode, useQuery } from '@apollo/client'
import { ManagerGetGiftCodes } from '../../graphQL/Queries'
import { BRAND_GetGiftCodes } from '../../graphQL/BrandPrincipalQueries';

// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

// COMPONENETS

import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import CreateBonusGameModal from './CreateGiftCodeModal';
import GiftCodeListModal from './GiftCodeListModal';
import { RootState } from '../../redux/store';
import { GiftCodeType } from '../../types/GiftCode';
import Loader from '../../components/loader/Loader';

const GiftCodeManagement = () => {
    const { entityName } = useSelector((state: RootState) => state.entity);
    const { t } = useTranslation();


    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ========================== STATES AND HANDLERS ==========================
    // LOADING STATE
    const [loadingState, setLoadingState] = useState(false);
    const handleLoadingState = (loading: boolean) => {
        setLoadingState(loading);
    }

    const [status, setStatus] = useState('');
    const handleStatusChange = (e: SelectChangeEvent<string>) => {
        setStatus(e.target.value);
    };



    // ========================== REF ==========================
    const searchValueRef = useRef<HTMLInputElement>(null);

    //========================== GRAPHQL ==========================


    const [initItems, setInitItems] = useState<GiftCodeType[]>([]);
    const [items, setItems] = useState<GiftCodeType[]>([]);

    let INIT_DATA_QUERY: DocumentNode = ManagerGetGiftCodes;
    let PATH: string = '';

    switch (entityName) {
        case 'company':
            INIT_DATA_QUERY = ManagerGetGiftCodes;
            PATH = "managerGetGiftCodes";
            break;
        case 'brand':
            INIT_DATA_QUERY = BRAND_GetGiftCodes;
            PATH = "brandPrincipalGetGiftCodes";
            break;
        default:
            break;
    }

    //GRAPHQL
    const { loading, error, data, refetch } = useQuery(INIT_DATA_QUERY);
    useEffect(() => {
        if (data) {
            setInitItems(data[PATH]); //all brand datas
            setItems(data[PATH]); //datas for display
        }

        handleLoadingState(loading ? true : false);

        if (error) {
            console.log(error);
        }
    }, [data, loading]);

    const [refetchCount, setRefetchCount] = useState(0);
    const triggerRefetch = () => {
        setRefetchCount(refetchCount + 1);
    };

    useEffect(() => {
        refetch();
    }, [refetchCount]);


    // ========================== FUNCTIONS ==========================
    const submitSearch = () => {
        // LOG SEARCH STATES

        //CALL SEARCH FUNCTION
        let value = searchValueRef.current?.value;
        if (value && value.length > 2) {
            let search = arraySearch(items, value);
            setItems(search)
        } else { //IF SEARCH VALUE IS LESS THAN 3 CHARACTERS, RESET BRANDS TO INIT BRANDS
            setItems(initItems)
        }
    };

    //SEARCH FUNCTION
    const arraySearch = (array: GiftCodeType[], keyword: string) => {
        const searchTerm = keyword

        return array.filter(value => {
            return value.name.match(new RegExp(searchTerm, 'g'))
        })
    }

    // ========================== RETURN ==========================
    return (
        // here
        <Box p={2} display="flex" flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>{t("gift_code")}{t('management')}</h1>
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
                    <InputBase sx={{ ml: 2, pr: 2 }} placeholder={t('brand_name') || ''} inputRef={searchValueRef} />
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

                {entityName !== 'store' ? (
                    <Box
                        display="flex"
                        borderRadius="10px"
                        marginLeft={"auto"}
                        height={"52px"}
                    >
                        <CreateBonusGameModal onUpdate={triggerRefetch} />
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
                >
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p="10px"
                >
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("name")}</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("gift_code")}</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("reward")}</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t("status")}</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
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
                    {loadingState ?
                        (
                            <Box p={"1rem"}>
                                <Loader />
                            </Box>
                        )
                        :
                        items.map((item, i) => (
                            <Box
                                key={`${item.id}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={i === items.length - 1 ? "none" : `3px solid ${colors.primary[500]}`}
                                p="10px"
                            >
                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.name}</Box>
                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.code}</Box>
                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.reward.content.amount}</Box>
                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    {(() => {
                                        if (status === "disable") {
                                            return (
                                                <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t("disable")}
                                                </Typography>)
                                        }
                                        else if (status === "banned") {
                                            return (
                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t("banned")}
                                                </Typography>)
                                        }
                                        else if (status === "removed") {
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


                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    <GiftCodeListModal props={item} onUpdate={triggerRefetch} />
                                </Box>
                            </Box>
                        ))}

                </Box>

            </Box>
        </Box >
    )
}

export default GiftCodeManagement