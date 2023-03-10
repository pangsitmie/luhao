import React, { useEffect, useState, useContext, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'

// THEME
import { Box, Button, Card, CardContent, Grid, TextField, Typography, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "src/theme";
// ICONS
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CreateRewardModal from './CreateRewardModal';
import RewardListModal from './RewardListModal';
// import { GetCommodityList } from 'src/graphQL/Queries';
import Pagination from 'src/components/Pagination';
import Refresh from 'src/components/Refresh';

// QRCODE
import Loader from 'src/components/loader/Loader';
import Error from 'src/components/error/Error';



const RewardManagement = () => {
    // const location = useLocation();
    // const state = location.state;
    // console.log(state); // output: "the-page-id"
    // console.log("STATE" + state.data.id); // output: "the-page-id"
    // console.log("STATE" + state.data.name); // output: "the-page-id"

    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    // ====================== STATES ======================

    // PAGINATION
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = ({ limit, offset }) => {
        setLimit(limit);
        setOffset(offset);
        setCurrentPage(offset / limit + 1);
    }


    const [initDatas, setInitDatas] = useState([]);
    const [data, setData] = useState([]);



    //REF
    const searchRef = useRef('');

    //FUNCTIONS
    const submitSearch = () => {
        //CALL SEARCH FUNCTION
        let value = searchRef.current.value;
        if (value.length > 2) {
            let search = arraySearch(data, value);
            setData(search)
        } else { //IF SEARCH VALUE IS LESS THAN 3 CHARACTERS, RESET BRANDS TO INIT BRANDS
            setData(initDatas)
        }
    }

    //SEARCH FUNCTION
    const arraySearch = (array, keyword) => {
        const searchTerm = keyword

        return array.filter(value => {
            return value.code.match(new RegExp(searchTerm, 'g')) ||
                value.name.match(new RegExp(searchTerm, 'g'))
        })
    }


    // if (loading) return <Loader />;
    // if (error) return <Error />;

    return (
        <Box p={2} position="flex" flexDirection={"column"}>
            <Box height={"15%"}>
                <h1 className='userManagement_title'>?????? - !DEV!</h1>
            </Box>

            {/* SEARCH DIV */}
            <Box className='flex_media' marginBottom={"2rem"} height={"10%"} alignItems={"center"}>
                {/* name Search */}
                <Box
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    height={"52px"}
                    maxWidth={150}>
                    <InputBase sx={{ ml: 2, pr: 2, flex: 1, minWidth: "200px" }} placeholder="????????????" inputRef={searchRef} />
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
                    <Typography color={"white"} variant="h5" fontWeight="500">
                        ??????
                    </Typography>
                </Button>

                <Box
                    display="flex"
                    borderRadius="10px"
                    marginLeft={"auto"}
                    height={"52px"}
                >
                    <CreateRewardModal props={""} />
                </Box>
            </Box>


            {/* TABLE DIV */}
            <Box
                backgroundColor={colors.primary[400]}
                borderRadius="10px"
                height={"45%"}
            >
                {/* PAGINATION & REFRESH DIV */}
                <Box
                    display="flex"
                    justifyContent="center"
                    borderBottom={`0px solid ${colors.primary[500]}`}
                    colors={colors.grey[100]}
                    p="15px"
                >
                    <Box width={"90%"}>
                        {/* pagination */}
                        <Pagination
                            limit={limit}
                            offset={offset}
                            onPageChange={handlePageChange}
                        />
                    </Box>

                    <Box width={"10%"}>
                        {/* refresh button */}
                        <Refresh
                            limit={limit}
                            offset={offset}
                            onPageChange={handlePageChange} />
                    </Box>
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    background={colors.grey[300]}
                    p="10px"
                >
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">????????????</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">??????</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">????????????</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">???????????????</Typography>
                    </Box>
                    <Box width={"20%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="500">????????????</Typography>
                    </Box>
                </Box>

                {/* machine data map here */}
                <Box
                    backgroundColor={colors.primary[400]}
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