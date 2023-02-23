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
                        多多龍
                    </Typography>
                    <Typography variant="h3" sx={{ textAlign: "left", color: "#2D3436", mb: "4rem" }}>
                        逢甲最吸睛的 <span className='yellow'>娃娃機店</span>
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#2D3436", mb: "1rem" }}>
                        逢甲夜市最吸睛的零食娃娃機店，機台內擺滿時下最流行的各國零食、伴手禮以及生活用品，佛心出獎，連超級新手都可以獲得滿滿一箱戰利品!直接成為零食富翁!
                        入場即可獲得免費遊玩3次的活動，而且還有免費飲品可以享用，累了還有休息區可以小憩，歡迎大家來紓壓放鬆，工作人員還會提供夾取的小撇步哦!來一趟保證你盡興而歸!
                        <br /><br />
                        歡迎來跟各路好手互相切磋!當看到商品如雪崩式滾動出貨時，會有滿滿成就感哦~!
                        讓你獲得獎品同時也滿足玩的樂趣。地理位置方便，就在逢甲夜市周邊，讓你可以逛夜市滿足口腹之餘還可以友不同的娛樂體驗，滿足你的童心趣味!
                    </Typography>
                </Box>

                <Box width={"30%"} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                    <Typography variant="h3" sx={{ textAlign: "left", color: "#111", textTransform: "capitalize", marginBottom: "1rem" }}>
                        詳細資訊
                    </Typography>
                    <Box display={"flex"} gap={"1rem"} mb={"1rem"}>
                        <Typography variant="h4" sx={{ color: "#2D3436" }}>
                            地址:
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#2D3436" }}>
                            407台中市西屯區福星路368號
                        </Typography>
                    </Box>
                    <Box display={"flex"} gap={"1rem"} mb={"1rem"}>
                        <Typography variant="h4" sx={{ color: "#2D3436" }}>
                            電話號碼:
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#2D3436" }}>
                            0427003758
                        </Typography>
                    </Box>
                    <Box display={"flex"} gap={"1rem"} mb={"1rem"}>
                        <Typography variant="h4" sx={{ color: "#2D3436" }}>
                            營業時間:
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#2D3436" }}>
                            1pm - 2am
                        </Typography>
                    </Box>

                    <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
                        <a href="https://www.facebook.com/多多龍遊樂園-101250252694267/" target={"_blank"}>
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
                                包羅萬象的日常用品及食物，應有盡有任你夾取!如果卡關，別忘了詢問店員出獎的小撇步。歡迎來挑戰且留下美好回憶~!
                            </Typography>
                        </Box>

                    </Box>

                </Box>
            </Box>
            {/* claw machine section */}
            <Box p={"10rem"}>
                <Typography variant="h2" sx={{ textAlign: "center", color: "#111", mb: "1rem" }}>
                    這個地區的<span className='yellow'>娃娃機商店</span>
                </Typography>
                <Typography variant="h4" sx={{ textAlign: "center", color: "#2D3436", mb: "4rem" }}>
                    有得吃有得玩!一網打盡!
                </Typography>
                <BottomRecommendation />
            </Box>




        </Box >
    )
}

export default DDL


