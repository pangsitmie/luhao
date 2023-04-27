import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from "../../theme";

import './copy.css'

const Copy = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    return (
        <Box className='copy_container' sx={{ backgroundColor: colors.primary[400] }}>
            Please use Chrome or Safari for the best experience.
            <br />
            <Typography sx={{ color: colors.primary[400], fontSize: "1px" }}>Design by <a className="a_transparent" href="https://roundbytes.com">Round Bytes</a></Typography>
        </Box>
    )
}

export default Copy