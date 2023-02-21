import { Box, Typography } from '@mui/material'
import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTranslation } from 'react-i18next';
import SECOND_MARKET from 'src/assets/second_market.webp'
import RED_POINTER from 'src/assets/red_pointer.png'
import './detailItemListView.css'

import SECOND_STORE_DETAIL_IMG from 'src/assets/second_store_detail_img.png'
import FENGJIA_DETAIL_IMG from 'src/assets/fengjia_detail_img.png'
import YIZHONG_DETAIL_IMG from 'src/assets/yizhong_detail_img.png'

const DetailItemListView = (props) => {
    const { t } = useTranslation();
    const { selectedCity, onSelectCity } = props;

    const handleCityClick = (city) => {
        if (city === selectedCity) {
            return;
        }
        onSelectCity(city);
    }



    return (
        <Box width={"100%"}>

            {/* item1 */}
            <Box className={"detail_item"}>
                <Box className={`detail_item_inner`} onClick={() => handleCityClick("taipei")}>
                    {/* image */}
                    <Box className={"detail_item_img"}>
                        <img src={SECOND_MARKET} />
                    </Box>

                    {/* content */}
                    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                        <Typography variant="h4" sx={{ fontSize: "26px", textTransform: "capitalize", color: "#0A130D" }}>
                            第二市場
                        </Typography>
                        <Typography variant="h5" sx={{ fontSize: "15px", textTransform: "capitalize", color: "#0A130D" }}>
                            集結眾多知名在地美食，都是在地人念念不忘的好滋味，代代相傳的美食讓遊客都慕名而來。
                        </Typography>
                    </Box>
                    <Box alignItems={"center"} justifyContent={"center"} >
                        <img src={RED_POINTER} width={"40px"} alt="" />
                    </Box>
                </Box>
            </Box>
            <Box className={"detail_item"}>
                <Box className={`detail_item_inner detail_item_inner_active`} onClick={() => handleCityClick("taipei")}>
                    {/* image */}
                    <Box className={"detail_item_img"}>
                        <img src={FENGJIA_DETAIL_IMG} />
                    </Box>

                    {/* content */}
                    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                        <Typography variant="h4" sx={{ fontSize: "26px", textTransform: "capitalize", color: "#0A130D" }}>
                            逢甲夜市
                        </Typography>
                        <Typography variant="h5" sx={{ fontSize: "15px", textTransform: "capitalize", color: "#0A130D" }}>
                            融合異國風味以及在地的美味小吃，吃飽喝足之餘還可以購物，販售商品豐富多樣，絕對滿載而歸!
                        </Typography>
                    </Box>
                    <Box alignItems={"center"} justifyContent={"center"} >
                        <img src={RED_POINTER} width={"40px"} alt="" />
                    </Box>
                </Box>
            </Box>

            <Box className={"detail_item"}>
                <Box className={`detail_item_inner`} onClick={() => handleCityClick("taipei")}>
                    {/* image */}
                    <Box className={"detail_item_img"}>
                        <img src={YIZHONG_DETAIL_IMG} />
                    </Box>

                    {/* content */}
                    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                        <Typography variant="h4" sx={{ fontSize: "26px", textTransform: "capitalize", color: "#0A130D" }}>
                            一中商圈
                        </Typography>
                        <Typography variant="h5" sx={{ fontSize: "15px", textTransform: "capitalize", color: "#0A130D" }}>
                            販賣商品種類玲瑯滿目，吃喝玩樂一站滿足，所有最新流行趨勢都在這裡，兼具精品商店及夜市小攤，適合大眾化消費。
                        </Typography>
                    </Box>
                    <Box alignItems={"center"} justifyContent={"center"} >
                        <img src={RED_POINTER} width={"40px"} alt="" />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default DetailItemListView