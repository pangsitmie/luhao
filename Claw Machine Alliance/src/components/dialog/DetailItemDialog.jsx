import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import FENGJIA_NIGHT from 'src/assets/fengjia_night.jpg'
import './dialog.css'
import { useNavigate } from "react-router-dom";
import FENGJIA_DETAIL_IMG from 'src/assets/fengjia_detail_img.png'



const DetailItemDialog = () => {
    const navigate = useNavigate();

    const handleClick = (city) => {
        console.log(city);
        navigate(`/${city}`);
    };

    return (
        <Box className={"detail_item_dialog"}>
            <Box className={"detail_item_dialog_img"}>
                <img src={FENGJIA_DETAIL_IMG} alt="" />
            </Box>
            <button className='btn_transparent_full' onClick={() => handleClick("fengjia")}>
                <Typography variant="h4" sx={{ fontSize: "14px", textTransform: "capitalize", color: "#0A130D" }}>
                    查看逢甲夜市
                </Typography>
            </button>
        </Box >
    )
}

export default DetailItemDialog