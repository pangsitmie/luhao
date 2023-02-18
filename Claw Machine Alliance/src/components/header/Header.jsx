import React, { useState } from 'react';

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";

import LOGO from "src/assets/logo.png";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import LanguageDropdown from 'src/components/languageDropdown/LanguageDropdown';
import { useLocation } from "react-router-dom";


const Header = () => {
    const { t } = useTranslation();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(location.pathname);




    return (
        <Box display="flex" justifyContent="space-between" p={1}>
            <Box>

            </Box>
            <Box display="flex" alignItems={"center"}>
                <Box margin={"0 2rem"} className="header_item">
                    <a href="/map">
                        <Typography variant="h5" sx={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: currentPage === "/" ? "#fff" : "#2D3436",
                        }}>
                            Map
                        </Typography>
                    </a>
                </Box>
                <Box margin={"0 2rem"} className="header_item">
                    <a href="#">
                        <Typography variant="h5" sx={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: currentPage === "/" ? "#fff" : "#2D3436",
                        }}>
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
                        <Typography variant="h5" sx={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: currentPage === "/" ? "#fff" : "#2D3436",
                        }}>
                            Stores
                        </Typography>
                    </a>
                </Box>
                <Box margin={"0 2rem"} className="header_item">
                    <a href="/about">
                        <Typography variant="h5" sx={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: currentPage === "/" ? "#fff" : "#2D3436",
                        }}>
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
