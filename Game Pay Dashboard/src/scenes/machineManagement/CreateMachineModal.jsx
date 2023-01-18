import React, { useState, useEffect } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { useLazyQuery } from "@apollo/client";
import { CreateMachineFromGetStores } from "../../graphQL/Queries";

// {店面id、機台碼、NFCID、機台名稱、機台單次花費金額、備註}

const checkoutSchema = yup.object().shape({
    storeId: yup.string().required("店面id必填"),
    name: yup.string().required("機台名稱必填"),
    code: yup.string().required("機台碼必填"),
    price: yup.string().required("機台單次花費金額必填"),
    // description: yup.string().required("備註必填"),
});


export default function CreateMachineModal({ props }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [modal, setModal] = useState(false);
    const [counterCheck, setCounterCheck] = useState(true);
    const handleCounterCheckChange = (event) => {
        setCounterCheck(event.target.value);
    };

    const [countersToggle, setCountersToggle] = useState(false);
    const handleCountersToggleChange = (event) => {
        setCountersToggle(event.target.checked);
    };


    var btnTitle = "新增", confirmTitle = "新增", cancelTitle = "取消";

    const initialValues = {
        storeId: "",
        storeName: "",
        name: "",
        code: "",
        price: "",
        description: "",
        counterCoin: "",
        counterGift: ""
    };

    initialValues.storeId = props.id;
    initialValues.storeName = props.name;



    // GQL
    const [ApolloCreateMachineFromGetStores, { loading, error, data }] = useLazyQuery(CreateMachineFromGetStores);
    useEffect(() => {
        if (data) {
            console.log(data.getStore);
            window.location.reload();
        }
    }, [data]);

    const handleFormSubmit = (values) => {
        const variables = {
            args: [
                {
                    id: props.id
                }
            ],
            name: values.name,
            code: values.code,
            price: parseInt(values.price),
            counterCheck: counterCheck
        };
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
        ApolloCreateMachineFromGetStores({ variables });
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
                            {initialValues.username}
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
                                                    label="店面id"
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
                                                    label="店面名稱"
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
                                                label="機台號碼"
                                                onBlur={handleBlur}
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
                                                label="機台名稱"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                name="name"
                                                error={!!touched.name && !!errors.name}
                                                helperText={touched.name && errors.name}
                                                sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                            />
                                            <Box display={"flex"}>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label="價格 (枚數)"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.price}
                                                    name="price"
                                                    error={!!touched.price && !!errors.price}
                                                    helperText={touched.price && errors.price}
                                                    sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label="備註"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.description}
                                                    name="description"
                                                    error={!!touched.description && !!errors.description}
                                                    helperText={touched.description && errors.description}
                                                    sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />

                                            </Box>



                                            <FormControl
                                                fullWidth>
                                                <InputLabel id="demo-simple-select-label" >機械錶檢查</InputLabel>
                                                <Select
                                                    sx={{ borderRadius: "10px", background: colors.primary[400] }}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={counterCheck}
                                                    label="機械錶檢查"
                                                    onChange={handleCounterCheckChange}
                                                >
                                                    <MenuItem value={true}>是</MenuItem>
                                                    <MenuItem value={false}>否</MenuItem>
                                                </Select>
                                            </FormControl>

                                            <Typography variant="h4" sx={{ margin: "1rem 0 .5rem 0", color: "white" }}>機械錶</Typography>
                                            <Box>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={countersToggle}
                                                            onChange={handleCountersToggleChange}
                                                            name="countersToggle"
                                                            color="success"
                                                        />
                                                    }
                                                    label="機械錶"
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

                                            <Button type="submit" color="success" variant="contained" sx={{ minWidth: "8rem", padding: ".55rem 1rem", margin: ".5rem .5rem 0 .5rem", borderRadius: "8px", background: colors.blueAccent[400] }}>
                                                <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                                                    {confirmTitle}
                                                </Typography>
                                            </Button>
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
