import React, { useEffect, useState, useContext } from 'react'
import { useQuery, useMutation, useLazyQuery, ApolloClient, ApolloCache } from '@apollo/client'

import App from '../../App';
import "../../index.css";
import { GetDashboardInit } from '../../graphQL/Queries'
import Map from '../../components/Maps'
// THEME
import { ColorModeContext, tokens } from "../../theme";
import { Box, Button, Typography, useTheme, IconButton } from "@mui/material";
import * as yup from "yup";


import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import StoreIcon from '@mui/icons-material/Store';

import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";




const checkoutSchema = yup.object().shape({
    account: yup.string().required("required"),
    password: yup.string().required("required").nullable(),
});


const Dashboard = () => {
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
            console.log(data);
            setAllMember(data.getAllMember);
            setAllBrands(data.managerGetBrands);
            setAllStores(data.managerGetStores);
        }
    }, [data]);

    useEffect(() => {
        console.log(allMember.length);
        console.log(allBrands.length);
        console.log(allStores.length);
    }, [allMember, allBrands, allStores]);







    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome back" />

                {/* <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box> */}
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
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={"12px"}
                >
                    <StatBox
                        title={allMember.length}
                        subtitle="用戶總數"
                        progress="1"
                        increase="+100%"
                        icon={
                            <PersonAddIcon
                                sx={{ color: colors.grey[100], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={"12px"}
                >
                    <StatBox
                        title={allBrands.length}
                        subtitle="品牌總數"
                        progress="1"
                        increase="+100%"
                        icon={
                            <LocalOfferIcon
                                sx={{ color: colors.grey[100], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={"12px"}
                >
                    <StatBox
                        title={allStores.length}
                        subtitle="商店總數"
                        progress="1"
                        increase="+100%"
                        icon={
                            <StoreIcon
                                sx={{ color: colors.grey[100], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>


                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={"12px"}
                >
                    <StatBox
                        title="0"
                        subtitle="Traffic Received"
                        progress="0"
                        increase="+0%"
                        icon={
                            <TrafficIcon
                                sx={{ color: colors.grey[100], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* ROW 2 */}
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    borderRadius={"12px"}
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
                        <LineChart isDashboard={true} />
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    overflow="auto"
                    borderRadius={"12px"}
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px"
                    >
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Recent Transactions
                        </Typography>
                    </Box>

                </Box>


            </Box>
        </Box>
    )
}

export default Dashboard


