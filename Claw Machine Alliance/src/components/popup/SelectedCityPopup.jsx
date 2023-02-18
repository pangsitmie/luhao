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
        <Box backgroundColor={"#FFFFFF"} borderRadius={"20px"} p={"2rem"} boxShadow={"0px 8px 15px rgba(0, 0, 0, 0.2)"}>
            <Typography variant="h3" sx={{ color: "#639E23", mb: "1.5rem", textAlign: "left", textTransform: "capitalize" }}>
                {selectedCity}
            </Typography>

            <Typography variant="h5" sx={{ color: "#484848", mb: "4rem", textAlign: "left" }}>
                Our map feature takes the guesswork out of finding the best locations, giving you access to up-to-date informa
            </Typography>

            <button className="btn_transparent" onClick={() => handleCityClick(selectedCity)}>
                <Typography variant="h5" sx={{ color: "#2D3436", textTransform: "capitalize" }}>
                    {selectedCity} Locations
                </Typography>
            </button>
        </Box>
    )
}

export default SelectedCityPopup