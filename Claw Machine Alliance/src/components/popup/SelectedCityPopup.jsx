import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const SelectedCityPopup = (props) => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const handleCityClick = (city) => {
        console.log(city);
        navigate(`/city`, { state: { data: city } });
    };

    const { selectedCity } = props;
    return (
        <Box backgroundColor={"#FFFFFF"} borderRadius={"20px"} p={"2rem"} boxShadow={"0px 8px 15px rgba(0, 0, 0, 0.2)"}>
            <Typography variant="h3" sx={{ color: "#111", mb: "1.5rem", textAlign: "left", textTransform: "capitalize" }}>
                {t(selectedCity)}
            </Typography>

            <Typography variant="h5" sx={{ color: "#484848", mb: "4rem", textAlign: "left" }}>
                Our map feature takes the guesswork out of finding the best locations, giving you access to up-to-date informa
            </Typography>

            {selectedCity === "taipei" || selectedCity === "chiayi" || selectedCity === "kaoshiung" || selectedCity === "tainan" ? (
                <button className="btn_transparent">
                    <Typography variant="h5" sx={{ color: "#2D3436", textTransform: "capitalize" }}>
                        Not Available
                    </Typography>
                </button>
            ) : (
                <button className="btn_transparent" onClick={() => handleCityClick(selectedCity)}>
                    <Typography variant="h5" sx={{ color: "#2D3436", textTransform: "capitalize" }}>
                        {t("discover")}{t(selectedCity)}
                    </Typography>
                </button>
            )}
        </Box>
    )
}

export default SelectedCityPopup