import React, { useState, useEffect, useRef } from "react";
import { Box, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { GetBrandReviewData, } from "../../graphQL/Queries";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { getImgURL, replaceNullWithEmptyString } from "../../utils/Utils";
import LogoUpload from "../../components/Upload/LogoUpload";
import CoverUpload from "../../components/Upload/CoverUpload";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { PatchBrand } from "src/graphQL/Mutations";
import { BRAND_UpdateBrand } from "src/graphQL/BrandPrincipalQueries";
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


export default function ReviewBrandListModal({ props, onUpdate, showButtons }) {
    const { entityName } = useSelector((state) => state.entity);
    const { t } = useTranslation();
    // console.log(props.reviewId);

    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);



    // ========================== STATES AND HANDLERS ==========================
    var btnTitle = t("view"), modalTitle = t("details"), confirmTitle = t("update"), deleteTitle = t("delete"), banTitle = t("ban"), unbanTitle = t("unban");

    const [modal, setModal] = useState(false); //open or close modal
    const toggleModal = () => {
        setModal(!modal);
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [status, setStatus] = useState('disable');
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };


    //========================== INITIAL VALUES ==========================
    const [initialValues, setInitialValues] = useState({
        id: -1,
        status: "",
        name: "",
        intro: "",
        principalName: "",
        principaPhone: "",
        principalPassword: "",
        principalLineUrl: "",
        principalEmail: "",
        vatNumber: "",
        brandCoinName: "",
    });
    //========================== GRAPHQL ==========================





    const handleFormSubmit = (values) => {

    };

    // INITIAL VALUES FROM GET BRAND QUERY
    const { loading: loadingInit, error: errorInit, data: dataInit } = useQuery(GetBrandReviewData
        , {
            variables: {
                reviewIds: props.reviewId
            }
        }
    );
    useEffect(() => {
        if (dataInit) {
            console.log(dataInit);
            const nonNullData = replaceNullWithEmptyString(dataInit.getBrandReviewData[0]);

            setInitialValues({
                id: props.id,
                status: nonNullData.status,
                name: nonNullData.name,
                vatNumber: nonNullData.vatNumber,
                intro: nonNullData.intro,
                principalName: nonNullData.principalName,
                principalLineUrl: nonNullData.principalLineUrl,
                principalEmail: nonNullData.principalEmail,
                //password doesnt have initial value
            });

            if (nonNullData.logo !== null || (nonNullData.logo !== "null")) {
                setLogoFileName(nonNullData.logo);
            }
            if (nonNullData.cover !== null || (nonNullData.cover !== "null")) {
                setCoverFileName(nonNullData.cover);
            }
            //set status only if not banned
            if (nonNullData.status !== "banned") {
                setStatus(nonNullData.status)
            }

        }
    }, [dataInit]);

    // =========================== FILE UPLOAD ===========================
    const [logoFileName, setLogoFileName] = useState('');
    const handleUploadLogoSuccess = (name) => {
        setLogoFileName(name);
    };

    const [coverFileName, setCoverFileName] = useState('');
    const handleUploadCoverSucess = (name) => {
        setCoverFileName(name);
    };

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
                                            <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: colors.grey[200] }}>
                                                {modalTitle}
                                            </Typography>

                                            <Box textAlign="center" display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                                {(() => {
                                                    if (initialValues.status === "disable") {
                                                        return (
                                                            <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                                                {t("disable")}
                                                            </Typography>)
                                                    }
                                                    if (initialValues.status === "banned") {
                                                        return (
                                                            <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                                {t("banned")}
                                                            </Typography>)
                                                    }
                                                    else {
                                                        return (
                                                            <Typography variant="h5" color={colors.greenAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                                {t("normal")}
                                                            </Typography>)
                                                    }
                                                })()}
                                            </Box>

                                            {/* UPLOAD LOGO & COVER BOX */}
                                            <Box display="flex" m={"1rem 0"} gap={".5rem"}>
                                                <Box width={"30%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                                    {/* UPLOAD LOGO COMPONENT */}
                                                    <LogoUpload handleSuccess={handleUploadLogoSuccess} imagePlaceHolder={getImgURL(logoFileName, "logo")} type={"brand"} />
                                                </Box>

                                                <Box width={"70%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                                    {/* UPLOAD COVER COMPONENET */}
                                                    <CoverUpload handleSuccess={handleUploadCoverSucess} imagePlaceHolder={getImgURL(coverFileName, "cover")} type={"brand"} />
                                                </Box>
                                            </Box>

                                            <Box display={"flex"} justifyContent={"space-between"}>

                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={t("brand_name")}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.name}
                                                    name="name"
                                                    error={!!touched.name && !!errors.name}
                                                    helperText={touched.name && errors.name}
                                                    sx={{ marginBottom: "1rem", mr: '1rem', backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={t("vat_number")}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.vatNumber}
                                                    name="vatNumber"
                                                    error={!!touched.vatNumber && !!errors.vatNumber}
                                                    helperText={touched.vatNumber && errors.vatNumber}
                                                    sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />

                                                <FormControl sx={{ minWidth: 150 }}>
                                                    <InputLabel id="demo-simple-select-label" >{initialValues.status}</InputLabel>
                                                    <Select
                                                        disabled={true}
                                                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={status}
                                                        label="status"
                                                        onChange={handleStatusChange}
                                                    >
                                                        <MenuItem value={"normal"}>{t('normal')}</MenuItem>
                                                        <MenuItem value={"disable"}>{t('disable')}</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>

                                            <TextField
                                                id="outlined-multiline-flexible"
                                                multiline
                                                disabled={true}
                                                fullWidth
                                                maxRows={4}
                                                variant="filled"
                                                type="text"
                                                label={t("brand_intro")}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.intro}
                                                name="intro"
                                                error={!!touched.intro && !!errors.intro}
                                                helperText={touched.intro && errors.intro}
                                                sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />

                                            <Typography variant="h5" sx={{ textAlign: "left", margin: "1rem 0 .5rem 0", color: colors.grey[200] }}>{t('principal_name')}</Typography>


                                            <Box display={"flex"} justifyContent={"space-between"} >
                                                <TextField
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={`${t('person_name')}`}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalName}
                                                    name="principalName"
                                                    error={!!touched.principalName && !!errors.principalName}
                                                    helperText={touched.principalName && errors.principalName}
                                                    sx={{ marginBottom: "1rem", mr: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />

                                                {/* PASSWORD INPUT */}
                                                <FormControl fullWidth variant="filled" sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }} >
                                                    <InputLabel htmlFor="filled-adornment-password">{t("password")} {t('optional')}</InputLabel>
                                                    <FilledInput
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.principalPassword}
                                                        name="principalPassword"
                                                        error={!!touched.principalPassword && !!errors.principalPassword}
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
                                                    <FormHelperText error={!!touched.principalPassword && !!errors.principalPassword}>
                                                        {touched.principalPassword && errors.principalPassword}
                                                    </FormHelperText>
                                                </FormControl>
                                            </Box>

                                            <Box display={"flex"} justifyContent={"space-between"} >
                                                <TextField
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={t("line_url")}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalLineUrl}
                                                    name="principalLineUrl"
                                                    error={!!touched.principalLineUrl && !!errors.principalLineUrl}
                                                    helperText={touched.principalLineUrl && errors.principalLineUrl}
                                                    sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    disabled={true}
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t("phone")}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principaPhone}
                                                    name="principaPhone"
                                                    error={!!touched.principaPhone && !!errors.principaPhone}
                                                    helperText={touched.principaPhone && errors.principaPhone}
                                                    sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />

                                                <TextField
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={t("email")}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalEmail}
                                                    name="principalEmail"
                                                    error={!!touched.principalEmail && !!errors.principalEmail}
                                                    helperText={touched.principalEmail && errors.principalEmail}
                                                    sx={{ margin: "0rem 0rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>

                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                disabled={true}
                                                label={t("brand_coin_name")}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.brandCoinName}
                                                name="brandCoinName"
                                                error={!!touched.brandCoinName && !!errors.brandCoinName}
                                                helperText={touched.brandCoinName && errors.brandCoinName}
                                                sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />
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
