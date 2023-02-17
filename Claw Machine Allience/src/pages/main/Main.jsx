import React from 'react'

import { Box, Typography, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from "../../theme";

import './main.css'
import Carousel from 'src/components/carousel/Carousel';

import SPACE_BG1 from 'src/assets/space_bg1.png'
import WAVE from 'src/assets/wave.png'
import PURPLE_WAVE from 'src/assets/pruple_wave.png'
import GREEN_MAP from 'src/assets/green_map.png'
import MAP_VECTOR from 'src/assets/map_vector.png'
import SHOP_3D from 'src/assets/shop_3d.png'
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HERO_BG from 'src/assets/hero_bg.png'
import { useTranslation } from 'react-i18next';


const Main = () => {
    const { t } = useTranslation();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <>
            <Box p={"8rem 0"} >
                <img src={HERO_BG} className={"hero_bg"} alt="" />
                <Box className="hero" >
                    <Box p={" 0 5rem"}>
                        <p className='tagline_text'>{t('claw_machine_title1')}</p>
                        <p className='tagline_text2'>{t('claw_machine_title2')}</p>
                        <p className='tagline_text3'>{t('claw_machine_title3')}</p>
                    </Box>
                </Box >
            </Box>
            <div>
                <img src={WAVE} className={"wave_divider"} alt="" />
            </div>


            {/* FIND THE BEST AREA CONTENT */}
            <Box className={"hero_content"}>
                <Box>
                    <Box>
                        <Typography variant="h2" sx={{ fontSize: "70px", fontWeight: "bold", color: "#87AE2D", mb: "1rem" }}>
                            {t('find_the_best')}
                        </Typography>
                        <Typography variant="h2" sx={{ fontSize: "70px", fontWeight: "bold", color: "#87AE2D", mb: "1rem" }}>
                            {t('area')}
                        </Typography>
                        <Typography variant="h2" sx={{ fontSize: "18px", color: "#484848", mb: "1rem", lineHeight: "28px" }}>
                            {t('area_tagline1')}
                        </Typography>
                    </Box>
                    <Box display={"flex"} gap={"5rem"} mt={"3rem"}>
                        <Box width={"100%"}>
                            <LocationSearchingIcon sx={{ fontSize: "40px", color: "#87AE2D", mb: "1rem" }} />
                            <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: "600", color: "#484848", mb: "1rem" }}>
                                {t('area_subtitle1')}
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: "18px", color: "#484848", mb: "1rem", lineHeight: "28px" }}>
                                {t('area_desc1')}
                            </Typography>
                        </Box>
                        <Box width={"100%"}>
                            <LocationOnIcon sx={{ fontSize: "40px", color: "#87AE2D", mb: "1rem" }} />
                            <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: "600", color: "#484848", mb: "1rem" }}>
                                {t('area_subtitle2')}
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: "18px", color: "#484848", mb: "1rem", lineHeight: "28px" }}>
                                {t('area_desc2')}
                            </Typography>
                        </Box>

                    </Box>
                </Box>
                <Box className={"hero_content_img"}>
                    <img src={GREEN_MAP} alt="" />
                </Box>
            </Box>

            {/* FIND YOUR FAV BRANDS */}
            <Box p={"10rem 5rem"} className={"fav_brands"}>
                <Box display={"flex"} justifyContent={"center"}>
                    <img src={SHOP_3D} alt="" />
                </Box>
                <Box >
                    <Typography variant="h2" sx={{ textAlign: "right", fontSize: "70px", fontWeight: "bold", color: "#182E58", mb: "1rem" }}>
                        {t('popular')}
                    </Typography>
                    <Typography variant="h2" sx={{ textAlign: "right", fontSize: "70px", fontWeight: "bold", color: "#182E58", mb: "1rem" }}>
                        {t('brands')}
                    </Typography>
                    <Typography variant="h2" sx={{ textAlign: "right", fontSize: "18px", color: "#484848", mb: "1rem", lineHeight: "28px" }}>
                        {t('brand_tagline')}
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" pt={"1rem"}>
                        <button className="btn_transparent">
                            <Typography variant="h2" sx={{ fontSize: "18px", color: "#181818" }}>
                                {t('view_brands')}
                            </Typography>
                        </button>
                    </Box>
                </Box>
            </Box>



            <Box className={"map_content"} >
                <Box>
                    <Typography variant="h2" sx={{ fontSize: "70px", fontWeight: "bold", color: "#ED6B6C", mb: "1rem" }}>
                        {t('check_out_our')}
                    </Typography>
                    <Typography variant="h2" sx={{ fontSize: "70px", fontWeight: "bold", color: "#ED6B6C", mb: "1rem" }}>
                        {t('map')}
                    </Typography>
                    <Typography variant="h2" sx={{ fontSize: "18px", color: "#484848", mb: "1rem", lineHeight: "28px" }}>
                        {t('map_tagline')}
                    </Typography>
                    <Box display="flex" pt={"1rem"}>
                        <button className="btn_transparent">
                            <Typography variant="h2" sx={{ fontSize: "18px", color: "#181818" }}>
                                {t('map_btn')}
                            </Typography>
                        </button>
                    </Box>
                </Box>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} >
                    <img src={MAP_VECTOR} width={"90%"} alt="" />
                </Box>
            </Box>

            <Box bgcolor={"#fff"} className='pruple_wave_img'>
                <img src={PURPLE_WAVE} alt="" />
            </Box>

            {/* BRANDS CAROUSEL */}
            {/* <Box className="container">
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
            </Box> */}


            {/* STORE CAROUSEL */}
            <Box p={"10rem 0rem 2rem 0rem"} position={"relative"} sx={{ background: "linear-gradient(180deg, #332258, #111116)" }} >
                <Box>
                    <Typography variant="h2" sx={{ textAlign: "center", fontSize: "4.2rem", fontWeight: "bold", color: colors.grey[100], mb: "3rem" }}>
                        {t('locations')}
                    </Typography>
                </Box>
                <Carousel />
            </Box>
        </  >
    )
}

export default Main