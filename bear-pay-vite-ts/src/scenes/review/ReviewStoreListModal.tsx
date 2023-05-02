import { useState, useEffect, useRef } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { useQuery } from "@apollo/client";
import { GetStoreReviewData } from "../../graphQL/Queries";

import { areaData } from "../../data/cityData";
import CoverUpload from "../../components/Upload/CoverUpload";
import { getImgURL, replaceNullWithEmptyString } from "../../utils/Utils";
import Loader from "../../components/loader/Loader";
import Error from "../../components/error/Error";
import { useTranslation } from 'react-i18next';
import RejectReviewButton from "./RejectReviewButton";
import AcceptReviewButton from "./AcceptReviewButton";
import { ReviewItemType } from "../../types/Review";


type Props = {
    props: ReviewItemType;
    onUpdate: () => void;
    showButtons: boolean;
};

const checkoutSchema = yup.object().shape({});


export default function ReviewStoreListModal({ props, onUpdate, showButtons }: Props) {
    const { t } = useTranslation();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState('disable');

    var btnTitle = t("view"), modalTitle = t("details");


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




    const [initialValues, setInitialValues] = useState({
        id: "",
        name: "",
        intro: "",
        principalName: "",
        principalLineUrl: "https://lin.ee/",
        principalEmail: "",
    });


    // =================================================================================





    const { loading: loadingInit, error: errorInit, data: dataInit } = useQuery(GetStoreReviewData
        , {
            variables: {
                reviewIds: props.reviewId
            }
        }
    );
    useEffect(() => {
        if (dataInit) {
            // console.log(dataInit);
            // SET THE initial value using data3
            const nonNullData = replaceNullWithEmptyString(dataInit.getStoreReviewData[0]);
            console.log(nonNullData);
            setInitialValues({
                id: props.id,
                name: nonNullData.name,
                intro: nonNullData.intro,
                principalName: nonNullData.principalName,
                principalEmail: nonNullData.principalEmail,
                principalLineUrl: nonNullData.principalLineUrl,
            });

            if (dataInit.getStoreReviewData[0].cover !== null || (dataInit.getStoreReviewData[0].cover !== "null")) {
                setCoverFileName(dataInit.getStoreReviewData[0].cover);
            }

            //set city
            setCityFilter(dataInit.getStoreReviewData[0].city);
            //set area
            setAreaFilter(areaData[dataInit.getStoreReviewData[0].city]);

            setSelectedArea(dataInit.getStoreReviewData[0].district);
            //set location
            setLocation((prevState) => ({
                ...prevState,
                address: dataInit.getStoreReviewData[0].address,
            }));
            //set status only if not banned
            if (dataInit.getStoreReviewData[0].status !== "banned") {
                setStatus(dataInit.getStoreReviewData[0].status)
            }
        }
    }, [dataInit]);


    const [coverFileName, setCoverFileName] = useState("");



    const handleFormSubmit = () => { };

    const toggleModal = () => {
        setModal(!modal);
    };
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }


    if (loadingInit) return <Loader />;
    if (errorInit) return <Error />;

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
                                                    <CoverUpload handleSuccess={() => { }} imagePlaceHolder={getImgURL(coverFileName, "cover") || ''} type={"store"} />
                                                </Box>
                                            </Box>

                                            <Box display={"flex"} justifyContent={"space-between"}>
                                                <TextField className="modal_input_textfield"
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    disabled={true}
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
                                                    disabled={true}
                                                    label={`${t('intro')} ${t('optional')}`}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.intro}
                                                    name="intro"
                                                    error={!!touched.intro && !!errors.intro}
                                                    helperText={touched.intro && errors.intro}
                                                    sx={{ margin: "0 0 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                                                />
                                            </Box>





                                            {/* STORE ADDRESS */}
                                            <Box display={"flex"}>
                                                <FormControl sx={{ minWidth: 150, height: "100%" }}>
                                                    <InputLabel id="demo-simple-select-label" >{t('county_filter')}</InputLabel>
                                                    <Select
                                                        disabled={true}
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
                                                        disabled={true}
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
                                                    disabled={true}
                                                    variant="filled"
                                                    type="text"
                                                    label={t('address')}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={address}
                                                    name="address"
                                                    sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                                                />
                                            </Box>

                                            <Typography variant="h5" sx={{ textAlign: "left", margin: ".5rem 0", color: colors.grey[200] }}>{t('principal_name')}</Typography>

                                            <Box display={"flex"} justifyContent={"space-between"} >
                                                <TextField
                                                    fullWidth
                                                    disabled={true}
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
                                                    disabled={true}
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

                                                <TextField
                                                    fullWidth
                                                    disabled={true}
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
                                            </Box>

                                            {showButtons && (
                                                <Box display="flex" justifyContent="center" >
                                                    <RejectReviewButton REQUEST_ID={props.id} onUpdate={onUpdate} />
                                                    <AcceptReviewButton REQUEST_ID={props.id} onUpdate={onUpdate} />
                                                </Box>
                                            )}
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
