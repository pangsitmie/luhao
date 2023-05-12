import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useQuery } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { replaceNullWithEmptyString, unixTimestampToDatetimeLocal } from "../../utils/Utils";
import { useTranslation } from 'react-i18next';
import { BRAND_GetBonusGame, BRAND_GetBonusGameReviewData } from "../../graphQL/BrandPrincipalQueries";
import AcceptReviewButton from "./AcceptReviewButton";
import RejectReviewButton from "./RejectReviewButton";
import { ReviewItemType } from "../../types/Review";


type Props = {
    props: ReviewItemType,
    onUpdate: () => void,
    showButtons: boolean
}

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),

});


export default function ReviewBonusGameListModal({ props, onUpdate, showButtons }: Props) {
    const { t } = useTranslation();


    console.log(props.reviewId);

    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);



    // ========================== STATES AND HANDLERS ==========================
    var btnTitle = t("view"), modalTitle = t("details");

    const [modal, setModal] = useState(false); //open or close modal
    const toggleModal = () => {
        setModal(!modal);
    };


    const [startAtDate, setStartAtDate] = useState('');
    function handleStartAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setStartAtDate(event.target.value);
    }

    const [endAtDate, setEndAtDate] = useState('');
    function handleEndAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEndAtDate(event.target.value);
    }


    //========================== INITIAL VALUES ==========================
    const [initialValues, setInitialValues] = useState({
        id: 0,
        name: "",
        type: "",
        description: "",
        maxCurrencyAmount: "",
    });





    const handleFormSubmit = () => { };
    //========================== GRAPHQL ==========================

    const { data } = useQuery(BRAND_GetBonusGame
        , {
            variables: {
                bonusGameId: props.sourceId
            }
        }
    );


    // INITIAL VALUES FROM GET BRAND QUERY
    const { data: dataInit } = useQuery(BRAND_GetBonusGameReviewData
        , {
            variables: {
                reviewIds: props.reviewId
            }
        }
    );
    useEffect(() => {
        if (data && dataInit) {
            console.log(data.getBonusGameForBrandPrincipal);

            const nonNullDataInit = replaceNullWithEmptyString(dataInit.getBonusGameReviewData[0]);

            setInitialValues({
                //keep the previous values
                name: data.getBonusGameForBrandPrincipal.name,
                description: data.getBonusGameForBrandPrincipal.description,

                id: nonNullDataInit.id,
                type: nonNullDataInit.type,
                maxCurrencyAmount: nonNullDataInit.maxCurrencyAmount,
                //password doesn't have initial value
            });

            const startAtDateTimeLocal = unixTimestampToDatetimeLocal(nonNullDataInit.startAt);
            setStartAtDate(startAtDateTimeLocal);

            if (nonNullDataInit.endAt !== "") {
                const endAtDateTimeLocal = unixTimestampToDatetimeLocal(nonNullDataInit.endAt);
                setEndAtDate(endAtDateTimeLocal);
            }
        }
    }, [data, dataInit]);

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
                                        <Box>
                                            <Box display={"flex"} >
                                                <Box width={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography variant="h2" sx={{ fontSize: "2rem", fontWeight: "600", color: colors.grey[200] }}>
                                                        {modalTitle}
                                                    </Typography>
                                                    {(() => {
                                                        if (status === "disable") {
                                                            return (
                                                                <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem 0" }}>
                                                                    {t('disable')}
                                                                </Typography>)
                                                        }
                                                        else if (status === "banned") {
                                                            return (
                                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem 0" }}>
                                                                    {t('banned')}
                                                                </Typography>)
                                                        }
                                                        else if (status === "removed") {
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
                                                label={t('name')}
                                                disabled={true}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                name="name"
                                                error={!!touched.name && !!errors.name}
                                                helperText={touched.name && errors.name}
                                                sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                            />
                                            <TextField className="modal_input_textfield"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label={t('description')}
                                                disabled={true}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.description}
                                                name="description"
                                                error={!!touched.description && !!errors.description}
                                                helperText={touched.description && errors.description}
                                                sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                            />
                                            <TextField className="modal_input_textfield"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label={t('type')}
                                                disabled={true}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.type}
                                                name="type"
                                                error={!!touched.type && !!errors.type}
                                                helperText={touched.type && errors.type}
                                                sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                            />


                                            <TextField
                                                fullWidth
                                                disabled={true}
                                                variant="filled"
                                                type="text"
                                                label={t('max_currency_amount')}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.maxCurrencyAmount}
                                                name="maxCurrencyAmount"
                                                error={!!touched.maxCurrencyAmount && !!errors.maxCurrencyAmount}
                                                helperText={touched.maxCurrencyAmount && errors.maxCurrencyAmount}
                                                sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />



                                            <Box display={"flex"} justifyContent={"space-between"}>
                                                <TextField
                                                    disabled={true}
                                                    fullWidth
                                                    id="datetime-local"
                                                    label={t('start_time')}
                                                    type="datetime-local"
                                                    // defaultValue="2017-05-24T10:30"
                                                    value={startAtDate}
                                                    name="startAt"
                                                    onChange={handleStartAtDateChange}
                                                    sx={{ marginBottom: "1rem", mr: '1rem' }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    disabled={true}
                                                    id="datetime-local"
                                                    label={t('end_time')}
                                                    type="datetime-local"
                                                    // defaultValue="2017-05-24T10:30"
                                                    value={endAtDate}
                                                    name="endAt"
                                                    onChange={handleEndAtDateChange}
                                                    sx={{ marginBottom: "1rem" }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                        {showButtons && (
                                            <Box display="flex" justifyContent="center" gap={"1rem"}>
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
