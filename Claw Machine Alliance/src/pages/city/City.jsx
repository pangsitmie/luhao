import React, { useState, useEffect } from 'react';

import { Box, Typography, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from "../../theme";

import { useLocation } from 'react-router-dom';

import { taichung, changhua, yunlin } from "src/data/data";
import { CSSTransition } from 'react-transition-group';


import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import LocationDialog from 'src/components/dialog/LocationDialog';
const containerStyle = {
    width: '100%',
    height: '100vh'
};




const City = () => {
    const location = useLocation();
    const state = location.state;
    // console.log(state);

    let data;

    switch (state.data) {
        case 'taichung':
            data = taichung;
            break;
        case 'changhua':
            data = changhua;
            break;
        case 'yunlin':
            data = yunlin;
            break;
        default:
        // handle default case
    }

    // console.log(data);

    const center = {
        lat: data[0].coordinates.lat,
        lng: data[0].coordinates.lng
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ============= MAP =============
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBER-4oyLUNArTZ1OvpZ9e8e6Z0TA8QaRc",
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

    const [selectedMarker, setSelectedMarker] = useState(null);
    const [dialogPosition, setDialogPosition] = useState({
        top: "0px",
        left: "0px"
    });


    const handleMarkerClick = (item) => {
        setSelectedMarker(item);
        setPopupVisibility(true);
    };

    function handleClick(event) {
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
        <Box transition-style="in:circle:top-left">
            <Box height={"95vh"} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                <Typography onClick={handleClick} variant="h3" sx={{ textAlign: "center", color: "#2D3436" }}>
                    Places you might be <span>interested</span> in
                </Typography>
                <Typography variant="h1" sx={{ textAlign: "center", color: "#2D3436", textTransform: "capitalize" }}>
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
                    {data.map((item) => (
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
                        <CSSTransition
                            in={isPopupVisible}
                            timeout={10000}
                            classNames="fade"
                            unmountOnExit
                        >
                            <LocationDialog
                                props={selectedMarker}
                                closePopup={() => setPopupVisibility(false)}
                                top={dialogPosition.top}
                                left={dialogPosition.left}
                                visible={isPopupVisible}
                            />
                        </CSSTransition>
                    )}
                </GoogleMap>
            ) : <></>}

        </Box>
    )
}

export default City