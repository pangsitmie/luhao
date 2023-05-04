import React, { useEffect, useState, useContext, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'

// THEME
import { Box, Button, Card, CardContent, Grid, TextField, Typography, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const RewardManagement = () => {
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    // ====================== STATES ======================


    const [initDatas, setInitDatas] = useState([]);
    const [data, setData] = useState([]);



    //REF
    const searchRef = useRef('');

    //FUNCTIONS
    // const submitSearch = () => {
    //     //CALL SEARCH FUNCTION
    //     let value = searchRef.current.value;
    //     if (value.length > 2) {
    //         let search = arraySearch(data, value);
    //         setData(search)
    //     } else { //IF SEARCH VALUE IS LESS THAN 3 CHARACTERS, RESET BRANDS TO INIT BRANDS
    //         setData(initDatas)
    //     }
    // }

    //SEARCH FUNCTION
    // const arraySearch = (array, keyword) => {
    //     const searchTerm = keyword

    //     return array.filter(value => {
    //         return value.code.match(new RegExp(searchTerm, 'g')) ||
    //             value.name.match(new RegExp(searchTerm, 'g'))
    //     })
    // }


    // if (loading) return <Loader />;
    // if (error) return <Error />;

    return (
        <Box p={2} display="flex" flexDirection={"column"}>
            <Box height={"15%"}>
                <h1 className='userManagement_title'>獎勵 - !DEV!</h1>
            </Box>

            {/* SEARCH DIV */}
            <Box className='flex_media' marginBottom={"2rem"} height={"10%"} alignItems={"center"}>
                {/* name Search */}
                <Box
                    display="flex"
                    borderRadius="10px"
                    height={"52px"}
                    maxWidth={150}
                    sx={{
                        backgroundColor: colors.primary[400],
                    }}>
                    <InputBase sx={{ ml: 2, pr: 2, flex: 1, minWidth: "200px" }} placeholder="機台名稱" inputRef={searchRef} />
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
                    onClick={() => { }}>
                    <SearchIcon sx={{ mr: "10px", fontsize: ".8rem", color: "white" }} />
                    <Typography color={"white"} variant="h5" fontWeight="500">
                        查詢
                    </Typography>
                </Button>

                <Box
                    display="flex"
                    borderRadius="10px"
                    marginLeft={"auto"}
                    height={"52px"}
                >
                    {/* <CreateRewardModal props={""} /> */}
                </Box>
            </Box>


            {/* TABLE DIV */}
            <Box
                borderRadius="10px"
                height={"45%"}
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
                    <Box width={"90%"}>
                        {/* pagination */}
                        {/* <Pagination
                            limit={limit}
                            offset={offset}
                            onPageChange={handlePageChange}
                        /> */}
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
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">獎勵名稱</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">數量</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">開始時間</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">開結束時間</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">更新資料</Typography>
                    </Box>
                </Box>

                {/* machine data map here */}
                <Box
                    borderRadius="10px"
                    height={"100%"}
                    overflow={"auto"}
                >
                    {/* {data.map((item, i) => (
                        <Box
                            key={`${item.id}-${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`3px solid ${colors.primary[500]}`}
                            p="10px"
                        >
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.name}</Box>
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.price}</Box>
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.stock}</Box>
                            <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.stock}</Box>
                            <Box
                                width={"20%"}
                                display={"flex"}
                                alignItems={"center"} justifyContent={"center"}
                                borderRadius="4px">
                                <RewardListModal props={item} />
                            </Box>
                        </Box>
                    ))} */}
                </Box>

            </Box>
        </Box >
    )
}



export default RewardManagement