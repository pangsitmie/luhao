import { useState, useEffect } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { useQuery, useLazyQuery, useMutation, DocumentNode } from "@apollo/client";
import { GetStore, RemoveStore, UnbanStore } from "../../graphQL/Queries";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import ConfirmModal from "../../components/Modal/ConfirmModal";
import { areaData } from "../../data/cityData";
import CoverUpload from "../../components/Upload/CoverUpload";
import { getImgURL, replaceNullWithEmptyString } from "../../utils/Utils";
import Loader from "../../components/loader/Loader";
import Error from "../../components/error/Error";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { STORE_PatchStoreStatus, STORE_UpdateStore } from "../../graphQL/StorePrincipalMutation";
import { PatchStore } from "../../graphQL/Mutations";
import { BRAND_PatchStore } from "../../graphQL/BrandPrincipalMutations";
import { toast } from "react-toastify";
import Store from "../../types/Store";
import { RootState } from "../../redux/store";


type Props = {
    props: Store
    onUpdate: () => void
}

interface FormValues {
    id: string;
    brandId: string;
    brandName: string;
    name: string;
    intro: string;
    principalName: string;
    principalLineUrl: string;
    principalEmail: string;
}

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


export default function StoreListModal({ props, onUpdate }: Props) {
    const { entityName } = useSelector((state: RootState) => state.entity);
    const { t } = useTranslation();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [modal, setModal] = useState(false);


    const [status, setStatus] = useState('disable');
    const [PatchStoreStatus, { loading: loadingPatchStatus, error: errorPatchStatus, data: dataPatchStatus }] = useMutation(STORE_PatchStoreStatus);
    useEffect(() => {
        if (dataPatchStatus) {
            onUpdate();
            refetch();
            toast.success(t("status_changed"));
        }
        if (errorPatchStatus) {
            toast.error(t("update_failed"));
        }
        if (loadingPatchStatus) {
            console.log("loadingPatchStatus");
        }
    }, [dataPatchStatus]);

    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        console.log(event.target.value)
        setStatus(event.target.value);
        PatchStoreStatus({
            variables: {
                storeId: props.id,
                statusId: event.target.value
            }
        });
    };

    //  ========================== PASSWORD VISIBILITY ==========================

    var btnTitle = t("view"), modalTitle = t("details"), confirmTitle = t("update"), deleteTitle = t("delete"), unbanTitle = t("unban");


    // ========================== CITY ==========================
    const [cityFilter, setCityFilter] = useState('');
    const [areaFilter, setAreaFilter] = useState<string[]>([]); // list of area based on the city
    const [selectedArea, setSelectedArea] = useState(''); // selected area

    const handleCityChange = (event: SelectChangeEvent<string>) => {
        const selectedCity: string = event.target.value;
        const selectedAreaData: string[] = areaData[selectedCity];
        setCityFilter(selectedCity);
        setAreaFilter(selectedAreaData);
        setSelectedArea('');
    };

    const handleAreaChange = (event: SelectChangeEvent<string>) => {
        setSelectedArea(event.target.value);
    };


    const [inputAddress, setInputAddress] = useState<string>(""); // FOR DISPLAYING WHAT USER TYPE IN ADDRESS SEARCH BAR
    const [{ address, coordinates }, setLocation] = useState({
        address: "",
        coordinates: {
            lat: 0,
            lng: 120,
        }
    });


    let UPDATE_STORE_MUTATION: DocumentNode = PatchStore;
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


    const [initialValues, setInitialValues] = useState<FormValues>({
        id: "",
        brandId: "",
        brandName: "",
        name: "",
        intro: "",
        //locations get from location state
        principalName: "",
        // principalPassword: "",
        principalLineUrl: "https://lin.ee/",
        principalEmail: "",
    });


    // =================================================================================
    // REMOVE STORE MUTATION
    const [ApolloRemoveStore, { loading, error, data }] = useLazyQuery(RemoveStore);
    useEffect(() => {
        if (data) {
            onUpdate();
            toast.error(t("delete_success"));
        }
    }, [data]);


    //UPDATE STORE MUTATION
    const [ApolloUpdateStore, { error: error2, data: data2 }] = useMutation(UPDATE_STORE_MUTATION);
    useEffect(() => {
        if (data2) {
            onUpdate();
            refetch();
            if (entityName === "store") {
                toast.success(t("review_sent"));
            }
            else {
                toast.success(t("update_success"));
            }
            // window.location.reload();
        }
        if (error2) {
            console.log(error2);
            toast.warning(t("update_failed"));
        }
    }, [data2]);

    // INITIAL VALUES FROM GET STORE QUERY
    const { data: data3, refetch } = useQuery(GetStore
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
            // SET THE initial value using data3
            const nonNullData = replaceNullWithEmptyString(data3.getStore[0]);
            setInitialValues({
                id: props.id,
                name: nonNullData.name,
                intro: nonNullData.intro,
                brandId: nonNullData.brand.id,
                brandName: nonNullData.brand.name,
                principalName: nonNullData.principal.name,
                principalEmail: nonNullData.principal.email,

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
            if (data3.getStore[0].status !== "banned") {
                setStatus(data3.getStore[0].status)
            }
        }
    }, [data3]);





    const handleLocationSelect = async (value: any) => {
        const results = await geocodeByAddress(value);
        const formattedAddress = results[0].address_components[0].long_name + results[0].address_components[1].long_name;
        const latLng = await getLatLng(results[0]);
        const city = results[0].address_components[4].long_name;
        const district = results[0].address_components[3].long_name;

        if (value.description) {
            setInputAddress(value.description);
        }

        setLocation({
            address: formattedAddress,
            coordinates: latLng
        });

        if (city in areaData) {
            setCityFilter(city); // SET THE CITY FILTER TO THE CITY OF THE SELECTED LOCATION
            // SET THE AREA FILTER TO THE AREA OF THE SELECTED LOCATION
            setAreaFilter(areaData[city]);
            setSelectedArea(district); // SET THE SELECTED AREA TO THE AREA OF THE SELECTED LOCATION
        }

        console.log("city" + city + "district" + district + "Coordinate:" + latLng.lat + "," + latLng.lng);
        //this.props.onAddressSelected();
    };

    const handleDelete = () => {
        var result = window.confirm("Are you sure you want to delete this store?");
        if (result) {
            ApolloRemoveStore({
                variables: {
                    args: [
                        {
                            id: props.id
                        }
                    ]
                }
            })
        }
    };

    // UNBAN MUTATION
    const [ApolloUnBanStore, { data: data4 }] = useLazyQuery(UnbanStore);
    useEffect(() => {
        if (data4) {
            window.location.reload();
        }
    }, [data4]);
    const handleUnBan = () => {
        var result = window.confirm("Are you sure you want to unban this store?");
        if (result) {
            ApolloUnBanStore({
                variables: {
                    args: [
                        {
                            id: props.id
                        }
                    ],
                    reason: "null"
                }
            })
            console.log("unbaned");
        }
    }


    const [coverFileName, setCoverFileName] = useState("");
    const handleUploadCoverSucess = (name: string) => {
        setCoverFileName(name);
    };


    const handleFormSubmit = (values: FormValues) => {
        const variables: any = {
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

        // if (values.description !== "") {
        //     variables.description = values.description;
        // }
        if (values.intro !== "") {
            variables.intro = values.intro;
        }
        if (values.principalEmail !== "") {
            variables.principal.email = values.principalEmail;
        }

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
                                                <Box width={"35%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography variant="h2" sx={{ mb: "10px", fontSize: "2rem", fontWeight: "600", color: "white" }}>
                                                        {modalTitle}
                                                    </Typography>

                                                    <Box textAlign="center" display={"flex"} >
                                                        {(() => {
                                                            if (status === "disable") {
                                                                return (
                                                                    <Typography variant="h5" color={colors.primary[100]} >
                                                                        {t('disable')}
                                                                    </Typography>)
                                                            }
                                                            if (status === "banned") {
                                                                return (
                                                                    <Typography variant="h5" color={colors.redAccent[500]}>
                                                                        {t('banned')}
                                                                    </Typography>)
                                                            }
                                                            else {
                                                                return (
                                                                    <Typography variant="h5" color={colors.greenAccent[500]}>
                                                                        {t('normal')}
                                                                    </Typography>)
                                                            }
                                                        })()}
                                                    </Box>
                                                </Box>

                                                <Box width={"65%"}>
                                                    {/* UPLOAD COVER COMPONENET */}
                                                    <CoverUpload handleSuccess={handleUploadCoverSucess} imagePlaceHolder={getImgURL(coverFileName, "cover") || ''} type={"store"} />
                                                </Box>
                                            </Box>

                                            <Box display={"flex"} justifyContent={"space-between"}>
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('store_name')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.name}
                                                    name="name"
                                                    error={!!touched.name && !!errors.name}
                                                    helperText={touched.name && errors.name}
                                                    sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={`${t('intro')} ${t('optional')}`}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.intro}
                                                    name="intro"
                                                    error={!!touched.intro && !!errors.intro}
                                                    helperText={touched.intro && errors.intro}
                                                    sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                                { }
                                                <FormControl sx={{ minWidth: 150 }} >
                                                    <InputLabel id="demo-simple-select-label" >{status}</InputLabel>
                                                    <Select
                                                        disabled={status === "banned" || entityName === "company" || entityName === "brand"}
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

                                            <Box display={"flex"}>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    disabled={true}
                                                    type="text"
                                                    label={t('brand_id')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.brandId}
                                                    name="brandId"
                                                    error={!!touched.brandId && !!errors.brandId}
                                                    helperText={touched.brandId && errors.brandId}
                                                    sx={{ marginBottom: "1rem", mr: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />

                                                <TextField
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={t('brand_name')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.brandName}
                                                    name="brandName"
                                                    error={!!touched.brandName && !!errors.brandName}
                                                    helperText={touched.brandName && errors.brandName}
                                                    sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>

                                            <PlacesAutocomplete
                                                // className="places_autocomplete"
                                                value={inputAddress}
                                                onChange={setInputAddress}
                                                onSelect={handleLocationSelect}
                                            >
                                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                    <div>
                                                        <TextField
                                                            // className="modal_input_textfield"
                                                            fullWidth
                                                            label={t('search_location')}
                                                            variant="filled"
                                                            // type="text"
                                                            sx={{ mb: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                            {...getInputProps({
                                                                placeholder: t('search_location') || 'Search Locations...',
                                                                className: 'location-search-input',
                                                            })}
                                                        />
                                                        <div className="autocomplete-dropdown-container">
                                                            {loading && <div>Loading...</div>}
                                                            {suggestions.map(suggestion => {
                                                                const className = suggestion.active
                                                                    ? 'suggestion-item--active'
                                                                    : 'suggestion-item';
                                                                // inline style for demonstration purpose
                                                                const style = suggestion.active
                                                                    ? { backgroundColor: colors.primary[500], color: colors.grey[300], cursor: 'pointer', borderRadius: '5px', fontSize: '1rem', padding: '0.5rem', margin: "0.5rem" } //color when hover
                                                                    : { backgroundColor: colors.primary[400], color: colors.grey[300], cursor: 'pointer', borderRadius: '5px', fontSize: '1rem', padding: '0.5rem', margin: "0.5rem" }; //background color
                                                                return (
                                                                    <div
                                                                        {...getSuggestionItemProps(suggestion, {
                                                                            className,
                                                                            style,
                                                                        })}
                                                                    >
                                                                        <span>{suggestion.description}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </PlacesAutocomplete>

                                            {/* STORE ADDRESS */}
                                            <Box display={"flex"}>
                                                <FormControl sx={{ minWidth: 150, height: "100%" }}>
                                                    <InputLabel id="demo-simple-select-label" >{t('county_filter')}</InputLabel>
                                                    <Select
                                                        sx={{ borderRadius: "10px", background: colors.primary[400], height: "100%", width: "auto", mr: "1rem" }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={cityFilter}
                                                        label="cityFilter"
                                                        onChange={handleCityChange}
                                                        required // add the required prop
                                                    >
                                                        {Object.keys(areaData).map((city, i) => (
                                                            <MenuItem value={city} key={`${city}-${i}`}>
                                                                {city}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>

                                                <FormControl sx={{ minWidth: 150, height: "100%" }}>
                                                    <InputLabel id="demo-simple-select-label" >{t('district_filter')}</InputLabel>
                                                    <Select
                                                        sx={{ borderRadius: "10px", background: colors.primary[400], height: "100%", width: "auto", mr: "1rem" }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={selectedArea}
                                                        label="areaFilter"
                                                        onChange={handleAreaChange}
                                                        required // add the required prop
                                                    >
                                                        {areaFilter.map((area, index) => (
                                                            <MenuItem value={area} key={index}>
                                                                {area}
                                                            </MenuItem>
                                                        ))}

                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('address')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={address}
                                                    name="address"
                                                />
                                            </Box>

                                            <Typography variant="h5" sx={{ textAlign: "left", margin: ".5rem 0", color: colors.grey[200] }}>{t('principal_name')}</Typography>

                                            <Box display={"flex"} justifyContent={"space-between"} >
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={`${t('name')}`}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    disabled={true}
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
                                                    disabled={true}
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
                                                    disabled={true}
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


                                        </Box>
                                        <Box display="flex" justifyContent="center" >
                                            <Button onClick={handleDelete} variant="contained" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #ff2f00" }}>
                                                <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                                                    {deleteTitle}
                                                </Typography>
                                            </Button>


                                            {entityName === 'company' ? (
                                                status === "banned" ? (
                                                    <Button onClick={handleUnBan}
                                                        variant="contained"
                                                        sx={{
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
                                                    <ConfirmModal props={{ type: "store", id: props.id }} />
                                                )
                                            ) : null}


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
