import React, { useState } from 'react';

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";

import PublicIcon from '@mui/icons-material/Public';
import LOGO from "src/assets/logo.png";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import './languageDropdown.css'
const LanguageDropdown = () => {



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
        <>
            <Button onClick={toggleSubmenu4} className="menu-item sub__menus__arrows" > <Link to="#"><PublicIcon sx={{ color: "#fff" }} /><br /></Link>
                <ul className={boxClassSubMenu4.join(' ')} >
                    <li><NavLink onClick={() => i18next.changeLanguage('en')} activeClassName='is-active'>
                        <Typography variant="h2" sx={{ textAlign: "center", fontSize: "12px", fontWeight: "600", color: "#cecece" }}>
                            EN
                        </Typography>
                    </NavLink> </li>
                    <li><NavLink onClick={() => i18next.changeLanguage('tw')} activeClassName='is-active'>
                        <Typography variant="h2" sx={{ textAlign: "center", fontSize: "12px", fontWeight: "600", color: "#cecece" }}>
                            中文
                        </Typography>
                    </NavLink> </li>
                </ul>
            </Button>
        </>
    )
}

export default LanguageDropdown