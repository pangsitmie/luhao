import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, Button, Typography, useTheme, IconButton, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import LineChart from "../../components/LineChart";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from '../../components/Header';
import { useQuery } from '@apollo/client'

import { mockLineData } from "src/data/mockData";
import { GetBrandStatisticPeriod } from 'src/graphQL/Queries';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const UserStatistic = () => {
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const location = useLocation();
    const state = location.state;
    console.log(state.data);


    // ===================== STATE =====================
    //title state is first initialize as brand name and updated when store name is selected
    const [selectedItem, setSelectedItem] = useState({
        id: state.data.id,
        entityName: state.data.name
    });

    const [startAtDate, setStartAtDate] = useState(getCurrentDateHour6());
    function handleStartAtDateChange(event) {
        setStartAtDate(event.target.value);
    }

    const [endAtDate, setEndAtDate] = useState(getCurrentDate());
    function handleEndAtDateChange(event) {
        setEndAtDate(event.target.value);
    }

    const [storeList, setStoreList] = useState([]);
    const [storeListFilter, setStoreListFilter] = useState('');
    const [active, setActive] = useState('day');
    const [lineData, setLineData] = useState([]);

    const { loading, error, data } = useQuery(GetBrandStatisticPeriod, {
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


    const handleStoreListChange = (e) => {
        const targetId = e.target.value;

        if (targetId === -1) {
            setSelectedItem({
                id: state.data.id,
                entityName: state.data.name
            });

            // setDisplayStatistic(brandStatistic);
            // setStoreListFilter(targetId);
            return;
        }

        //find the brand id from brand list
        const store = storeList.find(store => store.id === targetId);
        if (store) {
            setSelectedItem(
                {
                    id: store.id,
                    entityName: store.name
                }
            );

            // setStoreListFilter(targetId);

            const startAtDateObj = new Date(startAtDate);
            const endAtDateObj = new Date(endAtDate);

            let startAtUnix = startAtDateObj.getTime() / 1000;
            let endAtUnix = endAtDateObj.getTime() / 1000;
            let nowUnix = Math.floor(Date.now() / 1000);

            const variables = {
                args: [
                    {
                        id: targetId,
                    }
                ],
            };
            //check if startAtUnix is filled
            //insert startAtUnix to variables
            if (!isNaN(startAtUnix)) {
                variables.startAt = startAtUnix;
            }
            //insert endAtUnix to variables if it is selected

            if (!isNaN(endAtUnix)) {
                variables.endAt = endAtUnix;
            }

            if (endAtUnix < startAtUnix) {
                alert("End date must be greater than start date");
                return;
            }

            // ApolloGetStoreStatistic({ variables }).then((res) => {
            //     // setDisplayStatistic(res.data.getStore[0].getStatisticsTotal);
            // }).catch((err) => {
            //     console.log(err);
            // });
        }
    };

    const submitSearch = () => {
        // console.log(selectedItem === state.data.name);

        const startAtDateObj = new Date(startAtDate);
        const endAtDateObj = new Date(endAtDate);

        let startAtUnix = startAtDateObj.getTime() / 1000;
        let endAtUnix = endAtDateObj.getTime() / 1000;
        // let nowUnix = Math.floor(Date.now() / 1000);

        const variables = {
            args: [
                {
                    id: selectedItem.id,
                }
            ],
        };
        //check if startAtUnix is filled
        if (!isNaN(startAtUnix)) {
            variables.startAt = startAtUnix;
        }
        //insert endAtUnix to variables if it is selected

        if (!isNaN(endAtUnix)) {
            variables.endAt = endAtUnix;
        }
        if (endAtUnix < startAtUnix) {
            alert("End date must be greater than start date");
            return;
        }
        console.log(selectedItem);
        console.log(variables);


        // we want to search brand statistic with corespondinc time frame
        // if (selectedItem.entityName === state.data.name) {
        //     ApolloGetBrandStatistic({ variables }).then((res) => {
        //         console.log(res);
        //         setDisplayStatistic(res.data.getBrand[0].getStatisticsTotal);
        //     }).catch((err) => {
        //         console.log(err);
        //     });
        //     return;
        // }
        // else {
        //     ApolloGetStoreStatistic({ variables }).then((res) => {
        //         setDisplayStatistic(res.data.getStore[0].getStatisticsTotal);
        //     }).catch((err) => {
        //         console.log(err);
        //     });
        //     return;
        // }
    };



    // ===================== GRAPH DATA =====================
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
            <Box Box display="flex" alignItems="center" gap={"1rem"} mb={"1rem"} >
                <Box>
                    <IconButton onClick={() => window.history.back()}>
                        <ArrowBackIcon />
                    </IconButton>
                </Box>
                <Box>
                    <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "0 0 5px 0" }}>
                        財務細節資料
                    </Typography>
                </Box>
            </Box >

            <Box
                alignItems={"center"}
                justifyContent={"space-between"}
                className={"flex_media"}
                mb={"1rem"}
            >
                <Box display={"flex"} gap={"1rem"} >
                    <TextField
                        id="datetime-local"
                        label="開始時間點"
                        type="datetime-local"
                        value={startAtDate}
                        onChange={handleStartAtDateChange}
                        sx={{ width: "180px" }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        id="datetime-local"
                        label="過期時間"
                        type="datetime-local"
                        value={endAtDate}
                        onChange={handleEndAtDateChange}
                        sx={{ width: "180px" }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <Button sx={{
                        backgroundColor: colors.primary[300],
                        color: colors.grey[100],
                        minWidth: "90px",
                        height: "52px",
                        borderRadius: "10px",
                        padding: "0px",
                        ':hover': {
                            bgcolor: colors.primary[300],
                            border: '1px solid white',
                        }
                    }}
                        onClick={submitSearch}>
                        <Typography color={"white"} variant="h5" fontWeight="500">
                            查詢
                        </Typography>
                    </Button>
                </Box>

                <FormControl sx={{ minWidth: "120px" }}>
                    <InputLabel id="demo-simple-select-label" >店家過濾</InputLabel>
                    <Select
                        required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={storeListFilter}
                        label="storeListFilter"
                        onChange={handleStoreListChange}
                        sx={{
                            borderRadius: "10px",
                            background: colors.primary[400],
                            height: "100%",
                            width: "100%"
                        }}
                    >
                        {storeList.map((item, i) => (
                            <MenuItem
                                value={item.id}
                                key={`${i}`}
                            >
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
                                    backgroundColor: active === 'hour' ? "rgba(255, 255, 255, 0.074)" : "transparent",
                                    border: active === 'hour' ? "1px solid rgba(255, 255, 255, 0.222)" : "1px solid transparent",
                                    webkitBackdropFilter: active === 'hour' ? "blur(20px)" : "none",
                                    backdropFilter: active === 'hour' ? "blur(20px)" : "none",
                                }}
                                onClick={() => handleClick('hour')}
                            >
                                <Typography variant="h6" fontWeight="400" color={colors.grey[100]}>
                                    時
                                </Typography>
                            </Button>
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

export default UserStatistic

const getCurrentDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)

    const hour = ("0" + date.getHours()).slice(-2)
    const minute = ("0" + date.getMinutes()).slice(-2)

    return `${year}-${month}-${day}T${hour}:${minute}`
}

const getCurrentDateHour6 = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)

    const hour = "06"
    const minute = "00"

    return `${year}-${month}-${day}T${hour}:${minute}`
}