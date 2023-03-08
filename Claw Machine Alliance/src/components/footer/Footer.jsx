import React from 'react'
import './footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import FOOTER_LOGO from '../../assets/footer_logo.png'
import { Box, Typography } from '@mui/material';
const Footer = () => {

    return (
        <footer>
            <div className='contact_container'>
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <img width={"300px"} height={"40px"} src={FOOTER_LOGO} alt="" />
                </Box>
                <div className="footer__socials">
                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <Typography variant="h5" sx={{ fontSize: "14px", color: "#FFF" }}>
                            gcvtaichungoffice@gmail.com
                        </Typography>
                    </Box>
                    <div className='footer__socials__icons'>
                        <a href="mailto:gcvtaichungoffice@gmail.com" target='_blank' rel="noreferrer"><EmailIcon /></a>
                        <a href="https://www.facebook.com/people/%E5%85%A8%E5%8F%B0%E9%81%B8%E7%89%A9%E8%B2%A9%E8%B3%A3%E6%A9%9F%E4%BA%92%E5%8A%A9%E4%BA%A4%E6%B5%81%E7%BE%A4/100070398859757/" target='_blank' rel="noreferrer"><FacebookIcon /></a>
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default Footer