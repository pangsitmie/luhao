import React, { useState, useEffect } from "react";
import { Box, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { useMutation } from "@apollo/client";


import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";
import ConfirmButton from "../../components/ConfirmButton";
import { ManagerCreateStoreEmployee } from "../../graphQL/Mutations";



type Props = {
    storeId: string;
    onUpdate: () => void;
};

interface FormValues {
    name: string;
    account: string;
    password: string;
}

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d_!@#]{6,}$/;

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    account: yup.string().required("required"),
    password: yup.string().required("required").matches(passwordRegex, "password must contain at least 6 characters, including letters and numbers")
});

export default function CreateStoreEmployeeModal({ storeId, onUpdate }: Props) {
    const { t } = useTranslation();


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ========================== STATE ==========================
    const [modal, setModal] = useState(false);


    //  ========================== PASSWORD VISIBILITY ==========================
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
    };


    var btnTitle = t("create_employee"), confirmTitle = t("create");


    const [initialValues] = useState<FormValues>({
        name: "",
        account: "",
        password: "",
    });



    //============================================ GQL ==================================================
    //create store
    const [ApolloCreateStore, { loading, error, data }] = useMutation(ManagerCreateStoreEmployee);
    useEffect(() => {
        if (data) {
            onUpdate();
            toast.success(t("create_success"));
            setModal(false);
        }
        if (error) {
            toast.error(error.message);
            console.log(error.message);
        }
        if (loading) {
            console.log(loading);
        }
    }, [data, error, loading]);


    const handleFormSubmit = (values: FormValues) => {
        const variables: any = {
            storeId: storeId,
            name: values.name,
            account: values.account,
            password: values.password,
        }

        ApolloCreateStore({ variables });
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    return (
        <>
            <Button onClick={toggleModal} className="btn-modal" sx={{ color: colors.primary[100], border: "1px solid #111", borderColor: colors.blueAccent[100] }}>{btnTitle}</Button>

            {/* CONTENT OF WHAT HAPPEN AFTER BUTTON CLICKED */}
            {modal && (
                <Box className="modal">
                    <Box onClick={toggleModal} className="overlay"></Box>
                    <Box className="modal-content"
                        sx={{
                            backgroundColor: colors.primary[500],
                        }}>
                        <Box m="20px">
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
                                            <Box display={"flex"} m={"1rem 0 3rem"}>
                                                <Typography variant="h2" sx={{ textAlign: "left", fontSize: "2.2rem", fontWeight: "600", color: "white" }}>
                                                    {btnTitle}
                                                </Typography>
                                            </Box>

                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label={`${t('person_name')}`}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                name="name"
                                                required
                                                error={!!touched.name && !!errors.name}
                                                helperText={touched.name && errors.name}
                                                sx={{ margin: " 0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />

                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label={t('account')}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.account}
                                                name="account"
                                                required
                                                error={!!touched.account && !!errors.account}
                                                helperText={touched.account && errors.account}
                                                sx={{ margin: " 0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />

                                            {/* PASSWORD INPUT */}
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
    );
}
