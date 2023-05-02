import { useState, useEffect } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { useQuery } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { replaceNullWithEmptyString } from "../../utils/Utils";
import { useTranslation } from 'react-i18next';
import { BRAND_GetMachineReviewData } from "../../graphQL/BrandPrincipalQueries";
import AcceptReviewButton from "./AcceptReviewButton";
import RejectReviewButton from "./RejectReviewButton";
import { ReviewItemType } from "../../types/Review";


type Props = {
    props: ReviewItemType,
    onUpdate: () => void,
    showButtons: boolean
}

const checkoutSchema = yup.object().shape({});


export default function ReviewMachineListModal({ props, onUpdate, showButtons }: Props) {
    const { t } = useTranslation();
    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);



    // ========================== STATES AND HANDLERS ==========================
    var btnTitle = t("view"), modalTitle = t("details");

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };




    const [onlyWallet, setOnlyWallet] = useState<string>("false");
    const handleOnlyWalletChange = (event: SelectChangeEvent<string>) => {
        setOnlyWallet(event.target.value);
    };


    //========================== INITIAL VALUES ==========================
    const [initialValues, setInitialValues] = useState({
        id: 0,
        name: "",
        code: "",
        price: 0,
        description: "",
    });





    const handleFormSubmit = () => { };
    //========================== GRAPHQL ==========================

    // INITIAL VALUES FROM GET BRAND QUERY
    const { loading: loadingInit, error: errorInit, data: dataInit } = useQuery(BRAND_GetMachineReviewData
        , {
            variables: {
                reviewIds: props.reviewId
            }
        }
    );
    useEffect(() => {
        if (dataInit) {
            console.log(dataInit);
            const nonNullData = replaceNullWithEmptyString(dataInit.getMachineReviewData[0]);

            setInitialValues({
                id: nonNullData.id,
                code: nonNullData.code,
                name: nonNullData.name,
                price: nonNullData.price,
                description: nonNullData.description,
                //password doesnt have initial value
            });

            setOnlyWallet(nonNullData.onlyWallet);
        }
        if (errorInit) {
            console.log(errorInit);
        }
        if (loadingInit) {
            console.log(loadingInit);
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
                    <Box
                        className="modal-content"
                        sx={{
                            backgroundColor: colors.primary[400],
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
                                            <Box display={"flex"} pb={"1.5rem"}>
                                                <Typography variant="h2" sx={{ fontSize: "2rem", fontWeight: "600", color: colors.grey[200] }}>
                                                    {modalTitle}
                                                </Typography>
                                            </Box>

                                            <TextField className="modal_input_textfield"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label={t('machine_name')}
                                                disabled={true}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                name="name"
                                                error={!!touched.name && !!errors.name}
                                                helperText={touched.name && errors.name}
                                                sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                            />
                                            <TextField
                                                fullWidth
                                                disabled={true}
                                                variant="filled"
                                                type="text"
                                                label={t('machine_code')}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.code}
                                                name="code"
                                                error={!!touched.code && !!errors.code}
                                                helperText={touched.code && errors.code}
                                                sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />
                                            <TextField
                                                fullWidth
                                                disabled={true}
                                                variant="filled"
                                                type="text"
                                                label={t('description')}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.description}
                                                name="description"
                                                sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />
                                            <Box display={"flex"} gap={"1rem"}>
                                                <TextField
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={t('amount_spent_per_machine')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.price}
                                                    name="price"
                                                    error={!!touched.price && !!errors.price}
                                                    helperText={touched.price && errors.price}
                                                    sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />


                                                <FormControl
                                                    fullWidth>
                                                    <InputLabel id="demo-simple-select-label" >Only wallet</InputLabel>
                                                    <Select
                                                        disabled={true}
                                                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={onlyWallet}
                                                        label="Only wallet"
                                                        onChange={handleOnlyWalletChange}
                                                    >
                                                        <MenuItem value={"true"}>{t('yes')}</MenuItem>
                                                        <MenuItem value={"false"}>{t('no')}</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>



                                        </Box>
                                        {showButtons && (
                                            <Box display="flex" justifyContent="center" >
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
