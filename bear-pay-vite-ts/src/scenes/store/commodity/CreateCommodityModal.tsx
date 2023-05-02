import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../../../theme";
import { useLazyQuery } from "@apollo/client";
import { CreateCommodity } from "../../../graphQL/Queries";
import { useTranslation } from 'react-i18next';
import Store from "../../../types/Store";
import "../../../components/Modal/modal.css";


const checkoutSchema = yup.object().shape({
    storeId: yup.string().required("店面id必填"),
    name: yup.string().required("商品名稱必填"),
    price: yup.string().required("商品價格必填"),
    stock: yup.string().required("商品庫存必填"),
    // description: yup.string().required("備註必填"),
});
type Props = {
    props: Store
}

interface FormValues {
    storeId: string;
    storeName: string;
    name: string;
    price: string;
    stock: string;
}

export default function CreateCommodityModal({ props }: Props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { t } = useTranslation();

    const [modal, setModal] = useState(false);

    var btnTitle = t("create"), confirmTitle = t("create");

    const [initialValues, setInitialValues] = useState<FormValues>({
        storeId: props.id,
        storeName: props.name,
        name: "",
        price: "",
        stock: "",
    });

    // GQL
    const [ApolloCreateCommodity, { data }] = useLazyQuery(CreateCommodity);
    useEffect(() => {
        if (data) {
            console.log(data.getStore);
            window.location.reload();
        }
    }, [data]);

    const handleFormSubmit = (values: FormValues) => {
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
                                                label={t('product_name')}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                name="name"
                                                required
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
                                                    required
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
                                                    required
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
