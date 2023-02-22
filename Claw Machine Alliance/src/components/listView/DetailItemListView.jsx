import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTranslation } from 'react-i18next';
import RED_POINTER from 'src/assets/red_pointer.png'
import './detailItemListView.css'
import 'animate.css';
import DetailItemDialog from 'src/components/dialog/DetailItemDialog';

import { ExploreTaichungData } from 'src/data/data'

const DetailItemView = () => {
    const { t } = useTranslation();

    const [selectedItem, setSelectedItem] = useState(ExploreTaichungData[2].data[0]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleItemClick = (idx) => {
        setSelectedIndex(idx);
        // setSelectedItem(ExploreTaichungData[selected].data[0]);
    }

    const [selectedTopic, setSelectedTopic] = useState(2);

    const [data, setData] = useState(ExploreTaichungData[0].data);

    /*
    0 = travel
    1 = entertainment
    2 = food
    */
    const handleTopicClick = (topic) => {
        if (topic === selectedTopic) {
            return;
        }
        setSelectedTopic(topic);
    }
    useEffect(() => {
        setData(ExploreTaichungData[selectedTopic].data);
        setSelectedItem(ExploreTaichungData[selectedTopic].data[selectedIndex]);
    }, [selectedTopic, selectedIndex])

    return (
        <Box display={"flex"} gap={"2rem"}>
            <Box>
                <Box display={"flex"} justifyContent={"space-evenly"} mb={"1rem"} gap={"1rem"}>
                    <Box className={`animate__bounceIn selector_detail_item_inner${selectedTopic === 0 ? " detail_item_inner_active" : ""}`} onClick={() => handleTopicClick(0)}>
                        <Typography variant="h4" sx={{ color: "#639E23" }}>
                            Travel
                        </Typography>
                    </Box>
                    <Box className={`animate__bounceIn selector_detail_item_inner${selectedTopic === 1 ? " detail_item_inner_active" : ""}`} onClick={() => handleTopicClick(1)}>
                        <Typography variant="h4" sx={{ color: "#FAC161" }}>
                            Entertainment
                        </Typography>
                    </Box>
                    <Box className={`animate__bounceIn selector_detail_item_inner${selectedTopic === 2 ? " detail_item_inner_active" : ""}`} onClick={() => handleTopicClick(2)}>
                        <Typography variant="h4" sx={{ color: "#ED6B6C" }}>
                            Foods
                        </Typography>
                    </Box>
                </Box>

                <Box>
                    {/* item1 */}

                    <Box className={"detail_item"}>
                        <Box
                            className={`detail_item_inner ${selectedIndex === 0 ? "detail_item_inner_active" : ""}`}
                            onClick={() => {
                                handleItemClick(0);
                            }}
                        >
                            {/* image */}
                            <Box className={"detail_item_img"}>
                                <img src={data[0].image} />
                            </Box>

                            {/* content */}
                            <Box display={"flex"} justifyContent={""} flexDirection={"column"}>
                                <Typography variant="h4" sx={{ fontSize: "26px", textTransform: "capitalize", color: "#0A130D" }}>
                                    {data[0].title}
                                </Typography>
                                <Typography variant="h5" sx={{ fontSize: "15px", textTransform: "capitalize", color: "#0A130D" }}>
                                    {data[0].description}
                                </Typography>
                            </Box>
                            <Box alignItems={"center"} justifyContent={"center"} >
                                <img src={RED_POINTER} width={"40px"} alt="" />
                            </Box>
                        </Box>
                    </Box>

                    {/* item2 */}
                    <Box className={"detail_item"}>
                        <Box
                            className={`detail_item_inner ${selectedIndex === 1 ? "detail_item_inner_active" : ""}`}
                            onClick={() => { handleItemClick(1); }}
                        >
                            {/* image */}
                            <Box className={"detail_item_img"}>
                                <img src={data[1].image} />
                            </Box>

                            {/* content */}
                            <Box display={"flex"} justifyContent={"space-evenly"} flexDirection={"column"}>
                                <Typography variant="h4" sx={{ fontSize: "26px", textTransform: "capitalize", color: "#0A130D" }}>
                                    {data[1].title}
                                </Typography>
                                <Typography variant="h5" sx={{ fontSize: "15px", textTransform: "capitalize", color: "#0A130D" }}>
                                    {data[1].description}
                                </Typography>
                            </Box>
                            <Box alignItems={"center"} justifyContent={"center"} >
                                <img src={RED_POINTER} width={"40px"} alt="" />
                            </Box>
                        </Box>
                    </Box>

                    {/* item2 */}
                    <Box className={"detail_item "}>
                        <Box
                            className={`detail_item_inner ${selectedIndex === 2 ? "detail_item_inner_active" : ""}`}
                            onClick={() => { handleItemClick(2); }}
                        >
                            {/* image */}
                            <Box className={"detail_item_img"}>
                                <img src={data[2].image} />
                            </Box>

                            {/* content */}
                            <Box display={"flex"} justifyContent={"space-evenly"} flexDirection={"column"}>
                                <Typography variant="h4" sx={{ fontSize: "26px", textTransform: "capitalize", color: "#0A130D" }}>
                                    {data[2].title}

                                </Typography>
                                <Typography variant="h5" sx={{ fontSize: "15px", textTransform: "capitalize", color: "#0A130D" }}>
                                    {data[2].description}
                                </Typography>
                            </Box>
                            <Box alignItems={"center"} justifyContent={"center"} >
                                <img src={RED_POINTER} width={"40px"} alt="" />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} borderRadius={"20px"} backgroundColor={"#EAEBEC"} position={"relative"}>
                {/* detail item selector */}
                <img src={selectedItem.mapImg} width={"100%"} alt="" />
                {/* <p>{selectedItem.title}</p> */}
                <DetailItemDialog props={selectedItem} />
            </Box>
        </Box>
    )
}

export default DetailItemView