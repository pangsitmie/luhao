import { useState, useEffect } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { useLazyQuery, useQuery } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { replaceNullWithEmptyString } from "../../utils/Utils";
import { useTranslation } from 'react-i18next';
import { GetGiftCode, RemoveGiftCode, UpdateGiftCode } from "../../graphQL/Queries";
import { format } from 'date-fns';
import { toast } from "react-toastify";
import { GiftCodeType } from "../../types/GiftCode";



type Props = {
    props: GiftCodeType
    onUpdate: () => void
}

interface FormValues {
    name: string;
    code: string;
    description: string;
    coinAmount: string;
    limit: string;
    receiveDaysOverdue: string;
    startAt: string;
    endAt: string;
}
const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    code: yup.string().required("required"),
    coinAmount: yup.number().required("required"),
});


export default function GiftCodeListModal({ props, onUpdate }: Props) {

    const { t } = useTranslation();
    //THEME
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //========================== INITIAL VALUES ==========================
    const [initialValues, setInitialValues] = useState<FormValues>({
        name: "",
        code: "",
        description: "",
        coinAmount: "",
        limit: "",
        receiveDaysOverdue: "",
        startAt: "",
        endAt: "",
    });



    useEffect(() => {
        console.log("INITIAL VALUES CHANGE");
        console.log(initialValues);
    }, [initialValues]);


    // ========================== STATES AND HANDLERS ==========================
    var btnTitle = t("view"), confirmTitle = t("confirm"), deleteTitle = t("delete");

    const [modal, setModal] = useState(false); //open or close modal
    const toggleModal = () => {
        setModal(!modal);
    };

    const [status, setStatus] = useState('disable');
    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        setStatus(event.target.value);
    };



    // INITIAL VALUES FROM GET BRAND QUERY
    const { data: dataInit } = useQuery(GetGiftCode
        , {
            variables: {
                args: [
                    {
                        id: props.id
                    }
                ],
            },
            skip: !modal, // Skip the query when modal is closed
        }
    );
    useEffect(() => {
        if (dataInit) {
            const nonNullData = replaceNullWithEmptyString(dataInit.getGiftCode[0]);
            console.log(nonNullData);
            console.log(nonNullData.reward.receiveDaysOverdue.length === 0)

            setInitialValues({
                name: nonNullData.name,
                code: nonNullData.code,
                description: nonNullData.description,
                coinAmount: nonNullData.reward.content.amount,
                limit: nonNullData.reward.limit.length === 0 ? t("none") : nonNullData.reward.limit,
                receiveDaysOverdue: nonNullData.reward.receiveDaysOverdue ? t("none") : nonNullData.reward.receiveDaysOverdue,
                startAt: nonNullData.reward.startAt ? t("none") : format(new Date(nonNullData.reward.startAt * 1000), 'MM/dd/yyyy - HH:mm:ss'),
                endAt: nonNullData.reward.endAt.length === 0 ? t("none") : format(new Date(nonNullData.reward.endAt * 1000), 'MM/dd/yyyy - HH:mm:ss'),
            });

            setStatus(nonNullData.status);

        }
    }, [dataInit]);

    //========================== GRAPHQL ==========================
    const [ApolloUpdateGiftCode, { data }] = useLazyQuery(UpdateGiftCode);

    const [ApolloRemoveGiftCode, { data: dataRemove }] = useLazyQuery(RemoveGiftCode);

    // ========================== FUNCTIONS ==========================
    const handleFormSubmit = (values: FormValues) => {
        const variables: any = {
            args: [{
                id: props.id,
            }],
            status: status,
        };
        if (values.name) {
            variables.name = values.name;
        }
        if (values.description) {
            variables.description = values.description;
        }

        console.log(variables);
        ApolloUpdateGiftCode({ variables });
    };

    useEffect(() => {
        if (data) {
            toast.success(t("update_success"));
        }
        if (dataRemove) {
            toast.error(t("delete_success"));
        }
        onUpdate();
    }, [data, dataRemove]);



    const handleDelete = () => {
        var result = window.confirm("Are you sure you want to delete this item?");
        if (result) {
            ApolloRemoveGiftCode({
                variables: {
                    args: [
                        {
                            id: props.id
                        }
                    ]
                }
            })
            console.log("deleted");
        } else {
            console.log("not deleted");
        }
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
                            <Typography variant="h2" sx={{ mb: "10px", textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: colors.grey[200] }}>
                                {btnTitle}
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

                                                <TextField
                                                    fullWidth
                                                    disabled={true}
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
                                                <FormControl sx={{ minWidth: 150 }}>
                                                    <InputLabel id="demo-simple-select-label" >{status}</InputLabel>
                                                    <Select
                                                        disabled={status === "banned"}
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
                                                    disabled={true}
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
                                                    disabled={true}
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
                                                    disabled={true}
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
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={t('start_time')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.startAt}
                                                    name="startAt"
                                                    error={!!touched.startAt && !!errors.startAt}
                                                    helperText={touched.startAt && errors.startAt}
                                                    sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={t('end_time')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.endAt}
                                                    name="endAt"
                                                    error={!!touched.endAt && !!errors.endAt}
                                                    helperText={touched.endAt && errors.endAt}
                                                    sx={{ margin: "0rem 0rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>
                                        </Box>

                                        <Box display={"flex"} justifyContent={"center"} gap={"1rem"}>
                                            <Button onClick={handleDelete} variant="contained" sx={{
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

                                            <Box display="flex" justifyContent="center" >
                                                <button className="my-button" type="submit">{confirmTitle}</button>
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
