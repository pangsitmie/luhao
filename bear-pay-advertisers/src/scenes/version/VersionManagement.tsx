import { Box, Typography } from "@mui/material";
import GamePayVersion from "./GamePayVersion";
import AuditVersion from "./AuditVersion";
import { useTranslation } from 'react-i18next';


const VersionManagement = () => {
    const { t } = useTranslation();
    //THEME

    return (
        <Box p={2}>
            <Box>
                <Typography variant="h2" sx={{ mb: "2rem", fontSize: "2.8rem", fontWeight: "bold" }}>
                    {t('version_control')}
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







