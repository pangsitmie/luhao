import { Box, Button } from '@mui/material';
import React from 'react'
import "./pinpointBtn.css";
import { useNavigate } from "react-router-dom";


const PinpointBtn = ({ props }) => {

    const navigate = useNavigate();

    const handleCityClick = (city) => {
        console.log(city);

        navigate(`/city`, { state: { data: city } });
        // location.navigate({
        //     pathname: "/city",
        //     state: { data: city },
        // });
    };

    return (
        <Box
            id="wi"
            onClick={() => handleCityClick(props.city)}
            style={{
                position: "absolute",
                cursor: "pointer",
                top: props.top,
                left: props.left,
            }}>
            <div className="pinpoint">
                {props.title}
            </div>
        </Box>
    )
}

export default PinpointBtn