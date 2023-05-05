import { useState, useEffect } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useQuery, useMutation, DocumentNode } from '@apollo/client'
import { tokens } from "../../../theme";
import { GetMachineCommodity, HealthCheck } from "../../../graphQL/Queries";
import { getRESTEndpoint, replaceNullWithEmptyString } from "../../../utils/Utils";
import { useTranslation } from 'react-i18next';
import { bindCommodityToMachine } from "../../../graphQL/Mutations";
import { BRAND_BindCommodity } from "../../../graphQL/BrandPrincipalMutations";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { STORE_BindCommodityToMachine } from "../../../graphQL/StorePrincipalMutation";
import { Machine } from "../../../types/Machine";
import Store from "../../../types/Store";
import { RootState } from "../../../redux/store";
import Commodity from "../../../types/Commodity";
import "../../../components/Modal/modal.css";


type Props = {
    props: Machine;
    storeData: Store;
    onUpdate: () => void;
};

interface FormValues {
    id: string;
    uuid?: string;
    name: string;
    price: number;
    stock: number;
}

const checkoutSchema = yup.object().shape({
    // name: yup.string().required("required"),
    price: yup.number().required("required"),
    stock: yup.number().required("required"),
    // desc: yup.string().required("required"),
});


export default function MachineCommodityListModal({ props, storeData, onUpdate }: Props) {
    const { entityName } = useSelector((state: RootState) => state.entity);
    const { t } = useTranslation();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    var btnTitle = t('link_product'), confirmTitle = t('update');


    const [modal, setModal] = useState(false);
    //REF




    const [initialValues] = useState<FormValues>({
        id: "",
        uuid: "",
        name: "",
        price: 0,
        stock: 0,
    });

    // =================== COMMODITY LIST ===================
    const [selectedCommodity, setSelectedCommodity] = useState<FormValues>({
        id: "null",
        name: "null",
        price: 0,
        stock: 0,
    });

    // const [commodityListFilter, setCommodityListFilter] = useState<string>('');
    const [commodityList, setCommodityList] = useState<Commodity[]>([]);


    const { refetch: refetchHealthCheck } = useQuery(HealthCheck);
    const REST_FetchCommodityList = async () => {
        const MAX_RETRY_ATTEMPTS = 3;
        let retryCount = 0;

        while (retryCount < MAX_RETRY_ATTEMPTS) {
            try {
                // setLoadingState(true);

                let URI = `${getRESTEndpoint()}/commodity/getList`;

                const response = await axios.post(
                    URI,
                    {
                        storeId: storeData.id,
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("token")}`,
                            'Content-Type': "application/json",
                        },
                    }
                );

                if (response.data && response.data.data) {
                    console.log(response.data.data);
                    setCommodityList(response.data.data);
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
                await new Promise(resolve => setTimeout(resolve, 1500)); // wait for 1 second before retrying
            }
        }

        if (retryCount === MAX_RETRY_ATTEMPTS) {
            console.log(`Maximum retry attempts (${MAX_RETRY_ATTEMPTS}) exceeded.`);
        }
    };


    useEffect(() => {
        if (modal) {
            REST_FetchCommodityList();
        }
    }, [modal]);




    const handleCommodityListChange = (e: SelectChangeEvent<string>) => {
        const targetId = e.target.value;

        //find the brand id from brand list
        const item = commodityList.find(item => item.id === targetId);

        if (item) {
            // setCommodityListFilter(targetId);
            setSelectedCommodity({
                id: targetId,
                name: item.name,
                price: item.price,
                stock: item.stock,
            });
        }
    };


    // ===================== INITIAL VALUES FROM GETMACHINE =====================
    const { data: data3, refetch } = useQuery(GetMachineCommodity
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
            console.log("RETRIEVED DATA FROM GetMachineCommodity");
            console.log(data3);
            const nonNullData = replaceNullWithEmptyString(data3.getMachine[0].commodity);
            setSelectedCommodity({
                id: nonNullData.id,
                name: nonNullData.name,
                price: nonNullData.price,
                stock: nonNullData.stock,
            });
        }
    }, [data3]);


    let BIND_COMMODITY_MUTATION: DocumentNode = bindCommodityToMachine;
    switch (entityName) {
        case 'company':
            BIND_COMMODITY_MUTATION = bindCommodityToMachine;
            break;
        case 'brand':
            BIND_COMMODITY_MUTATION = BRAND_BindCommodity;
            break;
        case 'store':
            BIND_COMMODITY_MUTATION = STORE_BindCommodityToMachine;
            break;
        default:
            break;
    }



    // UPDATE BRAND MUTATION
    const [ApolloBindCommodityToMachine, { loading: loading4, error: error4, data: data4 }] = useMutation(BIND_COMMODITY_MUTATION);
    useEffect(() => {
        if (data4) {
            onUpdate();
            refetch();
            toast.success(t('update_success'));
            // window.location.reload();
        }
        if (loading4) {
            console.log(t('loading'));
        }
        if (error4) {
            console.log(error4);
        }
    }, [data4, loading4, error4]);



    const handleFormSubmit = () => {
        const variables = {
            machineId: props.id,
            commodityId: selectedCommodity.id,
        };
        // console.log(variables);
        ApolloBindCommodityToMachine({ variables });
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
                            <Formik
                                onSubmit={handleFormSubmit}
                                initialValues={initialValues}
                                validationSchema={checkoutSchema}
                                enableReinitialize={true}
                            >
                                {({
                                    errors,
                                    touched,
                                    handleBlur,
                                    handleChange,
                                    handleSubmit,
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Box color={"black"} >

                                            <Box  >
                                                <Typography variant="h2" sx={{ fontSize: "2rem", fontWeight: "600", color: colors.grey[200], mb: "1rem" }}>
                                                    {btnTitle}
                                                </Typography>
                                            </Box>


                                            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label="ID"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={selectedCommodity.id}
                                                    name="ID"
                                                    error={!!touched.uuid && !!errors.uuid}
                                                    helperText={touched.uuid && errors.uuid}
                                                    sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={t('product_name')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={selectedCommodity.name}
                                                    name="name"
                                                    error={!!touched.name && !!errors.name}
                                                    helperText={touched.name && errors.name}
                                                    sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                                <FormControl sx={{ minWidth: 150, mb: "1rem" }}>
                                                    <InputLabel id="demo-simple-select-label" >{t('product_filter')}</InputLabel>
                                                    <Select
                                                        sx={{ borderRadius: "10px", background: colors.primary[400], width: "auto" }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={selectedCommodity.id}
                                                        label="commodityListFilter"
                                                        onChange={handleCommodityListChange}
                                                    >
                                                        {commodityList.map((item, i) => (
                                                            <MenuItem
                                                                value={item.id}
                                                                key={`${i}`}
                                                            >
                                                                {item.id} - {item.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="number"
                                                    label={t('price')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={selectedCommodity.price}
                                                    name="price"
                                                    required
                                                    error={!!touched.price && !!errors.price}
                                                    helperText={touched.price && errors.price}
                                                    sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="number"
                                                    label={t('stock')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={selectedCommodity.stock}
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
                                                <Button type="submit" color="success" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", background: colors.grey[100] }}>
                                                    <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: colors.grey[700] }}>
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
