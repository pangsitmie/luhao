import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from "react-router-dom";

const SelectedCityPopup = (props) => {
    const navigate = useNavigate();

    const handleCityClick = (city) => {
        console.log(city);
        navigate(`/city`, { state: { data: city } });
    };

    const { selectedCity } = props;
    return (
        <Box backgroundColor={"#E6E6E6"} borderRadius={"12px"} p={"2rem"}>
            <Typography variant="h2" sx={{ fontSize: "26px", fontWeight: "bold", color: "#0A130D", mb: "1.5rem", textAlign: "left", textTransform: "capitalize" }}>
                {selectedCity}
            </Typography>

            <Typography variant="h3" sx={{ fontSize: "16px", color: "#484848", mb: "4rem", textAlign: "left" }}>
                Our map feature takes the guesswork out of finding the best locations, giving you access to up-to-date informa
            </Typography>

            <button className="btn_transparent" onClick={() => handleCityClick(selectedCity)}>
                <Typography variant="h2" sx={{ fontSize: "18px", textTransform: "capitalize", color: "#181818" }}>
                    {selectedCity} Locations
                </Typography>
            </button>
        </Box>
    )
}

export default SelectedCityPopup