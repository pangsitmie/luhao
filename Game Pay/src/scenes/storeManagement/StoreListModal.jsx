import React, { useState, useEffect, useRef } from "react";
import { Box, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { useQuery, useLazyQuery } from "@apollo/client";
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


export default function StoreListModal({ props }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState('disable');
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    //  ========================== PASSWORD VISIBILITY ==========================
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    var btnTitle = "修改", confirmTitle = "更新", deleteTitle = "移除", banTitle = "封鎖", unbanTitle = "解封";


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
    const [ApolloUpdateStore, { loading: loading2, error: error2, data: data2 }] = useLazyQuery(UpdateStore);
    useEffect(() => {
        if (data2) {
            window.location.reload();
            console.log("UPDATE SUCCESS")
        }
    }, [data2]);

    // INITIAL VALUES FROM GET STORE QUERY
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
                status: nonNullData.status.name,
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
            if (data3.getStore[0].status.name !== "banned") {
                setStatus(data3.getStore[0].status.name)
            }
        }
    }, [data3]);





    const handleLocationSelect = async value => {
        const results = await geocodeByAddress(value);
        const formattedAddress = results[0].address_components[0].long_name + results[0].address_components[1].long_name;
        const latLng = await getLatLng(results[0]);
        const city = results[0].address_components[4].long_name;
        const district = results[0].address_components[3].long_name;

        setInputAddress(value);
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


        console.log("city" + city + "district" + district + "Coordinate:" + coordinates.lat + "," + coordinates.lng);
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
    const [ApolloUnBanStore, { loading: loading4, error: error4, data: data4 }] = useLazyQuery(UnbanStore);
    useEffect(() => {
        if (data4) {
            window.location.reload();
        }
    }, [data4]);
    const handleUnBan = (e) => {
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


    const [coverFileName, setCoverFileName] = useState(default_cover_900x300_filename);
    const handleUploadCoverSucess = (name) => {
        setCoverFileName(name);
    };


    const handleFormSubmit = (values) => {
        const variables = {
            args: [
                {
                    id: values.id
                }
            ],
            name: values.name,
            cover: coverFileName,
            location: {
                city: cityFilter,
                district: selectedArea,
                address: address,
                description: "NONE"
            },
            principal: {
                name: values.principalName,
                lineUrl: values.principalLineUrl,
            }
        };

        if (values.intro !== "") {
            variables.intro = values.intro;
        }
        if (values.principalEmail !== "") {
            variables.principal.email = values.principalEmail;
        }


        // if coordinate is not updated
        if (coordinates.lat !== 0 && coordinates.lng !== 120) {
            variables.location.coordinate = {
                latitude: coordinates.lat,
                longitude: coordinates.lng,
            };
        }

        //if password is empty, dont update password
        if (values.principalPassword !== "") {
            variables.principal.password = values.principalPassword;
        }

        //if status is not banned, update status
        if (initialValues.status !== "banned") {
            variables.statusId = status;
        }
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
                                                <Box width={"35%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography variant="h2" sx={{ mb: "10px", fontSize: "2rem", fontWeight: "600", color: "white" }}>
                                                        {btnTitle}
                                                    </Typography>

                                                    <Box textAlign="center" display={"flex"} >
                                                        {(() => {
                                                            if (initialValues.status === "disable") {
                                                                return (
                                                                    <Typography variant="h5" color={colors.primary[100]} >
                                                                        停用
                                                                    </Typography>)
                                                            }
                                                            if (initialValues.status === "banned") {
                                                                return (
                                                                    <Typography variant="h5" color={colors.redAccent[500]}>
                                                                        封鎖
                                                                    </Typography>)
                                                            }
                                                            else {
                                                                return (
                                                                    <Typography variant="h5" color={colors.greenAccent[500]}>
                                                                        正常
                                                                    </Typography>)
                                                            }
                                                        })()}
                                                    </Box>
                                                </Box>

                                                <Box width={"65%"}>
                                                    {/* UPLOAD COVER COMPONENET */}
                                                    <CoverUpload handleSuccess={handleUploadCoverSucess} imagePlaceHolder={getImgURL(coverFileName, "cover")} type={"store"} />
                                                </Box>
                                            </Box>

                                            <Box display={"flex"} justifyContent={"space-between"}>
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label="暱稱"
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
                                                    label="介紹 (選填)"
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
                                                    <InputLabel id="demo-simple-select-label" >{initialValues.status}</InputLabel>
                                                    <Select
                                                        disabled={initialValues.status === "banned"}
                                                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={status}
                                                        label="status"
                                                        onChange={handleStatusChange}
                                                    >
                                                        <MenuItem value={"normal"}>正常</MenuItem>
                                                        <MenuItem value={"disable"}>停用</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>

                                            <Box display={"flex"}>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    disabled={true}
                                                    type="text"
                                                    label="品牌id"
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
                                                    label="品牌名稱"
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
                                                className="places_autocomplete"
                                                value={inputAddress}
                                                onChange={setInputAddress}
                                                onSelect={handleLocationSelect}
                                            >
                                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                    <div>
                                                        <TextField
                                                            className="modal_input_textfield"
                                                            fullWidth
                                                            label="搜索店面地點 ..."
                                                            variant="filled"
                                                            type="text"
                                                            sx={{ mb: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                            {...getInputProps({
                                                                placeholder: '搜索店面地點 ...',
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
                                                    <InputLabel id="demo-simple-select-label" >縣市過濾</InputLabel>
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
                                                    <InputLabel id="demo-simple-select-label" >鄉鎮過濾</InputLabel>
                                                    <Select
                                                        sx={{ borderRadius: "10px", background: colors.primary[400], height: "100%", width: "auto", mr: "1rem" }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={selectedArea}
                                                        label="areaFilter"
                                                        onChange={handleAreaChange}
                                                        required // add the required prop
                                                    >
                                                        {areaFilter.map((area, i) => (
                                                            <MenuItem value={area} key={area}>
                                                                {area}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label="店面地址"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={address}
                                                    name="address"
                                                    required // add the required prop
                                                    error={!!touched.address && !!errors.address}
                                                    helperText={touched.address && errors.address}
                                                    sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>

                                            <Box display={"flex"} justifyContent={"space-between"} >
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label="負責人名稱"
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
                                                    label="負責人line"
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

                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label="負責人信箱"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalEmail}
                                                    name="principalEmail"
                                                    error={!!touched.principalEmail && !!errors.principalEmail}
                                                    helperText={touched.principalEmail && errors.principalEmail}
                                                    sx={{ margin: " 0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                {/* PASSWORD INPUT */}
                                                <FormControl fullWidth variant="filled" sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }} >
                                                    <InputLabel htmlFor="filled-adornment-password">負責人密碼 (不必要)</InputLabel>
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

                                            {values.status === "banned" ? (
                                                <Button onClick={handleUnBan} id={values.id} variant="contained" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #fff" }}>
                                                    <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                                                        {unbanTitle}
                                                    </Typography>
                                                </Button>
                                            ) : (
                                                <ConfirmModal props={{ type: "store", id: props.id }} />
                                            )}

                                            <Button type="submit" color="success" variant="contained" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", background: colors.grey[100] }}>
                                                <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: colors.grey[700] }}>
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
