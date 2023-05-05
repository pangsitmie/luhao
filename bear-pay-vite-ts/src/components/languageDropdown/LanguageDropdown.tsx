import { useState } from 'react';

import { Box, IconButton, Typography } from "@mui/material";

import PublicIcon from '@mui/icons-material/Public';
import i18next from 'i18next';

import './languageDropdown.css'
const LanguageDropdown = () => {
    //THEME

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


    const handleLanguageChange = (newLanguage: string) => {
        i18next.changeLanguage(newLanguage);
    }

    return (
        <>
            <IconButton onClick={toggleSubmenu4} className="menu-item sub__menus__arrows" >
                <PublicIcon />
                <ul className={boxClassSubMenu4.join(' ')} >
                    <li>
                        <Box
                            onClick={() => handleLanguageChange("tw")}
                            p={"1.5rem 0 0"}>

                            <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", color: "#D1D1D1" }}>
                                TW
                            </Typography>
                        </Box>
                    </li>
                    <li>
                        <Box
                            onClick={() => handleLanguageChange("en")}
                            p={"1.5rem 0"}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", color: "#D1D1D1" }}>
                                EN
                            </Typography>
                        </Box>
                    </li>
                </ul>
            </IconButton>
        </>
    )
}

export default LanguageDropdown