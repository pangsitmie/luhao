import React, { useState, useEffect } from 'react';

import { Box, Typography, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from "../../theme";

import { useLocation } from 'react-router-dom';

import { taichung, changhua, yunlin } from "src/data/data";
import { CSSTransition } from 'react-transition-group';
import TAICHUNG_DETAIL_MAP from "src/assets/taichung_detail_map1.png";
import TAICHUNG_PAGE_SLICE from "src/assets/taichung_page_slice.png";

import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import LocationDialog from 'src/components/dialog/LocationDialog';
import { useTranslation } from 'react-i18next';
import RecommendImage from 'src/components/recommendedLocations/RecommendImage';
import FENGJIA from 'src/assets/fengjia.jpeg'
import TC_MUSEUM from 'src/assets/taichung_museum.jpg'
import YIZHONG from 'src/assets/yizhong.jpg'
import SECOND_MARKET from 'src/assets/second_market.webp'
import RAMEN2 from 'src/assets/ramen2.jpg'
import DDL from 'src/assets/duoduolong2.jpg'
import TAICHUNG_THEATER from 'src/assets/taichung_theater.jpeg'
import DetailItemListView from 'src/components/listView/DetailItemListView';
import Dropdown from 'src/components/dropdown/Dropdown';
import DetailItemDialog from 'src/components/dialog/DetailItemDialog';






const containerStyle = {
    width: '100%',
    height: '100vh'
};




const City = () => {
    const items = [
        {
            image: FENGJIA,
            title: "Fengjia",
            googleMapURL: "https://goo.gl/maps/mGw7E45EWYjKkUYX7",
        },
        {
            image: SECOND_MARKET,
            title: "2nd Market",
            googleMapURL: "https://goo.gl/maps/ajViBmER12uCeaqYA",
        },
        {
            image: YIZHONG,
            title: null,
            googleMapURL: "null",
        },
        {
            image: TC_MUSEUM,
            title: null,
            googleMapURL: "https://goo.gl/maps/FxF5oBmrba5DFCsG9",
        },
        {
            image: DDL,
            title: "多多龍",
            googleMapURL: "https://goo.gl/maps/LCCriFULvxquEKPE8",
        },
        {
            image: TAICHUNG_THEATER,
            title: "",
            googleMapURL: "https://goo.gl/maps/nE9VSCRNpZNeQAnHA",
        },
    ]


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
        <Box transition-style="in:circle:hesitate" p={"0 5rem"}>

            {/* hero */}
            <Box height={"100vh"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} >
                {/* content */}
                <Box width={"50%"}>
                    <Typography onClick={handleClick} variant="h3" sx={{ textAlign: "left", color: "#2D3436" }}>
                        Places you might be <span>interested</span> in
                    </Typography>
                    <Typography variant="h1" sx={{ textAlign: "left", color: "#0057D9", textTransform: "capitalize", marginBottom: "4rem" }}>
                        {state.data}
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#2D3436", mb: "1rem" }}>
                        Our map feature takes the guesswork out of finding the best locations, giving you access to up-to-date information on high-quality stores all in one place.
                    </Typography>
                </Box>
                {/* image */}
                <Box>
                    <img src={TAICHUNG_PAGE_SLICE} alt="" />
                </Box>
            </Box>

            {/* images section */}
            <Box >
                <Box display={"flex"} gap={".5rem"} alignItems={"flex-end"} marginBottom={".5rem"}>
                    <Box width={"65%"} height={"380px"}>
                        <RecommendImage props={items[1]} />
                    </Box>
                    <Box width={"35%"} height={"380px"}>
                        <RecommendImage props={items[2]} />
                    </Box>
                </Box>
                <Box display={"flex"} gap={".5rem"} alignItems={"flex-end"}>
                    <Box width={"35%"} height={"380px"}>
                        <RecommendImage props={items[3]} />
                    </Box>
                    <Box width={"65%"} height={"380px"}>
                        <RecommendImage props={items[5]} />
                    </Box>
                </Box>
            </Box>

            {/* google map componenet dibawah */}

            <Box paddingTop={"20rem"}>
                <Typography variant="h2" sx={{ textAlign: "center", color: "#2D3436", marginBottom: "4rem" }}>
                    Explore Taichung
                </Typography>
            </Box>

            <Box display={"flex"} gap={"1rem"}>
                <Box width={"100%"}>
                    <Box display={"flex"} justifyContent={"space-evenly"}>
                        <Box>
                            <Typography variant="h4" sx={{ color: "#639E23", mb: "1rem" }}>
                                Travel
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h4" sx={{ color: "#FAC161", mb: "1rem" }}>
                                Claw Machines
                            </Typography>

                        </Box>
                        <Box>
                            <Typography variant="h4" sx={{ color: "#ED6B6C", mb: "1rem" }}>
                                Foods
                            </Typography>
                        </Box>
                    </Box>
                    <DetailItemListView />
                </Box>

                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} borderRadius={"20px"} backgroundColor={"#EAEBEC"} position={"relative"}>
                    {/* detail item selector */}
                    <img src={TAICHUNG_DETAIL_MAP} width={"100%"} alt="" />
                    <DetailItemDialog />
                </Box>
            </Box>

            <Box padding={"10rem 0"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <Typography variant="h2" sx={{ textAlign: "center", color: "#2D3436", marginBottom: "2rem" }}>
                    Other Spots
                </Typography>
                <button className="btn_transparent">
                    <Typography variant="h4" sx={{ color: "#2D3436" }}>
                        View More
                    </Typography>
                </button>
            </Box>


        </Box >
    )
}

export default City




/*
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
*/