import { Box, Typography } from '@mui/material'
import React from 'react'
import './about.css'
import WAVE_WHITE from 'src/assets/wave_white.png'

const About = () => {
    return (
        <Box>
            <Box className='about_section'>
                <Typography variant={"h4"} sx={{ fontSize: "4rem", fontWeight: "600", color: "#111", mb: ".8rem" }}>
                    Partnership Ann Flux to: <br />
                    integrate Bitgert Chain
                </Typography>
                <Typography variant={"h4"} sx={{ fontSize: "1rem", fontWeight: "500", color: "#343434" }}>
                    and why we are the best in import PropTypes from 'prop-types'
                </Typography>
            </Box>
            <Box className={"about_wave"}>
                <img src={WAVE_WHITE} alt="" />
            </Box>

            <Box className='about_content'>
                <Typography variant={"h4"} sx={{ fontSize: "4rem", fontWeight: "600", color: "#fff", mb: "2rem" }}>
                    Bitgert chain partners with Flux
                </Typography>
                <Typography variant={"h4"} sx={{ fontSize: "1.4rem", fontWeight: "600", color: "#fff", mb: "2rem" }}>
                    A Decentralized Computing Network
                </Typography>
                <Typography variant={"h4"} sx={{ fontSize: "1.15rem", fontWeight: "500", color: "#bebebe", mb: "2rem", lineHeight: "150%" }}>
                    Flux is the new generation of scalable decentralized cloud infrastructure. A comprehensive suite of decentralized computing services and blockchain-as-a-service solutions. The Flux ecosystem consists of: Fluxnodes’ decentralized infrastructure, FluxOS cloud operating system, and much more. Also it’s own blockchain for token governance.
                    <br /> <br />
                    The partnership will strive to work on the future of decentralized cloud infrastructure. With this Bitgert not only offers WEB3 services but also Cloud infrastructure for the industry.
                    <br /><br />
                    Now our partners can develop, manage, and spawn your applications on multiple servers at once. Ready for Web 3.0, dApps, and more.
                    <br /><br />
                    For more educational content please log on to :- https://bitgert.com/blog/
                </Typography>
            </Box>
        </Box>
    )
}

export default About