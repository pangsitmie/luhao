import React from 'react'
import { Box, Rating, Typography, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from "../../theme";
import MARKER_ICON from "src/assets/marker_icon.png";
import CloseIcon from '@mui/icons-material/Close';
import "./dialog.css";
import { useNavigate } from 'react-router-dom';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NTD',
    minimumFractionDigits: 0
});

const setPopupVisibility = () => {
    console.log("setPopupVisibility");
}


const AreaDialog = ({ props, top, left, closePopup }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    let navigate = useNavigate();

    const goToGoogleMap = () => {
        navigate(props.googleLink);
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
            <Box display={"flex"} p={"0rem 0"} alignItems={"center"} mb={"1.2rem"} justifyContent={"space-between"}>
                <Box pl={"5px"}>
                    <Typography variant="h2" sx={{ textAlign: "left", fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}>
                        {props.name}
                    </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <img src={MARKER_ICON} alt="" />
                </Box>
            </Box>
            <hr />
            <Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={"2rem"} gap={"1rem"}>
                    <Typography variant="h2" sx={{ textAlign: "left", fontSize: "1rem", fontWeight: "bold", color: "#fff", marginBottom: "5px" }}>
                        Address
                    </Typography>
                    <Typography variant="h2" sx={{ textAlign: "left", fontSize: "1rem", fontWeight: "500", color: "#fff", marginBottom: "5px" }}>
                        {props.address}
                    </Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={"1rem"} gap={"1rem"}>
                    <Typography variant="h2" sx={{ textAlign: "left", fontSize: "1rem", fontWeight: "bold", color: "#fff", marginBottom: "5px" }}>
                        Rating
                    </Typography>
                    <Box display={"flex"} gap={"5px"} alignItems={"center"}>
                        <Typography variant="h2" sx={{ textAlign: "left", fontSize: "1rem", fontWeight: "500", color: "#fff" }}>
                            4.8
                        </Typography>
                        <Rating name="read-only" value={4.8} readOnly />
                        <Typography variant="h2" sx={{ textAlign: "left", fontSize: "1rem", fontWeight: "500", color: "#fff" }}>
                            (1,593)
                        </Typography>
                    </Box>
                </Box>
            </Box>


            <Box display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} mt={"2rem"} gap={"1rem"}>
                {props.facebookLink &&
                    <a href={props.facebookLink} target="_blank">
                        <button className='btn_transparent_full' >
                            Facebook
                        </button>
                    </a>
                }

                <a href={props.googleLink} target="_blank">
                    <button className='btn_transparent_full' >
                        Google Map
                    </button>
                </a>
            </Box>

        </Box>
    )
}

export default AreaDialog

