import React, { useEffect, useState, useContext } from 'react'
import { useQuery, useMutation, useLazyQuery, ApolloClient, ApolloCache } from '@apollo/client'

import App from '../../App';
import "../../index.css";
import { GetDashboardInit } from '../../graphQL/Queries'
// THEME
import { ColorModeContext, tokens } from "../../theme";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import * as yup from "yup";


import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import StoreIcon from '@mui/icons-material/Store';

import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";

import { useDispatch, useSelector } from "react-redux";
import { BRAND_GetBrandInfo } from 'src/graphQL/BrandPrincipalQueries';

import { mockLineData } from "src/data/mockData";
import { useTranslation } from 'react-i18next';
// const { t } = useTranslation();


const checkoutSchema = yup.object().shape({
    account: yup.string().required("required"),
    password: yup.string().required("required").nullable(),
});


const Dashboard = () => {
    const { t } = useTranslation();


    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [allMember, setAllMember] = useState([]);
    const [allBrands, setAllBrands] = useState([]);
    const [allStores, setAllStores] = useState([]);



    const { loading, error, data } = useQuery(GetDashboardInit);
    useEffect(() => {
        if (data) {
            setAllMember(data.getAllMember);
            setAllBrands(data.managerGetBrands);
            setAllStores(data.managerGetStores);
        }
    }, [data]);




    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={t('dashboard')} subtitle={t('welcome_back')} />
            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box
                    className='span3'
                    sx={{
                        background: "linear-gradient(135deg, #ED472D, #FC8F2D)",
                        backgroundColor: "rgba(255, 255, 255, 0.074)",
                        webkitBackdropFilter: "blur(20px)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    <StatBox
                        title={allMember.length}
                        subtitle="用戶總數"
                        increase="+100%"
                        icon={
                            <PersonAddIcon
                                sx={{ color: "#FFFFFF", fontSize: "45px" }}
                            />
                        }
                        textColor={"#FFFFFF"}
                    />
                </Box>

                <Box
                    className='span3'
                    sx={{
                        background: "linear-gradient(135deg, #3917d2, #5233de)",
                        backgroundColor: "rgba(255, 255, 255, 0.074)",
                        webkitBackdropFilter: "blur(20px)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    <StatBox
                        title={allBrands.length}
                        subtitle="品牌總數"
                        progress="1"
                        increase="+100%"
                        icon={
                            <LocalOfferIcon
                                sx={{ color: "#FFFFFF", fontSize: "45px" }}
                            />
                        }
                        textColor={"#FFFFFF"}
                    />
                </Box>


                <Box
                    className='span3'
                    sx={{
                        background: "linear-gradient(135deg, #4281B7, #4697E7)",
                        backgroundColor: "rgba(255, 255, 255, 0.074)",
                        webkitBackdropFilter: "blur(20px)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    <StatBox
                        title={allStores.length}
                        subtitle="商店總數"
                        increase="+50%"
                        icon={
                            <StoreIcon
                                sx={{ color: "#FFFFFF", fontSize: "45px" }}
                            />
                        }
                        textColor={"#FFFFFF"}
                    />
                </Box>

                <Box
                    className='span3'
                    sx={{
                        background: "linear-gradient(135deg, #f13c77, #ea5753)",
                        backgroundColor: "rgba(255, 255, 255, 0.074)",
                        webkitBackdropFilter: "blur(20px)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    <StatBox
                        title="0"
                        subtitle="Traffic Received"
                        progress="0"
                        increase="+50%"
                        icon={
                            <TrafficIcon
                                sx={{ color: "#FFFFFF", fontSize: "45px" }}
                            />
                        }
                        textColor={"#FFFFFF"}
                    />
                </Box>

                {/* ROW 2 */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    borderRadius={"12px"}
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.074)",
                        border: "1px solid rgba(123, 123, 123, 0.222)",
                        webkitBackdropFilter: "blur(20px)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    <Box
                        mt="25px"
                        p="0 30px"
                        display="flex "
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                color={colors.grey[100]}
                            >
                                Revenue Generated - Mock Data
                            </Typography>
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                color={colors.primary[100]}
                            >
                                NTD 10,000,000
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton>
                                <DownloadOutlinedIcon
                                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box height="250px" m="-20px 0 0 0">
                        <LineChart isDashboard={true} data={mockLineData} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard


