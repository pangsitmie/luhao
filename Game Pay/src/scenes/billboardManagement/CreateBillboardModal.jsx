import React, { useState, useEffect, useRef } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { useLazyQuery } from "@apollo/client";
import { CreateBillboard } from "../../graphQL/Queries";
import { default_billboard_image_600x600_filename } from "../../data/strings";
import LogoUpload from "../../components/Upload/LogoUpload";
import { getImgURL } from "../../utils/Utils";

const checkoutSchema = yup.object().shape({
    // storeId: yup.string().required("店面id必填"),
    title: yup.string().required("必填"),
    content: yup.string().required("必填"),
});


export default function CreateBillboardModal({ props }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [modal, setModal] = useState(false);
    const [startAtDate, setStartAtDate] = useState('');
    const [endAtDate, setEndAtDate] = useState('');

    function handleStartAtDateChange(event) {
        setStartAtDate(event.target.value);
    }

    function handleEndAtDateChange(event) {
        setEndAtDate(event.target.value);
    }

    var btnTitle = "新增告示牌", confirmTitle = "新增", cancelTitle = "取消";

    const initialValues = {
        title: "",
        content: "",
        description: "",
    };

    // GQL
    const [ApolloCreateBillboard, { loading, error, data }] = useLazyQuery(CreateBillboard);
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
    const [imageFileName, setImageFileName] = useState(default_billboard_image_600x600_filename);
    const handleUploadImageSucess = (name) => {
        setImageFileName(name);
    };

    const handleFormSubmit = (values) => {
        const startAtDateObj = new Date(startAtDate);
        const endAtDateObj = new Date(endAtDate);

        let startAtUnix = startAtDateObj.getTime() / 1000;
        let endAtUnix = endAtDateObj.getTime() / 1000;
        let nowUnix = Math.floor(Date.now() / 1000);


        const variables = {
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
                                        <Box color={"black"}>
                                            {/* IMAGE */}

                                            <Box display={"flex"} m={"1rem 0"}>
                                                <Box width={"35%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography variant="h2" sx={{ textAlign: "left", fontSize: "2rem", fontWeight: "600", color: colors.grey[200], lineHeight: "1.5" }}>
                                                        新增
                                                        <br />
                                                        告示牌
                                                    </Typography>
                                                </Box>
                                                <Box width={"65%"} display={"flex"} justifyContent={"flex-end"} >
                                                    {/* UPLOAD COVER COMPONENET */}
                                                    <LogoUpload handleSuccess={handleUploadImageSucess} imagePlaceHolder={getImgURL(imageFileName, "billboard")} type={"billboard"} />
                                                </Box>
                                            </Box>

                                            <TextField className="modal_input_textfield"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="標題"
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
                                                label="內容"
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
                                                label="描述"
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
                                                label="開始時間"
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
                                                label="結束時間"
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
    )
}
