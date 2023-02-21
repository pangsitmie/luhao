import React, { useState, useEffect } from 'react';

import { Box, Container, Typography, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from "../../theme";

import { useLocation } from 'react-router-dom';

import { CSSTransition } from 'react-transition-group';
import TAICHUNG_DETAIL_MAP from "src/assets/taichung_detail_map1.png";
import TAICHUNG_PAGE_SLICE from "src/assets/taichung_page_slice.png";

import DetailItemListView from 'src/components/listView/DetailItemListView';
import Dropdown from 'src/components/dropdown/Dropdown';
import DetailItemDialog from 'src/components/dialog/DetailItemDialog';



import './places.css'
import ReactPlayer from 'react-player';

import FENGJIA_VIDEO from 'src/assets/fengjia_video.mp4'


const Fengjia = () => {


    const location = useLocation();
    const state = location.state;
    // console.log(state);


    // console.log(data);


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);




    return (
        <Box transition-style="in:circle:hesitate" >
            <div className="overlay"></div>
            <video className='video_content' src={FENGJIA_VIDEO} autoPlay loop muted />
            <div className="content">
                <Typography variant="h1" sx={{ fontSize: "200px", textAlign: "left", color: "#FFF", marginBottom: "1rem" }}>
                    STREET
                </Typography>
                <Typography variant="h1" sx={{ fontSize: "200px", textAlign: "left", color: "#FFF", marginBottom: "1rem" }}>
                    FOODS
                </Typography>
            </div>


            {/* hero */}
            <Box height={"100%"} display={"flex"} justifyContent={"space-between"} p={"5rem"} gap={"10%"}>
                {/* content */}
                <Box width={"60%"}>
                    <Typography variant="h1" sx={{ textAlign: "left", color: "#111", textTransform: "capitalize", marginBottom: "1rem" }}>
                        Fengjia
                    </Typography>
                    <Typography variant="h3" sx={{ textAlign: "left", color: "#2D3436", mb: "4rem" }}>
                        Taichung's biggest <span className='pink'>night market</span>
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#2D3436", mb: "1rem" }}>
                        One of the most famous night markets in Taichung, Feng Chia Night Market is located within 1 kilometer of Feng Chia University. It includes the Fengjia Wen Hua Night Market, Xitun Road, Fengjia Road, and Fuxing Road. The snacks in the night market will make you drool. The clothing is unique and fairly priced. <br /><br /> In addition, the most fashionable mobile phones are also the cheapest in Taichung. The parking problems have improved tremendously behind the effort of Ministry of Transportation and Communications. <br /> You can go shopping without any worries, and you will not face the problem of being unable to find a parking spot.                    </Typography>
                </Box>

                <Box width={"30%"} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                    <Typography variant="h2" sx={{ textAlign: "left", color: "#111", textTransform: "capitalize", marginBottom: "1rem" }}>
                        Details
                    </Typography>
                    <Box display={"flex"} gap={"1rem"} mb={"1rem"}>
                        <Typography variant="h4" sx={{ color: "#2D3436" }}>
                            Address:
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#2D3436" }}>
                            Fengjia, No.117, Wenhua Rd, Xitun District, Taichung City, 407
                        </Typography>
                    </Box>
                    <Box display={"flex"} gap={"1rem"} mb={"1rem"}>
                        <Typography variant="h4" sx={{ color: "#2D3436" }}>
                            Phone:
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#2D3436" }}>
                            0974123456
                        </Typography>
                    </Box>
                    <Box display={"flex"} gap={"1rem"} mb={"1rem"}>
                        <Typography variant="h4" sx={{ color: "#2D3436" }}>
                            Hours:
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#2D3436" }}>
                            4pm - 2am
                        </Typography>
                    </Box>
                    <Box display={"flex"} gap={"1rem"} mb={"1rem"}>
                        <Typography variant="h4" sx={{ color: "#2D3436" }}>
                            Price:
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#2D3436" }}>
                            NTD: 100-200
                        </Typography>
                    </Box>

                </Box>
            </Box>

            {/* images section */}
            {/* <Box >
                <Box display={"flex"} gap={".5rem"} alignItems={"flex-end"} marginBottom={".5rem"}>
                    <Box width={"65%"} height={"380px"}>
                        <RecommendImage props={items[1]} />
                    </Box>
                    <Box width={"35%"} height={"380px"}>
                        <RecommendImage props={items[2]} />
                    </Box>
                </Box>
                <Box display={"flex"} gap={".5rem"} alignItems={"flex-end"}>
                    <Box width={"35%"} height={"380px"}>
                        <RecommendImage props={items[3]} />
                    </Box>
                    <Box width={"65%"} height={"380px"}>
                        <RecommendImage props={items[5]} />
                    </Box>
                </Box>
            </Box> */}

            {/* google map componenet dibawah */}

            <Box paddingTop={"20rem"}>
                <Typography variant="h2" sx={{ textAlign: "center", color: "#2D3436", marginBottom: "4rem" }}>
                    Discover the best night life in Fengjia
                </Typography>
            </Box>



            < Box padding={"10rem 0"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
                <Typography variant="h2" sx={{ textAlign: "center", color: "#2D3436", marginBottom: "2rem" }}>
                    Other Spots
                </Typography>
                <button className="btn_transparent">
                    <Typography variant="h4" sx={{ color: "#2D3436" }}>
                        View More
                    </Typography>
                </button>
            </ Box>


        </Box >
    )
}

export default Fengjia


