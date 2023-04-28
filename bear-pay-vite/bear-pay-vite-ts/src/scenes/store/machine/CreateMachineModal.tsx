import { useState, useEffect } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { DocumentNode, useMutation } from "@apollo/client";

import { useTranslation } from 'react-i18next';
import { CreateMachineForManager } from "../../../graphQL/Mutations";
import { useSelector } from "react-redux";
import { BRAND_CreateMachine } from "../../../graphQL/BrandPrincipalMutations";
import { STORE_CreateMachine } from "../../../graphQL/StorePrincipalMutation";
import Store from "../../../types/Store";
import { RootState } from "../../../redux/store";

import "../../../components/Modal/modal.css";
import { tokens } from "../../../theme";

// {店面id、機台碼、NFCID、機台名稱、機台單次花費金額、備註}


type Props = {
    props: Store;
};

interface FormValues {
    storeId: string;
    storeName: string;

    name: string;
    code: string;
    nfc: string;
    price: string;
    description: string;
    counterCoin: string;
    counterGift: string;
}


const checkoutSchema = yup.object().shape({
    storeId: yup.string().required("店面id必填"),
    name: yup.string().required("機台名稱必填"),
    code: yup.string().required("機台碼必填"),
    // nfc: yup.string().required("NFCID必填"),
    price: yup.string().required("機台單次花費金額必填"),
    // description: yup.string().required("備註必填"),
});

export default function CreateMachineModal({ props }: Props) {
    const { entityName } = useSelector((state: RootState) => state.entity);

    const { t } = useTranslation();
    const theme = useTheme();

    let CREATE_MACHINE_MUTATION: DocumentNode = CreateMachineForManager;
    switch (entityName) {
        case 'company':
            CREATE_MACHINE_MUTATION = CreateMachineForManager;
            break;
        case 'brand':
            CREATE_MACHINE_MUTATION = BRAND_CreateMachine;
            break;
        case 'store':
            CREATE_MACHINE_MUTATION = STORE_CreateMachine;
            break;
        default:
            break;
    }



    const colors = tokens(theme.palette.mode);
    const [modal, setModal] = useState(false);
    const [counterCheck, setCounterCheck] = useState(true);
    const handleCounterCheckChange = (event: any) => {
        setCounterCheck(event.target.checked);
    };

    const [countersToggle, setCountersToggle] = useState(false);
    const handleCountersToggleChange = (event: any) => {
        setCountersToggle(event.target.checked);
    };

    const [onlyWallet, setOnlyWallet] = useState<string>("false");
    const handleOnlyWalletChange = (event: SelectChangeEvent<string>) => {
        setOnlyWallet(event.target.value);
    };

    var btnTitle = t("add_new"), confirmTitle = t("confirm");

    const [initialValues, setInitialValues] = useState<FormValues>({
        storeId: "",
        storeName: "",
        name: "",
        nfc: "",
        code: "",
        price: "",
        description: "",
        counterCoin: "",
        counterGift: ""
    });





    // GQL
    const [ApolloCreateMachine, { loading, error, data }] = useMutation(CREATE_MACHINE_MUTATION);
    useEffect(() => {
        if (data) {
            console.log(data.getStore);
            window.location.reload();
        }
        if (error) {
            console.log(error);
        }
        if (loading) {
            console.log(loading);
        }
    }, [data]);

    const handleFormSubmit = (values: FormValues) => {
        const variables: any = {
            storeId: props.id,
            name: values.name,
            code: values.code,
            price: parseInt(values.price),
            counterCheck: counterCheck,
            onlyWallet: onlyWallet === "true" ? true : false,
        };
        if (values.nfc !== "") {
            variables.nfc = values.nfc;
        }
        if (values.description !== "") {
            variables.description = values.description;
        }
        if (countersToggle) {
            variables.counters = [
                {
                    counterType: "coin",
                    count: parseInt(values.counterCoin)
                },
                {
                    counterType: "gift",
                    count: parseInt(values.counterGift)
                }
            ]
        }

        console.log(variables);
        ApolloCreateMachine({ variables });
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
                            <Typography variant="h2" sx={{ mb: "30px", textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: colors.grey[200] }}>
                                {btnTitle}
                            </Typography>

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
                                            <Box display={"flex"}>
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    required
                                                    label={t('store_id')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.storeId}
                                                    name="storeId"
                                                    error={!!touched.storeId && !!errors.storeId}
                                                    helperText={touched.storeId && errors.storeId}
                                                    sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    required
                                                    label={t('store_name')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.storeName}
                                                    name="storeName"
                                                    error={!!touched.storeName && !!errors.storeName}
                                                    helperText={touched.storeName && errors.storeName}
                                                    sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                            </Box>
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label={`${t('machine_code')}`}
                                                placeholder={"查帳小卡的十位數機台碼"}
                                                onBlur={handleBlur}
                                                required
                                                onChange={handleChange}
                                                value={values.code}
                                                name="code"
                                                error={!!touched.code && !!errors.code}
                                                helperText={touched.code && errors.code}
                                                sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                required
                                                label={`${t('machine_name')}`}
                                                placeholder={"自定義的機台編號"}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                name="name"
                                                error={!!touched.name && !!errors.name}
                                                helperText={touched.name && errors.name}
                                                sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label={`NFC ${t('optional')}`}
                                                placeholder="用於APP支付用的機台辨識標籤, 需額外向公司申請NFC ID tag"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.nfc}
                                                name="nfc"
                                                error={!!touched.nfc && !!errors.nfc}
                                                helperText={touched.nfc && errors.nfc}
                                                sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />
                                            <Box display={"flex"} gap={"1rem"}>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    required
                                                    label={t('amount_spent_per_machine')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.price}
                                                    placeholder={"Bear Pay支付金額, 啟動一次機台所需要的枚數"}
                                                    name="price"
                                                    error={!!touched.price && !!errors.price}
                                                    helperText={touched.price && errors.price}
                                                    sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={`${t('description')} ${t('optional')}`}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.description}
                                                    name="description"
                                                    error={!!touched.description && !!errors.description}
                                                    helperText={touched.description && errors.description}
                                                    sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />

                                                <FormControl
                                                    fullWidth>
                                                    <InputLabel id="demo-simple-select-label" >Only wallet</InputLabel>
                                                    <Select
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





                                            <Typography variant="h4" sx={{ margin: "1rem 0 .5rem 0", color: "white" }}>{t('counter_check')}</Typography>
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
                                                        value={values.counterCoin}
                                                        name="counterCoin"
                                                        error={!!touched.counterCoin && !!errors.counterCoin}
                                                        helperText={touched.counterCoin && errors.counterCoin}
                                                        sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        variant="filled"
                                                        type="number"
                                                        label="出錶"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.counterGift}
                                                        name="counterGift"
                                                        error={!!touched.counterGift && !!errors.counterGift}
                                                        helperText={touched.counterGift && errors.counterGift}
                                                        sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                    />
                                                </Box>
                                            </Box>
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
