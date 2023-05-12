import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useQuery } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { GetBrandReviewData, } from "../../graphQL/Queries";
import { getImgURL, replaceNullWithEmptyString } from "../../utils/Utils";
import LogoUpload from "../../components/Upload/LogoUpload";
import CoverUpload from "../../components/Upload/CoverUpload";
import { useTranslation } from 'react-i18next';
import AcceptReviewButton from "./AcceptReviewButton";
import RejectReviewButton from "./RejectReviewButton";
import { ReviewItemType } from "../../types/Review";



type Props = {
    props: ReviewItemType,
    onUpdate: () => void,
    showButtons: boolean
}

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),

});


export default function ReviewBrandListModal({ props, onUpdate, showButtons }: Props) {
    const { t } = useTranslation();
    // console.log(props.reviewId);

    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);



    // ========================== STATES AND HANDLERS ==========================
    var btnTitle = t("view"), modalTitle = t("details");

    const [modal, setModal] = useState(false); //open or close modal
    const toggleModal = () => {
        setModal(!modal);
    };


    // const [status, setStatus] = useState('disable');


    //========================== INITIAL VALUES ==========================
    const [initialValues, setInitialValues] = useState({
        id: "",
        status: "",
        name: "",
        intro: "",
        vatNumber: "",
        principalName: "",
        principalEmail: "",
        principalLineUrl: "",
    });
    //========================== GRAPHQL ==========================





    const handleFormSubmit = () => {

    };

    // INITIAL VALUES FROM GET BRAND QUERY
    const { data: dataInit } = useQuery(GetBrandReviewData
        , {
            variables: {
                reviewIds: props.reviewId
            }
        }
    );
    useEffect(() => {
        if (dataInit) {
            console.log("brand data init")
            console.log(dataInit);
            const nonNullData = replaceNullWithEmptyString(dataInit.getBrandReviewData[0]);

            setInitialValues({
                id: props.id,
                status: nonNullData.status,
                name: nonNullData.name,
                vatNumber: nonNullData.vatNumber,
                intro: nonNullData.intro,
                principalName: nonNullData.principalName,
                principalEmail: nonNullData.principalEmail,
                principalLineUrl: nonNullData.principalLineUrl,
                //password doesnt have initial value
            });

            if (nonNullData.logo !== null || (nonNullData.logo !== "null")) {
                setLogoFileName(nonNullData.logo);
            }
            if (nonNullData.cover !== null || (nonNullData.cover !== "null")) {
                setCoverFileName(nonNullData.cover);
            }
            //set status only if not banned
            // if (nonNullData.status !== "banned") {
            //     setStatus(nonNullData.status)
            // }

        }
    }, [dataInit]);

    // =========================== FILE UPLOAD ===========================
    const [logoFileName, setLogoFileName] = useState('');


    const [coverFileName, setCoverFileName] = useState('');


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
                                        <Box>
                                            <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: colors.grey[200] }}>
                                                {modalTitle}
                                            </Typography>

                                            {/* UPLOAD LOGO & COVER BOX */}
                                            <Box display="flex" m={"1rem 0"} gap={".5rem"}>
                                                <Box width={"30%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                                    {/* UPLOAD LOGO COMPONENT */}
                                                    <LogoUpload handleSuccess={() => { }} imagePlaceHolder={getImgURL(logoFileName, "logo") || ''} type={"brand"} />
                                                </Box>

                                                <Box width={"70%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                                    {/* UPLOAD COVER COMPONENET */}
                                                    <CoverUpload handleSuccess={() => { }} imagePlaceHolder={getImgURL(coverFileName, "cover") || ''} type={"brand"} />
                                                </Box>
                                            </Box>

                                            <Box display={"flex"} justifyContent={"space-between"}>

                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={t("brand_name")}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.name}
                                                    name="name"
                                                    error={!!touched.name && !!errors.name}
                                                    helperText={touched.name && errors.name}
                                                    sx={{ marginBottom: "1rem", mr: '1rem', backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={t("vat_number")}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.vatNumber}
                                                    name="vatNumber"
                                                    error={!!touched.vatNumber && !!errors.vatNumber}
                                                    helperText={touched.vatNumber && errors.vatNumber}
                                                    sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>

                                            <TextField
                                                id="outlined-multiline-flexible"
                                                multiline
                                                disabled={true}
                                                fullWidth
                                                maxRows={4}
                                                variant="filled"
                                                type="text"
                                                label={t("brand_intro")}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.intro}
                                                name="intro"
                                                error={!!touched.intro && !!errors.intro}
                                                helperText={touched.intro && errors.intro}
                                                sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />

                                            <Typography variant="h5" sx={{ textAlign: "left", margin: "1rem 0 .5rem 0", color: colors.grey[200] }}>{t('principal_name')}</Typography>


                                            <TextField
                                                fullWidth
                                                disabled={true}
                                                variant="filled"
                                                type="text"
                                                label={`${t('person_name')}`}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.principalName}
                                                name="principalName"
                                                error={!!touched.principalName && !!errors.principalName}
                                                helperText={touched.principalName && errors.principalName}
                                                sx={{ marginBottom: "1rem", mr: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />

                                            <Box display={"flex"} justifyContent={"space-between"} >
                                                <TextField
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={t("line_url")}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalLineUrl}
                                                    name="principalLineUrl"
                                                    error={!!touched.principalLineUrl && !!errors.principalLineUrl}
                                                    helperText={touched.principalLineUrl && errors.principalLineUrl}
                                                    sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />

                                                <TextField
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={t("email")}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalEmail}
                                                    name="principalEmail"
                                                    error={!!touched.principalEmail && !!errors.principalEmail}
                                                    helperText={touched.principalEmail && errors.principalEmail}
                                                    sx={{ margin: "0rem 0rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>
                                        </Box>

                                        {showButtons && (
                                            <Box display="flex" justifyContent="center" gap={"1rem"}>
                                                <RejectReviewButton REQUEST_ID={props.id} onUpdate={onUpdate} />
                                                <AcceptReviewButton REQUEST_ID={props.id} onUpdate={onUpdate} />
                                            </Box>
                                        )}

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
