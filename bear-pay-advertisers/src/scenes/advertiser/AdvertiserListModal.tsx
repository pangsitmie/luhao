import { useState, useEffect, } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useMutation, useQuery } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { PatchAdvertisersForManager, RemoveAdvertisersForManager } from "../../graphQL/Mutations";
import { toast } from "react-toastify";
import { RootState } from "../../redux/store";
import ConfirmButton from "../../components/ConfirmButton";
import { AdvertiserType } from "../../types/Advertiser";
import { GetAdvertiser } from "../../graphQL/Queries";
import { replaceNullWithEmptyString } from "../../utils/Utils";


type Props = {
    props: AdvertiserType
    onUpdate: () => void
}

interface FormValues {
    id: string;
    name: string;
    account: string;
    principalName: string;
    principalPhone: string;
}

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    principalName: yup.string().required("required"),
    principalPhone: yup.string().required("required"),
});

const AdvertiserListModal = ({ props, onUpdate }: Props) => {
    const { entityName } = useSelector((state: RootState) => state.entity);
    console.log(props)

    const { t } = useTranslation();

    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ========================== STATES AND HANDLERS ==========================
    var btnTitle = t("view"), modalTitle = t("details"), confirmTitle = t("update"), deleteTitle = t("delete");

    const [modal, setModal] = useState(false); //open or close modal
    const toggleModal = () => {
        setModal(!modal);
    };



    //========================== INITIAL VALUES ==========================
    const [initialValues, setInitialValues] = useState<FormValues>({
        id: "",
        name: "",
        account: "",
        principalName: "",
        principalPhone: "",
    });


    const { data: dataInit, refetch } = useQuery(GetAdvertiser
        , {
            variables: {
                advertisersIds: props.id
            },
            skip: !modal, // Skip the query when modal is closed
        }
    );

    useEffect(() => {
        if (dataInit) {
            console.log(dataInit);
            const nonNullData = replaceNullWithEmptyString(dataInit.getAdvertisersForManager[0]);
            setInitialValues({
                id: props.id,
                // status: nonNullData.status,
                name: nonNullData.name,
                account: nonNullData.account,
                principalName: nonNullData.principalName,
                principalPhone: nonNullData.principalPhoneNumber,
            });
        }
    }, [dataInit]);


    // ============ UPDATE BRAND ============
    const [ApolloPatchAdvertiser, { error: errorUpdate, data: dataUpdate }] = useMutation(PatchAdvertisersForManager);
    useEffect(() => {
        if (errorUpdate) {
            console.log(errorUpdate);
        }
    }, [errorUpdate]);
    // ============ REMOVE BRAND ============
    const [ApolloRemoveAdvertiser, { data: dataRemove }] = useMutation(RemoveAdvertisersForManager);
    const handleDelete = () => {
        var result = window.confirm("Are you sure you want to delete this Advertiser?");
        if (result) {
            ApolloRemoveAdvertiser({
                variables: {
                    advertisersId: props.id
                }
            })
        }
    };


    useEffect(() => {
        if (dataUpdate) {
            onUpdate();
            refetch();
            toast.success(t("update_success"));
        }
        if (dataRemove) {
            onUpdate();
            toast.success(t("delete_success"));
        }
    }, [dataUpdate, dataRemove]);

    const handleFormSubmit = (values: FormValues) => {
        const variables = {
            advertisersId: props.id,
            name: values.name,
            principalName: values.principalName,
            principalPhone: {
                country: "tw",
                number: values.principalPhone
            }
        };

        console.log(variables);

        ApolloPatchAdvertiser({ variables });
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
                    <Box
                        className="modal-content"
                        sx={{
                            backgroundColor: colors.primary[500],
                        }}>
                        <Box m="20px">
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
                                            <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: colors.grey[200] }}>
                                                {modalTitle}
                                            </Typography>

                                            {/* <Box textAlign="center" display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                                {(() => {
                                                    if (status === "disable") {
                                                        return (
                                                            <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                                                {t("disable")}
                                                            </Typography>)
                                                    }
                                                    if (status === "banned") {
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
                                            </Box> */}


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

                                            <TextField
                                                disabled={true}
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label={t('account')}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.account}
                                                name="account"
                                                required // add the required prop
                                                error={!!touched.account && !!errors.account}
                                                helperText={touched.account && errors.account}
                                                sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />

                                            <Box display={"flex"} justifyContent={"space-between"} >
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={`${t('principal_name')}`}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalName}
                                                    name="principalName"
                                                    error={!!touched.principalName && !!errors.principalName}
                                                    helperText={touched.principalName && errors.principalName}
                                                    sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={` ${t('principal_phone')}`}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalPhone}
                                                    name="principalPhone"
                                                    error={!!touched.principalPhone && !!errors.principalPhone}
                                                    helperText={touched.principalPhone && errors.principalPhone}
                                                    sx={{ margin: "0rem 0 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>

                                            <Box display="flex" gap={"1rem"} justifyContent={"center"}>
                                                {entityName === 'company' ? (
                                                    <Button
                                                        onClick={handleDelete}
                                                        variant="contained"
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
                                                ) : null}

                                                {/* {entityName === 'company' ? (
                                                    status === "banned" ? (
                                                        <Button
                                                            onClick={handleUnBan}
                                                            variant="contained"
                                                            sx={{
                                                                backgroundColor: "transparent",
                                                                minWidth: "100px",
                                                                padding: ".5rem 1.5rem",
                                                                borderRadius: "10px",
                                                                border: "2px solid #fff",
                                                                '&:hover': {
                                                                    backgroundColor: "transparent",
                                                                    opacity: ".9",
                                                                }
                                                            }}>
                                                            <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: colors.primary[100] }}>
                                                                {unbanTitle}
                                                            </Typography>
                                                        </Button>
                                                    ) : (
                                                        <ConfirmModal props={{ type: "brand", id: props.id }} />
                                                    )
                                                ) : null} */}


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
    )
}
export default AdvertiserListModal