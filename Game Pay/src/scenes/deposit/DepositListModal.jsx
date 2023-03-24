import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Checkbox, FilledInput, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { useQuery, useLazyQuery } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { GetDepositItem, UpdateDepositItem, RemoveDepositItem, } from "../../graphQL/Queries";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { getImgURL, replaceNullWithEmptyString, unixTimestampToDatetimeLocal } from "../../utils/Utils";
import { useTranslation } from 'react-i18next';

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d_!@#]{6,}$/;

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
});


export default function DepositListModal({ props }) {
    const { t } = useTranslation();





    const [rewardToggle, setRewardToggle] = useState(false);
    const handleRewardToggleChange = (event) => {
        setRewardToggle(event.target.checked);
    };

    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const [purchaseRecords, setPurchaseRecords] = useState([]);
    useEffect(() => {
        console.log(purchaseRecords);
    }, [purchaseRecords]);

    const [typeId, setTypeId] = useState(0);
    const handleTypeIdChange = (event) => {
        setTypeId(event.target.value);
    };

    //========================== INITIAL VALUES ==========================
    const [initialValues, setInitialValues] = useState({
        id: -1,
        type: "",
        name: "",
        price: "",
        walletValue: "",
        description: "",
        createdAt: "",
        startAt: "",
        endAt: "",
        maxPurchaseNum: "",
        reward: 0,
        receiveDaysOverdue: 0,
    });

    // ========================== STATES AND HANDLERS ==========================
    var btnTitle = t("view"), modalTitle = t("details"), confirmTitle = t("update"), deleteTitle = t("delete"), banTitle = t("ban"), unbanTitle = t("unban");

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

    const [status, setStatus] = useState('disable');
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };


    //========================== GRAPHQL ==========================

    // ============ UPDATE BRAND ============
    const [ApolloUpdateDepositItem, { loading: loadingUpdate, error: errorUpdate, data: dataUpdate }] = useLazyQuery(UpdateDepositItem);
    // ============ REMOVE BRAND ============
    const [ApolloRemoveDepositItem, { loading: loadingRemove, error: errorRemove, data: dataRemove }] = useLazyQuery(RemoveDepositItem);
    const handleDelete = (e) => {
        var result = window.confirm("Are you sure you want to delete this item?");
        if (result) {
            ApolloRemoveDepositItem({
                variables: {
                    args: [
                        {
                            id: props.id
                        }
                    ]
                }
            })
        }
    };
    useEffect(() => {
        if (dataUpdate) {
            window.location.reload();
        }
        if (dataRemove) {
            window.location.reload();
        }
    }, [dataUpdate, dataRemove]);

    const handleFormSubmit = (values) => {
        const variables = {
            args: [
                {
                    id: props.id
                }
            ],
            name: values.name,
            description: values.description,
            statusId: status,
        };
        console.log(variables);
        ApolloUpdateDepositItem({ variables });
    };

    // INITIAL VALUES FROM GET BRAND QUERY
    const { loading: loadingInit, error: errorInit, data: dataInit } = useQuery(GetDepositItem
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
        if (dataInit) {
            const nonNullData = replaceNullWithEmptyString(dataInit.getDepositItem[0]);
            // console.log(nonNullData);
            setInitialValues({
                id: nonNullData.id,
                type: nonNullData.type,
                name: nonNullData.name,
                price: nonNullData.price,
                walletValue: nonNullData.walletValue,
                description: nonNullData.description,
                reward: nonNullData.reward !== "" ? nonNullData.reward.content.amount : "",
                receiveDaysOverdue: nonNullData.reward !== "" ? nonNullData.reward.receiveDaysOverdue : "",
                createdAt: nonNullData.createdAt,
                startAt: nonNullData.startAt,
                endAt: nonNullData.endAt,
                maxPurchaseNum: nonNullData.maxPurchaseNum,
            });

            // console.log(nonNullData.id)
            // console.log(nonNullData.purchaseRecords)
            setPurchaseRecords(dataInit.getDepositItem[0].purchaseRecords);

            setTypeId(nonNullData.type === "standing" ? 0 : 1);
            setStatus(nonNullData.status);
            setRewardToggle(nonNullData.reward !== "");

            const startAtDateTimeLocal = unixTimestampToDatetimeLocal(nonNullData.startAt);
            setStartAtDate(startAtDateTimeLocal);

            if (nonNullData.endAt !== "") {
                const endAtDateTimeLocal = unixTimestampToDatetimeLocal(nonNullData.endAt);
                setEndAtDate(endAtDateTimeLocal);
            }

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
                                            <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: colors.grey[200] }}>
                                                {modalTitle}
                                            </Typography>

                                            <Box textAlign="center" display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                                {(() => {
                                                    if (status === "disable") {
                                                        return (
                                                            <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                                                {t("disable")}
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
                                                <TextField className="modal_input_textfield"
                                                    disabled={true}
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('deposit_type')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.type}
                                                    name="type"
                                                    required // add the required prop
                                                    error={!!touched.type && !!errors.type}
                                                    helperText={touched.type && errors.type}
                                                    sx={{ marginBottom: "1rem", mr: '1rem', backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />

                                                <FormControl sx={{ minWidth: 150 }} >
                                                    <InputLabel id="demo-simple-select-label" >{status}</InputLabel>
                                                    <Select
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
                                                    disabled={true}
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
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
                                                    disabled={true}
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
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
                                                    disabled={true}
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
                                                    disabled={true}
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
                                                    disabled={true}
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
                                            {/* rewards */}
                                            <Box display={"flex"}>
                                                <FormControlLabel
                                                    disabled={true}
                                                    control={
                                                        <Checkbox
                                                            checked={rewardToggle}
                                                            onChange={handleRewardToggleChange}
                                                            name="rewardToggle"
                                                            color="success"
                                                        />
                                                    }
                                                    label={t('bonus_reward')}
                                                    sx={{ color: colors.grey[100] }}
                                                    style={{ textAlign: "left" }}
                                                />
                                            </Box>


                                            <Box display={rewardToggle ? "block" : "none"}>
                                                <Box display={"flex"} >
                                                    <TextField
                                                        disabled={true}
                                                        fullWidth
                                                        variant="filled"
                                                        type="number"
                                                        label={t('bonus_reward')}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.reward}
                                                        name="reward"
                                                        error={!!touched.principalPhone && !!errors.principalPhone}
                                                        helperText={touched.principalPhone && errors.principalPhone}
                                                        sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                    />
                                                    <TextField
                                                        disabled={true}
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
                                            <Button onClick={handleDelete} id={values.id} variant="contained" sx={{
                                                backgroundColor: colors.primary[400], minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #fff",
                                                ':hover': {
                                                    bgcolor: colors.grey[300],
                                                    border: '1px solid' + colors.primary[800],
                                                    color: "white"
                                                }
                                            }}>
                                                <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: colors.primary[100] }}>
                                                    {deleteTitle}
                                                </Typography>
                                            </Button>


                                            <Button type="submit" color="success" sx={{
                                                minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", background: colors.grey[100],
                                                ':hover': {
                                                    bgcolor: colors.grey[300],
                                                    border: '1px solid' + colors.grey[800],
                                                }
                                            }}>
                                                <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: colors.grey[800] }}>
                                                    {confirmTitle}
                                                </Typography>
                                            </Button>
                                        </Box>
                                    </form>
                                )}
                            </Formik>
                            <Box mt={"2rem"}>
                                <Box>
                                    <Typography variant="h4" sx={{ textAlign: "center", mb: "1rem", fontWeight: "600", color: colors.grey[200] }}>
                                        {t('deposit_history')}
                                    </Typography>
                                </Box>
                                <Box
                                    backgroundColor={colors.primary[400]}
                                    borderRadius="8px"
                                    height={"100%"}
                                    overflow={"auto"}
                                >
                                    {/* MAP DATA */}
                                    {purchaseRecords.map((item, i) => (
                                        <Box
                                            key={`${item.id}-${i}`}
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            borderBottom={i === purchaseRecords.length - 1 ? "none" : `3px solid ${colors.primary[500]}`}
                                            p="10px"
                                        >
                                            <Box width={"10%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.id}</Box>
                                            <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{unixTimestampToDatetimeLocal(item.createdAt)}</Box>
                                            <Box width={"40%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.purchaseId}</Box>
                                            <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>{item.status}</Box>
                                        </Box>
                                    ))}
                                </Box>

                            </Box>
                        </Box >
                    </Box>
                </Box>
            )
            }
        </>
    );
}
