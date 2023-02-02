import { Typography } from '@mui/material'
import React from 'react'
import './error.css'
const Error = () => {
    return (
        <div className='container_full'>
            <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "600", color: "#fff", lineHeight: "1.5" }}>
                Something Went wrong<br />Please try again or report the issue
            </Typography>

        </div>
    )
}

export default Error