import React, { useState, useEffect, } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { useQuery, useLazyQuery, useMutation, DocumentNode } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../../components/Modal/modal.css";
import { tokens } from "../../../theme";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { getImgURL, replaceNullWithEmptyString } from "../../../utils/Utils";
import LogoUpload from "../../../components/Upload/LogoUpload";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";
import Billboard from "../../../types/Billboard";
import { RootState } from "../../../redux/store";
import { PatchBillboard } from "../../../graphQL/Mutations";
import { BRAND_PatchBillboard } from "../../../graphQL/BrandPrincipalMutations";
import { GetBillboard, RemoveBillboard, UnbanBillboard } from "../../../graphQL/Queries";
import { unixTimestampToDatetimeLocal } from "../../../utils/Utils";



type Props = {
    props: Billboard
    onUpdate: () => void
}
interface FormValues {
    billboardId: string;
    title: string;
    content: string;
    description: string | null;
    image: string;
    startAt?: number;
    endAt?: number;
    status?: string;
}


const checkoutSchema = yup.object().shape({
    // storeId: yup.string().required("店面id必填"),
    title: yup.string().required("必填"),
    content: yup.string().required("必填"),
});

const BillboardListModal = ({ props, onUpdate }: Props) => {
    const { entityName } = useSelector((state: RootState) => state.entity);
    const { t } = useTranslation();

    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ========================== STATES AND HANDLERS ==========================
    var btnTitle = t("view"), modalTitle = t("details"), confirmTitle = t("update"), deleteTitle = t("delete"), unbanTitle = t("unban");

    const [status, setStatus] = useState('disable');
    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        setStatus(event.target.value);
    };

    const [modal, setModal] = useState(false); //open or close modal
    const toggleModal = () => {
        setModal(!modal);
    };

    const [startAtDate, setStartAtDate] = useState<string>('');
    function handleStartAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setStartAtDate(event.target.value);
    }

    const [endAtDate, setEndAtDate] = useState<string>('');
    function handleEndAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEndAtDate(event.target.value);
    }

    //========================== INITIAL VALUES ==========================
    const [initialValues, setInitialValues] = useState<FormValues>({
        billboardId: props.id,
        title: "",
        content: "",
        description: "",
        image: "",
    });

    //========================== GRAPHQL ==========================

    let PATCH_BILLBOARD_MUTATION: DocumentNode = PatchBillboard;
    switch (entityName) {
        case 'company':
            PATCH_BILLBOARD_MUTATION = PatchBillboard;
            break;
        case 'brand':
            PATCH_BILLBOARD_MUTATION = BRAND_PatchBillboard;
            break;
        case 'store':
            PATCH_BILLBOARD_MUTATION = PatchBillboard;
            break;
        default:
            break;
    }

    const [ApolloUpdateBillboard, { loading: loading2, error: error2, data: data2 }] = useMutation(PATCH_BILLBOARD_MUTATION);
    useEffect(() => {
        if (data2) {
            onUpdate();
            refetch();
            toast.success(t("update_success"));
        }
    }, [data2]);

    // INITIAL VALUES FROM GET BILLBOARD
    const { loading: loading3, error: error3, data: data3, refetch } = useQuery(GetBillboard
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
        if (data3) {
            const nonNullData = replaceNullWithEmptyString(data3.getBillboard[0]);

            setInitialValues({
                billboardId: nonNullData.id,
                title: nonNullData.title,
                content: nonNullData.content,
                description: nonNullData.description,
                status: nonNullData.status,
                image: nonNullData.image,
            });

            const startAtDateTimeLocal = unixTimestampToDatetimeLocal(nonNullData.startAt);
            setStartAtDate(startAtDateTimeLocal);

            if (nonNullData.endAt !== "") {
                const endAtDateTimeLocal = unixTimestampToDatetimeLocal(nonNullData.endAt);
                setEndAtDate(endAtDateTimeLocal);
            }

            if (nonNullData.image !== null || (nonNullData.image !== "null") || (nonNullData.image !== '')) {
                setImageFileName(nonNullData.image);
            }
            //set status only if not banned
            if (nonNullData.status !== "banned") {
                setStatus(nonNullData.status)
            }
        }
    }, [data3]);

    // UNBAN MUTATION
    const [ApolloUnBanBillboard, { loading: loading4, error: error4, data: data4 }] = useLazyQuery(UnbanBillboard);
    useEffect(() => {
        if (data4) {
            window.location.reload();
        }
    }, [data4]);

    const handleUnBan = () => {
        var result = window.confirm("Are you sure you want to unban this billboard?");
        if (result) {
            ApolloUnBanBillboard({
                variables: {
                    args: [
                        {
                            id: props.id
                        }
                    ],
                }
            })
            console.log("unbaned");
        } else {
            console.log("not deleted");
        }
    }

    const [ApolloRemoveBillboard, { loading, error, data }] = useLazyQuery(RemoveBillboard);
    useEffect(() => {
        if (data) {
            onUpdate();
            refetch();
            toast.error(t("delete_success"));
        }
    }, [data]);
    const handleDelete = () => {
        var result = window.confirm("Are you sure you want to delete this billboard?");
        if (result) {
            ApolloRemoveBillboard({
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


    // COVER UPLOAD
    const [imageFileName, setImageFileName] = useState("");
    const handleUploadImageSucess = (name: string) => {
        setImageFileName(name);
    };


    const handleFormSubmit = (values: FormValues) => {
        const startAtDateObj = new Date(startAtDate);
        const endAtDateObj = new Date(endAtDate);

        let startAtUnix = startAtDateObj.getTime() / 1000;
        let endAtUnix = endAtDateObj.getTime() / 1000;
        let nowUnix = Math.floor(Date.now() / 1000);

        const variables: FormValues = {
            billboardId: props.id,
            title: values.title,
            content: values.content,
            image: imageFileName,
            description: values.description !== "" ? values.description : null,
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
            variables.status = status;
        }
        // console.log(variables);
        if (endAtUnix < startAtUnix && !isNaN(endAtUnix)) {
            alert("結束日期必須晚於開始日期");
            return;
        }
        // console.log(variables);
        ApolloUpdateBillboard({ variables });
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
                <div className="modal">
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
                                        <Box color={"black"}>

                                            <Box display={"flex"} m={"1rem 0"}>
                                                <Box width={"35%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography variant="h2" sx={{ mb: "10px", fontSize: "2rem", fontWeight: "600", color: "white" }}>
                                                        {modalTitle}
                                                    </Typography>

                                                    <Box textAlign="center" display={"flex"} >
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
                                                </Box>

                                                <Box width={"65%"} display={"flex"} justifyContent={"flex-end"} >
                                                    {/* UPLOAD COVER COMPONENET */}
                                                    <LogoUpload handleSuccess={handleUploadImageSucess} imagePlaceHolder={getImgURL(imageFileName, "billboard") || ''} type={"billboard"} />
                                                </Box>
                                            </Box>





                                            <Box display="flex" justifyContent="center" >
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('title')}
                                                    required
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.title}
                                                    name="title"
                                                    error={!!touched.title && !!errors.title}
                                                    helperText={touched.title && errors.title}
                                                    sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                                <FormControl sx={{ minWidth: 150 }}>
                                                    <InputLabel id="demo-simple-select-label" >{status}</InputLabel>
                                                    <Select
                                                        disabled={status === "banned"}
                                                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={status}
                                                        label={t('status')}
                                                        onChange={handleStatusChange}
                                                    >
                                                        <MenuItem value={"normal"}>{t('normal')}</MenuItem>
                                                        <MenuItem value={"disable"}>{t('disable')}</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>

                                            <TextField className="modal_input_textfield"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                required
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

                                            <Button onClick={handleDelete} variant="contained" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #ff2f00" }}>
                                                <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                                                    {deleteTitle}
                                                </Typography>
                                            </Button>

                                            {entityName === 'company' ? (
                                                status === "banned" ? (
                                                    <Button onClick={handleUnBan} variant="contained" sx={{
                                                        backgroundColor: "transparent",
                                                        minWidth: "100px",
                                                        padding: ".5rem 1.5rem",
                                                        margin: "0 1rem",
                                                        borderRadius: "10px",
                                                        border: "2px solid #fff",
                                                        '&:hover': {
                                                            backgroundColor: "transparent",
                                                            opacity: ".9",
                                                        }
                                                    }}>
                                                        <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                                                            {unbanTitle}
                                                        </Typography>
                                                    </Button>
                                                ) : (
                                                    <ConfirmModal props={{ type: "billboard", id: props.id }} />
                                                )
                                            ) : null}



                                            <Button type="submit" color="success" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", background: colors.grey[100] }}>
                                                <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: colors.grey[700] }}>
                                                    {confirmTitle}
                                                </Typography>
                                            </Button>
                                        </Box>
                                    </form>
                                )}
                            </Formik>
                        </Box >
                    </Box>
                </div>
            )
            }
        </>
    )
}
export default BillboardListModal