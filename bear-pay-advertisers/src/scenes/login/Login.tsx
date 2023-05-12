import React, { useEffect, useState } from 'react'
import { useMutation, useLazyQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom';
import { ManagerLogin, BrandLogin, StoreLogin } from '../../graphQL/Mutations'
import { GetManagerAccessToken, GetBrandPrincipalWebAccessToken, GetStoreWebAccessToken } from '../../graphQL/Queries'

// THEME
import { Box, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';

// REDUX
import { useDispatch } from "react-redux";
import { setBrand, setStore } from "../../redux/entity";

import "./login.css";


const checkoutSchema = yup.object().shape({
    account: yup.string().required("required"),
    password: yup.string().required("required").nullable(),
});

const Login = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    //========================== INITIAL VALUES ==========================
    const initialValues = {
        account: "",
        password: ""
    }


    //  ========================== PASSWORD VISIBILITY ==========================
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClickShowPassword = (): void => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
    };
    //  ========================== END ==========================


    // ========================== COMPANY LOGIN ==========================
    const [apolloManagerLogin, { loading: loadingManager, error: errorManager, data: dataManager }] = useMutation(ManagerLogin);
    // if login success we want to get the access token
    useEffect(() => {
        if (dataManager) {
            localStorage.setItem('login_token', dataManager.managerLogin);
            apolloGetManagerAccessToken({
                variables: {
                    refreshToken: "Bearer " + dataManager.managerLogin
                }
            });
        }
        if (errorManager) {
            console.log(errorManager);
        }
        if (loadingManager) {
            console.log("LOADING");
        }
    }, [dataManager, errorManager, loadingManager]);

    const [apolloGetManagerAccessToken, { loading: loading1, error: error1, data: data1 }] = useLazyQuery(GetManagerAccessToken);
    useEffect(() => {
        if (data1) {
            console.log("ACCESS TOKEN: " + data1.getManagerAccessToken);
            localStorage.setItem('token', data1.getManagerAccessToken);
            localStorage.setItem('entity', JSON.stringify({ entityName: 'company' }));
            navigate("/");
        }
        if (error1) {
            console.log(error1);
        }
        if (loading1) {
            console.log("LOADING");
        }
        else {
            console.log("NO ACCESS TOKEN")
        }
    }, [data1, error1, loading1]);
    // ========================== END ==========================



    // ========================== BRAND LOGIN ==========================
    const [apolloBrandLogin, { loading: loadingBrand, error: errorBrand, data: dataBrand }] = useMutation(BrandLogin);
    // if login success we want to get the access token
    useEffect(() => {
        if (dataBrand) {
            console.log("LOGIN TOKEN: " + dataBrand.brandPrincipalWebLogin);
            localStorage.setItem('login_token', dataBrand.brandPrincipalWebLogin);
            apolloGetBrandAccessToken({
                variables: {
                    refreshToken: "Bearer " + dataBrand.brandPrincipalWebLogin
                }
            });
        }
        if (errorBrand) {
            console.log(errorBrand);
        }
        if (loadingBrand) {
            console.log("LOADING");
        }
    }, [dataBrand, errorBrand, loadingBrand]);

    const [apolloGetBrandAccessToken, { loading: loadingBrandAT, error: errorBrandAT, data: dataBrandAT }] = useLazyQuery(GetBrandPrincipalWebAccessToken);
    useEffect(() => {
        if (dataBrandAT) {
            dispatch(setBrand());
            console.log("ACCESS TOKEN: " + dataBrandAT.getBrandPrincipalWebAccessToken);
            localStorage.setItem('token', dataBrandAT.getBrandPrincipalWebAccessToken);
            localStorage.setItem('entity', JSON.stringify({ entityName: 'brand' }));
            navigate("/");
        }
        if (errorBrandAT) {
            console.log(errorBrandAT);
        }
        if (loadingBrandAT) {
            console.log("LOADING");
        }
        else {
            console.log("NO ACCESS TOKEN")
        }
    }, [dataBrandAT, loadingBrandAT, errorBrandAT]);
    // ========================== END ==========================

    // ========================== STORE LOGIN ==========================
    const [apolloStoreLogin, { loading: loadingStore, error: errorStore, data: dataStore }] = useMutation(StoreLogin);
    // if login success we want to get the access token
    useEffect(() => {
        if (dataStore) {
            console.log("LOGIN TOKEN: " + dataStore.storePrincipalWebLogin);
            localStorage.setItem('login_token', dataStore.storePrincipalWebLogin);
            apolloGeStoreAccessToken({
                variables: {
                    refreshToken: "Bearer " + dataStore.storePrincipalWebLogin
                }
            });
        }
        if (errorStore) {
            console.log(errorStore);
        }
        if (loadingStore) {
            console.log("LOADING");
        }
    }, [dataStore, errorStore]);

    const [apolloGeStoreAccessToken, { loading: loadingStoreAT, error: errorStoreAT, data: dataStoreAT }] = useLazyQuery(GetStoreWebAccessToken);
    useEffect(() => {
        if (dataStoreAT) {
            dispatch(setStore());
            console.log("ACCESS TOKEN: " + dataStoreAT.getStorePrincipalWebAccessToken);
            localStorage.setItem('token', dataStoreAT.getStorePrincipalWebAccessToken);
            localStorage.setItem('entity', JSON.stringify({ entityName: 'store' }));
            navigate("/");
        }
        else {
            console.log("NO ACCESS TOKEN")
        }
    }, [dataStoreAT, loadingStoreAT, errorStoreAT]);
    // ========================== END ==========================

    useEffect(() => {
        if (errorBrand && errorStore && errorManager) {
            toast.error("登入資訊錯誤，請再試一次。");
        }
    }, [errorStore, errorBrand, errorManager]);



    //========================== FUNCTIONS ==========================
    const handleFormSubmit = (values: any): void => {

        let variables: any = {};
        variables.account = values.account;
        variables.password = values.password;

        // company login
        apolloManagerLogin({ variables });

        // store login
        apolloStoreLogin({ variables });

        variables = {};

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
        <div className='login_page'  >
            <div className="container">
                <div className="box">
                    <Typography variant="h5" sx={{
                        color: "#111", fontSize: "13px", fontWeight: "300", ml: "2px", mb: "5px"
                    }}>
                        ADVERTISERS
                    </Typography>
                    <span className="title">BEAR PAY</span>
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
                                            label="Account"
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
                </div>
            </div>
        </div >
    )
};

export default Login

