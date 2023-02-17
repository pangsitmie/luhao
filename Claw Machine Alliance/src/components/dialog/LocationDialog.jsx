import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from "../../theme";
import MARKER_ICON from "src/assets/marker_icon.png";
import CloseIcon from '@mui/icons-material/Close';
import "./locationDialog.css";
import { useNavigate } from 'react-router-dom';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NTD',
    minimumFractionDigits: 0
});

const setPopupVisibility = () => {
    console.log("setPopupVisibility");
}


const LocationDialog = ({ props, top, left, closePopup }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    let navigate = useNavigate();

    const navigateToArea = () => {
        console.log(props);
        navigate(`/area`, { state: { data: props } });
    }


    return (
        <Box
            className={"location_dialog "}
            p={"1.5rem"}
            borderRadius={"25px"}
            width={"400px"}
            style={{
                background: `linear-gradient(to bottom, rgba(3, 69, 84, 0.9), rgba(63, 114, 124, 0.9))`,
                position: "absolute",
                top: top,
                left: left,
            }}>
            <Box display={"flex"} p={"0rem 0"}>
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <img src={MARKER_ICON} alt="" />
                </Box>
                <Box pl={"1.5rem"}>
                    <Typography variant="h2" sx={{ textAlign: "left", fontSize: "1.1rem", fontWeight: "bold", color: "#fff", marginBottom: "5px" }}>
                        {props.title}
                    </Typography>
                    <Typography variant="h2" sx={{ textAlign: "left", fontSize: "13px", fontWeight: "500", color: "#fff", marginBottom: "5px" }}>
                        {props.description}
                    </Typography>
                    <Typography variant="h2" sx={{ textAlign: "left", fontSize: "13px", fontWeight: "500", color: "#fff" }}>
                        {props.location}
                    </Typography>
                </Box>
            </Box>
            <hr />
            <Box padding={"1rem "}>
                <Box display={"flex"} alignItems={"center"} mb={"3rem"}>
                    <Box width={"50%"} >
                        <Typography variant="h2" sx={{ textAlign: "left", fontSize: "1rem", fontWeight: "500", color: "#fff", mb: ".5rem" }}>
                            Total Stores
                        </Typography>
                        <Typography variant="h2" sx={{ textAlign: "left", fontSize: "16px", fontWeight: "500", color: "#fff" }}>
                            {props.totalStores}
                        </Typography>
                    </Box>
                    <Box width={"50%"} ml={"30%"} >
                        <Typography variant="h2" sx={{ textAlign: "left", fontSize: "1rem", fontWeight: "500", color: "#fff", mb: ".5rem" }}>
                            Transaction
                        </Typography>
                        <Typography variant="h2" sx={{ textAlign: "left", fontSize: "16px", fontWeight: "500", color: "#fff" }}>
                            {formatter.format(props.transaction)}
                        </Typography>
                    </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                    <Box width={"50%"}>
                        <Typography variant="h2" sx={{ textAlign: "left", fontSize: "1rem", fontWeight: "500", color: "#fff", mb: ".5rem" }}>
                            City
                        </Typography>
                        <Typography variant="h2" sx={{ textAlign: "left", fontSize: "16px", fontWeight: "500", color: "#fff" }}>
                            {props.city}
                        </Typography>
                    </Box>
                    <Box width={"50%"} ml={"30%"}>
                        <Typography variant="h2" sx={{ textAlign: "left", fontSize: "1rem", fontWeight: "500", color: "#fff", mb: ".5rem" }}>
                            District
                        </Typography>
                        <Typography variant="h2" sx={{ textAlign: "left", fontSize: "16px", fontWeight: "500", color: "#fff" }}>
                            {props.district}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={"1rem"}>
                <button className='btn_transparent_full' onClick={() => navigateToArea(props)}>
                    View Stores
                </button>
            </Box>

        </Box>
    )
}

export default LocationDialog

