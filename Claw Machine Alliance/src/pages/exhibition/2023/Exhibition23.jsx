import { Box, Typography, Divider } from '@mui/material'
import React, { useState, useEffect } from 'react'
import WAVE_EXHIBITION from 'src/assets/wave_exhibition.png'
import GLOBE from 'src/assets/globe.png'
import WAVE_DIVIDER_BLACK from 'src/assets/wave_divider_black.png'
import EXHIBITION_CLAW_MACHINE from 'src/assets/exhibition_claw_machine.gif'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import 'animate.css';


import './exhibition23.css'
const Exhibition23 = () => {
    const [initialScrollPos, setInitialScrollPos] = useState(0);
    const [currentScrollPos, setCurrentScrollPos] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setCurrentScrollPos(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (initialScrollPos === 0) {
            setInitialScrollPos(currentScrollPos);
        }
    }, [initialScrollPos, currentScrollPos]);

    const rotation = (currentScrollPos - initialScrollPos) / 10;

    return (
        <>
            <Box position={"relative"} height={"100vh"} display={"flex"} alignItems={"center"} padding={"0 10%"} overflow={"hidden"} >
                <img src={WAVE_EXHIBITION} className={"wave_exhibition"} alt="" />
                <img
                    src={GLOBE}
                    className={"globe"}
                    alt=""
                    style={{ transform: `rotate(${-rotation}deg)` }}
                />
                <Box>
                    <Typography variant="h3" sx={{ color: "#2D3436", mb: ".5rem", ml: "5px" }} >
                        2023 Exhibition
                    </Typography>
                    <Typography variant="h1" sx={{ color: "#0057D9", mb: "2rem" }} >
                        Claw Snack <br />
                        Taichung
                    </Typography>

                    <button className={"button_svg"}>
                        <div class="svg-wrapper-1">
                            <div class="svg-wrapper">
                                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                        <span>Register</span>
                    </button>
                </Box>
            </Box>

            <Box>
                <Box display={"flex"} alignItems={"center"} mb={"1rem"} p={"0 10%"} gap={"1rem"}>
                    <Typography variant="h2" sx={{ color: "#111" }}  >
                        4.27
                    </Typography>
                    <Divider
                        orientation="horizontal"
                        sx={{
                            backgroundColor: "black",
                            width: "20%",
                            height: "5px"
                        }}
                    />
                    <Typography variant="h2" sx={{ textAlign: "right", color: "#111" }} >
                        4.28
                    </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"} mb={"3rem"} p={"0 10%"} gap={"1rem"}>
                    <Typography variant="h4" sx={{ color: "#111" }} >
                        10.00 AM
                    </Typography>
                    <Divider
                        orientation="horizontal"
                        sx={{
                            backgroundColor: "black",
                            width: "25%",
                            height: "2px"
                        }}
                    />
                    <Typography variant="h4" sx={{ textAlign: "right", color: "#111" }}>
                        17.00 PM
                    </Typography>
                </Box>
                <Box p={"0 10%"}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0057D9" }} >
                        地點
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2D3436", mb: "1rem" }} >
                        台中軟體園區文創數位3D示範基地中庭廣場
                    </Typography>
                    <Typography variant="h4" sx={{ color: "#0057D9" }} >
                        地址
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2D3436", mb: "1rem" }} >
                        台中市大里區科技路一號
                    </Typography>
                </Box>
            </Box>

            <Box m={"8rem 0 -5px"}>
                <img src={WAVE_DIVIDER_BLACK} width="100%" alt="" />
            </Box>
            <Box bgcolor={"#1E1E1E"} height={"100vh"} p={"0 10%"}>
                <Typography variant="h2" sx={{ fontWeight: "bold", textAlign: "center", color: "#FFF", mb: "2rem" }} >
                    台中食品零食通路展
                </Typography>
                <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "500", color: "#FFF", mb: ".5rem" }} >
                    首場台灣及進口知名零食 線上線下琴展 效益遠搔海內外結合自動販賣機 夾娃烓機 專業食品採購展。
                </Typography>
                <Box className={"flex_cc"} mt={"5rem"}>
                    <img src={EXHIBITION_CLAW_MACHINE} width="500px" alt="" />
                </Box>
            </Box>
            <Box className={"exhibition_topic_container"}>
                <Typography variant="h2" sx={{ textAlign: "center", color: "#111", mb: "2rem" }} >
                    我們會討論
                </Typography>
                <Box bgcolor={"#4077F6"} className={"exhibition_topic"} >
                    <Typography variant="h4" sx={{ textAlign: "center", color: "#FFF" }} >
                        全台通路匯集【台中軟體園區】
                    </Typography>
                </Box>
                <Box bgcolor={"#B52B61"} alignSelf={"flex-end"} className={"exhibition_topic"} >
                    <Typography variant="h4" sx={{ textAlign: "center", color: "#FFF" }} >
                        全台知名品牌參展，一次採購
                    </Typography>
                </Box>
                <Box bgcolor={"#754FF5"} className={"exhibition_topic"} >
                    <Typography variant="h4" sx={{ textAlign: "center", color: "#FFF" }} >
                        邀請多家全台知名連鎖門店講座
                    </Typography>
                </Box>
                <Box bgcolor={"#EB4F27"} alignSelf={"flex-end"} className={"exhibition_topic"} >
                    <Typography variant="h4" sx={{ textAlign: "center", color: "#FFF" }} >
                        備有多會議室，可供立即簽約
                    </Typography>
                </Box>
                <Box bgcolor={"#F2BD2A"} className={"exhibition_topic"} >
                    <Typography variant="h4" sx={{ textAlign: "center", color: "#FFF" }} >
                        邀請知名網紅試吃宣傳
                    </Typography>
                </Box>
            </Box>

            <Box p={"8rem 2rem"} bgcolor={"#F2F2F2"}>
                <Box className={"flex_cc"} flexDirection={"column"}>
                    <Typography variant="h2" sx={{ textAlign: "center", color: "#111", mb: "4rem" }} >
                        台中食品零食通路展
                    </Typography>
                    <button className={"button_svg"}>
                        <div class="svg-wrapper-1">
                            <div class="svg-wrapper">
                                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                        <span>Register</span>
                    </button>
                </Box>
                <Box bgcolor={"#0057D9"} borderRadius={"25px"} height={"100%"} padding={"2rem"} mt={"5rem"} boxShadow={"0 10px 20px rgba(0,0,0,0.55)"}>
                    <Typography variant="h3" sx={{ textAlign: "left", color: "#fff", mb: "2rem" }} >
                        Register to view
                    </Typography>
                    <Typography variant="h5" sx={{ textAlign: "left", color: "#fff" }} >
                        首場台灣及進口知名零食 線上線下琴展 效益遠搔海內外結合自動販賣機 夾娃烓機 專業食品採購展。
                    </Typography>
                </Box>
                <Box className="flex_media" mt={"2rem"}>
                    <Box className={"exhibition_speaker_left_container card_box"}>
                        <span></span>
                        <Box className={"circle_text"} >
                            <Typography variant="h6" sx={{ textAlign: "center", color: "#1d1d1d" }} >
                                Opening
                            </Typography>
                        </Box>
                        <Typography variant="h3" sx={{ textAlign: "left", color: "#111", mb: "2rem" }} >
                            Government
                        </Typography>
                        <Divider
                            orientation="horizontal"
                            sx={{
                                backgroundColor: "#cecece",
                                width: "100%",
                            }}
                        />
                        <Box display={"flex"} flexDirection={"column"} gap={"2rem"} mt={"2rem"}>
                            <Box className={"exhibition23_speaker_list_item"}>
                                <CheckCircleIcon sx={{ color: "#111" }} />
                                <Typography variant="h5" sx={{ textAlign: "left", color: "#1d1d1d", maxLines: "2" }} >
                                    台中市自動販賣商業同業會
                                </Typography>
                            </Box>
                            <Box className={"exhibition23_speaker_list_item"}>
                                <CheckCircleIcon sx={{ color: "#111" }} />
                                <Typography variant="h5" sx={{ textAlign: "left", color: "#1d1d1d", maxLines: "2" }} >
                                    台灣數位休閒娛樂產業協會
                                </Typography>
                            </Box>
                            <Box className={"exhibition23_speaker_list_item"}>
                                <CheckCircleIcon sx={{ color: "#111" }} />
                                <Typography variant="h5" sx={{ textAlign: "left", color: "#1d1d1d" }} >
                                    中華民國台灣商用電子遊機產業協會
                                </Typography>
                            </Box>
                            <Box className={"exhibition23_speaker_list_item"}>
                                <CheckCircleIcon sx={{ color: "#111" }} />
                                <Typography variant="h5" sx={{ textAlign: "left", color: "#1d1d1d" }} >
                                    彰化縣自動販賣商業同業公會
                                </Typography>
                            </Box>
                            <Box className={"exhibition23_speaker_list_item"}>
                                <CheckCircleIcon sx={{ color: "#111" }} />
                                <Typography variant="h5" sx={{ textAlign: "left", color: "#1d1d1d" }} >
                                    台中市自動販賣職業工會
                                </Typography>
                            </Box>
                            <Box className={"exhibition23_speaker_list_item"}>
                                <CheckCircleIcon sx={{ color: "#111" }} />
                                <Typography variant="h5" sx={{ textAlign: "left", color: "#1d1d1d" }} >
                                    桃園市自動販賣商業同業公會
                                </Typography>
                            </Box>
                            <Box className={"exhibition23_speaker_list_item"}>
                                <CheckCircleIcon sx={{ color: "#111" }} />
                                <Typography variant="h5" sx={{ textAlign: "left", color: "#1d1d1d" }} >
                                    宜蘭縣自動販賣商業同業公會
                                </Typography>
                            </Box>
                            <Box className={"exhibition23_speaker_list_item"}>
                                <CheckCircleIcon sx={{ color: "#111" }} />
                                <Typography variant="h5" sx={{ textAlign: "left", color: "#1d1d1d" }} >
                                    新竹市自動販賣商業同業公會
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box className={"exhibition_speaker_right_container card_box"}>
                        <span></span>
                        <Box className={"circle_text"} >
                            <Typography variant="h6" sx={{ textAlign: "center", color: "#cecece" }} >
                                Main
                            </Typography>
                        </Box>
                        <Typography variant="h3" sx={{ textAlign: "left", color: "#fff", mb: "2rem" }} >
                            Company
                        </Typography>
                        <Divider
                            orientation="horizontal"
                            sx={{
                                backgroundColor: "#cecece",
                                width: "100%",
                            }}
                        />
                        <Box className={"flex_media"} justifyContent={"space-between !important"} mt={"2rem"}>
                            <Box display={"flex"} flexDirection={"column"} gap={"2rem"}>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon sx={{ color: "#cecece" }} />
                                    <Typography variant="h5" sx={{ textAlign: "left", color: "#fff" }} >
                                        桃園市自動販賣商業同業公會
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon sx={{ color: "#cecece" }} />
                                    <Typography variant="h5" sx={{ textAlign: "left", color: "#fff" }} >
                                        宜蘭縣自動販賣商業同業公會
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon sx={{ color: "#cecece" }} />
                                    <Typography variant="h5" sx={{ textAlign: "left", color: "#fff" }} >
                                        新竹市自動販賣商業同業公會
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display={"flex"} flexDirection={"column"} gap={"2rem"}>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon sx={{ color: "#cecece" }} />
                                    <Typography variant="h5" sx={{ textAlign: "left", color: "#fff" }} >
                                        桃園市自動販賣商業同業公會
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon sx={{ color: "#cecece" }} />
                                    <Typography variant="h5" sx={{ textAlign: "left", color: "#fff" }} >
                                        宜蘭縣自動販賣商業同業公會
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon sx={{ color: "#cecece" }} />
                                    <Typography variant="h5" sx={{ textAlign: "left", color: "#fff" }} >
                                        新竹市自動販賣商業同業公會
                                    </Typography>
                                </Box>
                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Exhibition23