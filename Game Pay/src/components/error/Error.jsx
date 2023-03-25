import { Typography } from '@mui/material'
import React from 'react'
import './error.css'
const Error = () => {
    return (
        <div className='container_full'>
            <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1.1rem", fontWeight: "600", color: "#cecece", lineHeight: "1.5", margin: ".5rem" }}>
                Something Went wrong<br />Please try again or report the issue
            </Typography>

        </div>
    )
}

export default Error