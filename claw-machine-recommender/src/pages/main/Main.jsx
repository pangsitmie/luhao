import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import './main.css'
import { ColorModeContext, tokens } from "../../theme";
import SLOT_MACHINE1 from 'src/assets/slot_machine1.png'
import Carousel from 'src/components/carousel/Carousel';

// import Carousel from "./components/carouse/Carousel";

import GRADIENT_BLUR from 'src/assets/gradient_bg.png'


const Main = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <section>
            <Box className="hero">
                <Box height={"50vh"} display={"flex"} alignItems={"center"} justifyContent={"space-evenly"}>
                    <Typography variant="h2" sx={{ textAlign: "center", fontSize: "4.5rem", fontWeight: "600", color: colors.grey[100] }}>
                        FIND THE BEST
                    </Typography>
                    <Typography variant="h2" sx={{ textAlign: "center", fontSize: "4.5rem", fontWeight: "600", color: colors.grey[100] }}>
                        CLAW MACHINES
                    </Typography>
                </Box>

                {/* HERO CONTENT */}

                <Box className={"hero_content"}>
                    <Box>
                        <Box className={"hero_content_item"} m={" 0 -20px 0 20px "}>
                            <Typography variant="h2" sx={{ fontSize: "40px", fontWeight: "600", color: colors.grey[100], mb: "1rem" }}>
                                Hello World
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: "18px", fontWeight: "500", color: colors.grey[100], lineHeight: "1.4" }}>
                                This unique collection includes 20 of the best digital artist in the NFT space. Each team member is an original 1:1
                            </Typography>
                        </Box>
                        <Box className={"hero_content_item"} m={"50px -120px -100px 150px"}>
                            <Typography variant="h2" sx={{ fontSize: "40px", fontWeight: "600", color: colors.grey[100], mb: "1rem" }}>
                                Hello World
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: "18px", fontWeight: "500", color: colors.grey[100], lineHeight: "1.4" }}>
                                This unique collection includes 20 of the best digital artist in the NFT space. Each team member is an original 1:1
                            </Typography>
                        </Box>
                    </Box>
                    <Box className={"hero_content_col2"}>
                        <img src={SLOT_MACHINE1} alt="" />
                    </Box>
                    <Box className={"hero_content_col3"}>
                        <Box className={"hero_content_item"}>
                            <Typography variant="h2" sx={{ fontSize: "40px", fontWeight: "600", color: colors.grey[100], mb: "1rem" }}>
                                Hello World
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: "18px", fontWeight: "500", color: colors.grey[100], lineHeight: "1.4" }}>
                                This unique collection includes 20 of the best digital artist in the NFT space. Each team member is an original 1:1
                            </Typography>
                        </Box>
                    </Box>
                </Box>


                {/* FIND YOUR FAV BRANDS */}
                <Box className={"text-container"} p={"15rem 0"} mt={"10rem"}>
                    <Typography variant="h2" sx={{ textAlign: "center", fontSize: "4.5rem", fontWeight: "600", color: colors.grey[100] }}>
                        FIND YOUR
                    </Typography>
                    <Typography variant="h2" sx={{ textAlign: "center", fontSize: "4.5rem", fontWeight: "600", color: colors.grey[100] }}>
                        FAVORITE BRANDS
                    </Typography>
                </Box>

                {/* BRANDS CAROUSEL */}
                <Box className="container">
                    <Box className="curved-overlay-top" backgroundColor={colors.background[100]}>
                    </Box>
                    <Box className="curved">
                        <Box className="curved_content">
                            <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: "500", color: "#fff", lineHeight: "1.4", mb: "1rem" }}>
                                DIGITAL AGENCY OF RECORD
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: "50px", fontWeight: "600", color: "#fff", lineHeight: "1.4", mb: "4rem" }}>
                                Tillamook
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: "20px", color: "#fff", lineHeight: "1.5", mb: "5rem", width: "80%" }}>
                                We are proud to be Tillamook's digital agency of record. Through our ongoing parnership we have re-imagining their online presence and marketing communications
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

            </Box >
        </section >
    )
}

export default Main