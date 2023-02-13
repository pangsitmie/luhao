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
            <Box display={"flex"} p={"0rem 0"}>
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <img src={MARKER_ICON} alt="" />
                </Box>
                <Box pl={"1.5rem"}>
                    <Typography variant="h2" sx={{ textAlign: "left", fontSize: "1.1rem", fontWeight: "bold", color: "#fff", marginBottom: "5px" }}>
                        {props.name}
                    </Typography>
                    <Typography variant="h2" sx={{ textAlign: "left", fontSize: "13px", fontWeight: "500", color: "#fff", marginBottom: "5px" }}>
                        {props.address}
                    </Typography>
                </Box>
            </Box>
            <hr />


            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={"1rem"} gap={"1rem"}>
                {props.facebookLink &&
                    <a href={props.facebookLink} target="_blank">
                        <button className='btn_transparent' >
                            Facebook
                        </button>
                    </a>
                }

                <a href={props.googleLink} target="_blank">
                    <button className='btn_transparent' >
                        Google Map
                    </button>
                </a>
            </Box>

        </Box>
    )
}

export default AreaDialog

