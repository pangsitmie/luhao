import { Box, Typography } from '@mui/material'
import React from 'react'

const RecommendImage = ({ props }) => {

    const backgroundImageStyle = {
        backgroundImage: `url(${props.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        position: "relative",
    };

    const overlayStyle = {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        zIndex: 1,
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
        </Box>
    )
}

export default RecommendImage