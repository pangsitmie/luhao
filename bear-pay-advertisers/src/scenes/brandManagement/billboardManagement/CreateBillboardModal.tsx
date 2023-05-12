import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../../../theme";
import { useLazyQuery } from "@apollo/client";


import { useTranslation } from 'react-i18next';
import BrandType from "../../../types/Brand";
import { CreateBillboard } from "../../../graphQL/Queries";
import LogoUpload from "../../../components/Upload/LogoUpload";
import { getImgURL } from "../../../utils/Utils";
import "../../../components/Modal/modal.css";
import ConfirmButton from "../../../components/ConfirmButton";


type Props = {
    props: BrandType;
}

interface FormValues {
    title: string;
    content: string;
    description: string | null;
    image: string;
    startAt?: number;
    endAt?: number;
    status?: string;
}

const checkoutSchema = yup.object().shape({
    title: yup.string().required("必填"),
    content: yup.string().required("必填"),
});


export default function CreateBillboardModal({ props }: Props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [modal, setModal] = useState(false);
    const { t } = useTranslation();

    const [startAtDate, setStartAtDate] = useState('');
    function handleStartAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setStartAtDate(event.target.value);
    }

    const [endAtDate, setEndAtDate] = useState('');
    function handleEndAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEndAtDate(event.target.value);
    }

    var btnTitle = t("create"), confirmTitle = t("create");

    const [initialValues] = useState<FormValues>({
        title: "",
        content: "",
        description: "",
        image: "",
    });

    // GQL
    const [ApolloCreateBillboard, { data }] = useLazyQuery(CreateBillboard);
    useEffect(() => {
        if (data) {
            console.log(data.getBrand);
            window.location.reload();
        }
        else {
            console.log("NO DATA")
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
            args: [
                {
                    id: props.id
                }
            ],
            title: values.title,
            content: values.content,
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
        ApolloCreateBillboard({ variables });
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
                                            {/* IMAGE */}

                                            <Box display={"flex"} m={"1rem 0"}>
                                                <Box width={"35%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography variant="h2" sx={{ textAlign: "left", fontSize: "2rem", fontWeight: "600", color: colors.grey[200], lineHeight: "1.5" }}>
                                                        {t('create')}
                                                        <br />
                                                        {t('billboard')}
                                                    </Typography>
                                                </Box>
                                                <Box width={"65%"} display={"flex"} justifyContent={"flex-end"} >
                                                    {/* UPLOAD COVER COMPONENET */}
                                                    <LogoUpload handleSuccess={handleUploadImageSucess} imagePlaceHolder={getImgURL(imageFileName, "billboard") || ''} type={"billboard"} />
                                                </Box>
                                            </Box>

                                            <TextField className="modal_input_textfield"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label={t('title')}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.title}
                                                name="title"
                                                error={!!touched.title && !!errors.title}
                                                helperText={touched.title && errors.title}
                                                sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                            />
                                            <TextField className="modal_input_textfield"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label={t('content')}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.content}
                                                name="content"
                                                error={!!touched.content && !!errors.content}
                                                helperText={touched.content && errors.content}
                                                sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
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
                                                sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
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
    )
}
