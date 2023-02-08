import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, Button, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import LineChart from "../../components/LineChart";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from '../../components/Header';
import { useQuery } from '@apollo/client'

import { mockLineData } from "src/data/mockData";
import { GetStatisticGraph } from 'src/graphQL/Queries';


const FinanceStatistic = () => {
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const location = useLocation();
    const state = location.state;
    console.log(state.data);

    const [active, setActive] = useState('day');

    const [lineData, setLineData] = useState([]);

    const { loading, error, data } = useQuery(GetStatisticGraph, {
        variables: {
            args: [
                {
                    id: "1"
                }
            ],
            timeGranularity: "hour",
            startAt: 1675749600,
            endAt: 1675836000
        }
    });
    useEffect(() => {
        if (data) {
            setLineData(data.getBrand[0].getStatisticsPeriod);
        }
    }, [data]);


    const finalData = [];

    const coinAmountTotal = [];
    const coinQuantityTotal = [];
    const giftAmountTotal = [];
    const giftQuantityTotal = [];

    for (const item of lineData) {
        coinAmountTotal.push({ x: new Date(item.timestamp * 1000).toLocaleTimeString(), y: item.coinAmountTotal });
        coinQuantityTotal.push({ x: new Date(item.timestamp * 1000).toLocaleTimeString(), y: item.coinQuantityTotal });
        giftAmountTotal.push({ x: new Date(item.timestamp * 1000).toLocaleTimeString(), y: item.giftAmountTotal });
        giftQuantityTotal.push({ x: new Date(item.timestamp * 1000).toLocaleTimeString(), y: item.giftQuantityTotal });

    }

    console.log(coinAmountTotal, giftAmountTotal);

    finalData.push({ id: "Coin Qty Tot", color: colors.blueAccent[500], data: coinQuantityTotal });
    finalData.push({ id: "總收入", color: colors.greenAccent[500], data: coinAmountTotal });
    finalData.push({ id: "Gift Amt Total", color: colors.redAccent[500], data: giftAmountTotal });
    finalData.push({ id: "Gift Qty Tot", color: colors.grey[500], data: giftQuantityTotal });

    console.log("finalData");
    console.log(finalData);


    const handleClick = (selected) => {
        setActive(selected);
    };

    return (
        <Box m="20px" >
            {/* HEADER */}
            <Box Box display="flex" justifyContent="space-between" alignItems="center" >
                <Header title="財務細節資料" />
            </Box >

            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                <Box
                    gridColumn="span 12"
                    gridRow="span 3"
                    borderRadius={"12px"}
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.074)",
                        border: "1px solid rgba(255, 255, 255, 0.222)",
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
                                mb="10px"
                            >
                                總收入 - Mock Data
                            </Typography>
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                color={colors.primary[100]}
                            >
                                NTD 10,000,000
                            </Typography>
                        </Box>
                        <Box
                            display={"flex"}
                            border={"1px solid #fff"}
                            borderRadius={"6px"}>
                            <Button
                                sx={{
                                    borderRadius: "0px",
                                    backgroundColor: active === 'day' ? "rgba(255, 255, 255, 0.074)" : "transparent",
                                    border: active === 'day' ? "1px solid rgba(255, 255, 255, 0.222)" : "1px solid transparent",
                                    webkitBackdropFilter: active === 'day' ? "blur(20px)" : "none",
                                    backdropFilter: active === 'day' ? "blur(20px)" : "none",
                                }}
                                onClick={() => handleClick('day')}
                            >
                                <Typography variant="h6" fontWeight="400" color={colors.grey[100]}>
                                    天
                                </Typography>
                            </Button>
                            <Button
                                sx={{
                                    borderRadius: "0px",
                                    backgroundColor: active === 'week' ? "rgba(255, 255, 255, 0.074)" : "transparent",
                                    border: active === 'week' ? "1px solid rgba(255, 255, 255, 0.222)" : "1px solid transparent",
                                    webkitBackdropFilter: active === 'week' ? "blur(20px)" : "none",
                                    backdropFilter: active === 'week' ? "blur(20px)" : "none",
                                }}
                                onClick={() => handleClick('week')}
                            >
                                <Typography variant="h6" fontWeight="400" color={colors.grey[100]}>
                                    周
                                </Typography>
                            </Button>
                            <Button
                                sx={{
                                    borderRadius: "0px",
                                    backgroundColor: active === 'month' ? "rgba(255, 255, 255, 0.074)" : "transparent",
                                    border: active === 'month' ? "1px solid rgba(255, 255, 255, 0.222)" : "1px solid transparent",
                                    webkitBackdropFilter: active === 'month' ? "blur(20px)" : "none",
                                    backdropFilter: active === 'month' ? "blur(20px)" : "none",
                                }}
                                onClick={() => handleClick('month')}
                            >
                                <Typography variant="h6" fontWeight="400" color={colors.grey[100]}>
                                    月
                                </Typography>
                            </Button>


                        </Box>

                    </Box>
                    <Box height="400px" m="-20px 0 0 0">
                        <LineChart isDashboard={true} data={finalData} />
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default FinanceStatistic