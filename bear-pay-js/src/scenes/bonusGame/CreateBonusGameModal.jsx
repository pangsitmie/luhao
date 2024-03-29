import React, { useState, useEffect, useRef } from "react";
import { Box, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, TextField, Typography, useTheme } from "@mui/material";
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
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
import { STORE_CreateBonusGame } from "src/graphQL/StorePrincipalMutation";
import { STORE_GetStoreCurrency } from "src/graphQL/StorePrincipalQueries";

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d_!@#]{6,}$/;

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    description: yup.string().required("required"),
    maxCurrencyAmount: yup.number().required("required"),
});


export default function CreateGiftCodeModal({ props, onUpdate }) {
    const { entityName } = useSelector((state) => state.entity);

    const { t } = useTranslation();
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //========================== INITIAL VALUES ==========================
    const [initialValues, setInitialValues] = useState({
        storeId: "",
        name: "",
        description: "",
        maxCurrencyAmount: 0,
        currencyId: "0",
        currencyName: ""
    });

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

    let CREATE_BONUS_GAME_MUTATION = STORE_CreateBonusGame;

    const { error: errorCurrency, loading: loadingCurrency, data: dataCurrency } = useQuery(STORE_GetStoreCurrency);

    useEffect(() => {
        if (dataCurrency) {
            console.log("dataCurrency", dataCurrency);
            console.log("currencyID = ", dataCurrency.getStorePrincipal.stores[0].brand.currency.id);
            console.log("currenc name = ", dataCurrency.getStorePrincipal.stores[0].brand.currency.name);

            setInitialValues({
                storeId: dataCurrency.getStorePrincipal.stores[0].id,
                currencyId: dataCurrency.getStorePrincipal.stores[0].brand.currency.id,
                currencyName: dataCurrency.getStorePrincipal.stores[0].brand.currency.name
            })
            // initialValues.currencyId = dataCurrency.getStorePrincipal.stores[0].brand.currency.id;
        }
    }, [dataCurrency]);

    //========================== GRAPHQL ==========================
    const [ApolloCreateBonusGame, { loading, error, data }] = useMutation(CREATE_BONUS_GAME_MUTATION);
    useEffect(() => {
        if (data) {
            onUpdate();
            toast.success(t('create_success'));
            // window.location.reload();
        }
    }, [data]);



    // ========================== FUNCTIONS ==========================
    const handleFormSubmit = (values) => {
        console.log("SEND CREATE BONUSE GAME API REQUEST");
        const startAtDateObj = new Date(startAtDate);
        const endAtDateObj = new Date(endAtDate);

        let startAtUnix = startAtDateObj.getTime() / 1000;
        let endAtUnix = endAtDateObj.getTime() / 1000;

        let nowUnix = Math.floor(Date.now() / 1000);


        const variables = {
            storeId: values.storeId,
            name: values.name,
            description: values.description,
            type: "roulette2",
            maxCurrencyAmount: parseInt(values.maxCurrencyAmount),
            currencyRewards: [
                {
                    currencyId: values.currencyId,
                    amount: 6,
                    receiveDaysOverdue: 14,
                    serialNumber: 1,
                    probability: 3
                },
                {
                    currencyId: values.currencyId,
                    amount: 5,
                    receiveDaysOverdue: 14,
                    serialNumber: 2,
                    probability: 5
                },
                {
                    currencyId: values.currencyId,
                    amount: 4,
                    receiveDaysOverdue: 14,
                    serialNumber: 3,
                    probability: 7
                },
                {
                    currencyId: values.currencyId,
                    amount: 3,
                    receiveDaysOverdue: 14,
                    serialNumber: 4,
                    probability: 10
                },
                {
                    currencyId: values.currencyId,
                    amount: 2,
                    receiveDaysOverdue: 14,
                    serialNumber: 5,
                    probability: 15
                },
                {
                    currencyId: values.currencyId,
                    amount: 1,
                    receiveDaysOverdue: 14,
                    serialNumber: 6,
                    probability: 20
                }
            ],
            emptyRewards: [
                {
                    serialNumber: 7,
                    probability: 40
                }
            ]
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


        console.log(variables);
        ApolloCreateBonusGame({ variables });
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
                                enableReinitialize={true}
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

                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label={t('description')}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.description}
                                                name="description"
                                                error={!!touched.description && !!errors.description}
                                                helperText={touched.description && errors.description}
                                                sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />


                                            {/* <Typography variant="h4" sx={{ m: "1rem 0", textAlign: "center", fontSize: "1rem", fontWeight: "600", color: colors.greenAccent[100] }}>
                                                {t('reward')}
                                            </Typography> */}


                                            <Box display={"flex"} justifyContent={"space-between"} gap={"1rem"}>
                                                <TextField
                                                    id="outlined-multiline-flexible"
                                                    multiline
                                                    fullWidth
                                                    disabled={true}
                                                    maxRows={4}
                                                    variant="filled"
                                                    type="number"
                                                    required // add the required prop
                                                    label={t('currency_id')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.currencyId}
                                                    name="currencyId"
                                                    error={!!touched.currencyId && !!errors.currencyId}
                                                    helperText={touched.currencyId && errors.currencyId}
                                                    sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    id="outlined-multiline-flexible"
                                                    multiline
                                                    fullWidth
                                                    maxRows={4}
                                                    variant="filled"
                                                    disabled={true}
                                                    type="number"
                                                    required // add the required prop
                                                    label={t('currency_name')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.currencyName}
                                                    name="currencyName"
                                                    error={!!touched.currencyName && !!errors.currencyName}
                                                    helperText={touched.currencyName && errors.currencyName}
                                                    sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    id="outlined-multiline-flexible"
                                                    multiline
                                                    fullWidth
                                                    maxRows={4}
                                                    variant="filled"
                                                    type="number"
                                                    required // add the required prop
                                                    label={t('max_currency_amount')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.maxCurrencyAmount}
                                                    name="maxCurrencyAmount"
                                                    error={!!touched.maxCurrencyAmount && !!errors.maxCurrencyAmount}
                                                    helperText={touched.maxCurrencyAmount && errors.maxCurrencyAmount}
                                                    sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
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
