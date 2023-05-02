import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Checkbox, FilledInput, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { useLazyQuery, useMutation } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { CreateDepositItem } from "../../graphQL/Mutations";

import { useTranslation } from 'react-i18next';



interface FormValues {
    name: string;
    price: string;
    walletValue: string;
    description: string;
    maxPurchaseNum: string;
    reward: string;
    receiveDaysOverdue: string;
}
const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    walletValue: yup.string().required("required"),
});


export default function CreateDepositModal() {
    const { t } = useTranslation();
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [rewardToggle, setRewardToggle] = useState(false);
    const handleRewardToggleChange = (event: any) => {
        setRewardToggle(event.target.checked);
    };

    //========================== INITIAL VALUES ==========================
    const [initialValues, setInitialValues] = useState<FormValues>({
        name: "",
        price: "",
        walletValue: "",
        description: "",
        maxPurchaseNum: "",
        reward: "",
        receiveDaysOverdue: "",
    });

    // ========================== STATES AND HANDLERS ==========================
    var btnTitle = t("create"), confirmTitle = t("confirm");

    const [modal, setModal] = useState(false); //open or close modal
    const toggleModal = () => {
        setModal(!modal);
    };

    // 0 = standing, 1 = limited
    const [typeId, setTypeId] = useState(0);
    const handleTypeIdChange = (event: any) => {
        setTypeId(event.target.value);
    };

    const [startAtDate, setStartAtDate] = useState('');
    function handleStartAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setStartAtDate(event.target.value);
    }

    const [endAtDate, setEndAtDate] = useState('');
    function handleEndAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEndAtDate(event.target.value);
    }


    //========================== GRAPHQL ==========================
    const [ApolloCreateDepositItem, { loading, error, data }] = useMutation(CreateDepositItem);
    useEffect(() => {
        if (data) {
            window.location.reload();
        }
    }, [data]);


    // ========================== FUNCTIONS ==========================
    const handleFormSubmit = (values: FormValues) => {
        console.log("create deposit item started");
        const startAtDateObj = new Date(startAtDate);
        const endAtDateObj = new Date(endAtDate);

        let startAtUnix = startAtDateObj.getTime() / 1000;
        let endAtUnix = endAtDateObj.getTime() / 1000;
        let nowUnix = Math.floor(Date.now() / 1000);

        const variables: any = {
            type: typeId === 0 ? "standing" : "limited",
            name: values.name,
            price: parseInt(values.price),
            walletValue: parseInt(values.walletValue),
        };

        if (values.description !== "") {
            variables.description = values.description;
        }
        if (values.maxPurchaseNum !== "") {
            variables.maxPurchaseNum = parseInt(values.maxPurchaseNum);
        }
        if (rewardToggle) {
            variables.reward = {
                amount: parseInt(values.reward),
                receiveDaysOverdue: parseInt(values.receiveDaysOverdue)
            };
        }


        //check if startAtUnix is filled
        if (isNaN(startAtUnix)) {
            startAtUnix = nowUnix;
        }
        //insert startAtUnix to variables
        variables.startAt = startAtUnix;
        //insert endAtUnix to variables if it is selected
        if (!isNaN(endAtUnix)) {
            variables.endAt = endAtUnix;
        }
        if (values.description !== '') {
            variables.description = values.description;
        }

        // console.log(variables);
        if (endAtUnix < startAtUnix) {
            alert("End date must be greater than start date");
            return;
        }
        console.log(variables);
        ApolloCreateDepositItem({ variables });
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
                    <Box className="modal-content"
                        sx={{
                            backgroundColor: colors.primary[500],
                        }}>
                        <Box m="20px">
                            <Typography variant="h2" sx={{ mb: "25px", textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: colors.grey[200] }}>
                                {btnTitle} {t('deposit_item')}
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
                                        <Box >
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
                                                    <InputLabel id="demo-simple-select-label" >{typeId === 0 ? "standing" : "limited"}</InputLabel>
                                                    <Select
                                                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={typeId}
                                                        label={t('recharge_type')}
                                                        onChange={handleTypeIdChange}
                                                    >
                                                        <MenuItem value={0}>{t('standing')}</MenuItem>
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
                                                value={values.description}
                                                name="description"
                                                error={!!touched.description && !!errors.description}
                                                helperText={touched.description && errors.description}
                                                sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />


                                            <Box display={"flex"} justifyContent={"space-between"} >
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="number"
                                                    label={t('wallet_value')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.walletValue}
                                                    name="walletValue"
                                                    required // add the required prop
                                                    error={!!touched.walletValue && !!errors.walletValue}
                                                    helperText={touched.walletValue && errors.walletValue}
                                                    sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="number"
                                                    label={t('price')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.price}
                                                    name="price"
                                                    required // add the required prop
                                                    error={!!touched.price && !!errors.price}
                                                    helperText={touched.price && errors.price}
                                                    sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="number"
                                                    label={t('max_purchase_number')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.maxPurchaseNum}
                                                    name="maxPurchaseNum"
                                                    required // add the required prop
                                                    error={!!touched.maxPurchaseNum && !!errors.maxPurchaseNum}
                                                    helperText={touched.maxPurchaseNum && errors.maxPurchaseNum}
                                                    sx={{ margin: "0rem 0 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />

                                            </Box>
                                            <Box display={typeId === 1 ? "flex" : "none"}>
                                                <TextField
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
                                            {/* rewards */}
                                            <Box>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={rewardToggle}
                                                            onChange={handleRewardToggleChange}
                                                            name="rewardToggle"
                                                            color="success"
                                                        />
                                                    }
                                                    label={t('bonus_reward')}
                                                    style={{ color: colors.grey[100] }}
                                                />
                                            </Box>
                                            <Box display={rewardToggle ? "block" : "none"}>
                                                <Box display={"flex"} >
                                                    <TextField
                                                        fullWidth
                                                        variant="filled"
                                                        type="number"
                                                        label={t('bonus_reward')}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.reward}
                                                        name="reward"
                                                        error={!!touched.reward && !!errors.reward}
                                                        helperText={touched.reward && errors.reward}
                                                        sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        variant="filled"
                                                        type="number"
                                                        label={t('receive_days_overdue')}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.receiveDaysOverdue}
                                                        name="receiveDaysOverdue"
                                                        error={!!touched.receiveDaysOverdue && !!errors.receiveDaysOverdue}
                                                        helperText={touched.receiveDaysOverdue && errors.receiveDaysOverdue}
                                                        sx={{ margin: "0rem 0 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                    />
                                                </Box>
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
