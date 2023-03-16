import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css'
const Login = () => {

    const navigate = useNavigate();
    // 0 = login
    // 1 = register
    const [selected, setSelected] = useState(0);

    const [registerFormData, setFormData] = useState({
        phone_country: "TW",
        phone_number: "",
        name: "",
        password: "",
        captcha: "",
    });

    const [loginFormData, setLoginFormData] = useState({
        phone_country: "TW",
        phone_number: "",
        password: "",
    });

    const [verificationFormData, setVerificationFormData] = useState({
        phone_country: "TW",
        phone_number: "",
        captchaType: 1,
    });


    const handleToggle = () => {
        setSelected(selected === 0 ? 1 : 0)
    };

    const handleFormChange = ({ target: { name, value } }) => {
        const updatedFormData = {
            ...registerFormData,
            [name]: value,
        };

        setFormData(updatedFormData);
        setLoginFormData((prevFormData) => ({
            ...prevFormData,
            phone_number: updatedFormData.phone_number,
            password: updatedFormData.password,
        }));
        setVerificationFormData((prevFormData) => ({
            ...prevFormData,
            phone_number: updatedFormData.phone_number,
        }));
    };

    const handleSendVerificationCode = () => {
        const url = `https://exhibition-test.cloudprogrammingonline.com/captcha/v1/phone`;

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(verificationFormData),
            // body: JSON.stringify(formData),
        };

        console.log(requestOptions);

        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status === "0x000") {
                    alert("驗證碼已發送");
                }
            })
            .catch((error) => {
                console.error(error);
                // handle error here
            });
    }



    const handleFormSubmit = () => {
        const endpoint = selected === 0 ? '/member/v1/login' : '/member/v1/register';
        const url = `https://exhibition-test.cloudprogrammingonline.com${endpoint}`;

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selected === 0 ? loginFormData : registerFormData),
        };

        console.log(loginFormData);
        console.log(registerFormData);
        console.log(verificationFormData);

        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // handle response data 
                if (data.status === "0x000") {
                    alert("登入成功");
                    navigate("/exhibition/2023");
                }
            })
            .catch((error) => {
                console.error(error);
                // handle error here
            });
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
                                    <Box width={"100%"}>
                                        <Typography variant="h3" sx={{ color: "#fff", fontWeight: "600", mb: "2rem" }}>
                                            Welcome Back
                                        </Typography>
                                        <TextField
                                            required
                                            fullWidth
                                            id="outlined-required"
                                            type={"number"}
                                            label="手機"
                                            name="phone_number"
                                            value={loginFormData.phone_number}
                                            onChange={handleFormChange}
                                            sx={{ margin: " 0 1rem 1rem 0", borderRadius: "5px" }}
                                        />
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="密碼"
                                            type="password"
                                            name="password"
                                            value={loginFormData.password}
                                            onChange={handleFormChange}
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
                                            type={"text"}
                                            label="名稱"
                                            name="name"
                                            value={registerFormData.name}
                                            onChange={handleFormChange}
                                            sx={{ marginBottom: "1rem", borderRadius: "5px" }}
                                        />
                                        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }}>
                                            <TextField
                                                className="modal_input_textfield"
                                                fullWidth
                                                disabled
                                                variant="filled"
                                                type="text"
                                                label="國家"
                                                onChange={handleFormChange}
                                                value={registerFormData.phone_country}
                                                name="phone_country"
                                                sx={{ width: { xs: "100%", md: "auto" } }}
                                            />
                                            <TextField
                                                required
                                                fullWidth
                                                id="outlined-required"
                                                type={"text"}
                                                label="手機"
                                                name="phone_number"
                                                value={registerFormData.phone_number}
                                                onChange={handleFormChange}
                                                sx={{ width: { xs: "100%" } }}
                                            />
                                            <Button
                                                onClick={handleSendVerificationCode}
                                                sx={{
                                                    bgcolor: "#FFF",
                                                    padding: "1rem 2rem",
                                                    borderRadius: "5px",
                                                    whiteSpace: "nowrap",
                                                    color: "#111",
                                                    transition: "all 0.3s ease-in-out",
                                                    "&:hover": { backgroundColor: "#39393F", color: "#FFFfff" }
                                                }}>
                                                <Typography
                                                    variant="h5"
                                                    sx={{ fontSize: "14px", fontWeight: "600" }}>
                                                    發送驗證
                                                </Typography>
                                            </Button>
                                        </Box>

                                        <TextField
                                            required
                                            fullWidth
                                            id="outlined-required"
                                            type={"text"}
                                            label="密碼"
                                            name="password"
                                            value={registerFormData.password}
                                            onChange={handleFormChange}
                                            sx={{ width: { xs: "100%" }, mb: "1rem" }}
                                        />
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="驗證碼"
                                            type="text"
                                            name="captcha"
                                            value={registerFormData.captcha}
                                            onChange={handleFormChange}
                                        />
                                    </Box>
                                )}

                            <Box className='flex_cc' mt={"2rem"}>
                                <Button onClick={handleFormSubmit} sx={{ width: "100%", bgcolor: "#FFF", padding: "1rem 4rem", borderRadius: "50px" }}>
                                    <Typography variant="h5" sx={{ color: "#111", fontSize: "14px", fontWeight: "600" }}>
                                        確認
                                    </Typography>
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