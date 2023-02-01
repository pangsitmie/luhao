import React, { useState, useEffect, useRef } from "react";
import { Box, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { useLazyQuery, useQuery } from "@apollo/client";
import { CreateStore } from "../../graphQL/Queries";
import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import { GetBrandList } from "../../graphQL/Queries";
import { areaData } from "../../data/cityData";
import { defaultCoverURL, default_cover_900x300_filename } from "../../data/strings";
import CoverUpload from "../../components/Upload/CoverUpload";
import { getImgURL } from "../../utils/Utils";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d_!@#]{6,}$/;

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),

    principalName: yup.string().required("required"),
    principalAccount: yup.string().required("required"),
    principalPassword: yup.string().required("required").matches(passwordRegex),
    principalLineUrl: yup.string().required("required"),
    principalEmail: yup.string().email("invalid email"),
});


export default function CreateStoreModal() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ========================== STATE ==========================
    const [modal, setModal] = useState(false);


    //  ========================== PASSWORD VISIBILITY ==========================
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [{ brandId, brandName }, setBrandInfo] = useState({
        brandId: "null",
        brandName: "null",
    });
    var btnTitle = "新增店面", confirmTitle = "新增", cancelTitle = "取消";


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

    // useEffect(() => {
    //     console.log("city:" + cityFilter + ", selected area:" + selectedArea);
    // }, [cityFilter, areaFilter, selectedArea]);


    const [inputAddress, setInputAddress] = useState(""); // FOR DISPLAYING WHAT USER TYPE IN ADDRESS SEARCH BAR
    const [{ address, coordinates }, setLocation] = useState({
        address: "",
        coordinates: {
            lat: 0,
            lng: 120,
        }
    });

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

    const initialValues = {
        name: "",
        intro: "",

        //locations get from location state
        principalName: "",
        principalAccount: "",
        principalPassword: "",
        principalLineUrl: "https://lin.ee/",
        principalEmail: "",
    };

    // =================== BRAND LIST ===================
    const { loading: loading1, error: error1, data: data1 } = useQuery(GetBrandList);
    const [brandListFilter, setBrandListFilter] = useState('');
    const [brandList, setBrandList] = useState([]);
    useEffect(() => {
        if (data1) {
            setBrandList(data1.managerGetBrands);
        }

    }, [data1]);
    const handleBrandListChange = (e) => {
        const targetId = e.target.value;

        //find the brand id from brand list
        const brand = brandList.find(brand => brand.id === targetId);

        if (brand) {
            setBrandListFilter(targetId);
            setBrandInfo({
                brandId: targetId,
                brandName: brand.name
            });
        }
    };

    //============================================ GQL ==================================================
    //create store
    const [ApolloCreateStore, { loading, error, data }] = useLazyQuery(CreateStore);
    useEffect(() => {
        if (data) {
            window.location.reload();
        }
    }, [data]);


    const [coverFileName, setCoverFileName] = useState(default_cover_900x300_filename);
    const handleUploadCoverSucess = (name) => {
        setCoverFileName(name);
    };

    const handleFormSubmit = (values) => {
        const variables = {
            args: [
                {
                    id: brandId
                }
            ],
            brandId: brandId,
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
                // description: "location description"
            },
            principal: {
                name: values.principalName,
                account: values.principalAccount,
                password: values.principalPassword,
                lineUrl: values.principalLineUrl,
            }
        }
        if (values.intro !== "") {
            variables.intro = values.intro;
        }
        if (values.principalEmail !== "") {
            variables.principal.email = values.principalEmail;
        }

        console.log(variables);
        // ApolloCreateStore({ variables });
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
                                        <Box color={"black"}>

                                            <Box display={"flex"} m={"1rem 0"}>
                                                <Box width={"35%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography variant="h2" sx={{ textAlign: "left", fontSize: "2rem", fontWeight: "600", color: "white" }}>
                                                        {btnTitle}
                                                    </Typography>
                                                </Box>
                                                <Box width={"65%"}>
                                                    {/* UPLOAD COVER COMPONENET */}
                                                    <CoverUpload handleSuccess={handleUploadCoverSucess} imagePlaceHolder={getImgURL(coverFileName, "cover")} type={"store"} />
                                                </Box>
                                            </Box>


                                            {/* Brand info */}
                                            <Box display={"flex"}>
                                                <TextField
                                                    fullWidth
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label="品牌id"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={brandId}
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
                                                    value={brandName}
                                                    name="brandName"
                                                    error={!!touched.brandName && !!errors.brandName}
                                                    helperText={touched.brandName && errors.brandName}
                                                    sx={{ marginBottom: "1rem", mr: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <FormControl sx={{ minWidth: 150, height: "100%" }}>
                                                    <InputLabel id="demo-simple-select-label" >品牌過濾</InputLabel>
                                                    <Select
                                                        sx={{ borderRadius: "10px", background: colors.primary[400], height: "100%", width: "auto" }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={brandListFilter}
                                                        label="brandListFilter"
                                                        onChange={handleBrandListChange}
                                                        required
                                                    >
                                                        {brandList.map((brand, i) => (
                                                            <MenuItem
                                                                value={brand.id}
                                                                key={`${i}`}
                                                            >
                                                                {brand.id} - {brand.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>


                                            <TextField className="modal_input_textfield"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="暱稱 (選填)"
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
                                                label="店面介紹"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.intro}
                                                name="intro"
                                                error={!!touched.intro && !!errors.intro}
                                                helperText={touched.intro && errors.intro}
                                                sx={{ margin: "0 1rem 0rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                            />

                                            {/* Search Store location */}
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
                                                            sx={{ margin: "1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                            {...getInputProps({
                                                                placeholder: '搜索店面地點 ...',
                                                                className: 'location-search-input',
                                                            })}
                                                        />
                                                        <div className="autocomplete-dropdown-container">
                                                            {loading && <div>Loading...</div>}
                                                            {suggestions.map((suggestion, index) => {
                                                                const className = suggestion.active
                                                                    ? 'suggestion-item--active'
                                                                    : 'suggestion-item';
                                                                // inline style for demonstration purpose
                                                                const style = suggestion.active
                                                                    ? { backgroundColor: colors.primary[500], color: colors.grey[300], cursor: 'pointer', borderRadius: '5px', fontSize: '1rem', padding: '0.5rem', margin: "0.5rem" } //color when hover
                                                                    : { backgroundColor: colors.primary[400], color: colors.grey[300], cursor: 'pointer', borderRadius: '5px', fontSize: '1rem', padding: '0.5rem', margin: "0.5rem" }; //background color
                                                                return (
                                                                    <div
                                                                        key={index} // add a unique key prop
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
                                                {/* CITYFILTER */}
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

                                            <Box display={"flex"}>
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
                                                    sx={{ margin: " 0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label="負責人賬號"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalAccount}
                                                    name="principalAccount"
                                                    error={!!touched.principalAccount && !!errors.principalAccount}
                                                    helperText={touched.principalAccount && errors.principalAccount}
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
                                                    <FormHelperText error={!!touched.principalPassword && !!errors.principalPassword}>
                                                        {touched.principalPassword && errors.principalPassword}
                                                    </FormHelperText>
                                                </FormControl>
                                            </Box>

                                            <Box display={"flex"}>

                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label="負責人信箱 (選填)"
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
                                        </Box>
                                        <Box display="flex" justifyContent="center" >
                                            <Box display="flex" justifyContent="center" >
                                                <button className="my-button" type="submit">{confirmTitle}</button>
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

    );



}
