import { Box, Typography, Divider } from '@mui/material'
import React, { useState, useEffect } from 'react'
import WAVE_EXHIBITION from 'src/assets/wave_exhibition.png'
import GLOBE from 'src/assets/globe.png'
import WAVE_DIVIDER_BLUE from 'src/assets/wave_divider_blue.png'
import EXHIBITION_CLAW_MACHINE from 'src/assets/exhibition_claw_machine_blue.gif'
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
                    <Box display={"flex"} alignItems={"center"} mb={"1rem"} gap={"1rem"}>
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



            <Box m={"2rem 0 -5px"}>
                <img src={WAVE_DIVIDER_BLUE} width="100%" alt="" />
            </Box>
            <Box bgcolor={"#1F57A7"} display={"flex"} justifyContent={"center"}>
                <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "600", color: "#FFF", width: "80%" }} >
                    首場台灣及進口知名零食 線上線下參展 效益遠播海內外結合自動販賣機 夾娃烓機 專業食品/娃娃/3C採購展。
                </Typography>
            </Box>
            <Box className={"flex_media"} bgcolor={"#1F57A7"} height={"100%"}>
                <Box className={"exhibition_topic_container"}>
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


                <Box marginTop={"3rem"} gap={"5rem"}>
                    <Box className={"exhibition_claw_machine_img"}>
                        <img src={EXHIBITION_CLAW_MACHINE} width="500px" alt="" />
                    </Box>
                </Box>
            </Box>


            <Box p={"8rem 2rem"} bgcolor={"#F2F2F2"}>
                <Box  >
                    <Box bgcolor={"#0057D9"} borderRadius={"25px"} height={"100%"} padding={"2rem"} mt={"5rem"} boxShadow={"0 10px 20px rgba(0,0,0,0.55)"}>
                        <Box display={"flex"} justifyContent={"space-between"}>


                            <Typography variant="h3" sx={{ textAlign: "left", color: "#fff", mb: "2rem" }} >
                                公協會參展單位
                            </Typography>
                            <button className={"button_svg"}>
                                <div className="svg-wrapper-1">
                                    <div className="svg-wrapper">
                                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                                        </svg>
                                    </div>
                                </div>
                                <span>索取參展廠商資料</span>
                            </button>
                        </Box>


                        <Typography variant="h4" sx={{ textAlign: "left", color: "#fff", mb: "2rem" }} >
                            台中市商業會
                        </Typography>
                        <Typography variant="h4" sx={{ textAlign: "left", color: "#fff", mb: "2rem" }} >
                            雲林科技大學育成中心
                        </Typography>
                        <Typography variant="h4" sx={{ textAlign: "left", color: "#fff", mb: "2rem" }} >
                            台中市自動販賣商同業公司
                        </Typography>
                        <Typography variant="h4" sx={{ textAlign: "left", color: "#fff", mb: "2rem" }} >
                            雲林漁業青年聯誼會
                        </Typography>
                        <Typography variant="h4" sx={{ textAlign: "left", color: "#fff", mb: "2rem" }} >
                            中華農業創新學會
                        </Typography>
                    </Box>

                </Box>

                <Box >
                    {/* <Box className={"exhibition_speaker_left_container card_box"}>
                        <span></span>
                        <Box className={"circle_text"} >
                            <Typography variant="h6" sx={{ textAlign: "center", color: "#1d1d1d" }} >
                                演講一
                            </Typography>
                        </Box>
                        <Typography variant="h3" sx={{ textAlign: "left", color: "#111", mb: "2rem" }} >
                            指導單位
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
                                    經濟部加工出口處台中分處
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
                                    新竹市自動販賣商業同業公會
                                </Typography>
                            </Box>
                        </Box>
                    </Box> */}

                    <Box className={"exhibition_speaker_right_container card_box"}>
                        <span></span>
                        {/* <Box className={"circle_text"} >
                            <Typography variant="h6" sx={{ textAlign: "center", color: "#cecece" }} >
                                演講二
                            </Typography>
                        </Box> */}
                        <Typography variant="h3" sx={{ textAlign: "left", color: "#fff", mb: "2rem" }} >
                            公司行號代表參展單位
                            {/* (依據比劃順序) */}
                        </Typography>
                        <Divider
                            orientation="horizontal"
                            sx={{
                                backgroundColor: "#cecece",
                                width: "100%",
                            }}
                        />

                        <Box className={"flex_media"} justifyContent={"space-between !important"} mt={"2rem"}>
                            {/* row1 */}
                            <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        安心肉乾食品有限公司(天印)
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        老楊食品
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        中華民國農會台農鮮乳廠
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        利傑國際
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        吉時饌
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        良品吉食商行
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        永長裕有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        酋長鳳梨
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        阿甘叔叔
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        哈客愛
                                    </Typography>
                                </Box>
                            </Box>

                            {/* col2 */}
                            <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        集元果
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        好蝦冏男社
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        喬拉燕麥
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        樂米工坊
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        櫻桃果咖啡
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        海龍王食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        錦倫公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        藍斯特企業有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        鑫賜有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        永恆世成有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        逢國食品股份有限公司
                                    </Typography>
                                </Box>
                            </Box>

                            {/* col3 */}
                            <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        長城料理實業有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        弘志食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        李記烏漁子
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        台中多媒體股份有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                            </Box>

                            {/* col4 */}
                            <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        三易食品有限公司
                                    </Typography>
                                </Box>
                            </Box>


                        </Box>
                    </Box>
                    <Box className={"exhibition_speaker_right_container card_box"}>
                        <span></span>

                        <Box className={"flex_media"} justifyContent={"space-between !important"} mt={"2rem"}>
                            <Box display={"flex"} flexDirection={"column"} gap={"2rem"}>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        指導單位 : 經濟部加工出口處臺中分處
                                    </Typography>
                                </Box>

                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        主辦單位： : 台中市自動販賣商同業公會
                                    </Typography>
                                </Box>
                                <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon className='check_circle_icon' />
                                    <Typography variant="h5"  >
                                        協辦單位 :
                                        <br />
                                        台灣數位休閒娛樂產業協會 --  中華民國台灣商用電子遊機產業協會 -- 雲林科技大學育成中心
                                        --大買家股份有限公司 --
                                        台中自動販賣機職業工會 -- 彰化縣自動販賣商業同業公會 -- 新竹市自動販賣商業同業公會 -- 宜蘭縣自動販賣商業同業公會
                                    </Typography>
                                </Box>
                                {/* <Box className={"exhibition23_speaker_list_item"}>
                                    <CheckCircleIcon sx={{ color: "#cecece" }} />

                                    <Typography variant="h5" sx={{ textAlign: "left", color: "#fff" }} >

                                        <br />
                                        <br />
                                        協辦單位:
                                        <br />
                                        台灣數位休閒娛樂產業協會 --  中華民國台灣商用電子遊機產業協會 -- 雲林科技大學育成中心
                                        --大買家股份有限公司 --
                                        台中自動販賣機職業工會 -- 彰化縣自動販賣商業同業公會 -- 新竹市自動販賣商業同業公會 -- 宜蘭縣自動販賣商業同業公會

                                    </Typography>
                                </Box> */}

                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Exhibition23