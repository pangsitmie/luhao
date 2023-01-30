import React, { useState, useEffect } from 'react';

import { Box, Typography, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from "../../theme";

import { useLocation } from 'react-router-dom';

import { taichung } from "src/data/data";


import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import LocationDialog from 'src/components/dialog/LocationDialog';
const containerStyle = {
    width: '100%',
    height: '100vh'
};

const center = {
    lat: 24.1761475,
    lng: 120.6447767
};
const marker = {
    lat: 24.1761475,
    lng: 120.6447767
}
console.log(taichung[0].coordinates);

const City = () => {
    const location = useLocation();
    const state = location.state;

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ============= MAP =============
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBER-4oyLUNArTZ1OvpZ9e8e6Z0TA8QaRc"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);


        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    // ============= END =============


    const [isPopupVisible, setPopupVisibility] = useState(false);
    useEffect(() => {
        console.log(isPopupVisible);
    }, [isPopupVisible]);

    const [selectedMarker, setSelectedMarker] = useState(null);
    const [dialogPosition, setDialogPosition] = useState({
        top: "0px",
        left: "0px"
    });

    useEffect(() => {
        console.log(dialogPosition);
    }, [dialogPosition]);


    const handleMarkerClick = (item) => {
        setSelectedMarker(item);
        setPopupVisibility(true);
        console.log("hello");
    };

    function handleClick(event) {
        // console.log(event.pixel.x);
        const top = event.pixel.y + 320;
        if (top < 0) {
            top = top * -1;
        }
        const left = event.pixel.x + 310;
        setDialogPosition({
            top: `${top}px`,
            left: `${left}px`
        });
    }

    return (
        <Box>
            <Box height={"95vh"} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                <Typography onClick={handleClick} variant="h2" sx={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "500", color: colors.grey[100], textTransform: "uppercase" }}>
                    ALL AVAILABLE AREAS IN
                </Typography>
                <Typography variant="h2" sx={{ textAlign: "center", fontSize: "5rem", fontWeight: "600", color: colors.grey[100], textTransform: "uppercase" }}>
                    {state.data}
                </Typography>
            </Box>

            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onDrag={() => setPopupVisibility(false)}
                    onClick={() => setPopupVisibility(false)}
                >
                    { /* Child components, such as markers, info windows, etc. */}
                    {taichung.map((item) => (
                        <MarkerF
                            key={item.title}
                            position={item.coordinates}
                            onClick={(event) => {
                                handleMarkerClick(item);
                                handleClick(event);
                            }}
                        />
                    ))}

                    {isPopupVisible && (
                        <LocationDialog
                            props={selectedMarker}
                            closePopup={() => setPopupVisibility(false)}
                            top={dialogPosition.top}
                            left={dialogPosition.left}
                        />
                    )}
                </GoogleMap>
            ) : <></>}

        </Box>
    )
}

export default City