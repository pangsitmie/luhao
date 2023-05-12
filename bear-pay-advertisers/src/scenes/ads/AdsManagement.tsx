import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

// QUERIES
import { GetAdsList } from '../../graphQL/Queries'
// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// ICONS
import SearchIcon from "@mui/icons-material/Search";
import { format } from 'date-fns';
import AdsListModal from './AdsListModal';
import CreateAdsModal from './CreateAdsModal';
import Loader from '../../components/loader/Loader';
import { useTranslation } from 'react-i18next';
import { AdsType } from '../../types/Ads';

const AdsManagement = () => {
    const { t } = useTranslation();
    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ========================== STATES AND HANDLERS ==========================


    // LOADING STATE
    const [loadingState, setLoadingState] = useState(false);
    // const handleLoadingState = (loading: boolean) => {
    //     setLoadingState(loading);
    // }

    const [status, setStatus] = useState('');
    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        setStatus(event.target.value);
    };

    //========================== GRAPHQL ==========================
    const { loading, data } = useQuery(GetAdsList);
    const [ads, setAds] = useState<AdsType[]>([]);
    useEffect(() => {
        if (data) {
            setAds(data.managerGetAdvertisements); //datas for display
        }
        if (loading) {
            setLoadingState(true);
        }
        if (!loading) {
            setLoadingState(false);
        }
    }, [data]);


    // if (loading) return <Loader />;
    // if (error) return <Error />;

    // ========================== RETURN ==========================
    return (
        <Box p={2} display="flex" flexDirection={"column"}>
            <Box height={"10%"}>
                <h1 className='userManagement_title'>{t('system_ads')}</h1>
            </Box>

            {/* SEARCH DIV */}
            <Box display={"flex"} marginBottom={"2rem"} alignItems={"center"} gap={"1rem"}>
                {/* name Search */}
                <FormControl sx={{ width: 140 }} >
                    <InputLabel id="demo-simple-select-label" >{t('status')}</InputLabel>
                    <Select
                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={handleStatusChange}
                    >
                        <MenuItem value={"無"}>{t('none')}</MenuItem>
                        <MenuItem value={"正常"}>{t('normal')}</MenuItem>
                        <MenuItem value={"停用"}>{t('disable')}</MenuItem>
                    </Select>
                </FormControl>
                {/* <FormControl sx={{ width: 140 }} >
                    <InputLabel id="demo-simple-select-label" >{t('review')}</InputLabel>
                    <Select
                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={review}
                        label="Review"
                        onChange={handleReviewChange}
                    >
                        <MenuItem value={"無"}>{t('none')}</MenuItem>
                        <MenuItem value={"通過"}>{t('pass')}</MenuItem>
                        <MenuItem value={"待審核"}>{t('pending')}</MenuItem>
                        <MenuItem value={"封鎖"}>{t('banned')}</MenuItem>
                    </Select>
                </FormControl> */}
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
                    <CreateAdsModal />
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
                >
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">{t('ads_type')}</Typography>
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
                >
                    {/* MAP DATA */}
                    {loadingState ?
                        (
                            <Box p={"1rem"}>
                                <Loader />
                            </Box>
                        )
                        :
                        ads.map((item, i) => (
                            <Box
                                key={`${item.id}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={i === ads.length - 1 ? "none" : `3px solid ${colors.primary[500]}`}
                                p="10px"
                            >
                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.type === "banner" ? `${t('banner')} - (B)` : `${t('placement')} - (P)`}</Box>
                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{format(new Date(item.startAt * 1000), 'MM/dd/yyyy - HH:mm:ss')}</Box>
                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    {item.endAt === null ? (
                                        <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem" }}>
                                            {t('none')}
                                        </Typography>
                                    ) : (
                                        format(new Date(item.endAt * 1000), 'MM/dd/yyyy - HH:mm:ss')
                                    )}
                                </Box>
                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    {(() => {
                                        if (item.status === "disable") {
                                            return (
                                                <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t('disable')}
                                                </Typography>)
                                        }
                                        else if (item.status === "banned") {
                                            return (
                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t('banned')}
                                                </Typography>)
                                        }
                                        else if (item.status === "removed") {
                                            return (
                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t('removed')}
                                                </Typography>)
                                        }
                                        else {
                                            return (
                                                <Typography variant="h5" color={colors.greenAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                    {t('normal')}
                                                </Typography>)
                                        }
                                    })()}
                                </Box>


                                <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                                    <AdsListModal props={item} />
                                </Box>
                            </Box>
                        ))}

                </Box>
            </Box>
        </Box >
    )
}

export default AdsManagement