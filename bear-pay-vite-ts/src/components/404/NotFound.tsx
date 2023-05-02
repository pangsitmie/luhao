// THEME
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import './notFound.css'

const NotFound = () => {
    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (

        <div className="bg-purple">
            <div className="stars">
                <div className="central-body">
                    <Typography variant="h1" component="h1" sx={{ color: colors.primary[100], fontSize: 150, fontWeight: 700, textAlign: 'center' }}>
                        404
                    </Typography>
                    <Typography variant="h2" component="h2" sx={{ color: colors.primary[100], fontSize: 22, fontWeight: 300, textAlign: 'center' }}>
                        LOOKS LIKE YOU ARE<br />LOST IN SPACE
                    </Typography>
                    <a href="/" className="btn-go-home" >
                        <Typography sx={{ color: colors.primary[100], fontWeight: 300, textAlign: 'center' }}>
                            GO BACK HOME
                        </Typography></a>
                </div>
                <div className="objects">

                    <div className="earth-moon">
                        <img className="object_earth" src="https://roundbytes.com/static/media/roundbytes_earth.e50b9aa6eda6a2393296bcb84d93005d.svg" width="100px" />
                        <img className="object_moon" src="https://roundbytes.com/static/media/roundbytes_moon.03785b8c1691696c00b6a0161d2cd1e4.svg" width="80px" />
                    </div>
                    <div className="box_astronaut">
                        <img className="object_astronaut" src="https://roundbytes.com/static/media/roundbytes_astronaut.e2b60a65821122a3377a8f0f01d68285.svg" width="140px" />
                    </div>
                </div>
                <div className="glowing_stars">
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                </div>
            </div>
        </div>


    )
}

export default NotFound