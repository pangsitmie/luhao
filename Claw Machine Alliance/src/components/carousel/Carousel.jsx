import { Box, Typography, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from "../../theme";
import MAP1 from 'src/assets/map1.png'
import React, { Component } from "react";
import Slider from "react-slick";

import TAICHUNG_PHONE from 'src/assets/taichung_phone.png'

import TAIPEI_SLICE from 'src/assets/taipei_slice.png'
import TAICHUNG_SLICE from 'src/assets/taichung_slice.png'
import TAINAN_SLICE from 'src/assets/tainan_slice.png'
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
                                <Typography variant="h3" sx={{ color: "#fff", mb: "1rem" }}>
                                    {t('taichung')}
                                </Typography>

                                <Typography variant="h5" sx={{ color: colors.grey[100], mb: "4rem" }}>
                                    {t('locations_tc')}
                                </Typography>
                            </Box>
                            <Box  >
                                <button className='btn_transparent'>
                                    <Typography variant="h5" sx={{ color: "#FFF" }}>
                                        View Locations
                                    </Typography>
                                </button>
                            </Box>
                        </Box>

                        <Box className={"store_carousel_item_img"} >
                            <img src={TAICHUNG_SLICE} alt="" />
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
                                    {t('taipei')}
                                </Typography>

                                <Typography variant="h5" sx={{ color: colors.grey[100], mb: "4rem" }}>
                                    {t('locations_tpe')}
                                </Typography>
                            </Box>
                            <Box  >
                                <button className='btn_transparent'>
                                    <Typography variant="h5" sx={{ color: "#FFF" }}>
                                        View Locations
                                    </Typography>
                                </button>
                            </Box>
                        </Box>

                        <Box className={"store_carousel_item_img"} >
                            <img src={TAIPEI_SLICE} alt="" />
                        </Box>
                    </Box>
                </div>

                {/* 2ND CONTENT */}
                <div>
                    <Box className={"store_carousel_item"} >
                        {/* CONTENT */}
                        <Box className={"store_carousel_item_content"} >
                            <Box >
                                <Typography variant="h3" sx={{ color: "#fff", mb: "1rem" }}>
                                    {t('tainan')}
                                </Typography>

                                <Typography variant="h5" sx={{ color: colors.grey[100], mb: "4rem" }}>
                                    {t('locations_tainan')}
                                </Typography>
                            </Box>
                            <Box  >
                                <button className='btn_transparent'>
                                    <Typography variant="h5" sx={{ color: "#FFF" }}>
                                        View Locations
                                    </Typography>
                                </button>
                            </Box>
                        </Box>

                        <Box className={"store_carousel_item_img"} >
                            <img src={TAINAN_SLICE} alt="" />
                        </Box>
                    </Box>
                </div>
            </Slider >
        </div >
    )
}

export default Carousel

