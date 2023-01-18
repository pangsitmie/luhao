import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
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


const checkoutSchema = yup.object().shape({
    url: yup.string().required("required"),
});



export default function AdsListModal({ props }) {
    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    var btnTitle = "修改", confirmTitle = "更新", deleteTitle = "移除", banTitle = "封鎖", unbanTitle = "解封";
    const [modal, setModal] = useState(false); //open or close modal


    // ========================== STATES AND HANDLERS ==========================
    const [initialValues, setInitialValues] = useState({
        image: "",
        url: "https://",
        description: "",
        // status is handled in state
        type: "",
    });

    const [status, setStatus] = useState('disable');
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };
    const [startAtDate, setStartAtDate] = useState('');
    function handleStartAtDateChange(event) {
        setStartAtDate(event.target.value);
    }

    const [endAtDate, setEndAtDate] = useState('');
    function handleEndAtDateChange(event) {
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
            setInitialValues({
                url: nonNullData.url,
                description: nonNullData.description,
                type: nonNullData.type.name,
            });

            const startAtDateTimeLocal = unixTimestampToDatetimeLocal(nonNullData.startAt);
            setStartAtDate(startAtDateTimeLocal);

            if (nonNullData.endAt !== "") {
                console.log(nonNullData.endAt);
                const endAtDateTimeLocal = unixTimestampToDatetimeLocal(nonNullData.endAt);
                setEndAtDate(endAtDateTimeLocal);
                // console.log(endAtDate);
            }

            console.log(nonNullData.url + ", " + endAtDate);

            if (nonNullData.image !== null || (nonNullData.image !== "null" || nonNullData.image !== "")) {
                setImageFileName(nonNullData.image);
            }

            if (nonNullData.status.name !== "banned") {
                setStatus(nonNullData.status.name)
            }
        }
    }, [data]);

    // REMOVE STORE MUTATION
    const [ApolloRemoveAds, { loading: loading1, error: error1, data: data1 }] = useLazyQuery(RemoveAds);
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
    const [ApolloUnBanAds, { loading: loading2, error: error2, data: data2 }] = useLazyQuery(UnbanAds);
    useEffect(() => {
        if (data2) {
            window.location.reload();
        }
    }, [data2]);

    const handleUnBan = (e) => {
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
    }, [data3]);

    const [imageFileName, setImageFileName] = useState(default_ads_image_900x360_filename);
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
        if (initialValues.status !== "banned") {
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
                                            <Box display={"flex"} m={"1rem 0"}>
                                                <Box width={"35%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography variant="h2" sx={{ textAlign: "left", fontSize: "1.8rem", fontWeight: "600", color: colors.grey[200], lineHeight: "1.5" }}>
                                                        修改廣告
                                                    </Typography>
                                                    <Typography variant="h5" sx={{ mt: ".5rem", textAlign: "left", fontSize: ".9rem", fontWeight: "600", color: colors.grey[200], lineHeight: "1.5" }}>
                                                        {values.type === "banner" ? "系統橫幅" : "系統插入"}
                                                    </Typography>
                                                </Box>
                                                <Box width={"65%"}>
                                                    {/* UPLOAD COVER COMPONENET */}
                                                    <CoverUpload handleSuccess={handleUploadImageSucess} imagePlaceHolder={getImgURL(imageFileName, "ads")} type={values.type} />
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
                                                    <InputLabel id="demo-simple-select-label" >{initialValues.status}</InputLabel>
                                                    <Select
                                                        disabled={initialValues.status === "banned"}
                                                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={status}
                                                        label="status"
                                                        onChange={handleStatusChange}
                                                    >
                                                        <MenuItem value={"normal"}>正常</MenuItem>
                                                        <MenuItem value={"disable"}>停用</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
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
                                                sx={{ marginBottom: "1rem", marginRight: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
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
                                                // defaultValue=""
                                                value={endAtDate}
                                                onChange={handleEndAtDateChange}
                                                sx={{ marginBottom: "1rem" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Box>
                                        <Box display="flex" justifyContent="center" >
                                            <Box display="flex" justifyContent="center" >
                                                <Button onClick={handleDelete} variant="contained" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #ff2f00" }}>
                                                    <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                                                        {deleteTitle}
                                                    </Typography>
                                                </Button>

                                                {values.status === "banned" ? (
                                                    <Button onClick={handleUnBan} id={values.id} variant="contained" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #fff" }}>
                                                        <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                                                            {unbanTitle}
                                                        </Typography>
                                                    </Button>
                                                ) : (
                                                    <ConfirmModal props={{ type: "ads", id: props.id }} />
                                                )}

                                                <Button type="submit" color="success" variant="contained" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", background: colors.grey[100] }}>
                                                    <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: colors.grey[700] }}>
                                                        {confirmTitle}
                                                    </Typography>
                                                </Button>
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
