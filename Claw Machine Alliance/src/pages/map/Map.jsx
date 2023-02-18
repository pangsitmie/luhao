import React, { useState, useEffect } from 'react'
import { Box, Typography, useTheme, Button } from '@mui/material'
import { tokens } from "../../theme";



import TAIWAN_MAP_TAICHUNG from "src/assets/taiwan_map_taichung.png";
import TAIWAN_MAP_CHANGHUA from "src/assets/taiwan_map_changhua.png";
import TAIWAN_MAP_YUNLIN from "src/assets/taiwan_map_yunlin.png";


import "./map.css";
import SelectedCityPopup from 'src/components/popup/SelectedCityPopup';
import CityListView from 'src/components/listView/CityListView';
import RecommendedLocations from 'src/components/recommendedLocations/RecommendedLocations';

import YELLOW_BOTTOM from 'src/assets/yellow_bottom.png';
import YELLOW_TOP from 'src/assets/yellow_top1.png';
import WIGGLE from 'src/assets/wiggle.png';


const Map = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [selectedCity, setSelectedCity] = useState("taichung");
    const handleSelectedCity = (city) => {
        console.log("city", city);
        setSelectedCity(city);
    }

    useEffect(() => {
        // Preload images
        const images = [TAIWAN_MAP_TAICHUNG, TAIWAN_MAP_CHANGHUA, TAIWAN_MAP_YUNLIN];
        images.forEach((img) => {
            new Image().src = img;
        });
    }, []);

    return (
        <Box position={"relative"}>
            {/* first row */}
            <Box className={"map_intro"}>
                <Box >
                    <Typography variant="h1" sx={{ color: "#2D3436", mb: "1.5rem" }}>
                        We are <span className='green'>everywhere</span>
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#2D3436", width: "50%", mb: "1rem", lineHeight: "28px" }}>
                        Our map feature takes the guesswork out of finding the best locations, giving you access to up-to-date information on high-quality stores all in one place.
                    </Typography>
                </Box>
            </Box>

            <Box className={"map_list"}>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"}  >
                    {/* SELECT CITY FROM HERE */}
                    <Typography variant="h2" sx={{ fontSize: "30px", fontWeight: "bold", color: "#0A130D", mb: "1.5rem" }}>
                        Select Location
                    </Typography>
                    <CityListView selectedCity={selectedCity} onSelectCity={handleSelectedCity} />
                </Box>
                <Box className={"taiwan_map"} position={"relative"}>
                    {/* selected City popup componenet */}
                    <Box position={"relative"}>
                        <Box className={"wiggle"}>
                        </Box>
                        <SelectedCityPopup selectedCity={selectedCity} />

                    </Box>

                    <img
                        src={
                            selectedCity === "taipei"
                                ? TAIWAN_MAP_TAICHUNG
                                : selectedCity === "taichung"
                                    ? TAIWAN_MAP_TAICHUNG
                                    : selectedCity === "changhua"
                                        ? TAIWAN_MAP_CHANGHUA
                                        : selectedCity === "yunlin"
                                            ? TAIWAN_MAP_YUNLIN
                                            : selectedCity === "chiayi"
                                                ? TAIWAN_MAP_YUNLIN
                                                : selectedCity === "kaoshiung"
                                                    ? TAIWAN_MAP_YUNLIN
                                                    : selectedCity === "tainan"
                                                        ? TAIWAN_MAP_YUNLIN
                                                        : null
                        }
                    />
                </Box>
            </Box>


            <Box className={"container"}>

                <Typography variant="h2" sx={{ textAlign: "center", color: "#2D3436", mb: "1.5rem" }}>
                    Popular Spots
                </Typography>
                <Typography variant="h3" sx={{ textAlign: "center", color: "#ADADAD", mb: "1.5rem" }}>
                    Our best <span>recommendation</span> • for you
                </Typography>

            </Box>
            <img className='yellow_bottom' src={YELLOW_BOTTOM} alt="" />
            <img className='yellow_top' src={YELLOW_TOP} alt="" />
            <Box>
                <RecommendedLocations />
            </Box>
        </Box>
    )
}

export default Map