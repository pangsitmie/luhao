import { Box, Typography } from '@mui/material'
import React from 'react'
import SECOND_MARKET from 'src/assets/second_market.webp'
import PlaceIcon from '@mui/icons-material/Place';
const Item = ({ props }) => {

    return (
        <div>
            <img style={{ width: "100%", height: "250px", objectFit: "cover" }} className={"img_curved"} src={props.img} alt="" />
            <Typography variant="h4" sx={{ textTransform: "capitalize", color: "#0A130D", m: "1rem 0 .5rem" }}>
                {props.title}
            </Typography>
            <Box display={"flex"} alignItems={"center"} justifyContent={"flex-start"} gap={"5px"} mb={"1rem"} >
                <PlaceIcon sx={{ fontSize: "2rem", color: "#6E7273", marginLeft: "-5px" }} />
                <Typography variant="h5" sx={{ fontSize: "14px", textTransform: "capitalize", color: "#6E7273" }}>
                    {props.location}
                </Typography>
            </Box>

        </div>
    )
}

export default Item