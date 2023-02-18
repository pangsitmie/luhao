import { Box } from '@mui/material'
import React from 'react'
import RecommendImage from './RecommendImage'



import FENGJIA from 'src/assets/fengjia.jpeg'
import RAMEN1 from 'src/assets/ramen1.jpg'
import RAMEN2 from 'src/assets/ramen2.jpg'
import DDL1 from 'src/assets/duoduolong1.jpg'
import DDL2 from 'src/assets/duoduolong2.jpg'
import TAICHUNG_THEATER from 'src/assets/taichung_theater.jpeg'

const RecommendedLocations = () => {



    const items = [
        {
            image: FENGJIA,
            title: "Fengjia",
            googleMapURL: "https://goo.gl/maps/4Z9Z9Z9Z9Z9Z9Z9Z9",
        },
        {
            image: RAMEN1,
            title: "Ichiran Ramen",
            googleMapURL: "https://goo.gl/maps/4Z9Z9Z9Z9Z9Z9Z9Z",
        },
        {
            image: RAMEN2,
            title: null,
            googleMapURL: null,
        },
        {
            image: DDL1,
            title: null,
            googleMapURL: null,
        },
        {
            image: DDL2,
            title: "多多龍",
            googleMapURL: null,
        },
        {
            image: TAICHUNG_THEATER,
            title: null,
            googleMapURL: null,
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