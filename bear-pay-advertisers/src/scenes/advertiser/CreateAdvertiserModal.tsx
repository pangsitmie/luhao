import React, { useState, useEffect } from "react";
import { Box, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { CreateAdvertisersForManager } from "../../graphQL/Mutations";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
import { useMutation } from "@apollo/client";
import ConfirmButton from "../../components/ConfirmButton";
import { toast } from "react-toastify";


type Props = {
    onUpdate: () => void
}
interface FormValues {
    name: string;
    account: string;
    password: string;
    principalName: string;
    principalPhone: string;
}


const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    account: yup.string().required("required"),
    // password: yup.string().required("required").matches(passwordRegex, "must contain at least one letter and one number, and be at least six characters long"), principalLineUrl: yup.string().required("required"),
    // principalName: yup.string().required("required"),
    // principalPhone: yup.string().required("required"),
});

const CreateAdvertiserModal = ({ onUpdate }: Props) => {
    const { t } = useTranslation();
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //========================== INITIAL VALUES ==========================
    const [initialValues] = useState<FormValues>({
        name: "",
        account: "",
        password: "",
        principalName: "",
        principalPhone: "",
    });

    // ========================== STATES AND HANDLERS ==========================
    var btnTitle = t("create"), confirmTitle = t("confirm");

    const [modal, setModal] = useState(false); //open or close modal
    const toggleModal = () => {
        setModal(!modal);
    };

    //  ========================== PASSWORD VISIBILITY ==========================
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
    };


    //========================== GRAPHQL ==========================
    const [ApolloCreateAdvertiser, { loading, error, data }] = useMutation(CreateAdvertisersForManager);
    useEffect(() => {
        if (data) {
            console.log(data);
            toast.success(t('create_success'));
            onUpdate();
        }
        if (error) {
            console.log(error);
        }
        if (loading) {
            console.log(loading);
        }
    }, [data, error, loading]);



    // ========================== FUNCTIONS ==========================
    const handleFormSubmit = (values: FormValues) => {
        console.log("SEND CREATE BRAND API REQUEST");

        const variables: any = {
            name: values.name,
            account: values.account,
            password: values.password,
            principalName: values.principalName,
            principalPhone: {
                country: "tw",
                number: values.principalPhone
            },
        };


        console.log(variables);
        ApolloCreateAdvertiser({ variables });
    };

    // ========================== MODAL TOGGLE ==========================
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            {/* THE CONTENT OF THE BUTTON */}
            <Button onClick={toggleModal} className="btn-modal" sx={{ color: colors.primary[100], border: "1px solid #111", borderColor: colors.blueAccent[100] }}>{btnTitle}</Button>

            {/* CONTENT OF WHAT HAPPEN AFTER BUTTON CLICKED */}
            {modal && (
                <Box className="modal" >
                    <Box onClick={toggleModal} className="overlay"></Box>
                    <Box className="modal-content"
                        sx={{
                            backgroundColor: colors.primary[500],
                        }}>
                        <Box m="20px">
                            <Typography variant="h2" sx={{ mb: "10px", textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: colors.grey[200] }}>
                                {btnTitle}
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
                                        <Box>
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
                                            <Box display={"flex"} justifyContent={"space-between"} >
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('account')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.account}
                                                    name="account"
                                                    required // add the required prop
                                                    error={!!touched.account && !!errors.account}
                                                    helperText={touched.account && errors.account}
                                                    sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <FormControl
                                                    fullWidth variant="filled"
                                                    required // add the required prop
                                                    sx={{
                                                        marginBottom: "1rem",
                                                        backgroundColor: colors.primary[400], borderRadius: "5px"
                                                    }} >
                                                    <InputLabel htmlFor="filled-adornment-password">{t('password')}</InputLabel>
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

                                            <Box display={"flex"} justifyContent={"space-between"} >
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={`${t('principal_name')}`}
                                                    onBlur={handleBlur}
                                                    required // add the required prop
                                                    onChange={handleChange}
                                                    value={values.principalName}
                                                    name="principalName"
                                                    error={!!touched.principalName && !!errors.principalName}
                                                    helperText={touched.principalName && errors.principalName}
                                                    sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={` ${t('principal_phone')}`}
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

                                        </Box>
                                        <Box display="flex" justifyContent="center" >
                                            <ConfirmButton title={confirmTitle} />
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
    )
}
export default CreateAdvertiserModal