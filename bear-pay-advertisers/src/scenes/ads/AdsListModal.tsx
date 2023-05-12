import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { useLazyQuery, useQuery } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { GetAds, RemoveAds, UnbanAds, UpdateAds } from "../../graphQL/Queries";
import { getImgURL, replaceNullWithEmptyString, unixTimestampToDatetimeLocal } from "../../utils/Utils";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import CoverUpload from "../../components/Upload/CoverUpload";
import { default_ads_image_900x360_filename } from "../../data/strings";
import { useTranslation } from 'react-i18next';
import { AdsType } from "../../types/Ads";
import ConfirmButton from "../../components/ConfirmButton";

const checkoutSchema = yup.object().shape({
    url: yup.string().required("required"),
});


type Props = {
    props: AdsType
}

interface FormValues {
    image: string;
    url: string;
    description: string;
    type: string;
}

export default function AdsListModal({ props }: Props) {
    const { t } = useTranslation();
    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    var btnTitle = t("view"), modalTitle = t("details"), confirmTitle = t("confirm"), deleteTitle = t("delete"), unbanTitle = t("unban");

    const [modal, setModal] = useState(false); //open or close modal


    // ========================== STATES AND HANDLERS ==========================
    const [initialValues, setInitialValues] = useState<FormValues>({
        image: "",
        url: "https://",
        description: "",
        // status is handled in state
        type: "banner",
    });

    const [status, setStatus] = useState('disable');
    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        setStatus(event.target.value);
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
    const { loading, error, data } = useQuery(GetAds
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
        if (data) {
            const nonNullData = replaceNullWithEmptyString(data.getAdvertisement[0]);
            console.log("ADS LSIT MODAL")
            console.log(nonNullData);
            setInitialValues({
                image: nonNullData.image,
                url: nonNullData.url,
                description: nonNullData.description,
                type: nonNullData.type,
            });

            const startAtDateTimeLocal = unixTimestampToDatetimeLocal(nonNullData.startAt);
            setStartAtDate(startAtDateTimeLocal);

            if (nonNullData.endAt !== "") {
                const endAtDateTimeLocal = unixTimestampToDatetimeLocal(nonNullData.endAt);
                setEndAtDate(endAtDateTimeLocal);
            }

            if (nonNullData.image !== null || (nonNullData.image !== "null" || nonNullData.image !== "")) {
                setImageFileName(nonNullData.image);
            }

            if (nonNullData.status !== "banned") {
                setStatus(nonNullData.status)
            }
        }
        if (loading) {
            console.log("loading")
        }
        if (error) {
            console.log(error)
        }
    }, [data, loading, error]);

    // REMOVE STORE MUTATION
    const [ApolloRemoveAds, { data: data1 }] = useLazyQuery(RemoveAds);
    useEffect(() => {
        if (data1) {
            window.location.reload();
        }
    }, [data1]);

    const handleDelete = () => {
        var result = window.confirm("Are you sure you want to delete this advertisement?");
        if (result) {
            ApolloRemoveAds({
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


    // UNBAN MUTATION
    const [ApolloUnBanAds, { data: data2 }] = useLazyQuery(UnbanAds);
    useEffect(() => {
        if (data2) {
            window.location.reload();
        }
    }, [data2]);

    const handleUnBan = () => {
        var result = window.confirm("Are you sure you want to unban this Advertisement?");
        if (result) {
            ApolloUnBanAds({
                variables: {
                    args: [
                        {
                            id: props.id
                        }
                    ],
                    reason: "null"
                }
            })
        }
    };


    // UNBAN MUTATION
    const [ApolloUpdateAds, { loading: loading3, error: error3, data: data3 }] = useLazyQuery(UpdateAds);
    useEffect(() => {
        if (data3) {
            window.location.reload();
        }
        if (loading3) {
            console.log("loading")
        }
        if (error3) {
            console.log(error3)
        }
    }, [data3, loading3, error3]);

    const [imageFileName, setImageFileName] = useState(default_ads_image_900x360_filename);
    const handleUploadImageSucess = (name: string) => {
        setImageFileName(name);
    };

    const handleFormSubmit = (values: FormValues) => {
        const startAtDateObj = new Date(startAtDate);
        const endAtDateObj = new Date(endAtDate);

        let startAtUnix = startAtDateObj.getTime() / 1000;
        let endAtUnix = endAtDateObj.getTime() / 1000;
        let nowUnix = Math.floor(Date.now() / 1000);

        const variables: any = {
            args: [
                {
                    id: props.id,
                }
            ],
            url: values.url,
            image: imageFileName
        }
        //check if startAtUnix is filled
        if (isNaN(startAtUnix)) {
            startAtUnix = nowUnix;
        }
        //insert startAtUnix to variables
        variables.startAt = startAtUnix;
        //insert endAtUnix to variables if it is selected
        if (!isNaN(endAtUnix) && endAtUnix !== 0) {
            variables.endAt = endAtUnix;
        }
        if (values.description !== "") {
            variables.description = values.description;
        }
        if (status !== "banned") {
            variables.statusId = status;
        }
        // console.log(variables)
        if (endAtUnix < startAtUnix && !isNaN(endAtUnix)) {
            alert("結束日期必須晚於開始日期");
            return;
        }
        console.log(endAtUnix + " " + startAtUnix)
        console.log(variables);
        ApolloUpdateAds({ variables })

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
                                        <Box color={"black"}>
                                            <Box display={"flex"} m={"1rem 0"}>
                                                <Box width={"35%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography variant="h2" sx={{ textAlign: "left", fontSize: "1.8rem", fontWeight: "600", color: colors.grey[200], lineHeight: "1.5" }}>
                                                        {modalTitle}
                                                    </Typography>
                                                    <Typography variant="h5" sx={{ mt: ".5rem", textAlign: "left", fontSize: ".9rem", fontWeight: "600", color: colors.grey[200], lineHeight: "1.5" }}>
                                                        {values.type === "banner" ? `${t('banner')} - (B)` : `${t('placement')} - (P)`}
                                                    </Typography>
                                                </Box>
                                                <Box width={"65%"}>
                                                    {/* UPLOAD COVER COMPONENET */}
                                                    <CoverUpload handleSuccess={handleUploadImageSucess} imagePlaceHolder={getImgURL(imageFileName, "ads") || ''} type={'ads'} />
                                                </Box>
                                            </Box>

                                            <Box display={"flex"}>
                                                <TextField
                                                    id="outlined-multiline-flexible"
                                                    multiline
                                                    fullWidth
                                                    maxRows={4}
                                                    variant="filled"
                                                    type="text"
                                                    label="URL"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.url}
                                                    name="url"
                                                    error={!!touched.url && !!errors.url}
                                                    helperText={touched.url && errors.url}
                                                    sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <FormControl sx={{ minWidth: 150 }} >
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
                                                label={t('description')}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.description}
                                                name="description"
                                                error={!!touched.description && !!errors.description}
                                                helperText={touched.description && errors.description}
                                                sx={{ marginBottom: "1rem", marginRight: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />
                                            <TextField
                                                fullWidth
                                                id="datetime-local"
                                                label={t('start_time')}
                                                type="datetime-local"
                                                // defaultValue="2017-05-24T10:30"
                                                value={startAtDate}
                                                onChange={handleStartAtDateChange}
                                                sx={{ marginBottom: "1rem" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            <TextField
                                                fullWidth
                                                id="datetime-local"
                                                label={t('end_time')}
                                                type="datetime-local"
                                                // defaultValue=""
                                                value={endAtDate}
                                                onChange={handleEndAtDateChange}
                                                sx={{ marginBottom: "1rem" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Box>

                                        <Box display="flex" gap={"1rem"} justifyContent={"center"}>
                                            <Button onClick={handleDelete} variant="contained"
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

                                            {status === "banned" ? (
                                                <Button onClick={handleUnBan} variant="contained" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #fff" }}>
                                                    <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                                                        {unbanTitle}
                                                    </Typography>
                                                </Button>
                                            ) : (
                                                <ConfirmModal props={{ type: "ads", id: props.id }} />
                                            )}

                                            <ConfirmButton title={confirmTitle} />

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
