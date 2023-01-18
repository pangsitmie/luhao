import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from "../../theme";

const Area = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box>
            <Typography variant="h2" sx={{ textAlign: "left", fontSize: "1.8rem", fontWeight: "600", color: colors.grey[200], lineHeight: "1.5" }}>
                新增<br /> 廣告
            </Typography>
        </Box>
    )
}

export default Area