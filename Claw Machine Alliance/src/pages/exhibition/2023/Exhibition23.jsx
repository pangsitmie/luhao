import { Box, Typography, Divider } from '@mui/material'
import React, { useState, useEffect } from 'react'
import WAVE_EXHIBITION from 'src/assets/wave_exhibition.png'
import GLOBE from 'src/assets/globe.png'
import WAVE_DIVIDER_BLACK from 'src/assets/wave_divider_black.png'
import EXHIBITION_CLAW_MACHINE from 'src/assets/exhibition_claw_machine.gif'

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
            <Box position={"relative"} height={"100vh"} display={"flex"} alignItems={"center"} padding={"0 15%"} overflow={"hidden"} >
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
                <Box display={"flex"} alignItems={"center"} mb={"1rem"} p={"0 15%"} gap={"1rem"}>
                    <Typography variant="h2" sx={{ color: "#111" }} width={"15%"} >
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
                    <Typography variant="h2" sx={{ textAlign: "right", color: "#111" }} width={"15%"} >
                        4.28
                    </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"} mb={"3rem"} p={"0 15%"} gap={"1rem"}>
                    <Typography variant="h4" sx={{ color: "#111" }} width={"15%"} >
                        10.00 AM
                    </Typography>
                    <Divider
                        orientation="horizontal"
                        sx={{
                            backgroundColor: "black",
                            width: "20%",
                            height: "2px"
                        }}
                    />
                    <Typography variant="h4" sx={{ textAlign: "right", color: "#111" }} width={"15%"} >
                        17.00 PM
                    </Typography>
                </Box>
                <Box p={"0 15%"}>
                    <Typography variant="h4" sx={{ color: "#2D3436", mb: "1rem" }} >
                        地點: 台中軟體園區文創數位3D示範基地中庭廣場
                    </Typography>
                    <Typography variant="h4" sx={{ color: "#2D3436" }} >
                        地址: 台中市大里區科技路一號
                    </Typography>
                </Box>
            </Box>

            <Box mt={"8rem"}>
                <img src={WAVE_DIVIDER_BLACK} width="100%" alt="" />
            </Box>
            <Box bgcolor={"#1E1E1E"} height={"100vh"} p={"0 30%"}>
                <Typography variant="h2" sx={{ textAlign: "center", color: "#FFF", mb: "2rem" }} >
                    台中食品零食通路展
                </Typography>
                <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "500", color: "#FFF", mb: ".5rem" }} >
                    首場台灣及進口知名零食 線上線下琴展 效益遠搔海內外結合自動販賣機 夾娃烓機 專業食品採購展。
                </Typography>

                <Box className={"flex_cc"} mt={"5rem"}>
                    <img src={EXHIBITION_CLAW_MACHINE} width="500px" alt="" />
                </Box>
            </Box>
        </>
    )
}
export default Exhibition23