import React, { useEffect, useState, useContext } from 'react'
import { useQuery, useMutation, useLazyQuery, ApolloClient, ApolloCache } from '@apollo/client'
import { useNavigate } from 'react-router-dom';

import "./login.css";
import LOGIN_BG from "../../assets/login_bg.png"
// import LOGO from "../../assets/logo512.png";

import { BrandLogin } from '../../graphQL/Mutations'
import { GetManagerAccessToken, GetBrandPrincipalWebAccessToken, GetStoreWebAccessToken } from '../../graphQL/Queries'
import Map from '../../components/Maps'
// THEME
import { ColorModeContext, tokens } from "../../theme";
import { Box, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { Visibility, VisibilityOff } from '@mui/icons-material';

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setBrand } from "../../redux/entity";

const checkoutSchema = yup.object().shape({
    account: yup.string().required("required"),
    password: yup.string().required("required").nullable(),
});




const BrandLoginPage = () => {
    // REDUX STORE
    const { entityName } = useSelector((state) => state.entity);
    const dispatch = useDispatch();

    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    //========================== INITIAL VALUES ==========================
    const initialValues = {
        account: "",
        password: ""
    }

    // ========================== STATES AND HANDLERS ==========================
    let navigate = useNavigate();

    //  ========================== PASSWORD VISIBILITY ==========================
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [isLoggedIn, setIsLogin] = useState(false);
    const [accessToken, setAccessToken] = useState('');





    // ========================== BRAND LOGIN ==========================
    const [apolloBrandLogin, { loading: loadingBrand, error: errorBrand, data: dataBrand }] = useMutation(BrandLogin);
    // if login success we want to get the access token
    useEffect(() => {
        if (dataBrand) {
            console.log("LOGIN TOKEN: " + dataBrand.brandPrincipalWebLogin);
            localStorage.setItem('login_token', dataBrand.brandPrincipalWebLogin);
            setIsLogin(true);

            apolloGetBrandAccessToken({
                variables: {
                    refreshToken: "Bearer " + dataBrand.brandPrincipalWebLogin
                }
            });
        }
    }, [dataBrand]);

    const [apolloGetBrandAccessToken, { loading: loadingBrandAT, error: errorBrandAT, data: dataBrandAT }] = useLazyQuery(GetBrandPrincipalWebAccessToken);
    useEffect(() => {
        if (dataBrandAT) {
            dispatch(setBrand());
            console.log("ACCESS TOKEN: " + dataBrandAT.getBrandPrincipalWebAccessToken);
            setAccessToken(dataBrandAT.getBrandPrincipalWebAccessToken);
            localStorage.setItem('token', dataBrandAT.getBrandPrincipalWebAccessToken);
            localStorage.setItem('entity', JSON.stringify({ entityName: 'brand' }));
            navigate("/");
        }
        else {
            console.log("NO ACCESS TOKEN")
        }
    }, [dataBrandAT]);

    // ========================== END ==========================





    //========================== FUNCTIONS ==========================
    const handleFormSubmit = (values) => {
        const variables = {};

        console.log("BRAND LOGIN");
        variables.phone = {
            country: "tw",
            number: values.account
        };
        variables.password = values.password;
        apolloBrandLogin({ variables });
        console.log(variables);

    }

    return (
        <Box className='login_page' backgroundColor={colors.primary[400]} >
            <div className="container">
                <div className="box">
                    <Typography variant="h5" sx={{
                        color: "#fff", fontSize: "13px", fontWeight: "300", ml: "2px", mb: "5px"
                    }}>
                        BRAND
                    </Typography>
                    <span className="title">GAME PAY</span>
                    <div>
                        <Formik
                            onSubmit={handleFormSubmit}
                            initialValues={initialValues}
                            validationSchema={checkoutSchema}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <Box >
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Phone"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.account}
                                            name="account"
                                            error={!!touched.account && !!errors.account}
                                            helperText={touched.account && errors.account}
                                            sx={{ marginBottom: "1rem", mr: "1rem", borderRadius: "5px" }}
                                        />

                                        {/* PASSWORD INPUT */}
                                        <FormControl fullWidth variant="filled" sx={{ marginBottom: "1rem", borderRadius: "5px" }} >
                                            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                            <FilledInput
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.password}
                                                name="password"
                                                error={!!touched.password && !!errors.password}
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
                                            <FormHelperText error={!!touched.password && !!errors.password}>
                                                {touched.password && errors.password}
                                            </FormHelperText>
                                        </FormControl>
                                    </Box>
                                    <Box display="flex" justifyContent="center" >
                                        <button className='btn_right_arrow' type="submit">
                                            登入
                                            <div className="arrow-wrapper">
                                                <div className="arrow"></div>
                                            </div>
                                        </button>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </div>

                </div>
            </div>
        </Box >
    )
};

export default BrandLoginPage

