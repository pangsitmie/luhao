import React, { useState } from 'react';

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";

import PublicIcon from '@mui/icons-material/Public';
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
            <button onClick={toggleSubmenu4} className="menu-item sub__menus__arrows" >
                <PublicIcon sx={{ color: "#Fefefe" }} />
                <ul className={boxClassSubMenu4.join(' ')} >
                    <li>
                        <NavLink onClick={() => i18next.changeLanguage('en')} activeClassName='is-active'>
                            <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", color: "#D1D1D1" }}>
                                EN
                            </Typography>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => i18next.changeLanguage('tw')} activeClassName='is-active'>
                            <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", color: "#D1D1D1" }}>
                                TW
                            </Typography>
                        </NavLink>
                    </li>
                </ul>
            </button>
        </>
    )
}

export default LanguageDropdown