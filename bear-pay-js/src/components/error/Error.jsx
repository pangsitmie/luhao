import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import './error.css'
const Error = () => {

    const handleRefresh = () => {
        window.location.reload();
    }

    return (
        <div className='container_full'>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1.1rem", fontWeight: "600", color: "#cecece", lineHeight: "1.5", margin: ".5rem" }}>
                    Something Went wrong
                </Typography>

                <Button onClick={handleRefresh}
                    sx={{
                        border: "1px solid #cecece",
                        borderRadius: "25px",
                        padding: "0.25rem 2rem",
                    }}
                >
                    <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "600", color: "#cecece", lineHeight: "1.5" }}>
                        Reload
                    </Typography>
                </Button>
            </Box>
        </div>
    )
}

export default Error