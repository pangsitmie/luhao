import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";


import LOGO from "src/assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const navigate = useNavigate();



    return (
        <Box display="flex" justifyContent="center" p={4}>


            <Box display="flex" alignItems={"center"}>
                <Box margin={"0 3rem"} className="header_item">
                    <a href="/map">
                        <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1rem", fontWeight: "600", color: colors.grey[100] }}>
                            Map
                        </Typography>
                    </a>
                </Box>
                <Box margin={"0 3rem"} className="header_item">
                    <a href="">
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

                <Box margin={"0 3rem"} className="header_item">
                    <a href="">
                        <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1rem", fontWeight: "600", color: colors.grey[100] }}>
                            Stores
                        </Typography>
                    </a>
                </Box>
                <Box margin={"0 3rem"} className="header_item">
                    <a href="">
                        <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1rem", fontWeight: "600", color: colors.grey[100] }}>
                            About
                        </Typography>
                    </a>
                </Box>

            </Box>

            {/* ICONS */}

        </Box>
    );
};

export default Header;
