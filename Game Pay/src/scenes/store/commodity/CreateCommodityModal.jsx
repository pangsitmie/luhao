import React, { useState, useEffect } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import "src/components/Modal/modal.css";
import { tokens } from "src/theme";
import { useLazyQuery } from "@apollo/client";
import { CreateCommodity } from "src/graphQL/Queries";
import { useTranslation } from 'react-i18next';
// {店面id、機台碼、NFCID、機台名稱、機台單次花費金額、備註}

const checkoutSchema = yup.object().shape({
    storeId: yup.string().required("店面id必填"),
    name: yup.string().required("商品名稱必填"),
    price: yup.string().required("商品價格必填"),
    stock: yup.string().required("商品庫存必填"),
    // description: yup.string().required("備註必填"),
});


export default function CreateRewardModal({ props }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { t } = useTranslation();
    const [modal, setModal] = useState(false);
    const [counterCheck, setCounterCheck] = useState(true);
    const handleCounterCheckChange = (event) => {
        setCounterCheck(event.target.value);
    };

    const [countersToggle, setCountersToggle] = useState(false);
    const handleCountersToggleChange = (event) => {
        setCountersToggle(event.target.checked);
    };


    var btnTitle = t("create"), confirmTitle = t("create"), deleteTitle = t("delete"), banTitle = t("remove"), unbanTitle = t("ban");

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
    const [ApolloCreateCommodity, { loading, error, data }] = useLazyQuery(CreateCommodity);
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
            price: parseInt(values.price),
            stock: parseInt(values.stock)
        };

        ApolloCreateCommodity({ variables });
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
                                                label={t('product_name')}
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
                                                    type="number"
                                                    label={t('price')}
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
                                                    type="number"
                                                    label={t('stock')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.stock}
                                                    name="stock"
                                                    error={!!touched.stock && !!errors.stock}
                                                    helperText={touched.stock && errors.stock}
                                                    sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
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
