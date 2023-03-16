import { Box, Button, IconButton, Typography } from "@mui/material"
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from "react";

const CompanyListItem = ({ props, textColor, showDetails }) => {
    const name = props.name;
    const details = props.details;
    const color = textColor || "#111";

    useEffect(() => {
        console.log("showDetails", showDetails);
        console.log("oepn", open);
    }, [])

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    }
    return (
        <div className={"exhibition23_speaker_list_item"} >
            <Box display={"flex"} alignItems={"center"} gap={"8px"}>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: color }}>
                    {name}
                </Typography>

                <button className="btn_dropdown" onClick={handleOpen}>
                    {open ? (
                        <ArrowDropUpIcon sx={{ color: "#ffb144", fontSize: "24px" }} />
                    ) : (
                        <ArrowDropDownIcon sx={{ color: "#ffb144", fontSize: "24px" }} />
                    )}
                </button>
            </Box>
            {showDetails ? (
                <Box display={open ? "block" : "none"} className={"exhibition23_speaker_list_item_detail_box"}>
                    <Typography variant="h6" sx={{ fontWeight: "500", color: color }}>
                        電話: {details.phone}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "500", color: color }}>
                        地址: {details.address}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "500", color: color }}>
                        網站: {details.website}
                    </Typography>
                </Box>
            ) : (
                <Box display={open ? "block" : "none"} className={"exhibition23_speaker_list_item_detail_box"}>
                    <Typography variant="h6" sx={{ fontWeight: "500", color: color }}>
                        請
                        <a href="/login">登入</a>
                        以查看更多信息。
                    </Typography>
                </Box>
            )}
        </div>
    )
}
export default CompanyListItem