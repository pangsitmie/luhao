import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { Formik, useFormikContext } from "formik";
import * as yup from "yup";
// import useMediaQuery from "@mui/material/useMediaQuery";
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import "src/components/Modal/modal.css";
import { tokens } from "src/theme";
import ConfirmModal from "src/components/Modal/ConfirmModal";
import { GetMachine, UnbindMachine, UnBanMachine, UpdateMachine, HealthCheck } from "src/graphQL/Queries";
import { getRESTEndpoint, replaceNullWithEmptyString } from "src/utils/Utils";
import QRCode from "qrcode";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { PatchMachine } from "src/graphQL/Mutations";
import { BRAND_PatchMachine } from "src/graphQL/BrandPrincipalMutations";
import { STORE_PatchMachine, STORE_UpdateMachine } from "src/graphQL/StorePrincipalMutation";
import { toast } from "react-toastify";
import { STORE_GetBonusGamePaginatedConnection } from "src/graphQL/StorePrincipalQueries";
import axios from "axios";

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    price: yup.number().required("required"),
    // desc: yup.string().required("required"),
});


export default function MachineListModal({ props, storeData, onUpdate }) {
    // console.log(" MachineListmodal props: ");
    // console.log(props);

    const { entityName } = useSelector((state) => state.entity);
    const { t } = useTranslation();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    var btnTitle = t("view"), modalTitle = t("details"), confirmTitle = t("update"), deleteTitle = t("delete"), banTitle = t("ban"), unbanTitle = t("unban");



    //REF
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    const [status, setStatus] = useState('disable');
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const [onlyWallet, setOnlyWallet] = useState(false);
    const handleOnlyWalletChange = (event) => {
        setOnlyWallet(event.target.value);
    };

    // counter
    const [counterCheck, setCounterCheck] = useState(true);
    const handleCounterCheckChange = (event) => {
        setCounterCheck(event.target.checked);
    };


    const [countersToggle, setCountersToggle] = useState(false);
    const handleCountersToggleChange = (event) => {
        setCountersToggle(event.target.checked);
    };

    const [initialValues, setInitialValues] = useState({
        id: -1,
        UUID: "",
        nfc: "",
        name: "",
        code: "",
        price: 0,
        qrCode: "",
        // status: "",
        connStatus: "",
        desc: "",
    });

    // useEffect(() => {
    //     console.log(initialValues);
    //     console.log(props)
    // }, [props]);


    let UPDATE_MACHINE_MUTATION;
    switch (entityName) {
        case 'company':
            UPDATE_MACHINE_MUTATION = PatchMachine;
            break;
        case 'brand':
            UPDATE_MACHINE_MUTATION = BRAND_PatchMachine;
            break;
        case 'store':
            UPDATE_MACHINE_MUTATION = STORE_UpdateMachine;
            break;
        default:
            break;
    }



    // UPDATE MACHINE MUTATION
    // FOR STORE PRINCIPAL THIS MUST BE REVIEWED BY BRAND PRINCIPAL
    const [ApolloUpdateMachine, { loading: loading4, error: error4, data: data4 }] = useMutation(UPDATE_MACHINE_MUTATION);
    useEffect(() => {
        if (data4) {
            onUpdate();
            refetch();
            if (entityName === "store") {
                toast.success(t("review_sent"));
            }
            else {
                toast.success(t("update_success"));
            }
        }
    }, [data4]);

    // ===================== REMOVE MACHINE QUERY =====================
    const [ApolloUnbindMachine, { loading, error, data }] = useLazyQuery(UnbindMachine);
    useEffect(() => {
        if (data) {
            window.location.reload();
        }
    }, [data]);

    // HANDLE REMOVE MACHINE
    const handleDelete = (e) => {
        var result = window.confirm("Are you sure you want to unbind this machine?");
        if (result) {
            ApolloUnbindMachine({
                variables: {
                    args: [
                        {
                            id: props.id
                        }
                    ]
                }
            });
        }
    };

    // ===================== INITIAL VALUES FROM GETMACHINE =====================
    const { loading: loadingInit, error: errorInit, data: dataInit, refetch } = useQuery(GetMachine
        , {
            variables: {
                args: [
                    {
                        id: props.id
                    }
                ],
            },
            skip: !modal, // Skip the query when modal is closed
        },
    );
    useEffect(() => {
        if (dataInit) {
            const nonNullData = replaceNullWithEmptyString(dataInit.getMachine[0]);

            console.log("nonNullData");
            console.log(nonNullData);

            setInitialValues({
                id: props.id,
                UUID: nonNullData.uuid,
                nfc: nonNullData.nfc,
                name: nonNullData.name,
                code: nonNullData.code,
                price: nonNullData.price,
                qrCode: nonNullData.qrCode,
                status: nonNullData.status,
                desc: nonNullData.description,
            });

            setOnlyWallet(nonNullData.onlyWallet);
            setCounterCheck(nonNullData.counterInfo.counterCheck);
            setSelectedBonusGame({
                id: nonNullData.bonusGameId
            });

            generateQrCode(nonNullData.qrCode);


            //set status only if not banned
            if (nonNullData.status !== "banned") {
                setStatus(nonNullData.status)
            }



            // console.log("COUNTERS");
            // console.log(nonNullData.counterInfo.counters);
            // console.log(typeof nonNullData.counterInfo.counters);

            // console.log(Array.isArray(nonNullData.counterInfo.counters));


            const countersArray = Object.values(nonNullData.counterInfo.counters);
            if (Array.isArray(countersArray) && countersArray.length > 0) {
                // if (true) {
                setCountersToggle(true);

                countersArray.forEach(counter => {
                    const key = `${counter.counterType}`;
                    // console.log(key + "-" + counter.count);
                    setInitialValues(prevState => ({
                        ...prevState,
                        [key]: counter.count,
                    }));
                });
            }
        }
    }, [dataInit]);



    // ===================== BONUS GAMES =====================
    const [bonusGameList, setBonusGameList] = useState([]);
    const [selectedBonusGame, setSelectedBonusGame] = useState({
        id: "",
        name: "",
    });

    const handleBonusGameListChange = (e) => {
        const targetId = e.target.value;

        //find the brand id from brand list
        const item = bonusGameList.find(item => item.id === targetId);

        if (item) {
            // setCommodityListFilter(targetId);
            console.log(item)
            setSelectedBonusGame({
                id: targetId,
                name: item.name,
            });
        }
    };

    const { loading: loadingHealthCheck, error: errorHealthCheck, data: dataHealthCheck, refetch: refetchHealthCheck } = useQuery(HealthCheck);
    const REST_FetchBonusGameList = async () => {
        console.log("REST_FetchBonusGameList Called!")
        const MAX_RETRY_ATTEMPTS = 3;
        let retryCount = 0;

        while (retryCount < MAX_RETRY_ATTEMPTS) {
            try {
                // setLoadingState(true);

                const URI = `${getRESTEndpoint()}/bonusGame/getList`;

                const response = await axios.post(
                    URI,
                    {
                        storeId: storeData.id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                // console.log("RESPONSE:", response);

                if (response.data && response.data.data) {
                    console.log("RESPONSE DATA");
                    console.log(response.data.data);
                    setBonusGameList(response.data.data);
                    // setInitMachineDatas(response.data.data);
                    break; // exit the loop if the API call was successful
                } else {
                    refetchHealthCheck();
                    toast("Loading...");
                }
            } catch (error) {
                console.log("Error:", error);
            } finally {
                // setLoadingState(false);
            }

            retryCount++;
            console.log(`Retrying API call (attempt ${retryCount})...`);

            if (retryCount > 0) {
                await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second before retrying
            }
        }

        if (retryCount === MAX_RETRY_ATTEMPTS) {
            console.log(`Maximum retry attempts (${MAX_RETRY_ATTEMPTS}) exceeded.`);
        }

    };
    useEffect(() => {
        if (modal && entityName === "store") {
            REST_FetchBonusGameList();
        }
    }, [modal]);


    // const { loading: loadingInit2, error: errorInit2, data: dataInit2, refetch: refetch2 } = useQuery(STORE_GetBonusGamePaginatedConnection,
    //     {
    //         variables: {
    //             next: { first: 50 },
    //         },
    //         skip: !modal || (entityName !== "store"), // Skip the query when modal is closed
    //     },
    // );

    // useEffect(() => {
    //     if (dataInit2) {
    //         console.log("BONUS GAMES");
    //         console.log(dataInit2);
    //         setBonusGameList(dataInit2.getBonusGamesPaginatedConnectionForStorePrincipal.edges);
    //     }
    // }, [dataInit2]);



    //THIS IS STORE PRINCIPAL PATCH MACHINE INFO WITHOUTH REVIEW
    // THINGS THAT CAN BE PATCHED WITHOUT REVIEW:
    // 1. counterCheck
    // 2. counters
    // 3. NFC
    // 4. statusId
    const [STORE_ApolloPatcheMachine, { loading: STORE_loadingPatch, error: STORE_errorPatch, data: STORE_dataPatch }] = useMutation(STORE_PatchMachine);
    useEffect(() => {
        if (STORE_dataPatch) {
            console.log("MACHINE PATCHED (STORE)");
            console.log(STORE_dataPatch)
            refetch();
            onUpdate();
            toast.success(t("update_success"));
        }
        if (STORE_errorPatch) {
            console.log("ERROR PATCHING MACHINE (STORE)");
            console.log(STORE_errorPatch);
        }
    }, [STORE_dataPatch]);


    // UNBAN MUTATION
    const [ApolloUnBanMachine, { loading: loading5, error: error5, data: data5 }] = useLazyQuery(UnBanMachine);
    useEffect(() => {
        if (data5) {
            window.location.reload();
        }
    }, [data5]);



    const handleFormSubmit = (values) => {
        console.log("Entity name" + entityName);
        let variables = {};
        // IF ENTITY NAME IS STORE
        if (entityName === "store") {
            // UPDATE MACHINE FOR STORE PRINCIPAL (NEED REVIEW)
            variables = {
                machineId: props.id,
                price: parseInt(values.price),
                name: values.name,
                description: values.desc,
                onlyWallet: onlyWallet,
            }

            //CALL THE UPDATE REQUEST AND LATER CALL THE PATCH REQUEST AGAIN
            console.log("STORE PRINCIPAL UPDATE MACHINE VARIABLES");
            console.log(variables);
            ApolloUpdateMachine({ variables });

            // PATCH MACHINE DIRECTLY FOR STORE PRINCIPAL (NO REVIEW)
            variables = {
                machineId: props.id,
                statusId: initialValues.status === 'banned' ? null : status,
                counterCheck: counterCheck,
            }
            if (values.nfc !== "") {
                variables.nfc = values.nfc;
            }
            if (countersToggle) {
                variables.counters = [
                    {
                        counterType: "coin",
                        count: parseInt(values.coin)
                    },
                    {
                        counterType: "gift",
                        count: parseInt(values.gift)
                    }
                ]
            }
            if (selectedBonusGame.id !== "") {
                variables.bonusGameId = selectedBonusGame.id;
            }

            console.log("STORE PRINCIPAL PATCH MACHINE VARIABLES");
            console.log(variables);
            STORE_ApolloPatcheMachine({ variables });
        }
        else {
            variables = {
                machineId: props.id,
                name: values.name,
                description: values.desc,
                // nfc: values.nfc,
                statusId: initialValues.status === 'banned' ? null : status,
                price: parseInt(values.price),
                counterCheck: counterCheck,
                onlyWallet: onlyWallet,
            };
            if (values.nfc !== "") {
                variables.nfc = values.nfc;
            }
            if (countersToggle) {
                variables.counters = [
                    {
                        counterType: "coin",
                        count: parseInt(values.coin)
                    },
                    {
                        counterType: "gift",
                        count: parseInt(values.gift)
                    }
                ]
            }

            console.log("COMPANY OR BRAND PATCH MACHINE VARIABLES");
            console.log(variables);
            ApolloUpdateMachine({ variables });
        }
    };

    // ===================== BAN MACHINE QUERY =====================
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
                    reason: "null"
                }
            })

        }
    }

    // qrcode
    const [imgUrl, setImgUrl] = useState(''); // for qr code generation
    const generateQrCode = async (inputText) => {
        try {
            const response = await QRCode.toDataURL(inputText);
            setImgUrl(response);
        } catch (error) {
            console.log(error);
        }
    }



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
                                            <Box display={"flex"} >
                                                <Box width={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography variant="h2" sx={{ fontSize: "2rem", fontWeight: "600", color: colors.grey[200] }}>
                                                        {modalTitle}
                                                    </Typography>
                                                    {(() => {
                                                        if (status === "disable") {
                                                            return (
                                                                <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem 0" }}>
                                                                    {t('disable')}
                                                                </Typography>)
                                                        }
                                                        else if (status === "banned") {
                                                            return (
                                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem 0" }}>
                                                                    {t('banned')}
                                                                </Typography>)
                                                        }
                                                        else if (status === "removed") {
                                                            return (
                                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem 0" }}>
                                                                    {t('deleted')}
                                                                </Typography>)
                                                        }
                                                        else {
                                                            return (
                                                                <Typography variant="h5" color={colors.greenAccent[300]} sx={{ margin: ".5rem 0" }}>
                                                                    {t('normal')}
                                                                </Typography>)
                                                        }
                                                    })()}
                                                </Box>

                                                <Box display={"flex"} justifyContent={"center"} padding={".5rem"} flexDirection={"column"} >
                                                    {
                                                        imgUrl ?
                                                            <a href={imgUrl} download={initialValues.name + ".jpg"}>
                                                                <img src={imgUrl} alt="qrcode" width={"100px"} height={"auto"} />
                                                            </a> : null
                                                    }
                                                    <Typography variant="h5" color={colors.grey[500]} sx={{ textAlign: "center", fontSize: "10px", margin: "0rem .5rem" }}>
                                                        Click to download
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {/* <Box>
                                                {props.id}
                                            </Box> */}



                                            <Box display={"flex"} justifyContent={"center"}>
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('machine_name')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.name}
                                                    name="name"
                                                    error={!!touched.name && !!errors.name}
                                                    helperText={touched.name && errors.name}
                                                    sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />

                                                <FormControl sx={{ minWidth: 150 }}>
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
                                                        <MenuItem value={"normal"}>{t('normal')}</MenuItem>
                                                        <MenuItem value={"disable"}>{t('disable')}</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <TextField className="modal_input_textfield"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="NFC"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.nfc}
                                                name="nfc"
                                                error={!!touched.nfc && !!errors.nfc}
                                                helperText={touched.nfc && errors.nfc}
                                                sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                            />
                                            <TextField className="modal_input_textfield"
                                                fullWidth
                                                disabled={true}
                                                variant="filled"
                                                type="text"
                                                label="UUID"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.UUID}
                                                name="UUID"
                                                error={!!touched.UUID && !!errors.UUID}
                                                helperText={touched.UUID && errors.UUID}
                                                sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                            />

                                            <Box display={"flex"} justifyContent={"center"}>

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
                                                    label="QR Code Payload"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.qrCode}
                                                    name="qrCode"
                                                    error={!!touched.qrCode && !!errors.qrCode}
                                                    helperText={touched.qrCode && errors.qrCode}
                                                    sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>
                                            <Box display={"flex"} gap={"1rem"}>
                                                <TextField
                                                    fullWidth
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
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('description')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.desc}
                                                    name="desc"
                                                    error={!!touched.desc && !!errors.desc}
                                                    helperText={touched.desc && errors.desc}
                                                    sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <FormControl
                                                    fullWidth>
                                                    <InputLabel id="demo-simple-select-label" >{t('only_wallet')}</InputLabel>
                                                    <Select
                                                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={onlyWallet}
                                                        label="Only wallet"
                                                        onChange={handleOnlyWalletChange}
                                                    >
                                                        <MenuItem value={true}>{t('yes')}</MenuItem>
                                                        <MenuItem value={false}>{t('no')}</MenuItem>
                                                    </Select>
                                                </FormControl>

                                            </Box>

                                            {(entityName === "store") && (
                                                <FormControl sx={{ mb: "1rem", width: "100%" }}>
                                                    <InputLabel id="demo-simple-select-label" >{t('bonus_game')}</InputLabel>
                                                    <Select
                                                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={selectedBonusGame.id}
                                                        label="bonusGameListFilter"
                                                        onChange={handleBonusGameListChange}
                                                    >
                                                        {bonusGameList.map((item, i) => (
                                                            <MenuItem
                                                                value={item.id}
                                                                key={`${i}`}
                                                            >
                                                                {item.id} - {item.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            )}





                                            <Typography variant="h5" sx={{ margin: "1rem 0 .5rem 0", color: "white" }}>{t('counter_check_title')}</Typography>
                                            <Box>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={counterCheck}
                                                            onChange={handleCounterCheckChange}
                                                            name="counterCheck"
                                                            color="success"
                                                        />
                                                    }
                                                    label={t('counter_check')}
                                                    style={{ color: colors.grey[100] }}
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={countersToggle}
                                                            onChange={handleCountersToggleChange}
                                                            name="countersToggle"
                                                            color="success"
                                                        />
                                                    }
                                                    label={t('counter')}
                                                    style={{ color: colors.grey[100] }}
                                                />
                                            </Box>

                                            <Box display={countersToggle ? "block" : "none"}>
                                                <Box display={"flex"}>
                                                    <TextField
                                                        fullWidth
                                                        variant="filled"
                                                        type="number"
                                                        label="入錶"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.coin}
                                                        name="coin"
                                                        error={!!touched.coin && !!errors.coin}
                                                        helperText={touched.coin && errors.coin}
                                                        sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        variant="filled"
                                                        type="number"
                                                        label="出錶"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.gift}
                                                        name="gift"
                                                        error={!!touched.gift && !!errors.gift}
                                                        helperText={touched.gift && errors.gift}
                                                        sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                    />
                                                </Box>
                                            </Box>



                                        </Box>
                                        <Box display="flex" justifyContent="center" >
                                            <Box display="flex" justifyContent="center" >
                                                <Button onClick={handleDelete} id={values.id} variant="contained" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #ff2f00" }}>
                                                    <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                                                        {deleteTitle}
                                                    </Typography>
                                                </Button>

                                                {entityName === 'company' ? (
                                                    values.status === "banned" ? (
                                                        <Button onClick={handleUnBan} id={values.id} variant="contained" sx={{
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
                                                        <ConfirmModal props={{ type: "machine", id: props.id }} />
                                                    )
                                                ) : null}


                                                {/* {values.status === "banned" ? (
                                                    <Button onClick={handleUnBan} id={values.id} variant="contained" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #fff" }}>
                                                        <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                                                            {unbanTitle}
                                                        </Typography>
                                                    </Button>
                                                ) : (
                                                    <ConfirmModal props={{ type: "machine", id: props.id }} />
                                                )} */}

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
