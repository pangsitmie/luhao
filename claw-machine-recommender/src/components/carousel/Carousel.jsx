import { Box, Typography, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from "../../theme";
import MAP1 from 'src/assets/map1.png'
import React, { Component } from "react";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./carousel.css";

const Carousel = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const settings = {
        className: "center",
        arrows: false,
        dots: true,
        centerMode: true,
        infinite: true,
        centerPadding: "150px", //ini harus sama dengan padding di css .slick-list
        slidesToShow: 1,
        speed: 500,
    };
    return (
        <div>
            <Slider {...settings}>
                <div>
                    <Box className={"store_carousel_item"} border={"2px solid " + colors.grey[100]}>
                        {/* IMG */}
                        <Box className={"store_carousel_item_img"} >
                            <img src={MAP1} alt="" />
                        </Box>

                        {/* CONTENT */}
                        <Box className={"store_carousel_item_content"} >
                            <Box >
                                <Typography variant="h2" sx={{ fontSize: "42px", fontWeight: "600", color: colors.grey[100], lineHeight: "1.4", mb: "1rem" }}>
                                    Taichung City
                                </Typography>

                                <Typography variant="h2" sx={{ fontSize: "18px", color: colors.grey[100], lineHeight: "1.5", mb: "4rem" }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                </Typography>

                            </Box>
                            <Box position={"absolute"} bottom={"3rem"} >
                                <button className='btn_transparent'>
                                    <Typography variant="h2" sx={{ fontSize: "18px", color: "#FFB0EE" }}>
                                        View More
                                    </Typography>
                                </button>
                            </Box>
                        </Box>

                        <Box >
                            <Box border={"4px solid white"}
                                borderRadius={"50%"}
                                width={"80px"}
                                height={"80px"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                mt={"-30px"}>
                                <Typography variant="h2" sx={{ fontSize: "35px", fontWeight: "600", color: "#fff", mb: "5px" }}>
                                    中
                                </Typography>
                            </Box>
                        </Box>

                    </Box>
                </div>

                {/* 2ND CONTENT */}
                <div>
                    <Box className={"store_carousel_item"} border={"2px solid " + colors.grey[100]}>
                        {/* IMG */}
                        <Box className={"store_carousel_item_img"} >
                            <img src={MAP1} alt="" />
                        </Box>

                        {/* CONTENT */}
                        <Box className={"store_carousel_item_content"} >
                            <Box >
                                <Typography variant="h2" sx={{ fontSize: "42px", fontWeight: "600", color: colors.grey[100], lineHeight: "1.4", mb: "1rem" }}>
                                    Taipei City
                                </Typography>

                                <Typography variant="h2" sx={{ fontSize: "18px", color: colors.grey[100], lineHeight: "1.5", mb: "4rem" }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                </Typography>

                            </Box>
                            <Box position={"absolute"} bottom={"3rem"} >
                                <button className='btn_transparent'>
                                    <Typography variant="h2" sx={{ fontSize: "18px", color: "#FFB0EE" }}>
                                        View More
                                    </Typography>
                                </button>
                            </Box>
                        </Box>

                        <Box >
                            <Box border={"4px solid white"}
                                borderRadius={"50%"}
                                width={"80px"}
                                height={"80px"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                mt={"-30px"}>
                                <Typography variant="h2" sx={{ fontSize: "35px", fontWeight: "600", color: "#fff", mb: "5px" }}>
                                    北
                                </Typography>
                            </Box>
                        </Box>

                    </Box>
                </div>

                {/* 3RD CONTENT */}
                <div>
                    <Box className={"store_carousel_item"} border={"2px solid " + colors.grey[100]}>
                        {/* IMG */}
                        <Box className={"store_carousel_item_img"} >
                            <img src={MAP1} alt="" />
                        </Box>

                        {/* CONTENT */}
                        <Box className={"store_carousel_item_content"} >
                            <Box >
                                <Typography variant="h2" sx={{ fontSize: "42px", fontWeight: "600", color: colors.grey[100], lineHeight: "1.4", mb: "1rem" }}>
                                    Tainan City
                                </Typography>

                                <Typography variant="h2" sx={{ fontSize: "18px", color: colors.grey[100], lineHeight: "1.5", mb: "4rem" }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                </Typography>

                            </Box>
                            <Box position={"absolute"} bottom={"3rem"} >
                                <button className='btn_transparent'>
                                    <Typography variant="h2" sx={{ fontSize: "18px", color: "#FFB0EE" }}>
                                        View More
                                    </Typography>
                                </button>
                            </Box>
                        </Box>

                        <Box >
                            <Box border={"4px solid white"}
                                borderRadius={"50%"}
                                width={"80px"}
                                height={"80px"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                mt={"-30px"}>
                                <Typography variant="h2" sx={{ fontSize: "35px", fontWeight: "600", color: "#fff", mb: "5px" }}>
                                    南
                                </Typography>
                            </Box>
                        </Box>

                    </Box>
                </div>




            </Slider >
        </div >
    )
}

export default Carousel

