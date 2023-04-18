import { Box, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import './login.css'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Login = () => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    // 0 = login
    // 1 = register
    const [selected, setSelected] = useState(0);
    const [country, setCountry] = useState("TW");
    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [registerFormData, setFormData] = useState({
        phone_country: "TW",
        phone_number: "",
        email: "",
        name: "",
        password: "",
        captcha: "",
    });

    const [loginFormData, setLoginFormData] = useState({
        phone_country: "TW",
        phone_number: "",
        email: "",
        password: "",
    });

    const [phoneVerificationFormData, setPhoneVerificationFormData] = useState({
        phone_country: "TW",
        phone_number: "",
        captchaType: 1,
    });

    const [emailVerificationFormData, setEmailVerificationFormData] = useState({
        email: "",
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
            email: updatedFormData.email,
            password: updatedFormData.password,
        }));
        setPhoneVerificationFormData((prevFormData) => ({
            ...prevFormData,
            phone_number: updatedFormData.phone_number,
        }));
        setEmailVerificationFormData((prevFormData) => ({
            ...prevFormData,
            email: updatedFormData.email,
        }));
    };

    const handlePhoneVerification = () => {
        const url = `https://exhibition-test.cloudprogrammingonline.com/captcha/v1/phone`;

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(phoneVerificationFormData),
            // body: JSON.stringify(formData),
        };

        console.log(requestOptions);

        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status === "0x000") {
                    toast.success("驗證碼已發送");
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message);
                // handle error here
            });
    }
    const handleEmailVerification = () => {
        const url = `https://exhibition-test.cloudprogrammingonline.com/captcha/v1/email`;

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(country === "TW" ? phoneVerificationFormData : emailVerificationFormData),
            // body: JSON.stringify(formData),
        };

        console.log(requestOptions);

        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status === "0x000") {
                    toast.success("驗證碼已發送");
                    // alert("驗證碼已發送");
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message);
                // handle error here
            });
    }



    const handleFormSubmit = () => {
        const endpoint = selected === 0 ? '/member/v1/login' : '/member/v1/register';
        const url = `https://exhibition-test.cloudprogrammingonline.com${endpoint}`;

        let formData = selected === 0 ? loginFormData : registerFormData;
        if (country !== "TW" && selected === 1) {
            // If country is not TW and it's a register request, remove the phone_number field
            const { phone_number, phone_country, ...formDataWithoutPhone } = formData;
            formData = formDataWithoutPhone;
        } else if (country === "TW" && selected === 1) {
            // If country is TW and it's a register request, remove the email field
            const { email, ...formDataWithoutEmail } = formData;
            formData = formDataWithoutEmail;
        } else if (country !== "TW" && selected === 0) {
            // If country is not TW and it's a login request, remove the phone_number field and phone_country field
            const { phone_number, phone_country, ...formDataWithoutPhone } = formData;
            formData = formDataWithoutPhone;
        } else if (country === "TW" && selected === 0) {
            // If country is TW and it's a login request, remove the email field
            const { email, ...formDataWithoutEmail } = formData;
            formData = formDataWithoutEmail;
        }


        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: 'include', // Add this line to include credentials in the request
        };

        console.log(requestOptions);



        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // handle response data 
                if (data.status === "0x000") {
                    toast.success("登入成功");
                    navigate("/exhibition/2023");
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message);
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
                                    <Typography className='light' sx={{ fontWeight: "bold", color: "#111" }}>登入</Typography>
                                    <Typography className='dark' sx={{ fontWeight: "bold", color: "#111" }}>註冊</Typography>
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
                                        <Box display={"flex"} gap={"1rem"} mb={"1rem"}>
                                            <FormControl sx={{ width: "150px" }}>
                                                <InputLabel id="demo-simple-select-label" >國家</InputLabel>
                                                <Select
                                                    sx={{ borderRadius: "10px" }}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={country}
                                                    label={"國家"}
                                                    onChange={handleCountryChange}
                                                >
                                                    <MenuItem value={"TW"}>TW</MenuItem>
                                                    <MenuItem value={"ALL"}>ALL</MenuItem>
                                                </Select>
                                            </FormControl>
                                            {
                                                country === "TW" ?
                                                    (
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            id="outlined-required"
                                                            type={"text"}
                                                            label="手機"
                                                            name="phone_number"
                                                            value={loginFormData.phone_number}
                                                            onChange={handleFormChange}
                                                            sx={{ width: { xs: "100%" } }}
                                                        />
                                                    ) :
                                                    (
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            id="outlined-required"
                                                            type={"text"}
                                                            label="Email"
                                                            name="email"
                                                            value={loginFormData.email}
                                                            onChange={handleFormChange}
                                                            sx={{ width: { xs: "100%" } }}
                                                        />
                                                    )
                                            }
                                        </Box>

                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label={t('password')}
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
                                            label={t('name')}
                                            name="name"
                                            value={registerFormData.name}
                                            onChange={handleFormChange}
                                            sx={{ marginBottom: "1rem", borderRadius: "5px" }}
                                        />
                                        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }}>
                                            <FormControl sx={{ width: "150px" }}>
                                                <InputLabel id="demo-simple-select-label" >國家</InputLabel>
                                                <Select
                                                    sx={{ borderRadius: "10px" }}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={country}
                                                    label={"國家"}
                                                    onChange={handleCountryChange}
                                                >
                                                    <MenuItem value={"TW"}>TW</MenuItem>
                                                    <MenuItem value={"ALL"}>ALL</MenuItem>
                                                </Select>
                                            </FormControl>
                                            {
                                                country === "TW" ?
                                                    (
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
                                                    ) :
                                                    (
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            id="outlined-required"
                                                            type={"text"}
                                                            label="Email"
                                                            name="email"
                                                            value={registerFormData.email}
                                                            onChange={handleFormChange}
                                                            sx={{ width: { xs: "100%" } }}
                                                        />
                                                    )
                                            }

                                            <Button
                                                onClick={country === "TW" ? handlePhoneVerification : handleEmailVerification}
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
                                                    {t('send_verification')}
                                                </Typography>
                                            </Button>
                                        </Box>

                                        {/* <TextField
                                            required
                                            fullWidth
                                            id="outlined-required"
                                            type={"text"}
                                            label="密碼"
                                            name="password"
                                            value={registerFormData.password}
                                            onChange={handleFormChange}
                                            sx={{ width: { xs: "100%" }, mb: "1rem" }}
                                        /> */}
                                        {/* PASSWORD INPUT */}
                                        <FormControl fullWidth variant="filled" sx={{ marginBottom: "1rem", borderRadius: "5px" }} >
                                            <InputLabel htmlFor="filled-adornment-password">{t('password')}</InputLabel>
                                            <FilledInput
                                                // onBlur={handleBlur}
                                                onChange={handleFormChange}
                                                value={registerFormData.password}
                                                name="password"
                                                // error={!!touched.password && !!errors.password}
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            {/* <FormHelperText error={!!touched.password && !!errors.password}>
                                                {touched.password && errors.password}
                                            </FormHelperText> */}
                                        </FormControl>

                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label={t('verification_code')}
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
                                        {selected === 0 ? t('login') : t('register')}
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