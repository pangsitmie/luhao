import { Box, Typography } from '@mui/material'
import React from 'react'
import './about.css'
import WAVE_WHITE from 'src/assets/wave_white.png'
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();


    return (
        <Box transition-style="in:circle:hesitate">
            <Box className='about_section'>
                <Typography variant={"h2"} sx={{ width: "70%", color: "#111", mb: ".8rem" }}>
                    {t('about_title')}
                </Typography>
                <Typography variant={"h4"} sx={{ color: "#343434" }}>
                    {t('about_desc')}
                </Typography>
            </Box>
            <Box className={"about_wave"}>
                <img src={WAVE_WHITE} alt="" />
            </Box>
            <Box className='about_content'>
                <Typography variant={"h2"} sx={{ width: "80%", color: "#fff", mb: "2rem" }}>
                    {t('about_title2')}
                </Typography>
                <Typography variant={"h3"} sx={{ color: "#fff", mb: "2rem" }}>
                    {t('about_tagline1')}
                </Typography>
                <Typography variant={"h4"} sx={{ color: "#bebebe", mb: "2rem", lineHeight: "150%" }}>
                    {t('about_desc1')}
                    <br /><br />
                </Typography>

                <Typography variant={"h3"} sx={{ color: "#fff", mb: "2rem" }}>
                    {t('about_tagline2')}
                </Typography>
                <Typography variant={"h4"} sx={{ color: "#bebebe", mb: "2rem", lineHeight: "150%" }}>
                    {t('about_desc2')}
                </Typography>
            </Box>
        </Box>
    )
}

export default About