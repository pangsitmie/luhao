import React, { useState, useEffect, useRef } from "react";
import { Box, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, TextField, Typography, useTheme } from "@mui/material";
import { useLazyQuery, useMutation } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { CreateBrand, ManagerCreateGiftCode } from "../../graphQL/Mutations";
// import { defaultCoverURL, defaultLogoURL, default_cover_900x300_filename, default_logo_360x360_filename } from "../../data/strings";
import LogoUpload from "../../components/Upload/LogoUpload";
import CoverUpload from "../../components/Upload/CoverUpload";
import { getImgURL } from "../../utils/Utils";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BRAND_CreateGiftCode } from "src/graphQL/BrandPrincipalMutations";

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d_!@#]{6,}$/;

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    code: yup.string().required("required"),
    coinAmount: yup.number().required("required"),
});


export default function CreateBonusGameModal({ onUpdate }) {
    const { entityName } = useSelector((state) => state.entity);

    const { t } = useTranslation();
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //========================== INITIAL VALUES ==========================
    const initialValues = {
        name: "",
        code: "",
        description: "",
        coinAmount: "",
        limit: "",
        receiveDaysOverdue: "",
        // startAtDate: "",
        // endAtDate: "",
    };

    // ========================== STATES AND HANDLERS ==========================
    var btnTitle = t("create"), confirmTitle = t("confirm"), deleteTitle = t("delete"), banTitle = t("ban"), unbanTitle = t("unban");

    const [modal, setModal] = useState(false); //open or close modal
    const toggleModal = () => {
        setModal(!modal);
    };

    const [startAtDate, setStartAtDate] = useState('');
    function handleStartAtDateChange(event) {
        setStartAtDate(event.target.value);
    }

    const [endAtDate, setEndAtDate] = useState('');
    function handleEndAtDateChange(event) {
        setEndAtDate(event.target.value);
    }

    let CREATE_GIFT_CODE_MUTATION;
    switch (entityName) {
        case 'company':
            CREATE_GIFT_CODE_MUTATION = ManagerCreateGiftCode;
            break;
        case 'brand':
            CREATE_GIFT_CODE_MUTATION = BRAND_CreateGiftCode;
            break;
        default:
            break;
    }

    //========================== GRAPHQL ==========================
    const [ApolloCreateGiftCode, { loading, error, data }] = useMutation(CREATE_GIFT_CODE_MUTATION);
    useEffect(() => {
        if (data) {
            onUpdate();
            toast.success(t('create_success'));
            // window.location.reload();
        }
    }, [data]);



    // ========================== FUNCTIONS ==========================
    const handleFormSubmit = (values) => {
        console.log("SEND CREATE GIFT CODE API REQUEST");
        const startAtDateObj = new Date(startAtDate);
        const endAtDateObj = new Date(endAtDate);

        let startAtUnix = startAtDateObj.getTime() / 1000;
        let endAtUnix = endAtDateObj.getTime() / 1000;

        let nowUnix = Math.floor(Date.now() / 1000);


        const variables = {
            name: values.name,
            code: values.code,
            coinAmount: parseInt(values.coinAmount),
            // description: values.description,
        };

        // check if startAtUnix is filled
        if (isNaN(startAtUnix)) {
            startAtUnix = nowUnix;
        }

        //insert startAtUnix to variables
        variables.startAt = startAtUnix;

        //insert endAtUnix to variables if it is selected
        if (!isNaN(endAtUnix)) {
            variables.endAt = endAtUnix;
        }


        if (endAtUnix < startAtUnix) {
            alert("End date must be greater than start date");
            return;
        }


        if (values.receiveDaysOverdue > 0) {
            variables.receiveDaysOverdue = parseInt(values.receiveDaysOverdue);
        }
        if (values.description) {
            variables.description = values.description;
        }
        if (values.limit > 0) {
            variables.limit = parseInt(values.limit);
        }

        console.log(variables);
        ApolloCreateGiftCode({ variables });
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
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('gift_code')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.code}
                                                    placeholder="ex. BEAR-100"
                                                    name="code"
                                                    required // add the required prop
                                                    error={!!touched.code && !!errors.code}
                                                    helperText={touched.code && errors.code}
                                                    sx={{ margin: "0 0rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label={t('reward_description')}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.description}
                                                name="description"
                                                error={!!touched.description && !!errors.description}
                                                helperText={touched.description && errors.description}
                                                sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />


                                            <Typography variant="h4" sx={{ m: "1rem 0", textAlign: "center", fontSize: "1rem", fontWeight: "600", color: colors.greenAccent[100] }}>
                                                {t('reward')}
                                            </Typography>


                                            <Box display={"flex"} justifyContent={"space-between"} gap={'1rem'}>
                                                <TextField
                                                    id="outlined-multiline-flexible"
                                                    multiline
                                                    fullWidth
                                                    maxRows={4}
                                                    variant="filled"
                                                    type="number"
                                                    required // add the required prop
                                                    label={t('amount')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.coinAmount}
                                                    name="coinAmount"
                                                    error={!!touched.coinAmount && !!errors.coinAmount}
                                                    helperText={touched.coinAmount && errors.coinAmount}
                                                    sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />

                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="number"
                                                    label={t('currency_limit')}
                                                    placeholder="Null是不限制 或 1~60"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.limit}
                                                    name="limit"
                                                    error={!!touched.limit && !!errors.limit}
                                                    helperText={touched.limit && errors.limit}
                                                    sx={{ margin: "0rem 0 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="number"
                                                    label={t('currency_days_limit')}
                                                    placeholder="Null是不限制"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.receiveDaysOverdue}
                                                    name="receiveDaysOverdue"
                                                    error={!!touched.receiveDaysOverdue && !!errors.receiveDaysOverdue}
                                                    helperText={touched.receiveDaysOverdue && errors.receiveDaysOverdue}
                                                    sx={{ margin: "0rem 0rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>

                                            <Box display={"flex"} justifyContent={"space-between"}>
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