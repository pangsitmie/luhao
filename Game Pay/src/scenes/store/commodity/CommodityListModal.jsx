import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
// import useMediaQuery from "@mui/material/useMediaQuery";
import { useQuery, useLazyQuery } from '@apollo/client'
import "src/components/Modal/modal.css";
import { tokens } from "src/theme";
import { GetCommodity, RemoveMachine, UnBanMachine, UpdateCommodity } from "src/graphQL/Queries";
import { replaceNullWithEmptyString } from "src/utils/Utils";
import { useTranslation } from 'react-i18next';

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    price: yup.number().required("required"),
    stock: yup.number().required("required"),
    // desc: yup.string().required("required"),
});


export default function MachineListModal({ props }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { t } = useTranslation();
    const [modal, setModal] = useState(false);
    //REF
    const [status, setStatus] = useState('disable');
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };


    var btnTitle = t("view"), modalTitle = t("details"), confirmTitle = t("update"), deleteTitle = t("delete"), banTitle = t("ban"), unbanTitle = t("unban");
    const [initialValues, setInitialValues] = useState({
        id: 0,
        UUID: "",
        name: "",
        price: 0,
        stock: 0,
    });





    // ===================== INITIAL VALUES FROM GETMACHINE =====================
    const { loading: loading3, error: error3, data: data3 } = useQuery(GetCommodity
        , {
            variables: {
                args: [
                    {
                        id: props.id
                    }
                ],
            }
        }
    );
    useEffect(() => {
        if (data3) {
            const nonNullData = replaceNullWithEmptyString(data3.getCommodity[0]);
            setInitialValues({
                // ...initialValues,
                // ...nonNullData
                id: nonNullData.id,
                UUID: nonNullData.uuid,
                name: nonNullData.name,
                price: nonNullData.price,
                stock: nonNullData.stock,
            });
        }
    }, [data3]);

    // UPDATE BRAND MUTATION
    const [ApolloUpdateCommodity, { loading: loading4, error: error4, data: data4 }] = useLazyQuery(UpdateCommodity);
    useEffect(() => {
        if (data4) {
            window.location.reload();
        }
    }, [data4]);




    const handleFormSubmit = (values) => {
        const variables = {
            args: [
                {
                    id: props.id,
                }
            ],
            name: values.name,
            price: parseInt(values.price),
            stock: parseInt(values.stock),
        };

        console.log(variables);
        ApolloUpdateCommodity({ variables });


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
            {/* THE CONTENT OF THE BUTTON */}

            <Button onClick={toggleModal} className="btn-modal" sx={{ color: colors.primary[100], border: "1px solid #111", borderColor: colors.blueAccent[100] }}>{btnTitle}</Button>

            {/* CONTENT OF WHAT HAPPEN AFTER BUTTON CLICKED */}
            {modal && (
                <Box className="modal">
                    <Box onClick={toggleModal} className="overlay"></Box>
                    <Box className="modal-content" backgroundColor={colors.primary[500]}>
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
                                        <Box color={"black"} >

                                            <Box display={"flex"} >
                                                <Box width={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography variant="h2" sx={{ fontSize: "2rem", fontWeight: "600", color: colors.grey[200] }}>
                                                        {modalTitle}
                                                    </Typography>
                                                    {(() => {
                                                        if (initialValues.status === "disable") {
                                                            return (
                                                                <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem 0" }}>
                                                                    {t('disable')}
                                                                </Typography>)
                                                        }
                                                        else if (initialValues.status === "banned") {
                                                            return (
                                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem 0" }}>
                                                                    {t('banned')}
                                                                </Typography>)
                                                        }
                                                        else if (initialValues.status === "removed") {
                                                            return (
                                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem 0" }}>
                                                                    {t('removed')}
                                                                </Typography>)
                                                        }
                                                        else {
                                                            return (
                                                                <Typography variant="h5" color={colors.greenAccent[300]} sx={{ margin: ".5rem 0" }}>
                                                                    {t('normal')}
                                                                </Typography>)
                                                        }
                                                    })()}

                                                </Box>
                                            </Box>
                                            <TextField className="modal_input_textfield"
                                                fullWidth
                                                disabled={true}
                                                variant="filled"
                                                type="text"
                                                label="UUID"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.UUID}
                                                name="UUID"
                                                error={!!touched.UUID && !!errors.UUID}
                                                helperText={touched.UUID && errors.UUID}
                                                sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                            />

                                            <TextField className="modal_input_textfield"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label={t('product_name')}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                name="name"
                                                error={!!touched.name && !!errors.name}
                                                helperText={touched.name && errors.name}
                                                sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                            />
                                            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    variant="filled"
                                                    type="number"
                                                    label={t('price')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.price}
                                                    name="price"
                                                    error={!!touched.price && !!errors.price}
                                                    helperText={touched.price && errors.price}
                                                    sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    variant="filled"
                                                    type="number"
                                                    label={t('stock')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.stock}
                                                    name="stock"
                                                    error={!!touched.stock && !!errors.stock}
                                                    helperText={touched.stock && errors.stock}
                                                    sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                            </Box>
                                        </Box>

                                        <Box display="flex" justifyContent="center" >
                                            <Box display="flex" justifyContent="center" >
                                                {/* <Button onClick={handleDelete} id={values.id} variant="contained" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #ff2f00" }}>
                                                    <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                                                        {deleteTitle}
                                                    </Typography>
                                                </Button> */}
                                                <Button type="submit" color="success" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", background: colors.grey[100] }}>
                                                    <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: colors.grey[700] }}>
                                                        {confirmTitle}
                                                    </Typography>
                                                </Button>
                                            </Box>
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
