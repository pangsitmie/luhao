import React from 'react'
// THEME
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import './notFound.css'

const NotFound = () => {
    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (

        <div class="bg-purple">
            <div class="stars">
                <div class="central-body">
                    <Typography variant="h1" component="h1" sx={{ color: colors.primary[100], fontSize: 150, fontWeight: 700, textAlign: 'center' }}>
                        404
                    </Typography>
                    <Typography variant="h2" component="h2" sx={{ color: colors.primary[100], fontSize: 22, fontWeight: 300, textAlign: 'center' }}>
                        LOOKS LIKE YOU ARE<br />LOST IN SPACE
                    </Typography>
                    <a href="/" class="btn-go-home" >GO BACK HOME</a>
                </div>
                <div class="objects">

                    <div class="earth-moon">
                        <img class="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px" />
                        <img class="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px" />
                    </div>
                    <div class="box_astronaut">
                        <img class="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px" />
                    </div>
                </div>
                <div class="glowing_stars">
                    <div class="star"></div>
                    <div class="star"></div>
                    <div class="star"></div>
                    <div class="star"></div>
                    <div class="star"></div>
                </div>
            </div>
        </div>


    )
}

export default NotFound