import React, { useState, useEffect } from 'react';

import { Box, Button, Container, IconButton, Typography, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from "../../theme";

import { useLocation } from 'react-router-dom';

import { CSSTransition } from 'react-transition-group';
import TAICHUNG_DETAIL_MAP from "src/assets/taichung_detail_map1.png";
import TAICHUNG_PAGE_SLICE from "src/assets/taichung_page_slice.png";

import DetailItemView from 'src/components/listView/DetailItemListView';
import Dropdown from 'src/components/dropdown/Dropdown';
import DetailItemDialog from 'src/components/dialog/DetailItemDialog';
import YouTubeIcon from '@mui/icons-material/YouTube';


import './places.css'
import ReactPlayer from 'react-player';
import TIKTOK from 'src/assets/tiktok_icon.png'
import DDL_VIDEO from 'src/assets/ddl_video.mp4'
import RecommendedLocations from 'src/components/recommendedLocations/RecommendedLocations';
import BottomRecommendation from 'src/components/bottomRecommendation/BottomRecommendation';
import FacebookIcon from '@mui/icons-material/Facebook';

import DDL_PAGE_IMG1 from 'src/assets/ddl_page_img1.jpg'
import DDL_PAGE_IMG2 from 'src/assets/ddl_page_img2.jpg'


const DDL = () => {
    const location = useLocation();
    const state = location.state;


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);




    return (
        <Box >
            <div className="overlay"></div>
            <video className='video_content' src={DDL_VIDEO} autoPlay loop muted />
            <div className="content">
                <Typography variant="h1" sx={{ fontSize: "200px", textAlign: "left", color: "#FFF", marginBottom: "1rem" }}>
                    ENDLESS
                </Typography>
                <Typography variant="h1" sx={{ fontSize: "200px", textAlign: "left", color: "#FFF", marginBottom: "1rem" }}>
                    FUN
                </Typography>
            </div>


            {/* hero */}
            <Box height={"100vh"} display={"flex"} justifyContent={"space-between"} p={"5rem"} gap={"10%"}>
                {/* content */}
                <Box width={"60%"} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                    <Typography variant="h1" sx={{ textAlign: "left", color: "#111", textTransform: "capitalize", marginBottom: "1rem" }}>
                        ?????????
                    </Typography>
                    <Typography variant="h3" sx={{ textAlign: "left", color: "#2D3436", mb: "4rem" }}>
                        ?????????????????? <span className='yellow'>????????????</span>
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#2D3436", mb: "1rem" }}>
                        ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????!????????????????????????!
                        ??????????????????????????????3?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????!??????????????????????????????!
                        <br /><br />
                        ????????????????????????????????????!?????????????????????????????????????????????????????????????????????~!
                        ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????!
                    </Typography>
                </Box>

                <Box width={"30%"} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                    <Typography variant="h3" sx={{ textAlign: "left", color: "#111", textTransform: "capitalize", marginBottom: "1rem" }}>
                        ????????????
                    </Typography>
                    <Box display={"flex"} gap={"1rem"} mb={"1rem"}>
                        <Typography variant="h4" sx={{ color: "#2D3436" }}>
                            ??????:
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#2D3436" }}>
                            407???????????????????????????368???
                        </Typography>
                    </Box>
                    <Box display={"flex"} gap={"1rem"} mb={"1rem"}>
                        <Typography variant="h4" sx={{ color: "#2D3436" }}>
                            ????????????:
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#2D3436" }}>
                            0427003758
                        </Typography>
                    </Box>
                    <Box display={"flex"} gap={"1rem"} mb={"1rem"}>
                        <Typography variant="h4" sx={{ color: "#2D3436" }}>
                            ????????????:
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#2D3436" }}>
                            1pm - 2am
                        </Typography>
                    </Box>

                    <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
                        <a href="https://www.facebook.com/??????????????????-101250252694267/" target={"_blank"}>
                            <IconButton className='social_icon_button' sx={{ backgroundColor: "#1877F2", padding: "1rem" }}>
                                <FacebookIcon sx={{ color: "#FFF", fontSize: "2rem" }} />
                            </IconButton>
                        </a>

                        <a href="https://www.youtube.com/" target={"_blank"}>
                            <IconButton className='social_icon_button' sx={{ backgroundColor: "#FF0000", padding: "1rem" }}>
                                <YouTubeIcon sx={{ color: "#FFF", fontSize: "2rem" }} />
                            </IconButton>
                        </a>

                        <a href="https://www.tiktok.com/" target={"_blank"}>
                            <IconButton className='social_icon_button' sx={{ backgroundColor: "#212121" }}>
                                <img src={TIKTOK} width={"50px"} alt="" />
                            </IconButton>
                        </a>
                    </Box>

                </Box>
            </Box>

            {/* images section */}



            <Box p={"5rem"} backgroundColor={"#000"}>
                {/* <Typography variant="h4" sx={{ textAlign: "left", color: "#CECECE", mb: "1rem" }}>
                    see what people are doing
                </Typography>
                <Typography variant="h2" sx={{ textAlign: "left", color: "#FFF", mb: "4rem" }}>
                    Highlights
                </Typography> */}
                <Box display={"flex"} gap={"2rem"}>
                    <Box width={"60%"}>
                        <img src={DDL_PAGE_IMG1} style={{ width: "100%", height: "500px", objectFit: "cover" }} />
                    </Box>
                    <Box display={"flex"} width={"40%"}>
                        <Box >
                            <Box >
                                <img style={{ width: "100%", height: "250px", objectFit: "cover" }} src={DDL_PAGE_IMG2} alt="" />
                            </Box>
                            <Typography variant="h4" sx={{ textAlign: "center", fontSize: "24px", color: "#FFF", m: "1rem 0" }}>
                                ???????????????????????????????????????????????????????????????!?????????????????????????????????????????????????????????????????????????????????????????????~!
                            </Typography>
                        </Box>

                    </Box>

                </Box>
            </Box>
            {/* claw machine section */}
            <Box p={"10rem"}>
                <Typography variant="h2" sx={{ textAlign: "center", color: "#111", mb: "1rem" }}>
                    ???????????????<span className='yellow'>???????????????</span>
                </Typography>
                <Typography variant="h4" sx={{ textAlign: "center", color: "#2D3436", mb: "4rem" }}>
                    ??????????????????!????????????!
                </Typography>
                <BottomRecommendation />
            </Box>




        </Box >
    )
}

export default DDL


