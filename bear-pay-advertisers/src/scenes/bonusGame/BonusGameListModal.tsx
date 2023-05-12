import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { useMutation, useQuery } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { replaceNullWithEmptyString, unixTimestampToDatetimeLocal } from "../../utils/Utils";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { STORE_GetBonusGame } from "../../graphQL/StorePrincipalQueries";
import { STORE_PatchBonusGame, STORE_PatchBonusGameStatus, STORE_UpdateBonusGame } from "../../graphQL/StorePrincipalMutation";
import { RootState } from "../../redux/store";
import { BonusGameType } from "../../types/BonusGame";
import ConfirmButton from "../../components/ConfirmButton";



type Props = {
    props: BonusGameType,
    onUpdate: () => void
}

interface FormValues {
    id: string,
    name: string,
    type: string,
    description: string,
    nowCurrencyAmount: string,
    maxCurrencyAmount: string,

}

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    description: yup.string().required("required"),
});


export default function BonusGameListModal({ props, onUpdate }: Props) {
    const { entityName } = useSelector((state: RootState) => state.entity);

    const { t } = useTranslation();
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //========================== INITIAL VALUES ==========================
    const [initialValues, setInitialValues] = useState<FormValues>({
        id: "",
        name: "",
        type: "",
        description: "",
        nowCurrencyAmount: "",
        maxCurrencyAmount: "",
    });



    // ========================== STATES AND HANDLERS ==========================
    var btnTitle = t("view"), modalTitle = t("details"), confirmTitle = t("update"), deleteTitle = t("delete");

    const [modal, setModal] = useState(false); //open or close modal
    const toggleModal = () => {
        setModal(!modal);
    };

    const [status, setStatus] = useState('disable');

    const [startAtDate, setStartAtDate] = useState<string>('');
    function handleStartAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setStartAtDate(event.target.value);
    }

    const [endAtDate, setEndAtDate] = useState<string>('');
    function handleEndAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEndAtDate(event.target.value);
    }


    // INITIAL VALUES FROM GET BRAND QUERY
    const { data: dataInit, refetch } = useQuery(STORE_GetBonusGame
        , {
            variables: {
                bonusGameId: props.id
            },
            skip: !modal, // Skip the query when modal is closed
        }
    );

    useEffect(() => {
        if (dataInit) {
            const nonNullData = replaceNullWithEmptyString(dataInit.getBonusGameForStorePrincipal);
            console.log(nonNullData);

            setInitialValues({
                id: nonNullData.id,
                name: nonNullData.name,
                description: nonNullData.description,
                type: nonNullData.type,
                nowCurrencyAmount: nonNullData.nowCurrencyAmount,
                maxCurrencyAmount: nonNullData.maxCurrencyAmount,
            });

            setStatus(nonNullData.status);
            const startAtDateTimeLocal = unixTimestampToDatetimeLocal(nonNullData.startAt);
            setStartAtDate(startAtDateTimeLocal);

            if (nonNullData.endAt !== "") {
                const endAtDateTimeLocal = unixTimestampToDatetimeLocal(nonNullData.endAt);
                setEndAtDate(endAtDateTimeLocal);
            }
        }
    }, [dataInit]);


    //========================== GRAPHQL ==========================
    const [ApolloPatchBonusGame, { data: dataPatch }] = useMutation(STORE_PatchBonusGame);
    const [ApolloUpdateBonusGame, { data: dataUpdate }] = useMutation(STORE_UpdateBonusGame);

    const [ApolloPatchBonusGameStatus, { data: dataStatus }] = useMutation(STORE_PatchBonusGameStatus);
    useEffect(() => {
        if (dataStatus) {
            onUpdate();
            refetch();
            toast.success(t("status_changed"));
        }
    }, [dataStatus]);

    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        console.log(event.target.value)
        setStatus(event.target.value);
        ApolloPatchBonusGameStatus({
            variables: {
                bonusGameIds: props.id,
                status: event.target.value
            }
        });
    };

    // ========================== FUNCTIONS ==========================
    const handleFormSubmit = (values: FormValues) => {
        const startAtDateObj = new Date(startAtDate);
        const endAtDateObj = new Date(endAtDate);

        let startAtUnix = startAtDateObj.getTime() / 1000;
        let endAtUnix = endAtDateObj.getTime() / 1000;

        let nowUnix = Math.floor(Date.now() / 1000);

        let variables: any = {
            bonusGameId: props.id,
            storeId: props.storeId,
            typeId: "roulette2",
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
        console.log("UPDATE BONUS GAME");
        console.log(variables);
        ApolloUpdateBonusGame({ variables });

        // ============= PATCH BONUS GAME =============
        variables = {
            bonusGameId: props.id,
            name: values.name,
            description: values.description,
        }

        console.log("PATCH BONUS GAME");
        console.log(variables);
        ApolloPatchBonusGame({ variables })
    };

    useEffect(() => {
        if (dataUpdate) {
            toast.success(t("review_sent"));
        }
        if (dataPatch) {
            toast.success(t("update_success"));
        }
        onUpdate();
        refetch();
    }, [dataUpdate, dataPatch]);



    const handleDelete = () => {
        // var result = window.confirm("Are you sure you want to delete this item?");
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
                            <Typography variant="h2" sx={{ mb: "10px", fontSize: "2rem", fontWeight: "600", color: "white" }}>
                                {modalTitle}
                            </Typography>
                            <Box textAlign="center" mb={"1rem"} >
                                {(() => {
                                    if (status === "disable") {
                                        return (
                                            <Typography variant="h5" color={colors.primary[100]} >
                                                {t('disable')}
                                            </Typography>)
                                    }
                                    if (status === "banned") {
                                        return (
                                            <Typography variant="h5" color={colors.redAccent[500]}>
                                                {t('banned')}
                                            </Typography>)
                                    }
                                    else {
                                        return (
                                            <Typography variant="h5" color={colors.greenAccent[500]}>
                                                {t('normal')}
                                            </Typography>)
                                    }
                                })()}
                            </Box>

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
                                            <Box display={"flex"} justifyContent={"space-between"} gap={"1rem"}>
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
                                                    sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                                <FormControl sx={{ minWidth: 150 }} >
                                                    <InputLabel id="demo-simple-select-label" >{status}</InputLabel>
                                                    <Select
                                                        disabled={status === "banned" || entityName === "company" || entityName === "brand"}
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
                                                sx={{ margin: "0rem 0 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />

                                            <Box display={"flex"} justifyContent={"space-between"} gap={"1rem"}>

                                                <TextField
                                                    disabled={true}
                                                    id="outlined-multiline-flexible"
                                                    multiline
                                                    fullWidth
                                                    maxRows={4}
                                                    variant="filled"
                                                    type="number"
                                                    required // add the required prop
                                                    label={t('now_currency_amount')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.nowCurrencyAmount}
                                                    name="nowCurrencyAmount"
                                                    error={!!touched.nowCurrencyAmount && !!errors.nowCurrencyAmount}
                                                    helperText={touched.nowCurrencyAmount && errors.nowCurrencyAmount}
                                                    sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    disabled={true}
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
                                        </Box>

                                        <Box display={"flex"} justifyContent={"center"} gap={"1rem"}>
                                            <Button onClick={handleDelete} id={values.id} variant="contained"
                                                sx={{
                                                    backgroundColor: colors.primary[400],
                                                    minWidth: "100px",
                                                    padding: ".5rem 1.5rem",
                                                    borderRadius: "10px",
                                                    color: colors.primary[100],
                                                    ':hover': {
                                                        bgcolor: colors.redAccent[400],
                                                        color: "#fff",
                                                        transition: "all .5s ease",
                                                    }
                                                }}>
                                                <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem" }}>
                                                    {deleteTitle}
                                                </Typography>
                                            </Button>

                                            <Box display="flex" justifyContent="center" >
                                                <ConfirmButton title={confirmTitle} />
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
    );
}
