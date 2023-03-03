import React, { useState, useEffect, useRef } from "react";
import { Box, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { CreateBrand } from "../../graphQL/Mutations";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d_!@#]{6,}$/;

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    vatNumber: yup.string().required("required"),
    principalName: yup.string().required("required"),
    principalPassword: yup.string().required("required").matches(passwordRegex, "must contain at least one letter and one number, and be at least six characters long"), principalLineUrl: yup.string().required("required"),
    principalEmail: yup.string().email("invalid email"),
    principalPhone: yup.string().required("required"),
    brandCoinName: yup.string().required("required"),
});


export default function CreateRechargeModal() {
    const { t } = useTranslation();
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //========================== INITIAL VALUES ==========================
    const initialValues = {
        name: "",
        intro: "",
        vatNumber: "",

        principalName: "",
        principalPassword: "",
        principalLineUrl: "https://lin.ee/",
        principalEmail: "",
        principalPhone: "",
        brandCoinName: "",
    };

    // ========================== STATES AND HANDLERS ==========================
    var btnTitle = t("create"), modalTitle = t("details"), confirmTitle = t("confirm"), deleteTitle = t("delete"), banTitle = t("ban"), unbanTitle = t("unban");

    const [modal, setModal] = useState(false); //open or close modal
    const toggleModal = () => {
        setModal(!modal);
    };

    //  ========================== PASSWORD VISIBILITY ==========================
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    // 0 = permanent, 1 = limited
    const [typeId, setTypeId] = useState(0);
    const handleTypeIdChange = (event) => {
        setTypeId(event.target.value);
    };

    const [startAtDate, setStartAtDate] = useState('');
    function handleStartAtDateChange(event) {
        setStartAtDate(event.target.value);
    }

    const [endAtDate, setEndAtDate] = useState('');
    function handleEndAtDateChange(event) {
        setEndAtDate(event.target.value);
    }


    //========================== GRAPHQL ==========================
    const [ApolloCreateBrand, { loading, error, data: brandData }] = useMutation(CreateBrand);
    useEffect(() => {
        if (brandData) {
            console.log(brandData.createBrand.id);
            window.location.reload();
        }
    }, [brandData]);





    // ========================== FUNCTIONS ==========================
    const handleFormSubmit = (values) => {
        console.log("SEND CREATE BRAND API REQUEST");

        const variables = {
            name: values.name,
            vatNumber: values.vatNumber,
            brandCoinName: values.brandCoinName,
            principal: {
                name: values.principalName,
                password: values.principalPassword,
                lineUrl: values.principalLineUrl,
                phone: {
                    country: "tw",
                    number: values.principalPhone
                }
            },
        };

        if (values.intro !== "") {
            variables.intro = values.intro;
        }
        if (values.principalEmail !== "") {
            variables.principal.email = values.principalEmail;
        }
        console.log(variables);
        ApolloCreateBrand({ variables });
    };

    // ========================== MODAL TOGGLE ==========================
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    // ========================== RETURN ==========================
    return (
        <>
            {/* THE CONTENT OF THE BUTTON */}
            <Button onClick={toggleModal} className="btn-modal" sx={{ color: colors.primary[100], border: "1px solid #111", borderColor: colors.blueAccent[100] }}>{btnTitle}</Button>

            {/* CONTENT OF WHAT HAPPEN AFTER BUTTON CLICKED */}
            {modal && (
                <Box className="modal" >
                    <Box onClick={toggleModal} className="overlay"></Box>
                    <Box className="modal-content" backgroundColor={colors.primary[500]}>
                        <Box m="20px">
                            <Typography variant="h2" sx={{ mb: "25px", textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: colors.grey[200] }}>
                                {btnTitle} {t('recharge_item')}
                            </Typography>

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
                                        <Box color={"black"}>
                                            <Box display={"flex"} justifyContent={"space-between"}>
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('name')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.name}
                                                    name="name"
                                                    required // add the required prop
                                                    error={!!touched.name && !!errors.name}
                                                    helperText={touched.name && errors.name}
                                                    sx={{ marginBottom: "1rem", mr: '1rem', backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />

                                                <FormControl sx={{ minWidth: 150 }} >
                                                    <InputLabel id="demo-simple-select-label" >{initialValues.status}</InputLabel>
                                                    <Select
                                                        disabled={initialValues.status === "banned"}
                                                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={typeId}
                                                        label={t('recharge_type')}
                                                        onChange={handleTypeIdChange}
                                                    >
                                                        <MenuItem value={0}>{t('permanent')}</MenuItem>
                                                        <MenuItem value={1}>{t('limited')}</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>

                                            <TextField
                                                id="outlined-multiline-flexible"
                                                multiline
                                                fullWidth
                                                maxRows={4}
                                                variant="filled"
                                                type="text"
                                                label={`${t('description')} ${t('optional')}`}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.intro}
                                                name="intro"
                                                error={!!touched.intro && !!errors.intro}
                                                helperText={touched.intro && errors.intro}
                                                sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />


                                            <Box display={"flex"} justifyContent={"space-between"} >
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('amount')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalPhone}
                                                    name="principalPhone"
                                                    required // add the required prop
                                                    error={!!touched.principalPhone && !!errors.principalPhone}
                                                    helperText={touched.principalPhone && errors.principalPhone}
                                                    sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('price')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalPhone}
                                                    name="principalPhone"
                                                    required // add the required prop
                                                    error={!!touched.principalPhone && !!errors.principalPhone}
                                                    helperText={touched.principalPhone && errors.principalPhone}
                                                    sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('bonus_reward')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalPhone}
                                                    name="principalPhone"
                                                    required // add the required prop
                                                    error={!!touched.principalPhone && !!errors.principalPhone}
                                                    helperText={touched.principalPhone && errors.principalPhone}
                                                    sx={{ margin: "0rem 0 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>

                                            <Box display={typeId === 1 ? "block" : "none"}>
                                                <TextField
                                                    fullWidth
                                                    id="datetime-local"
                                                    label={t('start_time')}
                                                    type="datetime-local"
                                                    // defaultValue="2017-05-24T10:30"
                                                    value={startAtDate}
                                                    name="startAt"
                                                    onChange={handleStartAtDateChange}
                                                    error={!!touched.startAt && !!errors.startAt}
                                                    helperText={touched.startAt && errors.startAt}
                                                    sx={{ marginBottom: "1rem", mr: '1rem' }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    id="datetime-local"
                                                    label={t('end_time')}
                                                    type="datetime-local"
                                                    // defaultValue="2017-05-24T10:30"
                                                    value={endAtDate}
                                                    name="endAt"
                                                    onChange={handleEndAtDateChange}
                                                    error={!!touched.endAt && !!errors.endAt}
                                                    helperText={touched.endAt && errors.endAt}
                                                    sx={{ marginBottom: "1rem" }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                        <Box display="flex" justifyContent="center" >
                                            <button className="my-button" type="submit">{confirmTitle}</button>
                                        </Box>
                                    </form>
                                )}
                            </Formik>
                        </Box >
                    </Box>
                </Box>
            )
            }
        </>
    );
}
