import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useQuery, useMutation, DocumentNode } from '@apollo/client'
import { tokens } from "../../../theme";
import { GetCommodity } from "../../../graphQL/Queries";
import { replaceNullWithEmptyString } from "../../../utils/Utils";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { PatchCommodity } from "../../../graphQL/Mutations";
import { STORE_PatchCommodity } from "../../../graphQL/StorePrincipalMutation";
import { BRAND_PatchCommodity } from "../../../graphQL/BrandPrincipalMutations";
import { toast } from "react-toastify";
import Commodity from "../../../types/Commodity";
import { RootState } from "../../../redux/store";
import "../../../components/Modal/modal.css";


const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    price: yup.number().required("required"),
    stock: yup.number().required("required"),
    // desc: yup.string().required("required"),
});

type Props = {
    props: Commodity
    onUpdate: () => void
}

interface FormValues {
    id: string;
    uuid: string;
    name: string;
    price: string;
    stock: string;
}

export default function CommodityListModal({ props, onUpdate }: Props) {
    const { entityName } = useSelector((state: RootState) => state.entity);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { t } = useTranslation();
    const [modal, setModal] = useState(false);

    //REF
    var btnTitle = t("view"), modalTitle = t("details"), confirmTitle = t("update");

    const [initialValues, setInitialValues] = useState<FormValues>({
        id: "",
        uuid: "",
        name: "",
        price: "",
        stock: "",
    });





    // ===================== INITIAL VALUES FROM GETMACHINE =====================
    const { data: data3, refetch } = useQuery(GetCommodity
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
            const nonNullData = replaceNullWithEmptyString(data3.getCommodity[0]);
            setInitialValues({
                // ...initialValues,
                // ...nonNullData
                id: nonNullData.id,
                uuid: nonNullData.uuid,
                name: nonNullData.name,
                price: nonNullData.price,
                stock: nonNullData.stock,
            });
        }
    }, [data3]);


    let PATCH_COMMODITY_MUTATION: DocumentNode = PatchCommodity;
    switch (entityName) {
        case 'company':
            PATCH_COMMODITY_MUTATION = PatchCommodity;
            break;
        case 'brand':
            PATCH_COMMODITY_MUTATION = BRAND_PatchCommodity;
            break;
        case 'store':
            PATCH_COMMODITY_MUTATION = STORE_PatchCommodity;
            break;
        default:
            break;
    }
    // UPDATE BRAND MUTATION
    const [ApolloUpdateCommodity, { loading: loading4, error: error4, data: data4 }] = useMutation(PATCH_COMMODITY_MUTATION);
    useEffect(() => {
        if (data4) {
            onUpdate();
            refetch();
            toast.success(t("update_success"));
        }
        if (error4) {
            console.log(error4);
        }
        if (loading4) {
            console.log("Loading");
        }
    }, [data4]);




    const handleFormSubmit = (values: FormValues) => {
        const variables = {
            commodityId: props.id,
            name: values.name,
            price: parseInt(values.price),
            stock: parseInt(values.stock),
        };

        console.log(variables);
        ApolloUpdateCommodity({ variables });
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
                            backgroundColor: colors.primary[500]
                        }}
                    >
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
                                        <Box color={"black"} >

                                            <Box pb={"1.5rem"}>
                                                <Typography variant="h2" sx={{ fontSize: "2rem", fontWeight: "600", color: colors.grey[200] }}>
                                                    {modalTitle}
                                                </Typography>
                                            </Box>
                                            <TextField className="modal_input_textfield"
                                                fullWidth
                                                disabled={true}
                                                variant="filled"
                                                type="text"
                                                label="UUID"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.uuid}
                                                name="UUID"
                                                error={!!touched.uuid && !!errors.uuid}
                                                helperText={touched.uuid && errors.uuid}
                                                sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                            />

                                            <TextField className="modal_input_textfield"
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
                                                sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                            />
                                            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                                <TextField className="modal_input_textfield"
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
                                                    sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                                <TextField className="modal_input_textfield"
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
                                                    sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                            </Box>
                                        </Box>

                                        <Box display="flex" justifyContent="center" >
                                            <Box display="flex" justifyContent="center" >
                                                {/* <Button onClick={handleDelete} id={values.id} variant="contained" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #ff2f00" }}>
                                                    <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                                                        {deleteTitle}
                                                    </Typography>
                                                </Button> */}
                                                <Button type="submit" color="success" variant="contained" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", background: colors.grey[100] }}>
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
                </Box >
            )
            }
        </>
    )
}
