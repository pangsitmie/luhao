import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import "../../index.css";
import { GetDashboardInit } from '../../graphQL/Queries'
// THEME
import { Box } from "@mui/material";



import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import StoreIcon from '@mui/icons-material/Store';

import Header from "../../components/Header";
import StatBox from "../../components/StatBox";

import { useTranslation } from 'react-i18next';


const Dashboard = () => {
    const { t } = useTranslation();

    const [allMember, setAllMember] = useState([]);
    const [allBrands, setAllBrands] = useState([]);
    const [allStores, setAllStores] = useState([]);



    const { data } = useQuery(GetDashboardInit);
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
                        subtitle={`${t('brand')}${t('quantity')}`}
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
                        subtitle={`${t('store')}${t('quantity')}`}
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
                        title={"0"}
                        subtitle={t('machine_count')}
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
            </Box>
        </Box>
    )
}

export default Dashboard


