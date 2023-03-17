import { Box, Typography, Divider } from '@mui/material'
import React, { useState, useEffect } from 'react'
import WAVE_EXHIBITION from 'src/assets/wave_exhibition.png'
import GLOBE from 'src/assets/globe.png'
import WAVE_DIVIDER_BLUE from 'src/assets/wave_divider_blue.png'
import EXHIBITION_CLAW_MACHINE from 'src/assets/exhibition_claw_machine_blue.gif'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import 'animate.css';

import { exhibition2023Companies } from 'src/data/data';

import './exhibition23.css'
import CompanyListItem from 'src/components/item/CompanyListItem'
import LoginFloating from 'src/components/floatingButtons/LoginFloating'
import { Navigate } from 'react-router-dom'
const Exhibition23 = () => {
    const [initialScrollPos, setInitialScrollPos] = useState(0);
    const [currentScrollPos, setCurrentScrollPos] = useState(0);

    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        checkSession();
    }, []);

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


    const checkSession = () => {
        const url = `https://exhibition-test.cloudprogrammingonline.com/member/v1/test`;

        const requestOptions = {
            method: "POST",
            credentials: 'include', // Add this line to include credentials in the request
        }

        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log("session data", data);
                if (data.status === "0x000") {
                    console.log("session connected");
                    setLoggedIn(true);
                }
            }
            )
            .catch((error) => {
                console.error("session error", error);
            });
    }


    return (
        <>
            <LoginFloating visible={!loggedIn} />
            <Box className={"exhibition_hero"}>
                <img src={WAVE_EXHIBITION} className={"wave_exhibition"} alt="" />
                <img
                    src={GLOBE}
                    className={"globe"}
                    alt=""
                    style={{ transform: `rotate(${-rotation}deg)` }}
                />
                <Box>
                    <Typography variant="h3" sx={{ color: "#2D3436", mb: ".5rem", ml: "5px" }} >
                        2023 展覽
                    </Typography>
                    {/* <Typography variant="h2" sx={{ color: "#2D3436", mb: "2rem" }} >
                        Claw Snack
                        Taichung
                    </Typography> */}
                    <Typography variant="h2" sx={{ fontWeight: "bold", textAlign: "left", color: "#0057D9", mb: "2rem" }} >
                        台中食品零食通路展
                    </Typography>
                    <Box display={"flex"} alignItems={"center"} mb={".8rem"} gap={"1rem"}>
                        <Typography variant="h2" sx={{ color: "#111" }}  >
                            4.27
                        </Typography>
                        <Divider
                            orientation="horizontal"
                            sx={{
                                backgroundColor: "#111",
                                width: "20%",
                                height: "5px"
                            }}
                        />
                        <Typography variant="h2" sx={{ textAlign: "right", color: "#111" }} >
                            4.28
                        </Typography>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} mb={"1rem"} gap={"1rem"}>
                        <Typography variant="h4" sx={{ color: "#111" }} >
                            11.00 AM
                        </Typography>
                        <Divider
                            orientation="horizontal"
                            sx={{
                                backgroundColor: "#111",
                                width: "10%",
                                height: "2px"
                            }}
                        />
                        <Typography variant="h4" sx={{ textAlign: "right", color: "#111" }}>
                            17.30 PM
                        </Typography>
                    </Box>

                    <Box >
                        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0057D9" }} >
                            地點
                        </Typography>
                        <Box >
                            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2D3436" }} >
                                台中軟體園區文創數位3D示範基地 <span className='blue'> 台中市大里區科技路一號 </span>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>



            <Box m={"2rem 0 -10px"}>
                <img src={WAVE_DIVIDER_BLUE} width="100%" height={"150px"} alt="" />
            </Box>

            <Box bgcolor={"#1F57A7"} className={"exhibition_topic_title"}>
                <Typography variant="h3" sx={{ textAlign: "left", fontWeight: "600", color: "#FFF", width: "100%", lineHeight: "150%" }} >
                    首場台灣及進口知名零食 線上線下參展 效益遠播海內外結合自動販賣機 夾娃娃機 專業食品/娃娃/3C採購展。
                </Typography>
            </Box>
            <Box className={"flex_media"} bgcolor={"#1F57A7"} >
                <Box className={"exhibition_topic_container"}>
                    <Box bgcolor={"#4077F6"} className={"exhibition_topic"} >
                        <Typography variant="h5" sx={{ fontWeight: "600", textAlign: "center", color: "#FFF" }} >
                            全台通路匯集【台中軟體園區】
                        </Typography>
                    </Box>
                    <Box bgcolor={"#B52B61"} alignSelf={"flex-end"} className={"exhibition_topic"} >
                        <Typography variant="h5" sx={{ fontWeight: "600", textAlign: "center", color: "#FFF" }} >
                            全台知名品牌參展，一次採購
                        </Typography>
                    </Box>
                    <Box bgcolor={"#754FF5"} className={"exhibition_topic"} >
                        <Typography variant="h5" sx={{ fontWeight: "600", textAlign: "center", color: "#FFF" }} >
                            邀請多家全台知名連鎖門店講座
                        </Typography>
                    </Box>
                    <Box bgcolor={"#EB4F27"} alignSelf={"flex-end"} className={"exhibition_topic"} >
                        <Typography variant="h5" sx={{ fontWeight: "600", textAlign: "center", color: "#FFF" }} >
                            備有多會議室，可供立即簽約
                        </Typography>
                    </Box>
                    <Box bgcolor={"#278338"} className={"exhibition_topic"} >
                        <Typography variant="h5" sx={{ fontWeight: "600", textAlign: "center", color: "#FFF" }} >
                            邀請知名網紅試吃宣傳
                        </Typography>
                    </Box>
                </Box>

                <Box className={"exhibition_claw_machine_img"}>
                    <img src={EXHIBITION_CLAW_MACHINE} width="100%" alt="" />
                </Box>
            </Box>


            <Box className={"exhibition_card_container"} bgcolor={"#FFF"}>
                <Box className={"flex_cc"} flexDirection={"column"} mb={"1rem"}>
                    <Typography variant="h3" sx={{ textAlign: "left", color: "#111", mb: "1rem" }} >
                        註冊後詳閱
                    </Typography>
                    <button className={"button_svg"}>
                        <div className="svg-wrapper-1">
                            <div className="svg-wrapper">
                                <svg height="22" width="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                        <span>索取參展廠商資料</span>
                    </button>
                </Box>
                {/* row 1 */}
                <Box bgcolor={"#0057D9"} borderRadius={"25px"} widht={"100%"} height={"100%"} padding={"2rem"} >
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography variant="h3" sx={{ textAlign: "left", color: "#fff", mb: "2rem" }} >
                            公協會參展單位
                        </Typography>
                    </Box>

                    <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
                        {exhibition2023Companies[0].data.map((item, index) => (
                            <CompanyListItem key={index} props={item} textColor={"#FFF"} showDetails={true} />
                        ))}
                    </Box>
                </Box>


                {/* row 2 */}
                {/* <Box className={"exhibition_speaker_right_container card_box"}>
                    <span></span>
                    <Typography variant="h3" sx={{ textAlign: "left", color: "#1F57A7", mb: "2rem" }} >
                        公司行號代表參展單位
                    </Typography>
                    <Divider
                        orientation="horizontal"
                        sx={{
                            backgroundColor: "#cecece",
                            width: "100%",
                            mb: "2rem",
                        }}
                    />
                    <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="1rem">
                        {exhibition2023Companies[1].data.map((item) => (
                            <CompanyListItem props={item} />
                        ))}
                    </Box>
                </Box> */}

                {/* row 3 */}
                <Box className={"exhibition_speaker_right_container card_box"}>
                    <span></span>
                    <Box className={"flex_media"} justifyContent={"space-between !important"}>
                        <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
                            <Box mb={"2rem"}>
                                <Typography variant="h3" sx={{ textAlign: "left", color: "#1F57A7", mb: "1rem" }} >
                                    指導單位:
                                </Typography>
                                <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
                                    {exhibition2023Companies[2].data.map((item, index) => (
                                        <CompanyListItem key={index} props={item} showDetails={loggedIn} />
                                    ))}
                                </Box>
                            </Box>

                            <Box mb={"2rem"}>
                                <Typography variant="h3" sx={{ textAlign: "left", color: "#1F57A7", mb: "1rem" }} >
                                    主辦單位:
                                </Typography>
                                <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>

                                    {exhibition2023Companies[3].data.map((item, index) => (
                                        <CompanyListItem key={index} props={item} showDetails={loggedIn} />
                                    ))}
                                </Box>
                            </Box>



                            <Typography variant="h3" sx={{ textAlign: "left", color: "#1F57A7" }} >
                                協辦單位:
                            </Typography>
                            {exhibition2023Companies[4].data.map((item, index) => (
                                <CompanyListItem key={index} props={item} showDetails={loggedIn} />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Exhibition23