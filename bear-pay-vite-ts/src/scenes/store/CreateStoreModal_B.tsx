import React, { useState, useEffect } from "react";
import { Box, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { useLazyQuery, } from "@apollo/client";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { areaData } from "../../data/cityData";
import CoverUpload from "../../components/Upload/CoverUpload";
import { getImgURL } from "../../utils/Utils";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BRAND_CreateStore, } from "../../graphQL/BrandPrincipalQueries";
import { useTranslation } from 'react-i18next';


interface FormValues {
    id: string;
    brandId: string;
    brandName: string;
    name: string;
    intro: string;
    principalName: string;
    principalAccount: string;
    principalPassword: string;
    principalLineUrl: string;
    principalEmail: string;
    machineCount: string;
}


const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d_!@#]{6,}$/;

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),

    principalName: yup.string().required("required"),
    principalAccount: yup.string().required("required"),
    principalPassword: yup.string().required("required").matches(passwordRegex),
    principalLineUrl: yup.string().required("required"),
    principalEmail: yup.string().email("invalid email"),
});


export default function CreateStoreModal_B() {
    const { t } = useTranslation();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ========================== STATE ==========================
    const [modal, setModal] = useState(false);


    //  ========================== PASSWORD VISIBILITY ==========================
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
    };

    // const [{ brandId, brandName }, setBrandInfo] = useState({
    //     brandId: "null",
    //     brandName: "null",
    // });

    var btnTitle = t("create_store"), confirmTitle = t("create");


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


    const [inputAddress, setInputAddress] = useState(""); // FOR DISPLAYING WHAT USER TYPE IN ADDRESS SEARCH BAR
    const [{ address, coordinates }, setLocation] = useState({
        address: "",
        coordinates: {
            lat: 0,
            lng: 120,
        }
    });

    const handleLocationSelect = async (value: any) => {
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

    const [initialValues] = useState<FormValues>({
        id: "",
        brandId: "",
        brandName: "",

        name: "",
        intro: "",

        //locations get from location state
        principalName: "",
        principalAccount: "",
        principalPassword: "",
        principalLineUrl: "https://lin.ee/",
        principalEmail: "",
        machineCount: "",
    });

    // =================== BRAND LIST ===================

    //============================================ GQL ==================================================
    //create store
    const [ApolloCreateStore, { data }] = useLazyQuery(BRAND_CreateStore);
    useEffect(() => {
        if (data) {
            window.location.reload();
        }
    }, [data]);


    const [coverFileName, setCoverFileName] = useState("");
    const handleUploadCoverSucess = (name: string) => {
        setCoverFileName(name);
    };

    const handleFormSubmit = (values: FormValues) => {
        const variables: any = {
            name: values.name,
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
                account: values.principalAccount,
                password: values.principalPassword,
                lineUrl: values.principalLineUrl,
            }
        }
        if (coverFileName !== "") {
            variables.cover = coverFileName;
        }
        if (values.intro !== "") {
            variables.intro = values.intro;
        }
        if (values.principalEmail !== "") {
            variables.principal.email = values.principalEmail;
        }

        console.log(variables);
        ApolloCreateStore({ variables });
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
                                        <Box>
                                            <Box display={"flex"} m={"1rem 0"}>
                                                <Box width={"35%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography variant="h2" sx={{ textAlign: "left", fontSize: "2rem", fontWeight: "600", color: "white" }}>
                                                        {btnTitle}
                                                    </Typography>
                                                </Box>
                                                <Box width={"65%"}>
                                                    {/* UPLOAD COVER COMPONENET */}
                                                    <CoverUpload handleSuccess={handleUploadCoverSucess} imagePlaceHolder={getImgURL(coverFileName, "cover") || ''} type={"store"} />
                                                </Box>
                                            </Box>

                                            <TextField className="modal_input_textfield"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label={t('store_name')}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                name="name"
                                                required
                                                error={!!touched.name && !!errors.name}
                                                helperText={touched.name && errors.name}
                                                sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                            />
                                            <Box display={"flex"} gap={"1rem"}>
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={`${t('intro')} ${t('optional')} `}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.intro}
                                                    name="intro"
                                                    error={!!touched.intro && !!errors.intro}
                                                    helperText={touched.intro && errors.intro}
                                                    sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    required
                                                    variant="filled"
                                                    type="text"
                                                    label={`${t('machine_count')}`}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.machineCount}
                                                    name="machineCount"
                                                    error={!!touched.machineCount && !!errors.machineCount}
                                                    helperText={touched.machineCount && errors.machineCount}
                                                    sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                            </Box>
                                            {/* Search Store location */}
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
                                                {/* CITYFILTER */}
                                                <FormControl required sx={{ minWidth: 150, height: "100%" }}>
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

                                                <FormControl required sx={{ minWidth: 150, height: "100%" }}>
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
                                                            <MenuItem key={index} value={area} >
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
                                                    required // add the required prop
                                                    sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>

                                            <Typography variant="h5" sx={{ textAlign: "left", margin: ".5rem 0", color: colors.grey[200] }}>{t('principal_name')}</Typography>


                                            <Box display={"flex"}>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('person_name')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalName}
                                                    name="principalName"
                                                    required
                                                    error={!!touched.principalName && !!errors.principalName}
                                                    helperText={touched.principalName && errors.principalName}
                                                    sx={{ margin: " 0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    label={t('account')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.principalAccount}
                                                    name="principalAccount"
                                                    required
                                                    error={!!touched.principalAccount && !!errors.principalAccount}
                                                    helperText={touched.principalAccount && errors.principalAccount}
                                                    sx={{ margin: " 0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />

                                                {/* PASSWORD INPUT */}
                                                <FormControl
                                                    fullWidth variant="filled"
                                                    required // add the required prop
                                                    sx={{
                                                        marginBottom: "1rem",
                                                        backgroundColor: colors.primary[400], borderRadius: "5px"
                                                    }} >
                                                    <InputLabel htmlFor="filled-adornment-password">{`${t('password')}`}</InputLabel>
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
                                                    label={`${t('email')} ${t('optional')}`}
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
                                                    required
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
