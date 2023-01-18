import { Typography } from '@mui/material'
import React from 'react'
import './error.css'
const Error = () => {
    return (
        <div className='container_full'>
            <Typography variant="h2" sx={{ textAlign: "left", fontSize: "1.2rem", fontWeight: "600", color: "#fff", lineHeight: "1.5" }}>
                GQL ERROR
            </Typography>
            {/* <div className="card">
                <p>GQL ERROR</p>
            </div> */}
        </div>
    )
}

export default Error