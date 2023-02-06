import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
// import useMediaQuery from "@mui/material/useMediaQuery";
import { useQuery, useLazyQuery } from '@apollo/client'
import "src/components/Modal/modal.css";
import { tokens } from "src/theme";
import { GetMachineCommodity, GetCommodityList, RemoveMachine, UnBanMachine, ConnectCommodityToMachine } from "src/graphQL/Queries";
import { replaceNullWithEmptyString } from "src/utils/Utils";



const checkoutSchema = yup.object().shape({
    // name: yup.string().required("required"),
    price: yup.number().required("required"),
    stock: yup.number().required("required"),
    // desc: yup.string().required("required"),
});


export default function MachineCommodityListModal({ props, storeData }) {
    // console.log("STORE DATA: " + storeData.id);
    // console.log(props.id); // this is the machine id
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [modal, setModal] = useState(false);
    //REF
    const [status, setStatus] = useState('disable');
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };



    var btnTitle = "綁定商品", confirmTitle = "更新", deleteTitle = "移除", banTitle = "封鎖", unbanTitle = "解封";
    const [initialValues, setInitialValues] = useState({
        id: 0,
        uuid: "",
        name: "",
        price: 0,
        stock: 0,
    });

    // =================== COMMODITY LIST ===================
    const [selectedCommodity, setSelectedCommodity] = useState({
        id: "null",
        name: "null",
        price: 0,
        stock: 0,
    });
    const { loading: loading1, error: error1, data: data1 } = useQuery(GetCommodityList, {
        variables: {
            args: [
                {
                    id: storeData.id
                }
            ],
        }
    });
    const [commodityListFilter, setCommodityListFilter] = useState('');
    const [commodityList, setCommodityList] = useState([]);
    useEffect(() => {
        if (data1) {
            console.log(data1.getStore[0].commodities);
            setCommodityList(data1.getStore[0].commodities);
        }

    }, [data1]);
    const handleCommodityListChange = (e) => {
        const targetId = e.target.value;

        //find the brand id from brand list
        const item = commodityList.find(item => item.id === targetId);

        if (item) {
            setCommodityListFilter(targetId);
            setSelectedCommodity({
                id: targetId,
                name: item.name,
                price: item.price,
                stock: item.stock,
            });
        }
    };


    // ===================== INITIAL VALUES FROM GETMACHINE =====================
    const { loading: loading3, error: error3, data: data3 } = useQuery(GetMachineCommodity
        , {
            variables: {
                args: [
                    {
                        id: props.id
                    }
                ],
            }
        }
    );
    useEffect(() => {
        if (data3) {
            console.log(data3.getMachine[0].commodity);
            const nonNullData = replaceNullWithEmptyString(data3.getMachine[0].commodity);
            setSelectedCommodity({
                id: nonNullData.id,
                name: nonNullData.name,
                price: nonNullData.price,
                stock: nonNullData.stock,
            });
        }
    }, [data3]);

    // UPDATE BRAND MUTATION
    const [ApolloUpdateCommodity, { loading: loading4, error: error4, data: data4 }] = useLazyQuery(ConnectCommodityToMachine);
    useEffect(() => {
        if (data4) {
            window.location.reload();
        }
    }, [data4]);



    const handleFormSubmit = (values) => {
        const variables = {
            args: [
                {
                    id: props.id,
                }
            ],
            commodityId: selectedCommodity.id,
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
                    <Box className="modal-content" backgroundColor={colors.primary[500]}>
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
                                        <Box color={"black"} >

                                            <Box display={"flex"} >
                                                <Box width={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography variant="h2" sx={{ fontSize: "2rem", fontWeight: "600", color: colors.grey[200] }}>
                                                        {btnTitle}
                                                    </Typography>
                                                    {(() => {
                                                        if (initialValues.status === "disable") {
                                                            return (
                                                                <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem 0" }}>
                                                                    停用
                                                                </Typography>)
                                                        }
                                                        else if (initialValues.status === "banned") {
                                                            return (
                                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem 0" }}>
                                                                    封鎖
                                                                </Typography>)
                                                        }
                                                        else if (initialValues.status === "removed") {
                                                            return (
                                                                <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem 0" }}>
                                                                    删除
                                                                </Typography>)
                                                        }
                                                        else {
                                                            return (
                                                                <Typography variant="h5" color={colors.greenAccent[300]} sx={{ margin: ".5rem 0" }}>
                                                                    正常
                                                                </Typography>)
                                                        }
                                                    })()}
                                                </Box>
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
                                                    error={!!touched.UUID && !!errors.UUID}
                                                    helperText={touched.UUID && errors.UUID}
                                                    sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label="商品名稱"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={selectedCommodity.name}
                                                    name="name"
                                                    error={!!touched.name && !!errors.name}
                                                    helperText={touched.name && errors.name}
                                                    sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                                <FormControl sx={{ minWidth: 150, mb: "1rem" }}>
                                                    <InputLabel id="demo-simple-select-label" >商品選擇</InputLabel>
                                                    <Select
                                                        sx={{ borderRadius: "10px", background: colors.primary[400], width: "auto" }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={commodityListFilter}
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
                                                    label="價格"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={selectedCommodity.price}
                                                    name="price"
                                                    error={!!touched.price && !!errors.price}
                                                    helperText={touched.price && errors.price}
                                                    sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="number"
                                                    label="庫存量"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={selectedCommodity.stock}
                                                    name="stock"
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
