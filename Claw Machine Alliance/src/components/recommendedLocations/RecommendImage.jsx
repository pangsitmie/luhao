import { Box, Icon, Typography } from '@mui/material'
import React from 'react'
import GOOGLE_MAP_ICON from '../../assets/google_map_icon.png'
import 'animate.css';

const RecommendImage = ({ props }) => {

    const backgroundImageStyle = {
        backgroundImage: `url(${props.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
        // borderRadius: "20px",
        position: "relative",
    };

    const overlayStyle = {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        // borderRadius: "20px",
        zIndex: 1,
    };

    const circleBoxStyle = {
        width: "50px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "1rem",
        right: "1rem",
        backgroundColor: "white",
        borderRadius: "50%",
        padding: ".5rem",
        zIndex: 3000,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
            transform: "scale(1.1)",
            cursor: "pointer",
        },
    };
    const circleBoxStyleNoTitle = {
        width: "50px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: "1rem",
        left: "1rem",
        backgroundColor: "white",
        borderRadius: "50%",
        padding: ".5rem",
        zIndex: 3000,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
            transform: "scale(1.1)",
            cursor: "pointer",
        },
    };

    return (
        <Box sx={backgroundImageStyle}>
            <Box sx={overlayStyle}></Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    padding: "1.2rem",
                    boxSizing: "border-box",
                    position: "relative",
                    zIndex: 2,
                    height: "100%",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: "42px",
                        textTransform: "capitalize",
                        color: "#FFF",
                        textAlign: "left",
                    }}
                >
                    {props.title}
                </Typography>
            </Box>

            {props.googleMapURL && (
                <a href={props.googleMapURL} target={"_blank"}>
                    {props.title ? (
                        <Box sx={circleBoxStyle} className={"animate__bounceIn"}>
                            <img src={GOOGLE_MAP_ICON} width={"100%"} alt="" />
                        </Box>
                    ) : (
                        <Box sx={circleBoxStyleNoTitle} className={"animate__bounceIn"}>
                            <img src={GOOGLE_MAP_ICON} width={"100%"} alt="" />
                        </Box>
                    )}
                </a>
            )}
        </Box>
    )
}

export default RecommendImage