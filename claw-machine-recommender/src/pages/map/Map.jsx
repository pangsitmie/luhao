import React from 'react'
import { Box, Typography, useTheme, Button } from '@mui/material'
import { ColorModeContext, tokens } from "../../theme";
import LocationDialog from 'src/components/dialog/LocationDialog';
import { Link } from 'react-router-dom';

import TAIWAN_MAP from "src/assets/taiwan_map.png";
import TAICHUNG_MAP from "src/assets/taichung_map.png";

import "./map.css";
const Map = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleCityClick = (city) => {
        return (
            <Link
                to={"/city"}
                state={{
                    data: city,
                }}
            >
                <img src={TAICHUNG_MAP} className={"taichung_button"} />
            </Link>
        );
    };


    return (
        <Box>
            <Box height={"100vh"} >
                <img src={TAIWAN_MAP} className={"taiwan_map"} />
                {handleCityClick("taichung")}
            </Box>
        </Box>
    )
}

export default Map