import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { useMutation } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { CreateAdvertisement } from "../../graphQL/Mutations";
import { getImgURL } from "../../utils/Utils";
import CoverUpload from "../../components/Upload/CoverUpload";
import { useTranslation } from 'react-i18next';
import ConfirmButton from "../../components/ConfirmButton";

const checkoutSchema = yup.object().shape({
    url: yup.string().required("required"),
});

interface FormValues {
    url: string;
    description: string;
}


export default function CreateAdsModal() {
    const { t } = useTranslation();
    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    var btnTitle = t('create'), confirmTitle = t('confirm');
    const [modal, setModal] = useState(false); //open or close modal


    // ========================== STATES AND HANDLERS ==========================
    const [typeId, setTypeId] = useState<string>('banner');
    const handleTypeIdChange = (event: SelectChangeEvent<string>) => {
        const newValue = event.target.value;
        if (newValue === 'banner' || newValue === 'placement') {
            setTypeId(newValue);
        }
    };

    const [startAtDate, setStartAtDate] = useState('');
    function handleStartAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setStartAtDate(event.target.value);
    }

    const [endAtDate, setEndAtDate] = useState('');
    function handleEndAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEndAtDate(event.target.value);
    }

    const [initialValues] = useState({
        url: "https://",
        description: "",
        startAtDate: "",
        endAtDate: "",
        status: "",
        type: "",
    });






    //========================== GRAPHQL ==========================
    const [ApolloCreateAds, { data }] = useMutation(CreateAdvertisement);
    useEffect(() => {
        if (data) {
            console.log(data);
            window.location.reload();
        }
    }, [data]);


    // IMAGE UPLOAD
    const [imageFileName, setImageFileName] = useState('');
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
            typeId: typeId,
            url: values.url,
            image: imageFileName,
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
        ApolloCreateAds({ variables });


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
                            backgroundColor: colors.primary[500]
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
                                        <Box >
                                            <Box display={"flex"} m={"1rem 0"}>
                                                <Box width={"35%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography variant="h2" sx={{ textAlign: "left", fontSize: "1.8rem", fontWeight: "600", color: colors.grey[200], lineHeight: "1.5" }}>
                                                        {t('create')}<br /> {t('ads')}
                                                    </Typography>
                                                </Box>
                                                <Box width={"65%"}>
                                                    {/* UPLOAD COVER COMPONENET */}
                                                    <CoverUpload handleSuccess={handleUploadImageSucess} imagePlaceHolder={getImgURL(imageFileName, 'ads') || ''} type={'ads'} />
                                                </Box>
                                            </Box>



                                            <Box display={"flex"} justifyContent={"space-between"}>

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
                                                    required
                                                    error={!!touched.url && !!errors.url}
                                                    helperText={touched.url && errors.url}
                                                    sx={{ margin: "0 1rem  1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <FormControl sx={{ minWidth: 150 }} >
                                                    <InputLabel id="demo-simple-select-label" >{initialValues.status}</InputLabel>
                                                    <Select
                                                        disabled={initialValues.status === "banned"}
                                                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={typeId}
                                                        label="typeId"
                                                        onChange={handleTypeIdChange}
                                                    >
                                                        <MenuItem value={"banner"}>{t('banner')}</MenuItem>
                                                        <MenuItem value={"placement"}>{t('placement')}</MenuItem>
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
                                                // defaultValue="2017-05-24T10:30"
                                                value={endAtDate}
                                                onChange={handleEndAtDateChange}
                                                sx={{ marginBottom: "1rem" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />

                                        </Box>
                                        <Box display="flex" justifyContent="center" >
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
