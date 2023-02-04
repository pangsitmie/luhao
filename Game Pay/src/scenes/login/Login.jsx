import React, { useEffect, useState, useContext } from 'react'
import { useQuery, useMutation, useLazyQuery, ApolloClient, ApolloCache } from '@apollo/client'
import { useNavigate } from 'react-router-dom';

import "./login.css";
import LOGIN_BG from "../../assets/login_bg.png"
// import LOGO from "../../assets/logo512.png";

import { ManagerLogin, BrandLogin, StoreLogin } from '../../graphQL/Mutations'
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
import { setBrand, setCompany, setStore } from "../../redux/entity";

const checkoutSchema = yup.object().shape({
    account: yup.string().required("required"),
    password: yup.string().required("required").nullable(),
});




const Login = () => {
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


    // ========================== COMPANY LOGIN ==========================
    const [apolloManagerLogin, { loading: loadingManager, error: errorManager, data: dataManager }] = useMutation(ManagerLogin);
    // if login success we want to get the access token
    useEffect(() => {
        if (dataManager) {
            console.log("LOGIN TOKEN: " + dataManager.managerLogin);
            localStorage.setItem('login_token', dataManager.managerLogin);
            setIsLogin(true);

            apolloGetManagerAccessToken({
                variables: {
                    refreshToken: "Bearer " + dataManager.managerLogin
                }
            });
        }
    }, [dataManager]);

    const [apolloGetManagerAccessToken, { loading: loading1, error: error1, data: data1 }] = useLazyQuery(GetManagerAccessToken);
    useEffect(() => {
        if (data1) {
            console.log("ACCESS TOKEN: " + data1.getManagerAccessToken);
            setAccessToken(data1.getManagerAccessToken);
            localStorage.setItem('token', data1.getManagerAccessToken);
            localStorage.setItem('entity', JSON.stringify({ entityName: 'company' }));

            navigate("/");
        }
        else {
            console.log("NO ACCESS TOKEN")
        }
    }, [data1]);
    // ========================== END ==========================

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
    // ========================== STORE LOGIN ==========================
    const [apolloStoreLogin, { loading: loadingStore, error: errorStore, data: dataStore }] = useMutation(StoreLogin);
    // if login success we want to get the access token
    useEffect(() => {
        if (dataStore) {
            console.log("LOGIN TOKEN: " + dataStore.storePrincipalWebLogin);
            localStorage.setItem('login_token', dataStore.storePrincipalWebLogin);
            setIsLogin(true);

            apolloGeStoreAccessToken({
                variables: {
                    refreshToken: "Bearer " + dataStore.storePrincipalWebLogin
                }
            });
        }
    }, [dataStore]);

    const [apolloGeStoreAccessToken, { loading: loadingStoreAT, error: errorStoreAT, data: dataStoreAT }] = useLazyQuery(GetStoreWebAccessToken);
    useEffect(() => {
        if (dataStoreAT) {
            console.log("ACCESS TOKEN: " + dataStoreAT.getStorePrincipalWebAccessToken);
            setAccessToken(dataStoreAT.getStorePrincipalWebAccessToken);
            localStorage.setItem('token', dataStoreAT.getStorePrincipalWebAccessToken);
            localStorage.setItem('entity', JSON.stringify({ entityName: 'store' }));
            navigate("/");
        }
        else {
            console.log("NO ACCESS TOKEN")
        }
    }, [dataStoreAT]);




    //========================== FUNCTIONS ==========================
    const handleFormSubmit = (values) => {

        const variables = {};
        switch (entityName) {
            case "company":
                console.log("COMPANY LOGIN");
                variables.account = values.account;
                variables.password = values.password;
                apolloManagerLogin({ variables });
                break;
            case "brand":
                console.log("BRAND LOGIN");
                variables.phone = {
                    country: "tw",
                    number: values.account
                };
                variables.password = values.password;
                apolloBrandLogin({ variables });
                break;
            case "store":
                console.log("STORE LOGIN");
                variables.account = values.account;
                variables.password = values.password;
                apolloStoreLogin({ variables });
                break;
            default:
                variables.account = values.account;
                variables.password = values.password;
                apolloManagerLogin({ variables });
                break;
        }
        console.log(variables);

    }

    return (
        <Box className='login_page' backgroundColor={colors.primary[400]} >
            <div className="container">
                <div className="box">
                    <Typography variant="h5" sx={{
                        color: (() => {
                            switch (entityName) {
                                case "company":
                                    return colors.primary[100];
                                case "brand":
                                    return colors.greenAccent[400];
                                case "store":
                                    return colors.blueAccent[400];
                                default:
                                    return colors.primary[100];
                            }
                        })(), fontWeight: "300"
                    }}>
                        {entityName.toUpperCase()} LOGIN
                    </Typography>
                    <span className="title">GAME PAY </span>
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
                                            label={(() => {
                                                switch (entityName) {
                                                    case "brand":
                                                        return "Phone";
                                                    default:
                                                        return "Account";
                                                }
                                            })()}
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
                                            Login
                                            <div className="arrow-wrapper">
                                                <div className="arrow"></div>
                                            </div>
                                        </button>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </div>
                    <Box display={"flex"} justifyContent={"space-between"} p={"3rem 0 0 0"}>
                        <span>
                            <Button color="secondary" sx={{ color: colors.primary[100] }} onClick={() => dispatch(setCompany())}>公司登入</Button>
                        </span>
                        <span>
                            <Button color="secondary" sx={{ color: colors.greenAccent[400] }} onClick={() => dispatch(setBrand())}>品牌登入</Button>
                        </span>
                        <span>
                            <Button color="secondary" sx={{ color: colors.blueAccent[400] }} onClick={() => dispatch(setStore())}>店家登入</Button>
                        </span>
                    </Box>
                </div>
            </div>
        </Box >
    )
};

export default Login