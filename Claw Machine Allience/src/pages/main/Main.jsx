import React from 'react'

import { Box, Typography, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from "../../theme";

import './main.css'
import SLOT_MACHINE1 from 'src/assets/slot_machine1.png'
import Carousel from 'src/components/carousel/Carousel';

// import Carousel from "./components/carouse/Carousel";

import GRADIENT_BLUR from 'src/assets/gradient_bg.png'
import TAGLINE_LEFT from 'src/assets/tagline_left.png'
import TAGLINE_RIGHT from 'src/assets/tagline_right.png'

import TAGLINE2_LEFT from 'src/assets/tagline2_left.png'
import TAGLINE2_RIGHT from 'src/assets/tagline2_right.png'

const Main = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <section className="main_container">
            <Box className="hero">
                <Box
                    height={"100%"}
                    display={"flex"}
                    alignItems={"center"}
                    m={"5rem 0"}
                >
                    <div className='tagline'>
                        <img src={TAGLINE_LEFT} alt="" />
                    </div>
                    <div className='tagline'>
                        <img src={TAGLINE_RIGHT} alt="" />
                    </div>
                </Box>

                {/* HERO CONTENT */}

                <Box className={"hero_content"}>
                    <Box>
                        <Box className={"hero_content_item"} m={" 0 -20px 0 20px "}>
                            <Typography variant="h2" sx={{ fontSize: "52px", fontWeight: "600", color: "#fff", mb: "1rem" }}>
                                台中娃娃機聯盟
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: "500", color: colors.grey[100], lineHeight: "1.6" }}>
                                目標:E化娃娃機聚落，在地圖上蒐集優質店家的各種資訊，讓大家得知哪裡可以遊玩夾娃娃機。
                            </Typography>
                        </Box>
                        <Box className={"hero_content_item"} m={"50px -120px -100px 150px"}>
                            <Typography variant="h2" sx={{ fontSize: "52px", fontWeight: "600", color: "#fff", mb: "1rem" }}>
                                台中聯盟聚落例如
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: "500", color: colors.grey[100], lineHeight: "1.4" }}>
                                一中、逢甲、東海、廟東、彰化商圈。
                            </Typography>
                        </Box>
                    </Box>
                    <Box className={"hero_content_col2"}>
                        <img src={SLOT_MACHINE1} alt="" />
                    </Box>
                    <Box className={"hero_content_col3"}>
                        <Box className={"hero_content_item"}>
                            <Typography variant="h2" sx={{ fontSize: "52px", fontWeight: "600", color: "#fff", mb: "1rem" }}>
                                如何快速探索喜愛店家
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: "500", color: colors.grey[100], lineHeight: "1.4" }}>
                                點選在地圖上標記的娃娃機聚落以及特殊商店，使用各種流行的社群軟體並匯集各會會員宣傳資訊。
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box >

            {/* FIND YOUR FAV BRANDS */}
            <Box p={"15rem 0"}>
                <div className='tagline2_left'>
                    <img src={TAGLINE2_LEFT} alt="" />
                </div>
                <div className='tagline2_right'>
                    <img src={TAGLINE2_RIGHT} alt="" />
                </div>
            </Box>

            {/* BRANDS CAROUSEL */}
            <Box className="container">
                <Box className="curved-overlay-top" backgroundColor={colors.background[100]}>
                </Box>
                <Box className="curved">
                    <Box className="curved_content">
                        <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: "500", color: "#fff", lineHeight: "1.4", mb: "1rem" }}>
                            親子娛樂/食品零售批發/遊樂園
                        </Typography>
                        <Typography variant="h2" sx={{ fontSize: "50px", fontWeight: "600", color: "#fff", lineHeight: "1.4", mb: "4rem" }}>
                            多多龍遊樂園
                        </Typography>
                        <Typography variant="h2" sx={{ fontSize: "20px", color: "#fff", lineHeight: "1.5", mb: "5rem", width: "80%" }}>
                            台中市西屯區福星路368號 <br />
                            官方Line https://lin.ee/RgD9Y4d
                        </Typography>
                        <button className='btn_white'>
                            View More
                        </button>
                    </Box>
                </Box>
                <Box className="curved-overlay" backgroundColor={colors.background[100]}>
                </Box>
            </Box>


            {/* STORE CAROUSEL */}
            <Box p={"30rem 0rem 10rem 0rem"} position={"relative"}>
                <Box>
                    <Typography variant="h2" sx={{ textAlign: "center", fontSize: "4rem", color: colors.grey[100], mb: "3rem" }}>
                        LOCATIONS
                    </Typography>
                </Box>
                <Carousel />
                <img src={GRADIENT_BLUR} alt="" className='gradient_blur_location' />
            </Box>
        </ section>
    )
}

export default Main