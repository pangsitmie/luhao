import React, { useState, useEffect, useRef } from "react";
import { Box, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { useQuery, useLazyQuery } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { GetBrand, UpdateBrand, RemoveBrand, UnbanBrand, GetAllBrands, } from "../../graphQL/Queries";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { getImgURL, replaceNullWithEmptyString } from "../../utils/Utils";
import LogoUpload from "../../components/Upload/LogoUpload";
import CoverUpload from "../../components/Upload/CoverUpload";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d_!@#]{6,}$/;

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    // intro: yup.string().required("required"),
    principalName: yup.string().required("required"),
    principalLineUrl: yup.string().required("required"),
    principalPassword: yup.string().matches(passwordRegex, "must contain at least one letter and one number, and be at least six characters long"),
    principalLineUrl: yup.string().required("required"),
    vatNumber: yup.string().required("required"),
    brandCoinName: yup.string().required("required"),
});


export default function RechargeListModal({ props }) {
    const { entityName } = useSelector((state) => state.entity);
    const { t } = useTranslation();


    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [typeId, setTypeId] = useState(0);
    const handleTypeIdChange = (event) => {
        setTypeId(event.target.value);
    };

    //========================== INITIAL VALUES ==========================
    const [initialValues, setInitialValues] = useState({
        id: -1,
        status: "",
        statusDesc: "",
        name: "",
        intro: "",
        principalName: "",
        principaPhone: "",
        principalPassword: "",
        principalLineUrl: "",
        principalEmail: "",
        vatNumber: "",
        brandCoinName: "",
    });

    // ========================== STATES AND HANDLERS ==========================
    var btnTitle = t("view"), modalTitle = t("details"), confirmTitle = t("confirm"), deleteTitle = t("delete"), banTitle = t("ban"), unbanTitle = t("unban");

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

    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const [items, setItems] = useState([]);
    const { loading, error, data } = useQuery(GetAllBrands, {
        variables: { limit, offset }
    });
    useEffect(() => {
        if (data) {
            setItems(data.managerGetBrands); //datas for display
        }
    }, [data, offset]);

    //========================== GRAPHQL ==========================

    // ============ UPDATE BRAND ============
    const [ApolloUpdateBrand, { loading: loadingUpdate, error: errorUpdate, data: dataUpdate }] = useLazyQuery(UpdateBrand);
    // ============ REMOVE BRAND ============
    const [ApolloRemoveBrand, { loading: loadingRemove, error: errorRemove, data: dataRemove }] = useLazyQuery(RemoveBrand);
    const handleDelete = (e) => {
        var result = window.confirm("Are you sure you want to delete this brand?");
        if (result) {
            ApolloRemoveBrand({
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
    // ============ UNBAN BRAND ============
    const [ApolloUnBanMachine, { loading: loadingUnBan, error: errorUnBan, data: dataUnBan }] = useLazyQuery(UnbanBrand);
    const handleUnBan = (e) => {
        var result = window.confirm("Are you sure you want to unban this machine?");
        if (result) {
            ApolloUnBanMachine({
                variables: {
                    args: [
                        {
                            id: props.id
                        }
                    ],
                }
            })
        }
    }

    useEffect(() => {
        if (dataUpdate) {
            window.location.reload();
        }
        if (dataRemove) {
            window.location.reload();
        }
        if (dataUnBan) {
            window.location.reload();
        }
    }, [dataUpdate, dataRemove, dataUnBan]);

    const handleFormSubmit = (values) => {
        const variables = {
            args: [
                {
                    id: values.id
                }
            ],
            name: values.name,
            vatNumber: values.vatNumber,
            logo: logoFileName,
            cover: coverFileName,
            principal: {
                name: values.principalName,
                lineUrl: values.principalLineUrl,
            },
            currencyName: values.brandCoinName,
        };
        if (values.intro !== "") {
            variables.intro = values.intro;
        }
        if (values.principalEmail !== "") {
            variables.principal.email = values.principalEmail;
        }
        if (values.principalPassword !== "") {
            variables.principal.password = values.principalPassword;
        }
        if (initialValues.status !== "banned") {
            variables.statusId = status;
        }

        ApolloUpdateBrand({ variables });
    };

    // INITIAL VALUES FROM GET BRAND QUERY
    const { loading: loadingInit, error: errorInit, data: dataInit } = useQuery(GetBrand
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
            const nonNullData = replaceNullWithEmptyString(dataInit.getBrand[0]);

            setInitialValues({
                id: props.id,
                status: nonNullData.status.name,
                name: nonNullData.name,
                vatNumber: nonNullData.vatNumber,
                intro: nonNullData.intro,
                principalName: nonNullData.principal.name,
                principaPhone: nonNullData.principal.phone.number,
                principalLineUrl: nonNullData.principal.lineUrl,
                principalEmail: nonNullData.principal.email,
                //password doesnt have initial value
                brandCoinName: nonNullData.currency.name,
            });

            if (nonNullData.logo !== null || (nonNullData.logo !== "null")) {
                setLogoFileName(nonNullData.logo);
            }
            if (nonNullData.cover !== null || (nonNullData.cover !== "null")) {
                setCoverFileName(nonNullData.cover);
            }
            //set status only if not banned
            if (nonNullData.status.name !== "banned") {
                setStatus(nonNullData.status.name)
            }

        }
    }, [dataInit]);

    // =========================== FILE UPLOAD ===========================
    const [logoFileName, setLogoFileName] = useState('');
    const handleUploadLogoSuccess = (name) => {
        setLogoFileName(name);
    };

    const [coverFileName, setCoverFileName] = useState('');
    const handleUploadCoverSucess = (name) => {
        setCoverFileName(name);
    };

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
                                                    if (initialValues.status === "disable") {
                                                        return (
                                                            <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                                                {t("disable")}
                                                            </Typography>)
                                                    }
                                                    if (initialValues.status === "banned") {
                                                        return (
                                                            <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                                                {t("banned")}
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

                                            {/* UPLOAD LOGO & COVER BOX */}


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
                                                    <InputLabel id="demo-simple-select-label" >{initialValues.status}</InputLabel>
                                                    <Select
                                                        disabled={initialValues.status === "banned"}
                                                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={typeId}
                                                        label={t('recharge_type')}
                                                        onChange={handleTypeIdChange}
                                                    >
                                                        <MenuItem value={0}>{t('permanent')}</MenuItem>
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
                                                value={values.intro}
                                                name="intro"
                                                error={!!touched.intro && !!errors.intro}
                                                helperText={touched.intro && errors.intro}
                                                sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />
                                            <Box display={"flex"} justifyContent={"space-between"} >
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('amount')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalPhone}
                                                    name="principalPhone"
                                                    required // add the required prop
                                                    error={!!touched.principalPhone && !!errors.principalPhone}
                                                    helperText={touched.principalPhone && errors.principalPhone}
                                                    sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('price')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalPhone}
                                                    name="principalPhone"
                                                    required // add the required prop
                                                    error={!!touched.principalPhone && !!errors.principalPhone}
                                                    helperText={touched.principalPhone && errors.principalPhone}
                                                    sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('bonus_reward')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalPhone}
                                                    name="principalPhone"
                                                    required // add the required prop
                                                    error={!!touched.principalPhone && !!errors.principalPhone}
                                                    helperText={touched.principalPhone && errors.principalPhone}
                                                    sx={{ margin: "0rem 0 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>

                                            <Box display={typeId === 1 ? "block" : "none"}>
                                                <TextField
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

                                            {entityName === 'company' ? (
                                                values.status === "banned" ? (
                                                    <Button onClick={handleUnBan} id={values.id} variant="contained" sx={{
                                                        backgroundColor: colors.primary[400], minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #fff"
                                                    }}>
                                                        <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                                                            {unbanTitle}
                                                        </Typography>
                                                    </Button>
                                                ) : (
                                                    <ConfirmModal props={{ type: "brand", id: props.id }} />
                                                )
                                            ) : null}



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
                                        {t('recharge_history')}
                                    </Typography>
                                </Box>
                                <Box
                                    backgroundColor={colors.primary[400]}
                                    borderRadius="8px"
                                    height={"100%"}
                                    overflow={"auto"}
                                >
                                    {/* MAP DATA */}
                                    {items.map((brand, i) => (
                                        <Box
                                            key={`${brand.id}-${i}`}
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            borderBottom={i === items.length - 1 ? "none" : `3px solid ${colors.primary[500]}`}
                                            p="10px"
                                        >
                                            <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>JOHN</Box>
                                            <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>100</Box>
                                            <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>100</Box>
                                            <Box width={"25%"} display="flex" alignItems={"center"} justifyContent={"center"} textAlign={"center"}>Success</Box>
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
