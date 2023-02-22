import { Box } from '@mui/material';
import React from 'react'
import DDL_MAP from "src/assets/duoduolong_map.png";
import DetailItemDialog from 'src/components/dialog/DetailItemDialog';
import Item from '../item/Item';
import IMG1 from "src/assets/優品娃娃屋西屯.jpg";
import IMG2 from "src/assets/夾子園西屯.jpg";

import IMG3 from "src/assets/夾樂比親子樂園-台中西屯店.webp";

import './bottomRecommendation.css'
const BottomRecommendation = () => {
    const items = [
        {
            title: "優品娃娃屋",
            img: IMG1,
            location: "No. 373號, Section 2, Yongda Rd, Yongkang District, Tainan City, 710",
        },
        {
            title: "夾子園台中旗艦店",
            img: IMG2,
            location: "No. 1167號, Zhongping Rd, Xitun District, Taichung City, 407",
        },
        {
            title: "夾樂比親子樂園",
            img: IMG3,
            location: "407, Taichung City, Xitun District, Anhe Rd, 121-19號頂園燒鵝餐廳隔壁",
        },
    ]
    return (
        <div>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} borderRadius={"20px"} backgroundColor={"#EAEBEC"} position={"relative"} marginBottom={"2rem"}>
                <img src={DDL_MAP} width={"90%"} height={"650px"} alt="" />
                {/* <DetailItemDialog /> */}
            </Box>
            <Box className={"grid3"}>
                <Box>
                    <Item props={items[0]} />
                </Box>
                <Box>
                    <Item props={items[1]} />
                </Box>
                <Box>
                    <Item props={items[2]} />
                </Box>
            </Box>

        </div >
    )
}

export default BottomRecommendation