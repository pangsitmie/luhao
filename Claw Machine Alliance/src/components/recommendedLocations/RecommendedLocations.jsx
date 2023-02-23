import { Box } from '@mui/material'
import React from 'react'
import RecommendImage from './RecommendImage'



import FENGJIA from 'src/assets/fengjia.jpeg'
import TC_MUSEUM from 'src/assets/taichung_museum.jpg'
import YIZHONG from 'src/assets/yizhong.jpg'
import SECOND_MARKET from 'src/assets/second_market.webp'
import RAMEN2 from 'src/assets/ramen2.jpg'
import DDL from 'src/assets/duoduolong2.jpg'
import TAICHUNG_THEATER from 'src/assets/taichung_theater.jpeg'

const RecommendedLocations = () => {
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
            googleMapURL: "",
        },
        {
            image: TC_MUSEUM,
            title: null,
            googleMapURL: "",
        },
        {
            image: DDL,
            title: "多多龍",
            googleMapURL: "https://goo.gl/maps/LCCriFULvxquEKPE8",
        },
        {
            image: TAICHUNG_THEATER,
            title: "",
            googleMapURL: "",
        },
    ]

    return (
        <Box
            display={"flex"}
            gap={"1.5rem"}
            p={"5rem 10rem"}
            alignItems={"center"}>

            {/* col 1 */}
            <Box width={"25%"} height={"500px"} >
                <RecommendImage props={items[0]} />
            </Box>

            {/* col2 */}
            <Box
                display={"flex"}
                flexDirection={"column"}
                gap={"1.5rem"}
                width={"75%"}
            >
                {/* row1 */}
                <Box display={"flex"} gap={"1.5rem"} alignItems={"flex-end"}>
                    <Box width={"65%"} height={"380px"}>
                        <RecommendImage props={items[1]} />
                    </Box>
                    <Box width={"35%"} height={"300px"}>
                        <RecommendImage props={items[2]} />
                    </Box>
                </Box>

                {/* row2 */}
                <Box display={"flex"} gap={"1.5rem"} alignItems={"flex-start"}>
                    <Box width={"25%"} height={"300px"}>
                        <RecommendImage props={items[3]} />
                    </Box>
                    <Box width={"50%"} height={"350px"}>
                        <RecommendImage props={items[4]} />
                    </Box>
                    <Box width={"25%"} height={"220px"}>
                        <RecommendImage props={items[5]} />
                    </Box>
                </Box>


            </Box>

        </Box>
    )
}

export default RecommendedLocations