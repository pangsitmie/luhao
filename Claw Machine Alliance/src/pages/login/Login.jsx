import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import './login.css'
const Login = () => {
    // 0 = login
    // 1 = register
    const [selected, setSelected] = useState(0);
    const handleToggle = () => {
        setSelected(selected === 0 ? 1 : 0)
    };
    return (
        <Box className={"login_container"}>
            <input id="switch" type="checkbox" onChange={handleToggle} checked={selected === 1} />
            <div className="app">
                <div className="body">
                    <div className="login_box">
                        <div className='switch_container'>
                            <label className='login_toggle_label' htmlFor="switch">
                                <div className="toggle"></div>
                                <div className="names">
                                    <Typography className='light' sx={{ fontWeight: "bold", color: "#111" }}>等人</Typography>
                                    <Typography className='dark' sx={{ fontWeight: "bold", color: "#111" }}>注冊</Typography>
                                </div>
                            </label>
                        </div>
                        <div className="login_content">
                            {selected === 0 ?
                                (
                                    <Box>
                                        <Typography variant="h3" sx={{ color: "#fff", fontWeight: "600", mb: "2rem" }}>
                                            Welcome Back
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            type={"email"}
                                            label="Email"
                                            sx={{ marginBottom: "1rem", borderRadius: "5px" }}
                                        />
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="Password"
                                        />
                                    </Box>
                                ) :
                                (
                                    <Box>
                                        <Typography variant="h3" sx={{ color: "#fff", fontWeight: "600", mb: "2rem" }}>
                                            Join Us
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="Name"
                                            sx={{ marginBottom: "1rem", borderRadius: "5px" }}
                                        />
                                        <Box display={"flex"} gap={"1rem"}>
                                            <TextField
                                                fullWidth
                                                required
                                                id="outlined-required"
                                                label="Email"
                                                type={"email"}
                                                sx={{ marginBottom: "1rem", borderRadius: "5px" }}
                                            />
                                            <TextField
                                                fullWidth
                                                required
                                                id="outlined-required"
                                                label="Phone"
                                                sx={{ marginBottom: "1rem", borderRadius: "5px" }}
                                            />
                                        </Box>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="Password"
                                        />
                                    </Box>
                                )}

                            <Box className='flex_cc' mt={"2rem"}>
                                <Button sx={{ width: "100%", bgcolor: "#FFF", padding: "1rem 4rem", borderRadius: "50px" }}>
                                    <a href="/login">
                                        <Typography variant="h5" sx={{ color: "#111", fontSize: "14px", fontWeight: "600" }}>
                                            確認
                                        </Typography>
                                    </a>
                                </Button>
                            </Box>
                        </div>

                    </div>
                </div>
            </div>
        </Box>
    )
}
export default Login