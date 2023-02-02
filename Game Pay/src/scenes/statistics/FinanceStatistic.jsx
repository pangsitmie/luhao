import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, Button, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import LineChart from "../../components/LineChart";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from '../../components/Header';

const FinanceStatistic = () => {
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const location = useLocation();
    const state = location.state;
    console.log(state.data);

    const [active, setActive] = useState('day');

    const handleClick = (selected) => {
        setActive(selected);
    };

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="財務細節資料" />
            </Box>

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
                        <LineChart isDashboard={true} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default FinanceStatistic