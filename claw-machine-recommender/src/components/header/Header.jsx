import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from '@mui/icons-material/Logout';

import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <Box display="flex" justifyContent="space-between" p={4}>
            <div>
            </div>

            <Box display="flex">
                <Box margin={"0 2rem"} className="header_item">
                    <a href="">
                        <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1.3rem", fontWeight: "600", color: colors.grey[100] }}>
                            Products
                        </Typography>
                    </a>
                </Box>
                <Box margin={"0 2rem"} className="header_item">
                    <a href="">
                        <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1.3rem", fontWeight: "600", color: colors.grey[100] }}>
                            Stores
                        </Typography>
                    </a>
                </Box>
                <Box margin={"0 2rem"} className="header_item">
                    <a href="">
                        <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1.3rem", fontWeight: "600", color: colors.grey[100] }}>
                            About
                        </Typography>
                    </a>
                </Box>

            </Box>

            {/* ICONS */}
            <Box display="flex" >
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <LightModeOutlinedIcon />
                    ) : (
                        <DarkModeOutlinedIcon />
                    )}
                </IconButton>
            </Box>
        </Box>
    );
};

export default Header;
