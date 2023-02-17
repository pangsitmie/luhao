import React, { useState } from 'react'
import { Box, Typography, useTheme, Button } from '@mui/material'
import { tokens } from "../../theme";



import TAIWAN_MAP_TAICHUNG from "src/assets/taiwan_map_taichung.png";
import TAIWAN_MAP_CHANGHUA from "src/assets/taiwan_map_changhua.png";
import TAIWAN_MAP_YUNLIN from "src/assets/taiwan_map_yunlin.png";


import "./map.css";
import SelectedCityPopup from 'src/components/popup/SelectedCityPopup';
import CityListView from 'src/components/listView/CityListView';
import RecommendedLocations from 'src/components/recommendedLocations/RecommendedLocations';

const Map = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [selectedCity, setSelectedCity] = useState("taichung");
    const handleSelectedCity = (city) => {
        console.log("city", city);
        setSelectedCity(city);
    }

    return (
        <>
            <Box className={"sea_bg"}>
                {/* first row */}
                <Box className={"map_intro"}>
                    <Box >
                        <Typography variant="h2" sx={{ fontSize: "70px", fontWeight: "bold", color: "#070607", mb: "1.5rem" }}>
                            TAIWAN MAP
                        </Typography>
                        <Typography variant="h2" sx={{ fontSize: "18px", color: "#484848", mb: "1rem", lineHeight: "28px" }}>
                            Our map feature takes the guesswork out of finding the best locations, giving you access to up-to-date information on high-quality stores all in one place.
                        </Typography>
                    </Box>
                    {/* selected City popup componenet */}
                    <SelectedCityPopup selectedCity={selectedCity} />
                </Box>

                <Box className={"map_list"}>
                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} width={"100%"}>
                        {/* SELECT CITY FROM HERE */}
                        <Typography variant="h2" sx={{ fontSize: "30px", fontWeight: "bold", color: "#0A130D", mb: "1.5rem" }}>
                            Select Location
                        </Typography>
                        <CityListView selectedCity={selectedCity} onSelectCity={handleSelectedCity} />
                    </Box>
                    <Box className={"taiwan_map"}>
                        {selectedCity === "taichung" && <img src={TAIWAN_MAP_TAICHUNG} />}
                        {selectedCity === "changhua" && <img src={TAIWAN_MAP_CHANGHUA} />}
                        {selectedCity === "yunlin" && <img src={TAIWAN_MAP_YUNLIN} />}
                        {/* add more images and conditions for other cities */}
                    </Box>


                </Box>
            </Box>


            {/* <Box p={"5rem"}>
                <Typography variant="h2" sx={{ fontSize: "60px", textAlign: "center", fontWeight: "bold", color: "#070607", mb: "1.5rem" }}>
                    RECOMMENDED LOCATIONS
                </Typography>
                <RecommendedLocations />
            </Box> */}

            {/* button that handles click event */}
            {/* <PinpointBtn
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
            /> */}
        </>
    )
}

export default Map