import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { GetBrandReviewData, } from "../../graphQL/Queries";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { replaceNullWithEmptyString } from "../../utils/Utils";
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { PatchBrand } from "src/graphQL/Mutations";
import { BRAND_GetMachineReviewData, BRAND_UpdateBrand } from "src/graphQL/BrandPrincipalQueries";
import AcceptReviewButton from "./AcceptReviewButton";
import RejectReviewButton from "./RejectReviewButton";

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d_!@#]{6,}$/;

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    // intro: yup.string().required("required"),
    principalName: yup.string().required("required"),
    principalLineUrl: yup.string().required("required"),
    principalPassword: yup.string().matches(passwordRegex, "must contain at least one letter and one number, and be at least six characters long"),
    principalLineUrl: yup.string().required("required"),
    vatNumber: yup.string().required("required"),
    brandCoinName: yup.string().required("required"),
});


export default function ReviewMachineListModal({ props, onUpdate, showButtons }) {
    const { entityName } = useSelector((state) => state.entity);
    const { t } = useTranslation();


    console.log(props.reviewId);

    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);



    // ========================== STATES AND HANDLERS ==========================
    var btnTitle = t("view"), modalTitle = t("details"), confirmTitle = t("update"), deleteTitle = t("delete"), banTitle = t("ban"), unbanTitle = t("unban");

    const [modal, setModal] = useState(false); //open or close modal
    const toggleModal = () => {
        setModal(!modal);
    };



    const [status, setStatus] = useState('disable');
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };
    const [onlyWallet, setOnlyWallet] = useState(false);
    const handleOnlyWalletChange = (event) => {
        setOnlyWallet(event.target.value);
    };


    //========================== INITIAL VALUES ==========================
    const [initialValues, setInitialValues] = useState({
        id: 0,
        UUID: "",
        nfc: "",
        name: "",
        code: "",
        price: 0,
        qrCode: "",
        status: "",
        connStatus: "",
        desc: "",
    });





    const handleFormSubmit = (values) => {

    };
    //========================== GRAPHQL ==========================

    // INITIAL VALUES FROM GET BRAND QUERY
    const { loading: loadingInit, error: errorInit, data: dataInit } = useQuery(BRAND_GetMachineReviewData
        , {
            variables: {
                reviewIds: props.reviewId
            }
        }
    );
    useEffect(() => {
        if (dataInit) {
            console.log(dataInit);
            const nonNullData = replaceNullWithEmptyString(dataInit.getMachineReviewData[0]);

            setInitialValues({
                id: nonNullData.id,
                code: nonNullData.code,
                name: nonNullData.name,
                price: nonNullData.price,
                description: nonNullData.description,
                //password doesnt have initial value
            });

            setOnlyWallet(nonNullData.onlyWallet);
        }
    }, [dataInit]);

    //========================== RENDER ==========================
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    return (
        <>
            {/* THE CONTENT OF THE BUTTON */}
            <Button onClick={toggleModal} className="btn-modal" sx={{ color: colors.primary[100], border: "1px solid #111", borderColor: colors.blueAccent[100] }}>
                {btnTitle}
            </Button>

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
                                        <Box>
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
                                                                    {t('deleted')}
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
                                                variant="filled"
                                                type="text"
                                                label={t('machine_name')}
                                                disabled={true}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                name="name"
                                                error={!!touched.name && !!errors.name}
                                                helperText={touched.name && errors.name}
                                                sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                            />

                                            <Box display={"flex"} justifyContent={"center"}>

                                                <TextField
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={t('machine_code')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.code}
                                                    name="code"
                                                    error={!!touched.code && !!errors.code}
                                                    helperText={touched.code && errors.code}
                                                    sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />

                                                <TextField
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label="QR Code Payload"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.qrCode}
                                                    name="qrCode"
                                                    error={!!touched.qrCode && !!errors.qrCode}
                                                    helperText={touched.qrCode && errors.qrCode}
                                                    sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>

                                            <Box display={"flex"} gap={"1rem"}>
                                                <TextField
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={t('amount_spent_per_machine')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.price}
                                                    name="price"
                                                    error={!!touched.price && !!errors.price}
                                                    helperText={touched.price && errors.price}
                                                    sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={t('description')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.desc}
                                                    name="desc"
                                                    error={!!touched.desc && !!errors.desc}
                                                    helperText={touched.desc && errors.desc}
                                                    sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />

                                                <FormControl
                                                    fullWidth>
                                                    <InputLabel id="demo-simple-select-label" >Only wallet</InputLabel>
                                                    <Select
                                                        disabled={true}
                                                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={onlyWallet}
                                                        label="Only wallet"
                                                        onChange={handleOnlyWalletChange}
                                                    >
                                                        <MenuItem value={true}>{t('yes')}</MenuItem>
                                                        <MenuItem value={false}>{t('no')}</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>



                                        </Box>
                                        {showButtons && (
                                            <Box display="flex" justifyContent="center" >
                                                <RejectReviewButton REQUEST_ID={props.id} onUpdate={onUpdate} />
                                                <AcceptReviewButton REQUEST_ID={props.id} onUpdate={onUpdate} />
                                            </Box>
                                        )}
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
