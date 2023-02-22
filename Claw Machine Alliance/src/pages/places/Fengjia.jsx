import React, { useState, useEffect } from 'react';

import { Box, Container, Typography, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from "../../theme";

import { useLocation } from 'react-router-dom';

import { CSSTransition } from 'react-transition-group';
import TAICHUNG_DETAIL_MAP from "src/assets/taichung_detail_map1.png";
import TAICHUNG_PAGE_SLICE from "src/assets/taichung_page_slice.png";

import DetailItemView from 'src/components/listView/DetailItemListView';
import Dropdown from 'src/components/dropdown/Dropdown';
import DetailItemDialog from 'src/components/dialog/DetailItemDialog';



import './places.css'
import ReactPlayer from 'react-player';

import FENGJIA_VIDEO from 'src/assets/fengjia_video.mp4'
import RecommendedLocations from 'src/components/recommendedLocations/RecommendedLocations';
import BottomRecommendation from 'src/components/bottomRecommendation/BottomRecommendation';


const Fengjia = () => {
    const location = useLocation();
    const state = location.state;


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);




    return (
        <Box >
            <div className="overlay"></div>
            <video className='video_content' src={FENGJIA_VIDEO} autoPlay loop muted />
            <div className="content">
                <Typography variant="h1" sx={{ fontSize: "200px", textAlign: "left", color: "#FFF", marginBottom: "1rem" }}>
                    STREET
                </Typography>
                <Typography variant="h1" sx={{ fontSize: "200px", textAlign: "left", color: "#FFF", marginBottom: "1rem" }}>
                    FOODS
                </Typography>
            </div>


            {/* hero */}
            <Box height={"100%"} display={"flex"} justifyContent={"space-between"} p={"5rem"} gap={"10%"}>
                {/* content */}
                <Box width={"60%"} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                    <Typography variant="h1" sx={{ textAlign: "left", color: "#111", textTransform: "capitalize", marginBottom: "1rem" }}>
                        逢甲夜市
                    </Typography>
                    <Typography variant="h3" sx={{ textAlign: "left", color: "#2D3436", mb: "4rem" }}>
                        台中最大 <span className='pink'>夜市</span>
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#2D3436", mb: "1rem" }}>
                        逢甲觀光夜市位於台中市西屯區逢甲大學周圍，是台中知名商圈夜市之一。夜市
                        周邊販售各種琳瑯滿目的商品，您可以在夜市中找到傳統的台灣小吃，如地瓜球、
                        珍珠奶茶、爆漿雞排等，也可以品嚐到各國美食，如泰國炒河粉、日式章魚燒、牛排等。
                        <br /><br />
                        此外，夜市周邊也有許多的特色小店，如手作文具店、各大各大手搖品牌等，
                        讓您可以盡情地探索獨特商品，讓你想要一逛再逛且滿載而歸!
                        <br /><br />
                        附近的大型立體停車場讓您可以無後顧之憂地購物，也不會面臨找不到停車位的問題。
                        如果逛到捨不得回家，商圈周圍有許多飯店及青旅，符合大眾住宿需求，讓你可以多
                        留幾晚在台中，沉浸於台中的美!
                        如果您厭倦了逛街購物，夜市外圍還有許多娛樂活動讓您盡情享受，
                        如拍貼機、遊戲攤位、街頭藝人表演秀等，夜市裡有各種驚喜等著你發掘!
                        此外，在夜市周邊還有許多的著名景點可以參觀，如秋紅谷、台中國家歌劇院等，
                        讓您可以一邊逛夜市，一邊欣賞台中的夜景。
                        <br /><br />
                        總結來說，逢甲觀光夜市是台中必去的景點之一，不僅有多樣的商品和美食，還有多元的娛樂體驗。不論您是單獨旅行，還是和家人、朋友一起出遊，都能夠在這裡度過一個充實精彩的夜晚。
                    </Typography>
                </Box>

                <Box width={"30%"} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                    <Typography variant="h3" sx={{ textAlign: "left", color: "#111", textTransform: "capitalize", marginBottom: "1rem" }}>
                        詳細資訊
                    </Typography>
                    <Box display={"flex"} gap={"1rem"} mb={"1rem"}>
                        <Typography variant="h4" sx={{ color: "#2D3436" }}>
                            地址:
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#2D3436" }}>
                            西屯區文華路117號
                        </Typography>
                    </Box>
                    <Box display={"flex"} gap={"1rem"} mb={"1rem"}>
                        <Typography variant="h4" sx={{ color: "#2D3436" }}>
                            電話號碼:
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#2D3436" }}>
                            0974123456
                        </Typography>
                    </Box>
                    <Box display={"flex"} gap={"1rem"} mb={"1rem"}>
                        <Typography variant="h4" sx={{ color: "#2D3436" }}>
                            營業時間:
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#2D3436" }}>
                            4pm - 2am
                        </Typography>
                    </Box>
                    <Box display={"flex"} gap={"1rem"} mb={"1rem"}>
                        <Typography variant="h4" sx={{ color: "#2D3436" }}>
                            平均價位:
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#2D3436" }}>
                            NTD: 100-200
                        </Typography>
                    </Box>

                </Box>
            </Box>

            {/* images section */}


            {/* google map componenet dibawah */}

            <Box paddingTop={"10rem"}>
                <Typography variant="h4" sx={{ textAlign: "center", color: "#2D3436", mb: "1rem" }}>
                    為您推薦
                </Typography>
                <Typography variant="h2" sx={{ textAlign: "center", color: "#111" }}>
                    必吃美食清單
                </Typography>
                <Box>
                    <RecommendedLocations />
                </Box>
            </Box>

            {/* claw machine section */}
            <Box p={"10rem"}>
                <Typography variant="h2" sx={{ textAlign: "left", color: "#111", mb: "1rem" }}>
                    這個地區的娃娃機商店
                </Typography>
                <Typography variant="h4" sx={{ textAlign: "left", color: "#2D3436", mb: "4rem" }}>
                    有得吃有得玩!一網打盡!
                </Typography>
                <BottomRecommendation />
            </Box>

            < Box padding={"10rem 0"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
                <Typography variant="h2" sx={{ textAlign: "center", color: "#2D3436", marginBottom: "2rem" }}>
                    其他地區
                </Typography>
                <button className="btn_transparent">
                    <Typography variant="h4" sx={{ color: "#2D3436" }}>
                        查看更多
                    </Typography>
                </button>
            </ Box>


        </Box >
    )
}

export default Fengjia


