import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import GamePayVersion from "./GamePayVersion";
import { tokens } from "../../theme";
import AuditVersion from "./AuditVersion";



const VersionManagement = () => {
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box p={2}>
            <Box>
                <Typography variant="h2" sx={{ mb: "2rem", fontSize: "2.8rem", fontWeight: "bold" }}>
                    版本管控
                </Typography>
            </Box>
            <Box width={"100%"} display={"flex"} >
                <Box width={"100%"} >
                    <GamePayVersion />
                </Box>
                <Box width={"100%"} >
                    <AuditVersion />
                </Box>
            </Box>
        </Box >

    )
}

export default VersionManagement







