import React, { useState, useEffect, useRef } from "react";
import { Box, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GetStore, UpdateStore, RemoveStore, UnbanStore } from "../../graphQL/Queries";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { areaData } from "../../data/cityData";
import { default_cover_900x300_filename } from "../../data/strings";
import CoverUpload from "../../components/Upload/CoverUpload";
import { getImgURL, replaceNullWithEmptyString } from "../../utils/Utils";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Loader from "../../components/loader/Loader";
import Error from "../../components/error/Error";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { STORE_PatchStoreStatus, STORE_UpdateStore } from "src/graphQL/StorePrincipalMutation";
import { PatchStore } from "src/graphQL/Mutations";
import { BRAND_PatchStore } from "src/graphQL/BrandPrincipalMutations";
import { toast } from "react-toastify";

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    status: yup.string().required("required"),
    // intro: yup.string().required("required"),
    brandId: yup.string().required("required"),
    brandName: yup.string().required("required"),
    // location_address: yup.string().required("required"),
    principalName: yup.string().required("required"),
    // principalPassword: yup.string().required("required"),
    principalLineUrl: yup.string().required("required"),
    principalEmail: yup.string().email("invalid email"),
});


export default function AccountSetting({ props }) {
    const { entityName } = useSelector((state) => state.entity);
    const { t } = useTranslation();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [modal, setModal] = useState(false);




    //  ========================== PASSWORD VISIBILITY ==========================
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    var btnTitle = t("view"), modalTitle = t("your_account"), confirmTitle = t("update"), deleteTitle = t("delete"), banTitle = t("ban"), unbanTitle = t("unban");


    // ========================== CITY ==========================
    const [cityFilter, setCityFilter] = useState('');
    const [areaFilter, setAreaFilter] = useState([]); // list of area based on the city
    const [selectedArea, setSelectedArea] = useState(''); // selected area

    const handleCityChange = (event) => {
        setCityFilter(event.target.value);
        setAreaFilter(areaData[event.target.value]);
        setSelectedArea('');
    };
    const handleAreaChange = (event) => {
        setSelectedArea(event.target.value);
    };


    const [inputAddress, setInputAddress] = useState(""); // FOR DISPLAYING WHAT USER TYPE IN ADDRESS SEARCH BAR
    const [{ address, coordinates }, setLocation] = useState({
        address: "",
        coordinates: {
            lat: 0,
            lng: 120,
        }
    });


    let UPDATE_STORE_MUTATION;
    switch (entityName) {
        case 'company':
            UPDATE_STORE_MUTATION = PatchStore;
            break;
        case 'brand':
            UPDATE_STORE_MUTATION = BRAND_PatchStore;
            break;
        case 'store':
            UPDATE_STORE_MUTATION = STORE_UpdateStore;
            break;
        default:
            break;
    }


    const [initialValues, setInitialValues] = useState({
        id: -1,
        brandId: -1,
        brandName: "",
        name: "",
        intro: "",
        //locations get from location state
        status: "",


        principalName: "",
        principalAccount: "",
        principalPassword: "",
        principalLineUrl: "https://lin.ee/",
        principalEmail: "",
    });


    // =================================================================================
    // REMOVE STORE MUTATION
    const [ApolloRemoveStore, { loading, error, data }] = useLazyQuery(RemoveStore);
    useEffect(() => {
        if (data) {
            console.log("REMOVE SUCCESS");
            window.location.reload();
        }
    }, [data]);


    //UPDATE STORE MUTATION
    const [ApolloUpdateStore, { loading: loading2, error: error2, data: data2 }] = useMutation(UPDATE_STORE_MUTATION);
    useEffect(() => {
        if (data2) {
            window.location.reload();
            console.log("UPDATE SUCCESS")
        }
    }, [data2]);

    // INITIAL VALUES FROM GET STORE QUERY
    // TODO: change to the location property is causing pagination error
    const { loading: loading3, error: error3, data: data3 } = useQuery(GetStore
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
            // SET THE initial value using data3
            const nonNullData = replaceNullWithEmptyString(data3.getStore[0]);
            setInitialValues({
                id: props.id,
                status: nonNullData.status,
                name: nonNullData.name,
                intro: nonNullData.intro,
                brandId: nonNullData.brand.id,
                brandName: nonNullData.brand.name,
                // city, district, and address is used in state
                principalName: nonNullData.principal.name,
                principalAccount: nonNullData.principal.account,
                principalEmail: nonNullData.principal.email,
                principalPassword: "",
                // princiapall password doesnt receive api data
                principalLineUrl: nonNullData.principal.lineUrl,
            });

            if (data3.getStore[0].cover !== null || (data3.getStore[0].cover !== "null")) {
                setCoverFileName(data3.getStore[0].cover);
            }

            //set city
            setCityFilter(data3.getStore[0].location.city);
            //set area
            setAreaFilter(areaData[data3.getStore[0].location.city]);
            setSelectedArea(data3.getStore[0].location.district);
            //set location
            setLocation((prevState) => ({
                ...prevState,
                address: data3.getStore[0].location.address,
            }));
            //set status only if not banned
            // if (data3.getStore[0].status !== "banned") {
            //     setStatus(data3.getStore[0].status)
            // }
        }
    }, [data3]);



    const handleDelete = () => {
        console.log("DELETE");
    };







    const [coverFileName, setCoverFileName] = useState("");
    const handleUploadCoverSucess = (name) => {
        setCoverFileName(name);
    };


    const handleFormSubmit = (values) => {
        const variables = {
            // args: [
            //     {
            //         id: values.id
            //     }
            // ],
            storeId: values.id,
            name: values.name,
            cover: coverFileName,
            location: {
                city: cityFilter,
                district: selectedArea,
                address: address,
                coordinate: {
                    latitude: coordinates.lat,
                    longitude: coordinates.lng
                },
            },
            principal: {
                name: values.principalName,
                lineUrl: values.principalLineUrl,
            }
        };

        if (values.description !== "") {
            variables.location.description = values.description;
        }
        if (values.intro !== "") {
            variables.intro = values.intro;
        }
        if (values.principalEmail !== "") {
            variables.principal.email = values.principalEmail;
        }


        // if coordinate is not updated
        // if (coordinates.lat !== 0 && coordinates.lng !== 120) {
        //     variables.location.coordinate = {
        //         latitude: coordinates.lat,
        //         longitude: coordinates.lng,
        //     };
        // }

        //if password is empty, dont update password
        if (values.principalPassword !== "") {
            variables.principal.password = values.principalPassword;
        }

        //if status is not banned, update status
        // if (initialValues.status !== "banned" && entityName === "store") {
        //     variables.statusId = status;
        // }
        console.log(variables);


        ApolloUpdateStore({ variables });
    };

    const toggleModal = () => {
        setModal(!modal);
    };
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }


    if (loading) return <Loader />;
    if (error) return <Error />;

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
                                        <Box >

                                            <Box display={"flex"} m={"1rem 0"}>
                                                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography variant="h2" sx={{ mb: "10px", fontSize: "2rem", fontWeight: "600", color: "white" }}>
                                                        {modalTitle}
                                                    </Typography>


                                                </Box>


                                            </Box>


                                            <Box display={"flex"} justifyContent={"space-between"} >
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={`${t('name')}`}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalName}
                                                    name="principalName"
                                                    error={!!touched.principalName && !!errors.principalName}
                                                    helperText={touched.principalName && errors.principalName}
                                                    sx={{ marginBottom: "1rem", mr: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={`${t('email')} ${t('optional')} `}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalEmail}
                                                    name="principalEmail"
                                                    error={!!touched.principalEmail && !!errors.principalEmail}
                                                    helperText={touched.principalEmail && errors.principalEmail}
                                                    sx={{ margin: " 0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />

                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('line_url')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalLineUrl}
                                                    name="principalLineUrl"
                                                    error={!!touched.principalLineUrl && !!errors.principalLineUrl}
                                                    helperText={touched.principalLineUrl && errors.principalLineUrl}
                                                    sx={{ margin: " 0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>
                                            <Box display={"flex"} justifyContent={"space-between"} >
                                                <FormControl fullWidth variant="filled" sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }} >
                                                    <InputLabel htmlFor="filled-adornment-password">{`${t('password')} ${t('optional')}`}</InputLabel>
                                                    <FilledInput
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.principalPassword}
                                                        name="principalPassword"
                                                        error={!!touched.principalPassword && !!errors.principalPassword}
                                                        type={showPassword ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                    edge="end"
                                                                >
                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                    <FormHelperText
                                                        error={!!touched.principalPassword && !!errors.principalPassword}>
                                                        {touched.principalPassword && errors.principalPassword}
                                                    </FormHelperText>
                                                </FormControl>
                                            </Box>

                                        </Box>
                                        <Box display="flex" justifyContent="center" >
                                            <Button onClick={handleDelete} variant="contained" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #ff2f00" }}>
                                                <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                                                    {deleteTitle}
                                                </Typography>
                                            </Button>





                                            <Button type="submit" color="success" variant="contained" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", background: colors.grey[100] }}>
                                                <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: colors.grey[800] }}>
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
    );



}
