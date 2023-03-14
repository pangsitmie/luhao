import { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

const LoginFloating = () => {
    const [open, setOpen] = useState(true)
    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} position={"fixed"} bottom={"10px"} right={"10px"} gap={".5rem"} zIndex={"1000"}>

            <Button sx={{ display: open ? "block" : "none", bgcolor: "#111", padding: ".5rem 2rem", borderRadius: "50px" }}>
                <a href="/login">
                    <Typography variant="h5" sx={{ color: "#fff", fontSize: "14px", fontWeight: "500" }}>
                        登入
                    </Typography>
                </a>
            </Button>

            <IconButton onClick={handleOpen} sx={{ padding: ".5rem", border: "1px solid #cecece", borderRadius: "50%", zIndex: "10000" }}>
                <CloseIcon />
            </IconButton>
        </Box>
    )
}
export default LoginFloating