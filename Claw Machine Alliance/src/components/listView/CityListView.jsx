import { Box, Typography } from '@mui/material'
import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import './cityListView.css'
const CityListView = (props) => {

    const { selectedCity, onSelectCity } = props;

    const handleCityClick = (city) => {
        if (city === selectedCity) {
            return;
        }
        onSelectCity(city);
    }


    return (
        <Box width={"100%"}>
            {/* item1 */}
            <Box className={"item_top"}>
                <Box className={`item_inner ${props.selectedCity === "taipei" ? "item_inner_active" : ""
                    }`} onClick={() => handleCityClick("taipei")}>
                    <Box>
                        <Typography variant="h2" sx={{ fontSize: "32px", textTransform: "capitalize", fontWeight: "bold", color: "#0A130D", textAlign: "left" }}>
                            taipei
                        </Typography>
                    </Box>
                    <Box>
                        <NavigateNextIcon sx={{ color: "#0A130D", fontSize: "2rem" }} />
                    </Box>
                </Box>
            </Box>
            {/* item2 */}
            <Box className={"item"}>
                <Box className={`item_inner ${props.selectedCity === "taichung" ? "item_inner_active" : ""
                    }`} onClick={() => handleCityClick("taichung")}>
                    <Box>
                        <Typography variant="h2" sx={{ fontSize: "32px", textTransform: "capitalize", fontWeight: "bold", color: "#0A130D", textAlign: "left" }}>
                            taichung
                        </Typography>
                    </Box>
                    <Box>
                        <NavigateNextIcon sx={{ color: "#0A130D", fontSize: "2rem" }} />
                    </Box>
                </Box>
            </Box>
            {/* item2 */}
            <Box className={"item"}>
                <Box className={`item_inner ${props.selectedCity === "changhua" ? "item_inner_active" : ""
                    }`} onClick={() => handleCityClick("changhua")}>
                    <Box>
                        <Typography variant="h2" sx={{ fontSize: "32px", textTransform: "capitalize", fontWeight: "bold", color: "#0A130D", textAlign: "left" }}>
                            changhua
                        </Typography>
                    </Box>
                    <Box>
                        <NavigateNextIcon sx={{ color: "#0A130D", fontSize: "2rem" }} />
                    </Box>
                </Box>
            </Box>
            {/* item2 */}
            <Box className={"item"}>
                <Box className={`item_inner ${props.selectedCity === "yunlin" ? "item_inner_active" : ""
                    }`} onClick={() => handleCityClick("yunlin")}>
                    <Box>
                        <Typography variant="h2" sx={{ fontSize: "32px", textTransform: "capitalize", fontWeight: "bold", color: "#0A130D", textAlign: "left" }}>
                            yunlin
                        </Typography>
                    </Box>
                    <Box>
                        <NavigateNextIcon sx={{ color: "#0A130D", fontSize: "2rem" }} />
                    </Box>
                </Box>
            </Box>
            {/* item2 */}
            <Box className={"item"}>
                <Box className={`item_inner ${props.selectedCity === "chiayi" ? "item_inner_active" : ""
                    }`} onClick={() => handleCityClick("chiayi")}>
                    <Box>
                        <Typography variant="h2" sx={{ fontSize: "32px", textTransform: "capitalize", fontWeight: "bold", color: "#0A130D", textAlign: "left" }}>
                            chiayi
                        </Typography>
                    </Box>
                    <Box>
                        <NavigateNextIcon sx={{ color: "#0A130D", fontSize: "2rem" }} />
                    </Box>
                </Box>
            </Box>
            <Box className={"item"}>
                <Box className={`item_inner ${props.selectedCity === "kaoshiung" ? "item_inner_active" : ""
                    }`} onClick={() => handleCityClick("kaoshiung")}>
                    <Box>
                        <Typography variant="h2" sx={{ fontSize: "32px", textTransform: "capitalize", fontWeight: "bold", color: "#0A130D", textAlign: "left" }}>
                            kaoshiung
                        </Typography>
                    </Box>
                    <Box>
                        <NavigateNextIcon sx={{ color: "#0A130D", fontSize: "2rem" }} />
                    </Box>
                </Box>
            </Box>
            {/* item2 */}
            <Box className={"item_bottom"}>
                <Box className={`item_inner ${props.selectedCity === "tainan" ? "item_inner_active" : ""
                    }`} onClick={() => handleCityClick("tainan")}>
                    <Box>
                        <Typography variant="h2" sx={{ fontSize: "32px", textTransform: "capitalize", fontWeight: "bold", color: "#0A130D", textAlign: "left" }}>
                            tainan
                        </Typography>
                    </Box>
                    <Box>
                        <NavigateNextIcon sx={{ color: "#0A130D", fontSize: "2rem" }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CityListView