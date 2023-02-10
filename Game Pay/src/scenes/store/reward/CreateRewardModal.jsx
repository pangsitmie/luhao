import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { useQuery, useMutation } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "src/components/Modal/modal.css";
import { tokens } from "src/theme";
import { CreteStorePhysicalReward } from "src/graphQL/Mutations";
import { GetBrandList } from "src/graphQL/Queries";
import { BRAND_CreateCurrencyReward } from "src/graphQL/BrandPrincipalMutations";
import { useDispatch, useSelector } from "react-redux";
import { BRAND_GetBrandCurrencyList, BRAND_GetBrandInfo } from "src/graphQL/BrandPrincipalQueries";



const checkoutSchema = yup.object().shape({
    // triggerAt: yup.string().required("required"),
    // expireAt: yup.string().required("required"),

    currencyAmount: yup.number().required("required"),
    receiveDaysOverdue: yup.number().required("required"),
    rewardLimit: yup.number().required("required"),
    rewardDescription: yup.string().required("required"),

    // startAt: yup.string().required("required"),
    // endAt: yup.string().required("required"),
});


export default function CreateRewardModal() {
    const { entityName } = useSelector((state) => state.entity);

    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //========================== INITIAL VALUES ==========================
    var btnTitle = "新增", confirmTitle = "新增", deleteTitle = "取消";
    const [modal, setModal] = useState(false); //open or close modal
    const toggleModal = () => {
        setModal(!modal);
    };

    const [startAtDate, setStartAtDate] = useState('');
    function handleStartAtDateChange(event) {
        setStartAtDate(event.target.value);
    }

    const [endAtDate, setEndAtDate] = useState('');
    function handleEndAtDateChange(event) {
        setEndAtDate(event.target.value);
    }

    //========================== INITIAL VALUES ==========================
    const [initialValues, setInitialValues] = useState({
        title: "",
        content: "",
        comment: "",
        rewardId: "",
        triggerAtDate: "",
        expireAtDate: "",
        currencyID: "",
        currencyName: "",
        currencyAmount: "",
        receiveDaysOverdue: "",
        rewardLimit: "",
        rewardDescription: "",
        rewardStatus: "",
        startAt: "",
        endAt: "",
    });

    //========================== GRAPHQL ==========================

    let GET_BRAND_LIST_QUERY;
    let CREATE_FREE_REWARD_MUTATION;

    switch (entityName) {
        case 'company':
            GET_BRAND_LIST_QUERY = GetBrandList;
            CREATE_FREE_REWARD_MUTATION = CreteStorePhysicalReward;
            break;
        case 'brand':
            GET_BRAND_LIST_QUERY = BRAND_GetBrandCurrencyList;
            CREATE_FREE_REWARD_MUTATION = BRAND_CreateCurrencyReward;
            break;
        default:
            break;
    }

    const [ApolloCreateBrandFreeCoinNotification, { loading, error, data }] = useMutation(CREATE_FREE_REWARD_MUTATION);
    useEffect(() => {
        if (data) {
            window.location.reload();
        }
    }, [data]);


    const { loading: loading1, error: error1, data: data1 } = useQuery(GET_BRAND_LIST_QUERY);
    useEffect(() => {
        if (data1) {
            switch (entityName) {
                case 'company':
                    setBrandList(data1.managerGetBrands);
                    break;
                case 'brand':
                    setBrandList(data1.getBrandPrincipal.brands);
                    break;
                default:
                    break;
            }
        }
    }, [data1]);

    const [{ brandId, brandName, brandCoinId, brandCoinName }, setBrandInfo] = useState({
        brandId: "null",
        brandName: "null",
        brandCoinId: "null",
        brandCoinName: "null",
    });
    const [brandListFilter, setBrandListFilter] = useState('');
    const [brandList, setBrandList] = useState([]);

    const handleBrandListChange = (e) => {
        const targetId = e.target.value;
        console.log(targetId);

        //find the brand id from brand list
        const brand = brandList.find(brand => brand.id === targetId);

        if (brand) {
            setBrandListFilter(targetId);
            setBrandInfo({
                brandId: targetId,
                brandName: brand.name,
                brandCoinId: brand.currency.id,
                brandCoinName: brand.currency.name,
            });
            console.log(brand);
        }
    };







    const handleFormSubmit = (values) => {
        const startAtDateObj = new Date(startAtDate);
        const endAtDateObj = new Date(endAtDate);

        let startAtUnix = startAtDateObj.getTime() / 1000;
        let endAtUnix = endAtDateObj.getTime() / 1000;

        let nowUnix = Math.floor(Date.now() / 1000);


        const variables = {
            sourceType: "physicalStoreCheckIn",
            belongToRole: "store",
            belongToId: "1",
            amount: 1,
            amount: parseInt(values.currencyAmount),
            currencyId: brandCoinId,
            description: values.rewardDescription,
            receiveDaysOverdue: parseInt(values.receiveDaysOverdue),

            limit: parseInt(values.rewardLimit),
            description: values.comment,
        }

        //check if startAtUnix is filled

        if (isNaN(startAtUnix)) {
            startAtUnix = nowUnix;
        }

        //insert startAtUnix to variables
        variables.startAt = startAtUnix;

        //insert endAtUnix to variables if it is selected
        if (!isNaN(endAtUnix)) {
            variables.endAt = endAtUnix;
        }


        if (endAtUnix < startAtUnix) {
            alert("End date must be greater than start date");
            return;
        }

        console.log(variables);

        // ApolloCreateBrandFreeCoinNotification({ variables });

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
                            <Typography variant="h2" sx={{ mb: "2rem", textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: "white" }}>
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
                                            <Box display={"flex"} justifyContent={"space-between"}>
                                                <FormControl sx={{ minWidth: 165, height: "100%" }}>
                                                    <InputLabel id="demo-simple-select-label" >品牌過濾</InputLabel>
                                                    <Select
                                                        sx={{ borderRadius: "10px", background: colors.primary[400], height: "100%", width: "auto" }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={brandListFilter}
                                                        label="brandListFilter"
                                                        onChange={handleBrandListChange}
                                                    >
                                                        {brandList.map((brand, i) => (
                                                            <MenuItem
                                                                value={brand.id}
                                                                key={`${i}`}
                                                            >
                                                                {brand.id} - {brand.name} - {brand.currency.id} - {brand.currency.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>

                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label="獎勵描述"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.rewardDescription}
                                                    name="rewardDescription"
                                                    error={!!touched.rewardDescription && !!errors.rewardDescription}
                                                    helperText={touched.rewardDescription && errors.rewardDescription}
                                                    sx={{ margin: "0rem 0rem 1rem 1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>

                                            <Box display={"flex"} justifyContent={"space-between"}>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label="數量"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.currencyAmount}
                                                    name="currencyAmount"
                                                    error={!!touched.currencyAmount && !!errors.currencyAmount}
                                                    helperText={touched.currencyAmount && errors.currencyAmount}
                                                    sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label="最大發送次數"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.rewardLimit}
                                                    name="rewardLimit"
                                                    error={!!touched.rewardLimit && !!errors.rewardLimit}
                                                    helperText={touched.rewardLimit && errors.rewardLimit}
                                                    sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="number"
                                                    label="獎勵使用期限"
                                                    placeholder="Null是不限制"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.receiveDaysOverdue}
                                                    name="receiveDaysOverdue"
                                                    error={!!touched.receiveDaysOverdue && !!errors.receiveDaysOverdue}
                                                    helperText={touched.receiveDaysOverdue && errors.receiveDaysOverdue}
                                                    sx={{ margin: "0rem 0rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>


                                            <Box display={"flex"} justifyContent={"space-between"}>
                                                <TextField
                                                    fullWidth
                                                    id="datetime-local"
                                                    label="獎勵開始時間"
                                                    type="datetime-local"
                                                    // defaultValue="2017-05-24T10:30"
                                                    value={startAtDate}
                                                    onChange={handleStartAtDateChange}
                                                    sx={{ marginBottom: "1rem", mr: '1rem' }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    id="datetime-local"
                                                    label="獎勵結束時間"
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


                                        </Box>
                                        <Box display="flex" justifyContent="center" >
                                            <Button className="my-button" type="submit">{confirmTitle}</Button>
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
    );
}
