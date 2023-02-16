import React from 'react'
import { Box, Typography, useTheme, Button } from '@mui/material'
import { tokens } from "../../theme";

import TAIWAN_MAP from "src/assets/taiwan_map.png";


import "./map.css";
import PinpointBtn from 'src/components/pinpoint/PinpointBtn';
const Map = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box transition-style="in:circle:hesitate">
            <Box height={"100%"} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"} pt={"2rem"}>
                <img src={TAIWAN_MAP} className={"taiwan_map"} />
            </Box>

            {/* button that handles click event */}
            <PinpointBtn
                props={{
                    title: "臺中",
                    city: "taichung",
                    top: "50%",
                    left: "20%"
                }}
            />

            <PinpointBtn
                props={{
                    title: "彰化",
                    city: "changhua",
                    top: "56%",
                    left: "15%"
                }}
            />

            <PinpointBtn
                props={{
                    title: "雲林",
                    city: "yunlin",
                    top: "65%",
                    left: "12%"
                }}
            />
        </Box>
    )
}

export default Map