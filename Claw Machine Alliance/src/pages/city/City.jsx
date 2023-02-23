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
import DetailItemView from 'src/components/listView/DetailItemListView';
import Dropdown from 'src/components/dropdown/Dropdown';


import 'animate.css';



const containerStyle = {
    width: '100%',
    height: '100vh'
};




const City = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { t } = useTranslation();


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
            googleMapURL: "https://goo.gl/maps/eyowGmyorZ3gp88Q6"
        },
        {
            image: TC_MUSEUM,
            title: null,
            googleMapURL: "https://goo.gl/maps/aLqmr3fx32BwS8Gh6",
        },
        {
            image: DDL,
            title: "多多龍",
            googleMapURL: "https://goo.gl/maps/LCCriFULvxquEKPE8",
        },
        {
            image: TAICHUNG_THEATER,
            title: "Taichung Theater",
            googleMapURL: "https://goo.gl/maps/nE9VSCRNpZNeQAnHA",
        },
    ]


    const location = useLocation();
    const state = location.state;
    // console.log(state);

    const [cityData, setCityData] = useState([]);
    const handleDataChange = (data) => {
        setCityData(data);
    };

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
                    <Typography variant="h1" sx={{ textAlign: "left", color: "#0057D9", textTransform: "capitalize", marginBottom: "1rem" }}>
                        {t(state.data)}
                    </Typography>
                    <Typography variant="h3" sx={{ textAlign: "left", color: "#2D3436", mb: "4rem" }}>
                        體驗文化融合與美食的城市
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#2D3436", mb: "1rem" }}>
                        台中是臺灣中部地區的重要城市，也是臺灣的文化、經濟和交通感覺樞紐之一。擁有豐富的自然景觀，包括青山綠水、優美的山谷、湖泊和瀑布。此外，也是臺灣著名的美食之都，擁有眾多的美食餐廳和夜市，各式各樣的美食風味讓人流連忘返。
                        <br /><br />
                        台中市為臺灣的文化重鎮，有眾多的博物館、藝術中心和展覽館。例如，台中國家歌劇院、台中市立美術館、逢甲文化商圈等，都是文化藝術愛好者必訪之地。此外，台中市也是臺灣著名的觀光城市，每年吸引了大量的國內外旅客前來遊玩觀光，
                        其中最著名的風景觀光區包括日月潭、清境農場、高美濕地等。
                        <br /><br />
                        最後，台中市也是臺灣的經濟重心之一，擁有眾多的產業和企業。其中，
                        半導體、光電、綠能等高科技產業成為臺灣經濟的重要支柱。
                        台中市也擁有便捷的交通系統，包括臺中高鐵站、臺中國際機場、臺中港等，
                        使得臺中市成為重要的物流及交通重鎮。
                    </Typography>
                </Box>
                {/* image */}
                <Box>
                    <img src={TAICHUNG_PAGE_SLICE} alt="" />
                </Box>
            </Box>

            {/* images section */}
            <Box mt={"5rem"}>
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

            <Box paddingTop={"15rem"} >
                <Typography variant="h2" sx={{ textAlign: "center", color: "#111", marginBottom: "4rem" }}>
                    探索台中
                </Typography>
            </Box>


            <DetailItemView />



            <Box padding={"10rem 0"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <Typography variant="h3" sx={{ textAlign: "center", color: "#111", marginBottom: "2rem" }}>
                    更多景點
                </Typography>
                <button className="btn_transparent" >
                    <Typography variant="h5" sx={{ color: "#2D3436" }}>
                        查看更多
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