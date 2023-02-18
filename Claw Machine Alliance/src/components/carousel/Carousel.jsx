import { Box, Typography, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from "../../theme";
import MAP1 from 'src/assets/map1.png'
import React, { Component } from "react";
import Slider from "react-slick";

import TAICHUNG_PHONE from 'src/assets/taichung_phone.png'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./carousel.css";
import { useTranslation } from 'react-i18next';

const Carousel = () => {
    const { t } = useTranslation();


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
                    <Box className={"store_carousel_item"} >
                        {/* CONTENT */}
                        <Box className={"store_carousel_item_content"} >
                            <Box >
                                <Typography variant="h2" sx={{ color: "#fff", mb: "1rem" }}>
                                    Taichung
                                </Typography>

                                <Typography variant="h5" sx={{ color: colors.grey[100], mb: "4rem" }}>
                                    {t('location_desc')}
                                </Typography>
                            </Box>
                            <Box position={"absolute"} bottom={"3rem"} >
                                <button className='btn_transparent'>
                                    <Typography variant="h5" sx={{ color: "#FFF" }}>
                                        View Locations
                                    </Typography>
                                </button>
                            </Box>
                        </Box>

                        <Box className={"store_carousel_item_img"} >
                            <img src={TAICHUNG_PHONE} alt="" />
                        </Box>
                    </Box>
                </div>

                {/* 2ND CONTENT */}
                <div>
                    <Box className={"store_carousel_item"} >
                        {/* CONTENT */}
                        <Box className={"store_carousel_item_content"} >
                            <Box >
                                <Typography variant="h2" sx={{ color: "#fff", mb: "1rem" }}>
                                    Changhua
                                </Typography>

                                <Typography variant="h5" sx={{ color: colors.grey[100], mb: "4rem" }}>
                                    {t('location_desc')}
                                </Typography>
                            </Box>
                            <Box position={"absolute"} bottom={"3rem"} >
                                <button className='btn_transparent'>
                                    <Typography variant="h5" sx={{ color: "#FFF" }}>
                                        View Locations
                                    </Typography>
                                </button>
                            </Box>
                        </Box>

                        <Box className={"store_carousel_item_img"} >
                            <img src={TAICHUNG_PHONE} alt="" />
                        </Box>
                    </Box>
                </div>

                {/* 2ND CONTENT */}
                <div>
                    <Box className={"store_carousel_item"} >
                        {/* CONTENT */}
                        <Box className={"store_carousel_item_content"} >
                            <Box >
                                <Typography variant="h2" sx={{ color: "#fff", mb: "1rem" }}>
                                    Yunlin
                                </Typography>

                                <Typography variant="h5" sx={{ color: colors.grey[100], mb: "4rem" }}>
                                    {t('location_desc')}
                                </Typography>
                            </Box>
                            <Box position={"absolute"} bottom={"3rem"} >
                                <button className='btn_transparent'>
                                    <Typography variant="h5" sx={{ color: "#FFF" }}>
                                        View Locations
                                    </Typography>
                                </button>
                            </Box>
                        </Box>

                        <Box className={"store_carousel_item_img"} >
                            <img src={TAICHUNG_PHONE} alt="" />
                        </Box>
                    </Box>
                </div>
            </Slider >
        </div >
    )
}

export default Carousel

