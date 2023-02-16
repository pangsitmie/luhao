import React, { useState } from 'react';

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";

import PublicIcon from '@mui/icons-material/Public';
import LOGO from "src/assets/logo.png";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import LanguageDropdown from './LanguageDropdown';

const Header = () => {
    const { t } = useTranslation();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const navigate = useNavigate();

    const [isMenuSubMenu4, setMenuSubMenu4] = useState(false);
    const toggleSubmenu4 = () => {
        setMenuSubMenu4(isMenuSubMenu4 === false ? true : false);
    };
    let boxClassSubMenu4 = ["sub__menus"];
    if (isMenuSubMenu4) {
        boxClassSubMenu4.push('sub__menus__Active');
    } else {
        boxClassSubMenu4.push('');
    }

    return (
        <Box display="flex" justifyContent="space-between" p={1}>
            <Box>

            </Box>
            <Box display="flex" alignItems={"center"}>
                <Box margin={"0 2rem"} className="header_item">
                    <a href="/map">
                        <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1rem", fontWeight: "600", color: colors.grey[100] }}>
                            Map
                        </Typography>
                    </a>
                </Box>
                <Box margin={"0 2rem"} className="header_item">
                    <a href="#">
                        <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1rem", fontWeight: "600", color: colors.grey[100] }}>
                            Brands
                        </Typography>
                    </a>
                </Box>
                <div>
                    <a href="/">
                        <img src={LOGO} alt="" className="header_logo" />
                    </a>
                </div>

                <Box margin={"0 2rem"} className="header_item">
                    <a href="#">
                        <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1rem", fontWeight: "600", color: colors.grey[100] }}>
                            Stores
                        </Typography>
                    </a>
                </Box>
                <Box margin={"0 2rem"} className="header_item">
                    <a href="/about">
                        <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1rem", fontWeight: "600", color: colors.grey[100] }}>
                            About
                        </Typography>
                    </a>
                </Box>
            </Box>
            <Box display="flex" alignItems={"center"} justifyContent={"center"}>
                <LanguageDropdown />
            </Box>
        </Box>
    );
};

export default Header;
