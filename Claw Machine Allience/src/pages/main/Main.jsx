import React from 'react'

import { Box, Typography, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from "../../theme";

import './main.css'
import Carousel from 'src/components/carousel/Carousel';

import SPACE_BG1 from 'src/assets/space_bg1.png'
import WAVE from 'src/assets/wave.png'
import IPHONE_HERO from 'src/assets/iphone_hero.png'

import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const Main = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <section className="main_container">
            <img src={SPACE_BG1} className={"space_bg"} alt="" />
            <Box className="hero">
                <Box>
                    <p className='racing_font tagline_text'>CLAW</p>
                    <p className='racing_font tagline_text2'>MACHINE</p>
                    <p className='racing_font tagline_text3'>ALLIANCE</p>
                </Box>
                <Box>
                    <img src={WAVE} className={"wave_divider"} alt="" />
                </Box>
            </Box >


            {/* HERO CONTENT */}
            <Box className={"hero_content"}>
                <Box>
                    <Box>
                        <Typography variant="h2" sx={{ fontSize: "36px", fontWeight: "600", color: "#fff", mb: "1rem" }}>
                            Taichung Claw Machine Alliance
                        </Typography>
                        <Typography variant="h2" sx={{ fontSize: "18px", color: "#fff", mb: "1rem", lineHeight: "28px" }}>
                            We are dedicated to providing the latest information about the best places to play claw machines in the area. By compiling a comprehensive map of
                            high-quality stores, we aim to make it easier for everyone to find the perfect location for their claw machine experience. Whether you're a
                            seasoned claw machine player or just starting out, our map will provide all the information you need to make an informed decision.
                        </Typography>
                    </Box>
                    <Box display={"flex"} gap={"1rem"} mt={"2rem"}>
                        <Box>
                            <LocationSearchingIcon sx={{ fontSize: "40px", color: "#fff", mb: "1rem" }} />
                            <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: "600", color: "#fff", mb: "1rem" }}>
                                How to Quickly Explore Stores
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: "18px", color: "#fff", mb: "1rem", lineHeight: "28px" }}>
                                We map claw machine alliances and special stores and promote via social media for quick exploration.
                            </Typography>
                        </Box>
                        <Box>
                            <LocationOnIcon sx={{ fontSize: "40px", color: "#fff", mb: "1rem" }} />
                            <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: "600", color: "#fff", mb: "1rem" }}>
                                Taichung Alliance Areas includes
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: "18px", color: "#fff", mb: "1rem", lineHeight: "28px" }}>
                                The Taichung alliance for example are, Yizhong and Fengjia ,Donghai, Miaodong, Changhua shopping area .
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className={"hero_content_img"}>
                    <img src={IPHONE_HERO} alt="" />
                </Box>
            </Box>

            {/* FIND YOUR FAV BRANDS */}
            <Box mt={"15rem"} p={"10rem"} className={"fav_brands"}>
                <div className='tagline2_left'>
                    <p className='racing_font'>FIND YOUR</p>
                </div>
                <div className='tagline2_right'>
                    <p className='racing_font'>FAVORITE BRAND</p>
                </div>
            </Box>

            {/* BRANDS CAROUSEL */}
            <Box className="container">
                <Box className="curved-overlay-top" backgroundColor={"#9EA0C9"}>
                </Box>
                <Box className="curved">
                    <Box className="curved_content">
                        <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: "500", color: "#fff", lineHeight: "1.4", mb: "5px" }}>
                            親子娛樂/食品零售批發/遊樂園
                        </Typography>
                        <Typography variant="h2" sx={{ fontSize: "50px", fontWeight: "bold", color: "#fff", lineHeight: "1.4", mb: "1rem" }}>
                            多多龍遊樂園
                        </Typography>
                        <Typography variant="h2" sx={{ fontSize: "20px", color: "#cecece", lineHeight: "1.5", mb: "5rem", width: "80%" }}>
                            台中市西屯區福星路368號 <br />
                            官方Line https://lin.ee/RgD9Y4d
                        </Typography>
                        <Box width={"30%"}>
                            <button className='btn_transparent'>
                                <Typography variant="h2" sx={{ fontSize: "18px", color: "#FFF" }}>
                                    View Location
                                </Typography>
                            </button>
                        </Box>
                    </Box>
                </Box>
                <Box className="curved-overlay" backgroundColor={"#332258"}>
                </Box>
            </Box>


            {/* STORE CAROUSEL */}
            <Box p={"10rem 0rem 2rem 0rem"} position={"relative"} sx={{ background: "linear-gradient(180deg, #332258, #101123)" }} >
                <Box>
                    <Typography variant="h2" sx={{ textAlign: "center", fontSize: "4.2rem", fontWeight: "bold", color: colors.grey[100], mb: "3rem" }}>
                        LOCATIONS
                    </Typography>
                </Box>
                <Carousel />
            </Box>
        </ section >
    )
}

export default Main