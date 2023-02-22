import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import FENGJIA_NIGHT from 'src/assets/fengjia_night.jpg'
import './dialog.css'
import { useNavigate } from "react-router-dom";
import FENGJIA_DETAIL_IMG from 'src/assets/fengjia_detail_img.png'
import GOOGLE_MAP_ICON from '../../assets/google_map_icon.png'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'animate.css';

const DetailItemDialog = ({ props }) => {
    const navigate = useNavigate();

    const data = {
        googleMapLink: props.googleMapLink,
        title: props.title,
        redirect: props.redirect,
    }
    const handleClick = (city) => {
        console.log(city);
        navigate(`/${city}`);
    };
    return (
        <Box className={"detail_item_dialog animate__bounceIn "}>
            <a href={data.googleMapLink} target="_blank">
                <Box className={"circleBoxStyle"}>
                    <img src={GOOGLE_MAP_ICON} width={"100%"} alt="" />
                </Box>
            </a>

            <Box>
                <Typography variant="h4" sx={{ textTransform: "capitalize", color: "#FFF" }}>
                    {data.title}
                </Typography>
            </Box>

            <a href={`/${props.redirect}`}>
                <Box className={"circleBoxStyle"}>
                    <ArrowForwardIosIcon sx={{ color: "#111" }} />
                </Box>
            </a>
        </Box >
    )
}

export default DetailItemDialog