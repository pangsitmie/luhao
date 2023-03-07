import React from 'react'

import { Box, Typography, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from "../../theme";

import './main.css'
import Carousel from 'src/components/carousel/Carousel';

import SPACE_BG1 from 'src/assets/space_bg1.png'
import WAVE_BRAND1 from 'src/assets/wave_brand1.png'
import WAVE_BRAND2 from 'src/assets/wave_brand2.png'

import PURPLE_WAVE from 'src/assets/purple_wave.png'
import GREEN_MAP from 'src/assets/green_map.png'
import MAP_VECTOR from 'src/assets/map_vector.png'
import SHOP_3D from 'src/assets/shop_3d.png'
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HERO_BG from 'src/assets/hero_bg1.png'
import { useTranslation } from 'react-i18next';
import MAIN_HERO_BACK from 'src/assets/main_hero_back.png'
import MAIN_HERO_FRONT from 'src/assets/main_hero_front.png'
import REC from 'src/assets/rec.png'
const Main = () => {
    const { t } = useTranslation();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <>
            <img src={REC} className={"rec"} alt="" />
            <img src={MAIN_HERO_BACK} className={"hero_bg"} alt="" />
            <Box height={"80vh"}
                p={"5rem"}
                display={"flex"}
                alignItems={"center"}
                position={"relative"}>

                <img src={MAIN_HERO_FRONT} className={"main_hero_front"} alt="" />

                <Box width={"40%"}>
                    <Typography variant="h2" sx={{ color: "#fff", textTransform: "capitalize" }}>{t('discover')}</Typography>
                    <Typography variant="h1" sx={{ mb: "2rem" }}>{t('taiwan')}</Typography>
                    <Typography variant="h3" sx={{ textAlign: "left", color: "#fff", mb: "1rem" }} >{t('claw_machine_title2')}</Typography>
                    <Typography variant="h5" sx={{ textAlign: "left", color: "#fff" }} >{t('claw_machine_title3')}</Typography>
                </Box>
            </Box>



            {/* FIND THE BEST AREA CONTENT */}
            <Box className={"hero_content"} pt={"20rem"}>
                <Box >
                    <Box>
                        <Typography variant="h2" sx={{ color: "#2D3436" }} >
                            {t('find_the_best')}
                        </Typography>
                        <Typography variant="h1" sx={{ color: "#111", mb: "1rem" }} >
                            {t('area')}
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#2D3436", mb: "1rem" }}>
                            {t('area_tagline1')}
                        </Typography>
                    </Box>
                    <Box display={"flex"} gap={"2rem"} mt={"3rem"}>
                        <Box width={"100%"}>
                            <LocationSearchingIcon sx={{ fontSize: "40px", color: "#87AE2D", mb: "1rem" }} />
                            <Typography variant="h4" sx={{ color: "#484848", mb: "1rem" }}>
                                {t('area_subtitle1')}
                            </Typography>
                            <Typography variant="h5" sx={{ color: "#2D3436", mb: "1rem" }}>
                                {t('area_desc1')}
                            </Typography>
                        </Box>
                        <Box width={"100%"}>
                            <LocationOnIcon sx={{ fontSize: "40px", color: "#87AE2D", mb: "1rem" }} />
                            <Typography variant="h4" sx={{ color: "#484848", mb: "1rem" }}>
                                {t('area_subtitle2')}
                            </Typography>
                            <Typography variant="h5" sx={{ color: "#2D3436", mb: "1rem" }}>
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
            <Box className={"fav_brands"}>
                <img src={SHOP_3D} className={"shop_brand_img"} />
                <img src={WAVE_BRAND1} className={"wave_brand1"} />
                <img src={WAVE_BRAND2} className={"wave_brand2"} />
                <Box width={"40%"} pb={"4rem"}>
                    <Typography variant="h2" sx={{ color: "#2D3436", textAlign: "center" }} >
                        {t('popular')}
                    </Typography>
                    <Typography variant="h1" sx={{ color: "#111", textAlign: "center", mb: "1rem" }} >
                        {t('brands')}
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#2D3436", textAlign: "center", mb: "1rem" }} >
                        {t('brand_tagline')}
                    </Typography>
                    <Box display="flex" justifyContent="center" pt={"1rem"}>
                        <button className="btn_transparent">
                            <Typography variant="h5" sx={{ color: "#2D3436" }}>
                                {t('view_brands')}
                            </Typography>
                        </button>
                    </Box>
                </Box>
            </Box>



            <Box className={"map_content"} >
                <Box>
                    {/* <Typography variant="h1" sx={{ color: "#ED6B6C" }} >
                        {t('check_out_our')}
                    </Typography> */}
                    <Typography variant="h2" sx={{ color: "#2D3436" }} >
                        {t('check_out_our')}
                    </Typography>
                    <Typography variant="h1" sx={{ color: "#111", mb: "1rem" }} >
                        {t('map')}
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#2D3436", mb: "1rem" }}>
                        {t('map_tagline')}
                    </Typography>
                    <Box display="flex" pt={"1rem"}>
                        <a href="/map">
                            <button className="btn_transparent" >
                                <Typography variant="h5" sx={{ color: "#2D3436" }}>
                                    {t('map_btn')}
                                </Typography>
                            </button>
                        </a>
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
            <Box p={"0 0rem 2rem 0rem"} position={"relative"} sx={{ background: "linear-gradient(180deg, #0057D9, #111)" }} >
                <Box>
                    <Typography variant="h1" sx={{ textTransform: "capitalize", color: "#FFFFFF", textAlign: "center", mb: "4rem" }} >
                        {t('locations')}
                    </Typography>
                </Box>
                <Carousel />
            </Box>
        </  >
    )
}

export default Main